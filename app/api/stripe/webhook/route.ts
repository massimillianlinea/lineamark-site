import Stripe from "stripe";
import { NextResponse } from "next/server";
import { pushToShipBob } from "@/lib/shipbob";
import { saveOrder } from "@/lib/db";

export async function POST(req: Request) {
  const buf = Buffer.from(await req.arrayBuffer());
  const sig = req.headers.get("stripe-signature");
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const s = event.data.object as Stripe.Checkout.Session;

    // Fetch line items for the session
    const items = await stripe.checkout.sessions.listLineItems(s.id, { limit: 100 });

    // Use customer_details (available on Checkout.Session)
    const shipping = s.customer_details
      ? {
          name: s.customer_details.name || undefined,
          email: s.customer_details.email || undefined,
          address: s.customer_details.address || undefined,
        }
      : undefined;

    const order = await saveOrder({
      sessionId: s.id,
      email: s.customer_details?.email!,
      amountTotal: s.amount_total!,
      currency: s.currency!,
      shipping,
      lineItems: items.data.map((i) => ({
        name: i.description ?? "Item",
        qty: i.quantity ?? 1,
      })),
      status: "paid",
    });

    await pushToShipBob(order);
  }

  return NextResponse.json({ received: true });
}
