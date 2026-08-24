"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

export interface CartLine {
  product: Product;
  size?: string;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  addItem: (product: Product, options?: { size?: string; quantity?: number }) => void;
  removeLine: (productId: string, size?: string) => void;
  setQuantity: (productId: string, size: string | undefined, quantity: number) => void;
  clear: () => void;
}

function matches(line: CartLine, productId: string, size?: string) {
  return line.product.id === productId && line.size === size;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      addItem: (product, options) => {
        const size = options?.size;
        const quantity = options?.quantity ?? 1;
        const existing = get().lines.find((line) => matches(line, product.id, size));

        if (existing) {
          set({
            lines: get().lines.map((line) =>
              matches(line, product.id, size) ? { ...line, quantity: line.quantity + quantity } : line,
            ),
          });
          return;
        }

        set({ lines: [...get().lines, { product, size, quantity }] });
      },
      removeLine: (productId, size) => {
        set({ lines: get().lines.filter((line) => !matches(line, productId, size)) });
      },
      setQuantity: (productId, size, quantity) => {
        if (quantity < 1) return;
        set({
          lines: get().lines.map((line) => (matches(line, productId, size) ? { ...line, quantity } : line)),
        });
      },
      clear: () => set({ lines: [] }),
    }),
    { name: "vylore-cart" },
  ),
);
