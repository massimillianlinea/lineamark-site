export async function pushToShipBob(order: any) {
  const payload = {
    orderId: order.id,
    reference: order.sessionId,
    toAddress: {
      name: order.shipping?.name,
      line1: order.shipping?.address?.line1,
      city: order.shipping?.address?.city,
      postalCode: order.shipping?.address?.postal_code,
      country: order.shipping?.address?.country,
      phone: order.shipping?.phone,
      email: order.email,
    },
    items: order.lineItems?.map((li: any) => ({
      sku: li.sku || li.name,
      quantity: li.qty || 1
    })),
  };

  const r = await fetch(`${process.env.SHIPBOB_API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SHIPBOB_TOKEN}`,
    },
    body: JSON.stringify(payload),
  });

  if (!r.ok) throw new Error("ShipBob push failed");
  return r.json();
}

