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
    <nav className="flex gap-1 overflow-x-auto border-b border-silver/30 pb-4 lg:w-48 lg:shrink-0 lg:flex-col lg:gap-1 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
      {links.map((link) => {
        const isActive = link.href === "/account" ? pathname === link.href : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "eyebrow shrink-0 whitespace-nowrap border-l-2 px-3 py-2 text-[10px] transition-[border-color,color,background-color]",
              isActive ? "border-burgundy bg-moonlight/60 text-burgundy" : "border-transparent text-muted hover:border-silver hover:bg-moonlight/40 hover:text-charcoal",
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
        className="eyebrow shrink-0 whitespace-nowrap border-l-2 border-transparent px-3 py-2 text-left text-[10px] text-muted transition-colors hover:text-burgundy"
      >
        Log Out
      </button>
    </nav>
  );
}
