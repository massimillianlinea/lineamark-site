import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { items, regionAllow } = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: items.map((i: any) => ({ price: i.priceId, quantity: i.qty })),
    shipping_address_collection: { allowed_countries: regionAllow },
    automatic_tax: { enabled: true },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?sid={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}#shop`
  });

  return NextResponse.json({ url: session.url });
}

