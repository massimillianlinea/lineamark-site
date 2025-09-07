export async function saveOrder(order: any) {
  console.log("saveOrder", order);
  return { id: order.sessionId, ...order };
}

