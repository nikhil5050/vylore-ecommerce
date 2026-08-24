"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { useAddressStore } from "@/store/address.store";
import { useAuthStore } from "@/store/auth.store";
import { useOrderStore } from "@/store/order.store";
import { useWishlistStore } from "@/store/wishlist.store";

export default function AccountDashboardPage() {
  const user = useAuthStore((state) => state.user);
  const orderCount = useOrderStore((state) => state.orders.length);
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const addressCount = useAddressStore((state) => state.addresses.length);

  const stats = [
    { label: "Orders", value: orderCount, href: "/account/orders" },
    { label: "Wishlist", value: wishlistCount, href: "/account/wishlist" },
    { label: "Saved Addresses", value: addressCount, href: "/account/addresses" },
  ];

  return (
    <div>
      <p className="max-w-md text-sm text-muted">
        {user ? `Welcome back, ${user.first_name}.` : ""} Manage your orders, saved addresses, and details from one
        place.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="block">
            <Card className="p-6 transition-colors hover:border-burgundy/50">
              <p className="font-serif text-3xl text-charcoal">{stat.value}</p>
              <p className="eyebrow mt-2 text-xs text-muted">{stat.label}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
