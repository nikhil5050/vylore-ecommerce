import { apiFetch } from "@/lib/api";
import { mapOrderForCustomer, type BackendOrder } from "@/services/admin/order.service";
import type { AdminOrder, Customer, CustomerAddress } from "@/types/admin";

interface BackendCustomerListItem {
  id: number;
  email: string;
  phone: string | null;
  first_name: string;
  last_name: string;
  is_active: boolean;
  created_at: string;
  order_count: number;
  total_spent: number;
}

interface BackendCustomerDetail {
  id: number;
  email: string;
  phone: string | null;
  first_name: string;
  last_name: string;
  is_active: boolean;
  created_at: string;
  addresses: BackendAddress[];
  orders: BackendOrder[];
}

interface BackendAddress {
  id: number;
  recipient_name: string;
  phone: string;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  landmark: string | null;
  is_default: boolean;
}

function mapCustomer(customer: BackendCustomerListItem): Customer {
  return {
    id: String(customer.id),
    name: `${customer.first_name} ${customer.last_name}`.trim(),
    email: customer.email,
    phone: customer.phone ?? "—",
    status: customer.is_active ? "active" : "inactive",
    ordersCount: customer.order_count,
    totalSpent: customer.total_spent,
    averageOrderValue: customer.order_count > 0 ? customer.total_spent / customer.order_count : 0,
    joinedAt: customer.created_at,
    addresses: [],
  };
}

function mapAddress(address: BackendAddress): CustomerAddress {
  return {
    id: String(address.id),
    fullName: address.recipient_name,
    line1: address.address_line_1,
    line2: address.address_line_2 ?? undefined,
    city: address.city,
    state: address.state,
    postalCode: address.postal_code,
    country: address.country,
    phone: address.phone,
    isDefault: address.is_default,
  };
}

// Pages through every customer at the backend's max page_size (100) —
// exhausts every page rather than assuming they all fit in one request.
async function fetchAllCustomers(): Promise<BackendCustomerListItem[]> {
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

  return all;
}

export async function getAdminCustomers(): Promise<Customer[]> {
  const items = await fetchAllCustomers();
  return items.map(mapCustomer);
}

export async function getAdminCustomer(id: string): Promise<{ customer: Customer; orders: AdminOrder[] } | undefined> {
  try {
    const detail = await apiFetch<BackendCustomerDetail>(`/admin/customers/${id}`);

    const name = `${detail.first_name} ${detail.last_name}`.trim();
    const email = detail.email;
    const phone = detail.phone ?? "—";
    const orders = detail.orders.map((order) => mapOrderForCustomer(order, { name, email, phone }));
    const totalSpent = orders.reduce((sum, order) => sum + order.summary.total, 0);

    const customer: Customer = {
      id: String(detail.id),
      name,
      email,
      phone,
      status: detail.is_active ? "active" : "inactive",
      ordersCount: orders.length,
      totalSpent,
      averageOrderValue: orders.length > 0 ? totalSpent / orders.length : 0,
      joinedAt: detail.created_at,
      addresses: detail.addresses.map(mapAddress),
    };
    return { customer, orders };
  } catch {
    return undefined;
  }
}
