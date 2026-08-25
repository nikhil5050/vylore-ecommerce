import { apiFetch } from "@/lib/api";
import type { ShippingAddress } from "@/types/order";

export interface SavedAddress extends ShippingAddress {
  id: number;
  isDefault: boolean;
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

function mapAddress(address: BackendAddress): SavedAddress {
  return {
    id: address.id,
    fullName: address.recipient_name,
    phone: address.phone,
    line1: address.address_line_1,
    line2: address.address_line_2 ?? undefined,
    city: address.city,
    state: address.state,
    postalCode: address.postal_code,
    country: address.country,
    isDefault: address.is_default,
  };
}

export async function listAddresses(): Promise<SavedAddress[]> {
  const rows = await apiFetch<BackendAddress[]>("/addresses");
  return rows.map(mapAddress);
}

export async function createAddress(address: ShippingAddress): Promise<SavedAddress> {
  const created = await apiFetch<BackendAddress>("/addresses", {
    method: "POST",
    body: {
      recipient_name: address.fullName,
      phone: address.phone,
      address_line_1: address.line1,
      address_line_2: address.line2 || undefined,
      city: address.city,
      state: address.state,
      postal_code: address.postalCode,
      country: address.country,
    },
  });
  return mapAddress(created);
}

export async function deleteAddress(id: number): Promise<void> {
  await apiFetch(`/addresses/${id}`, { method: "DELETE" });
}

export async function setDefaultAddress(id: number): Promise<SavedAddress> {
  const updated = await apiFetch<BackendAddress>(`/addresses/${id}`, {
    method: "PATCH",
    body: { is_default: true },
  });
  return mapAddress(updated);
}
