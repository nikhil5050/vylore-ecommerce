export interface ShippingAddress {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  id: number;
  productId: number | null;
  variantId: number | null;
  productName: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

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

export interface Order {
  id: number;
  orderNumber: string;
  subtotal: number;
  discount: number;
  tax: number;
  shippingFee: number;
  total: number;
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: OrderStatus;
  shippingStatus: string;
  shippingRecipientName: string;
  shippingPhone: string;
  shippingAddressLine1: string;
  shippingAddressLine2: string | null;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  shippingCountry: string;
  items: OrderItem[];
  createdAt: string;
}
