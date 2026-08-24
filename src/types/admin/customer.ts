export type CustomerStatus = "active" | "inactive" | "blocked";

export interface CustomerAddress {
  id: string;
  label: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  group: string;
  status: CustomerStatus;
  ordersCount: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderAt?: string;
  joinedAt: string;
  addresses: CustomerAddress[];
  wishlistCount: number;
}

export interface CustomerGroup {
  id: string;
  name: string;
  description: string;
  customerCount: number;
  discountPercent?: number;
}
