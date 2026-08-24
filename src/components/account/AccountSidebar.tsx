"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { cn } from "@/utils/cn";

const links = [
  { href: "/account", label: "Dashboard" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/profile", label: "Profile" },
  { href: "/account/addresses", label: "Addresses" },
  { href: "/account/wishlist", label: "Wishlist" },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  return (
    <nav className="flex gap-2 overflow-x-auto border-b border-silver/30 pb-4 lg:w-48 lg:shrink-0 lg:flex-col lg:gap-1 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
      {links.map((link) => {
        const isActive = link.href === "/account" ? pathname === link.href : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "eyebrow shrink-0 whitespace-nowrap px-3 py-2 text-xs transition-colors",
              isActive ? "text-burgundy" : "text-muted hover:text-charcoal",
            )}
          >
            {link.label}
          </Link>
        );
      })}
      <button
        type="button"
        onClick={() => {
          logout();
          router.push("/");
        }}
        className="eyebrow shrink-0 whitespace-nowrap px-3 py-2 text-left text-xs text-muted transition-colors hover:text-burgundy"
      >
        Log Out
      </button>
    </nav>
  );
}
