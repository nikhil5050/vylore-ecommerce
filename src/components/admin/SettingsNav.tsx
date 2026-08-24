"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const settingsLinks = [
  { label: "Store", href: "/admin/settings/store" },
  { label: "Admin Profile", href: "/admin/settings/profile" },
  { label: "Payment", href: "/admin/settings/payment" },
  { label: "Shipping", href: "/admin/settings/shipping" },
  { label: "iCarry", href: "/admin/settings/icarry" },
  { label: "Tax", href: "/admin/settings/tax" },
  { label: "Notifications", href: "/admin/settings/notifications" },
];

export function SettingsNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-lg bg-muted p-1">
      {settingsLinks.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              active ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
