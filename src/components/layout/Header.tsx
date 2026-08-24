"use client";

import Link from "next/link";
import { useState } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { BagIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from "@/components/icons/Icons";
import { Container } from "@/components/ui/Container";
import { CountBadge } from "@/components/ui/CountBadge";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { useScrolled } from "@/hooks/useScrolled";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { cn } from "@/utils/cn";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const scrolled = useScrolled(24);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = useCartStore((state) =>
    state.lines.reduce((sum, line) => sum + line.quantity, 0)
  );
  const wishlistCount = useWishlistStore((state) => state.items.length);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div
        className={cn(
          "grid bg-burgundy text-center text-ivory transition-all duration-500 ease-in-out",
          scrolled ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
        )}
      >
        
      </div>

      {/* Main Header Bar */}
      <div
        className={cn(
          "border-b transition-all duration-500 ease-in-out backdrop-blur-md backdrop-saturate-150",
          scrolled
            ? "border-silver/20 bg-ivory/80 shadow-sm"
            : "border-transparent bg-ivory/95"
        )}
      >
        <Container>
          {/* Desktop Navigation */}
          <div
            className={cn(
              "hidden grid-cols-3 items-center transition-all duration-500 lg:grid",
              scrolled ? "h-16" : "h-16"
            )}
          >
            {/* Left Logo */}
            <Link
              href="/"
              aria-label="Vylore home"
              className="justify-self-start transition-transform duration-300 hover:scale-105"
            >
              <Logo />
            </Link>

            {/* Center Nav */}
            <nav className="flex items-center justify-center gap-8">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="eyebrow relative text-xs font-medium tracking-wider text-charcoal transition-colors hover:text-burgundy after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-burgundy after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center justify-end gap-5">
              <button
                type="button"
                aria-label="Search"
                className="group rounded-full p-2 text-charcoal transition-colors hover:bg-burgundy/10 hover:text-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy/20"
              >
                <SearchIcon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              </button>

              <Link
                href="/account"
                aria-label="Account"
                className="group rounded-full p-2 text-charcoal transition-colors hover:bg-burgundy/10 hover:text-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy/20"
              >
                <UserIcon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              </Link>

              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="group relative rounded-full p-2 text-charcoal transition-colors hover:bg-burgundy/10 hover:text-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy/20"
              >
                <HeartIcon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                {wishlistCount > 0 && (
                  <CountBadge
                    count={wishlistCount}
                    className="absolute -right-0.5 -top-0.5 animate-pulse"
                  />
                )}
              </Link>

              <button
                type="button"
                aria-label="Open cart"
                onClick={() => setCartOpen(true)}
                className="group relative rounded-full p-2 text-charcoal transition-colors hover:bg-burgundy/10 hover:text-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy/20"
              >
                <BagIcon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                {cartCount > 0 && (
                  <CountBadge
                    count={cartCount}
                    className="absolute -right-0.5 -top-0.5"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex h-16 items-center justify-between lg:hidden">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="rounded-lg p-2 text-charcoal transition-colors hover:bg-burgundy/10 hover:text-burgundy focus:outline-none"
            >
              <MenuIcon className="h-6 w-6" />
            </button>

            <Link href="/" aria-label="Vylore home">
              <Logo size="sm" />
              
            </Link>

            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Search"
                className="rounded-lg p-2 text-charcoal transition-colors hover:bg-burgundy/10 hover:text-burgundy"
              >
                <SearchIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Open cart"
                onClick={() => setCartOpen(true)}
                className="relative rounded-lg p-2 text-charcoal transition-colors hover:bg-burgundy/10 hover:text-burgundy"
              >
                <BagIcon className="h-5 w-5" />
                {cartCount > 0 && (
                  <CountBadge
                    count={cartCount}
                    className="absolute right-1 top-1"
                  />
                )}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Drawers */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}