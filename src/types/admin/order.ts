export type OrderStatus =
  | "pending_payment"
  | "payment_failed"
  | "paid"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "refund_pending"
  | "refunded";

export type PaymentStatus = "pending" | "paid" | "failed";

export type ShippingStatus = "not_shipped" | "shipped" | "out_for_delivery" | "delivered" | "cancelled";

export interface OrderAddress {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  landmark?: string;
}

export interface OrderLineItem {
  productId?: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface OrderSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

// Shipment tracking is a separate resource from the order itself on the
// backend (GET/PATCH /admin/orders/{id}/shipment) — only fetched for the
// order detail view, not the list.
export interface OrderShipment {
  provider: string;
  status: string;
  awbNumber?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  shippedAt?: string;
  deliveredAt?: string;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderLineItem[];
  shippingAddress: OrderAddress;
  summary: OrderSummary;
  paymentStatus: PaymentStatus;
  shippingStatus: ShippingStatus;
  status: OrderStatus;
  placedAt: string;
}
