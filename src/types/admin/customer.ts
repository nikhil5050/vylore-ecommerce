export type CustomerStatus = "active" | "inactive";

export interface CustomerAddress {
  id: string;
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
  status: CustomerStatus;
  ordersCount: number;
  totalSpent: number;
  averageOrderValue: number;
  joinedAt: string;
  addresses: CustomerAddress[];
}
