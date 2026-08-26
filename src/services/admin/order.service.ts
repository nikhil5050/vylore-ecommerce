import { apiFetch } from "@/lib/api";
import type { AdminOrder, OrderShipment } from "@/types/admin";

interface BackendOrderItem {
  id: number;
  product_id: number | null;
  variant_id: number | null;
  product_name: string;
  sku: string;
  unit_price: number;
  quantity: number;
  discount: number;
  tax: number;
  total: number;
}

export interface BackendOrder {
  id: number;
  order_number: string;
  user_id: number;
  subtotal: number;
  discount: number;
  tax: number;
  shipping_fee: number;
  total: number;
  payment_status: AdminOrder["paymentStatus"];
  order_status: AdminOrder["status"];
  shipping_status: AdminOrder["shippingStatus"];
  shipping_recipient_name: string;
  shipping_phone: string;
  shipping_address_line_1: string;
  shipping_address_line_2: string | null;
  shipping_city: string;
  shipping_state: string;
  shipping_postal_code: string;
  shipping_country: string;
  shipping_landmark: string | null;
  items: BackendOrderItem[];
  created_at: string;
  updated_at: string;
}

interface BackendShipment {
  provider: string;
  awb_number: string | null;
  tracking_number: string | null;
  status: string;
  tracking_url: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
}

interface CustomerContact {
  name: string;
  email: string;
  phone: string;
}

export function mapOrderForCustomer(order: BackendOrder, customer: CustomerContact): AdminOrder {
  return mapOrder(order, customer);
}

function mapOrder(order: BackendOrder, customer?: CustomerContact): AdminOrder {
  return {
    id: String(order.id),
    orderNumber: order.order_number,
    customerId: String(order.user_id),
    customerName: customer?.name ?? `Customer #${order.user_id}`,
    customerEmail: customer?.email ?? "—",
    customerPhone: customer?.phone ?? order.shipping_phone,
    items: order.items.map((item) => ({
      productId: item.product_id !== null ? String(item.product_id) : undefined,
      name: item.product_name,
      sku: item.sku,
      quantity: item.quantity,
      price: item.unit_price,
      subtotal: item.total,
    })),
    shippingAddress: {
      fullName: order.shipping_recipient_name,
      line1: order.shipping_address_line_1,
      line2: order.shipping_address_line_2 ?? undefined,
      city: order.shipping_city,
      state: order.shipping_state,
      postalCode: order.shipping_postal_code,
      country: order.shipping_country,
      phone: order.shipping_phone,
      landmark: order.shipping_landmark ?? undefined,
    },
    summary: {
      subtotal: order.subtotal,
      discount: order.discount,
      shipping: order.shipping_fee,
      tax: order.tax,
      total: order.total,
    },
    paymentStatus: order.payment_status,
    shippingStatus: order.shipping_status,
    status: order.order_status,
    placedAt: order.created_at,
  };
}

interface BackendCustomerListItem {
  id: number;
  email: string;
  phone: string | null;
  first_name: string;
  last_name: string;
}

// Order rows don't embed the customer's name/email, only user_id — join
// against the admin customer list rather than fetching per order.
async function fetchCustomerContacts(): Promise<Map<string, CustomerContact>> {
  const pageSize = 100;
  const all: BackendCustomerListItem[] = [];
  let page = 1;

  while (true) {
    const query = new URLSearchParams({ page: String(page), page_size: String(pageSize) });
    const result = await apiFetch<{ items: BackendCustomerListItem[]; total: number }>(
      `/admin/customers?${query.toString()}`,
    );
    all.push(...result.items);
    if (result.items.length < pageSize || all.length >= result.total) break;
    page += 1;
  }

  return new Map(
    all.map((c) => [
      String(c.id),
      { name: `${c.first_name} ${c.last_name}`.trim(), email: c.email, phone: c.phone ?? "—" },
    ]),
  );
}

export async function getAdminOrders(): Promise<AdminOrder[]> {
  const [orders, contacts] = await Promise.all([apiFetch<BackendOrder[]>("/admin/orders"), fetchCustomerContacts()]);
  return orders
    .map((order) => mapOrder(order, contacts.get(String(order.user_id))))
    .sort((a, b) => (a.placedAt < b.placedAt ? 1 : -1));
}

export async function getAdminOrder(id: string): Promise<AdminOrder | undefined> {
  try {
    const [order, contacts] = await Promise.all([
      apiFetch<BackendOrder>(`/admin/orders/${id}`),
      fetchCustomerContacts(),
    ]);
    return mapOrder(order, contacts.get(String(order.user_id)));
  } catch {
    return undefined;
  }
}

export async function getOrderShipment(orderId: string): Promise<OrderShipment | undefined> {
  try {
    const shipment = await apiFetch<BackendShipment>(`/admin/orders/${orderId}/shipment`);
    return {
      provider: shipment.provider,
      status: shipment.status,
      awbNumber: shipment.awb_number ?? undefined,
      trackingNumber: shipment.tracking_number ?? undefined,
      trackingUrl: shipment.tracking_url ?? undefined,
      shippedAt: shipment.shipped_at ?? undefined,
      deliveredAt: shipment.delivered_at ?? undefined,
    };
  } catch {
    return undefined;
  }
}

export interface ShipmentUpdateInput {
  status: string;
  awbNumber?: string;
  trackingNumber?: string;
  trackingUrl?: string;
}

export async function updateOrderShipment(orderId: string, input: ShipmentUpdateInput): Promise<OrderShipment> {
  const shipment = await apiFetch<BackendShipment>(`/admin/orders/${orderId}/shipment`, {
    method: "PATCH",
    body: {
      status: input.status,
      awb_number: input.awbNumber || null,
      tracking_number: input.trackingNumber || null,
      tracking_url: input.trackingUrl || null,
    },
  });
  return {
    provider: shipment.provider,
    status: shipment.status,
    awbNumber: shipment.awb_number ?? undefined,
    trackingNumber: shipment.tracking_number ?? undefined,
    trackingUrl: shipment.tracking_url ?? undefined,
    shippedAt: shipment.shipped_at ?? undefined,
    deliveredAt: shipment.delivered_at ?? undefined,
  };
}
