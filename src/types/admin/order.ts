export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "paid" | "pending" | "failed" | "refunded" | "partially_refunded";

export interface OrderAddress {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface OrderLineItem {
  productId: string;
  name: string;
  imageUrl?: string;
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

export interface OrderPaymentInfo {
  gateway: string;
  transactionId: string;
  status: PaymentStatus;
}

export interface AdminOrder {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderLineItem[];
  billingAddress: OrderAddress;
  shippingAddress: OrderAddress;
  summary: OrderSummary;
  payment: OrderPaymentInfo;
  deliveryPartner: string;
  status: OrderStatus;
  placedAt: string;
}
