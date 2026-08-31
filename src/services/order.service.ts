import { apiFetch } from "@/lib/api";
import type { Order, OrderItem, OrderStatus } from "@/types/order";

interface BackendOrderItem {
  id: number;
  product_id: number | null;
  variant_id: number | null;
  product_name: string;
  sku: string;
  unit_price: number;
  quantity: number;
  total: number;
}

interface BackendOrder {
  id: number;
  order_number: string;
  subtotal: number;
  discount: number;
  tax: number;
  shipping_fee: number;
  total: number;
  payment_status: "pending" | "paid" | "failed" | "cod_pending";
  order_status: OrderStatus;
  shipping_status: string;
  shipping_recipient_name: string;
  shipping_phone: string;
  shipping_address_line_1: string;
  shipping_address_line_2: string | null;
  shipping_city: string;
  shipping_state: string;
  shipping_postal_code: string;
  shipping_country: string;
  items: BackendOrderItem[];
  created_at: string;
}

function mapItem(item: BackendOrderItem): OrderItem {
  return {
    id: item.id,
    productId: item.product_id,
    variantId: item.variant_id,
    productName: item.product_name,
    sku: item.sku,
    unitPrice: item.unit_price,
    quantity: item.quantity,
    total: item.total,
  };
}

function mapOrder(order: BackendOrder): Order {
  return {
    id: order.id,
    orderNumber: order.order_number,
    subtotal: order.subtotal,
    discount: order.discount,
    tax: order.tax,
    shippingFee: order.shipping_fee,
    total: order.total,
    paymentStatus: order.payment_status,
    orderStatus: order.order_status,
    shippingStatus: order.shipping_status,
    shippingRecipientName: order.shipping_recipient_name,
    shippingPhone: order.shipping_phone,
    shippingAddressLine1: order.shipping_address_line_1,
    shippingAddressLine2: order.shipping_address_line_2,
    shippingCity: order.shipping_city,
    shippingState: order.shipping_state,
    shippingPostalCode: order.shipping_postal_code,
    shippingCountry: order.shipping_country,
    items: order.items.map(mapItem),
    createdAt: order.created_at,
  };
}

export async function listOrders(): Promise<Order[]> {
  const rows = await apiFetch<BackendOrder[]>("/orders");
  return rows.map(mapOrder);
}

export async function getOrder(id: number): Promise<Order | undefined> {
  try {
    return mapOrder(await apiFetch<BackendOrder>(`/orders/${id}`));
  } catch {
    return undefined;
  }
}

export async function getOrderByNumber(orderNumber: string): Promise<Order | undefined> {
  try {
    return mapOrder(await apiFetch<BackendOrder>(`/orders/by-number/${encodeURIComponent(orderNumber)}`));
  } catch {
    return undefined;
  }
}

export async function cancelOrder(id: number): Promise<Order> {
  return mapOrder(await apiFetch<BackendOrder>(`/orders/${id}/cancel`, { method: "POST" }));
}
