"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Heart, MapPin, Package, UserRound } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { listAddresses } from "@/services/address.service";
import { listOrders } from "@/services/order.service";
import { useAuthStore } from "@/store/auth.store";
import { useWishlistStore } from "@/store/wishlist.store";

export default function AccountDashboardPage() {
  const user = useAuthStore((state) => state.user);
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const [orderCount, setOrderCount] = useState<number | undefined>(undefined);
  const [addressCount, setAddressCount] = useState<number | undefined>(undefined);

  useEffect(() => {
    listOrders().then((orders) => setOrderCount(orders.length));
    listAddresses().then((addresses) => setAddressCount(addresses.length));
  }, []);

  const stats = [
    { label: "Orders", value: orderCount ?? "–", href: "/account/orders" },
    { label: "Wishlist", value: wishlistCount, href: "/account/wishlist" },
    { label: "Saved Addresses", value: addressCount ?? "–", href: "/account/addresses" },
  ];

  return (
    <div className="account-content">
      <section className="account-welcome relative overflow-hidden rounded-[3px] bg-burgundy px-6 py-8 text-ivory shadow-[0_18px_50px_rgba(104,3,7,0.16)] sm:px-9 sm:py-10">
        <div className="relative z-10 max-w-xl">
          <p className="eyebrow text-[10px] text-champagne">Your Vylore space</p>
          <h2 className="mt-3 max-w-lg font-serif text-3xl leading-tight sm:text-4xl">
            {user ? `Welcome back, ${user.first_name}.` : "Welcome back."}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-ivory/75">
            Everything you love, gathered in one place. Track your orders, refine your details, and keep your next
            favourite close.
          </p>
        </div>
        <div className="account-welcome-mark" aria-hidden="true">V</div>
      </section>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="block">
            <Card className="account-stat group flex min-h-36 flex-col justify-between p-5 transition-[border-color,transform,box-shadow] hover:-translate-y-1 hover:border-burgundy/50 hover:shadow-[0_12px_30px_rgba(24,25,22,0.07)] sm:p-6">
              <div className="flex items-start justify-between">
                <p className="font-serif text-4xl text-charcoal">{stat.value}</p>
                <ArrowUpRight className="size-4 text-burgundy/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </div>
              <p className="eyebrow mt-2 text-[10px] text-muted">{stat.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <section className="mt-10">
        <div className="flex items-end justify-between border-b border-silver/40 pb-3">
          <div>
            <p className="eyebrow text-[10px] text-burgundy">Make it yours</p>
            <h3 className="mt-2 font-serif text-2xl text-charcoal">Quick access</h3>
          </div>
          <span className="hidden text-xs text-muted sm:block">Curated for your journey</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { href: "/account/orders", label: "Your orders", copy: "Follow every parcel", icon: Package },
            { href: "/account/wishlist", label: "Your wishlist", copy: "Pieces worth keeping", icon: Heart },
            { href: "/account/profile", label: "Your profile", copy: "Personalise your details", icon: UserRound },
          ].map(({ href, label, copy, icon: Icon }) => (
            <Link key={href} href={href} className="account-quick group flex items-center gap-4 border border-silver/40 bg-white p-4 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-burgundy/50">
              <span className="flex size-10 shrink-0 items-center justify-center bg-moonlight text-burgundy">
                <Icon className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-serif text-lg text-charcoal">{label}</span>
                <span className="mt-0.5 block text-xs text-muted">{copy}</span>
              </span>
              <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-8 flex items-center gap-3 border-t border-silver/40 pt-5 text-xs text-muted">
        <MapPin className="size-4 text-burgundy" aria-hidden="true" />
        <span>Thoughtfully made, beautifully yours.</span>
      </div>
    </div>
  );
}
