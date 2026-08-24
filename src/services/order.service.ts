import type { CreateOrderInput, Order } from "@/types/order";

// Mock order creation — replace with a real POST to the Flask backend once it exists.
export async function createOrder(input: CreateOrderInput): Promise<Order> {
  return {
    id: `VYL-${Date.now().toString(36).toUpperCase()}`,
    placedAt: new Date().toISOString(),
    ...input,
  };
}
