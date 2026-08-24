export interface ShippingAddress {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  size?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  email: string;
  phone: string;
  shippingAddress: ShippingAddress;
  deliveryOptionId: string;
  paymentMethodId: string;
  placedAt: string;
}

export type CreateOrderInput = Omit<Order, "id" | "placedAt">;
