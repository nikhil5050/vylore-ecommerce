"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ShippingAddress } from "@/types/order";

export interface SavedAddress extends ShippingAddress {
  id: string;
  isDefault: boolean;
}

interface AddressState {
  addresses: SavedAddress[];
  addAddress: (address: ShippingAddress) => void;
  removeAddress: (id: string) => void;
  setDefault: (id: string) => void;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      addresses: [],
      addAddress: (address) => {
        const isFirst = get().addresses.length === 0;
        set({
          addresses: [...get().addresses, { ...address, id: crypto.randomUUID(), isDefault: isFirst }],
        });
      },
      removeAddress: (id) => set({ addresses: get().addresses.filter((address) => address.id !== id) }),
      setDefault: (id) =>
        set({ addresses: get().addresses.map((address) => ({ ...address, isDefault: address.id === id })) }),
    }),
    { name: "vylore-addresses" },
  ),
);
