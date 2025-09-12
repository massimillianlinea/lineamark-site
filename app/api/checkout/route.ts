import Stripe from "stripe";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // never pre-render this
export const runtime = "nodejs";        // ensure Node runtime

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Missing STRIPE_SECRET_KEY" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secret);

  let body: {
    sku: string;
    quantity?: number;
    successUrl?: string;
    cancelUrl?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const qty = Math.max(1, Number(body.quantity ?? 1));

  // Map your SKUs to Stripe Price IDs (set these as env vars in Vercel)
  const priceMap: Record<string, string | undefined> = {
    STANDARD4: process.env.STRIPE_PRICE_STANDARD4, // 4-pack
    PLANNER6:  process.env.STRIPE_PRICE_PLANNER6,  // 6-pack
  };

  const priceId = priceMap[body.sku];
  if (!priceId) {
    return NextResponse.json({ error: "Unknown SKU" }, { status: 400 });
  }

  const successUrl =
    body.successUrl ??
    `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"}/thanks?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl =
    body.cancelUrl ??
    `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"}#shop`;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: qty }],
    automatic_tax: { enabled: true },
    shipping_address_collection: { allowed_countries: ["IE", "GB", "FR", "DE", "ES", "IT", "NL", "BE", "PT"] },
    allow_promotion_codes: true,
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return NextResponse.json({ id: session.id, url: session.url });
}
