import Stripe from "stripe";
import { NextResponse } from "next/server";
import { pushToShipBob } from "@/lib/shipbob";
import { saveOrder } from "@/lib/db";

export async function POST(req: Request) {
  const buf = Buffer.from(await req.arrayBuffer());
  const sig = (req.headers as any).get("stripe-signature");
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const s = event.data.object as Stripe.Checkout.Session;
    const items = await stripe.checkout.sessions.listLineItems(s.id, { limit: 100 });

    const order = await saveOrder({
      sessionId: s.id,
      email: s.customer_email!,
      amountTotal: s.amount_total!,
      currency: s.currency!,
      shipping: s.shipping_details,
      lineItems: items.data.map((i) => ({ name: i.description, qty: i.quantity })),
      status: "paid",
    });

    await pushToShipBob(order);
  }

  return NextResponse.json({ received: true });
}

