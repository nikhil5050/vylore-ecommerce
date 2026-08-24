"use client";

import Link from "next/link";
import { CloseIcon, HeartIcon, UserIcon } from "@/components/icons/Icons";
import { mainNav } from "@/config/navigation";
import { useDialogA11y } from "@/hooks/useDialogA11y";
import { useWishlistStore } from "@/store/wishlist.store";
import { cn } from "@/utils/cn";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const panelRef = useDialogA11y(open, onClose);

  return (
    <div
      className={cn("fixed inset-0 z-[60] lg:hidden", open ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        className={cn(
          "absolute inset-0 bg-charcoal/40 transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        tabIndex={-1}
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-ivory shadow-xl outline-none transition-transform duration-500 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="eyebrow text-xs text-muted">Menu</span>
          <button type="button" aria-label="Close menu" onClick={onClose} className="p-2 text-charcoal">
            <CloseIcon />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-2">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="border-b border-silver/20 py-4 font-serif text-2xl text-charcoal transition-colors hover:text-burgundy"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4 border-t border-silver/20 px-6 py-6">
          <Link
            href="/account"
            onClick={onClose}
            className="flex items-center gap-3 text-sm text-charcoal transition-colors hover:text-burgundy"
          >
            <UserIcon /> Account
          </Link>
          <Link
            href="/wishlist"
            onClick={onClose}
            className="flex items-center gap-3 text-sm text-charcoal transition-colors hover:text-burgundy"
          >
            <HeartIcon /> Wishlist{wishlistCount > 0 && ` (${wishlistCount})`}
          </Link>
        </div>
      </div>
    </div>
  );
}
