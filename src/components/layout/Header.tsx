"use client";

import Link from "next/link";
import { Home as HomeIcon, Store } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { BagIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from "@/components/icons/Icons";
import { Container } from "@/components/ui/Container";
import { CountBadge } from "@/components/ui/CountBadge";
import { mainNav } from "@/config/navigation";
import { useScrolled } from "@/hooks/useScrolled";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { cn } from "@/utils/cn";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const scrolled = useScrolled(24);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = useCartStore((state) =>
    state.lines.reduce((sum, line) => sum + line.quantity, 0)
  );
  const wishlistCount = useWishlistStore((state) => state.items.length);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Main Header Bar */}
      <div
        className={cn(
          "border-b transition-all duration-500 ease-in-out",
          scrolled
            ? "border-transparent bg-transparent shadow-none"
            : "border-transparent bg-transparent"
        )}
      >
        <Container>
          {/* Desktop Navigation */}
          <div
            className={cn(
              "hidden grid-cols-[auto_1fr_auto] items-center gap-8 transition-all duration-500 lg:grid",
              scrolled ? "h-16" : "h-20"
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
            <nav className="justify-self-center rounded-full bg-white px-3 py-2 shadow-lg shadow-charcoal/10 ring-1 ring-charcoal/5">
              <div className="flex items-center gap-2">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-5 py-3 text-sm font-medium text-charcoal transition-colors hover:bg-burgundy/10 hover:text-burgundy"
                >
                  {item.label}
                </Link>
              ))}
              </div>
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center justify-end gap-5">

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

      {/* Mobile bottom navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-charcoal/10 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_rgba(24,25,22,0.1)] backdrop-blur-md transition-transform duration-300 lg:hidden">
        <div className="mx-auto grid h-[4.75rem] max-w-lg grid-cols-5 items-center px-1">
          <Link
            href="/"
            className={cn(
              "flex h-full flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium transition-all duration-200 active:scale-95",
              pathname === "/" ? "text-burgundy" : "text-muted hover:text-burgundy"
            )}
          >
            <HomeIcon className="h-5 w-5" strokeWidth={pathname === "/" ? 2.5 : 1.8} />
            <span>Home</span>
          </Link>
          <Link
            href="/shop"
            className={cn(
              "flex h-full flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium transition-all duration-200 active:scale-95",
              pathname.startsWith("/shop") || pathname.startsWith("/category")
                ? "text-burgundy"
                : "text-muted hover:text-burgundy"
            )}
          >
            <Store className="h-5 w-5" strokeWidth={pathname.startsWith("/shop") ? 2.5 : 1.8} />
            <span>Shop</span>
          </Link>
          <Link
            href="/about"
            className={cn(
              "relative flex h-full flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium transition-all duration-300 active:scale-95",
              pathname.startsWith("/about") ? "text-burgundy" : "text-muted hover:text-burgundy"
            )}
          >
            <span className="-mt-5 flex h-14 w-20 items-center justify-center rounded-full bg-burgundy shadow-lg shadow-burgundy/25 ring-4 ring-white transition-transform duration-300">
              <Logo size="sm" className="h-9 w-9 brightness-0 invert" />
            </span>
            <span className="mt-1">About</span>
          </Link>
          <Link
            href="/wishlist"
            className={cn(
              "relative flex h-full flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium transition-all duration-200 active:scale-95",
              pathname.startsWith("/wishlist") ? "text-burgundy" : "text-muted hover:text-burgundy"
            )}
          >
            <HeartIcon className="h-5 w-5" />
            {wishlistCount > 0 && <CountBadge count={wishlistCount} className="right-3 top-2" />}
            <span>Wishlist</span>
          </Link>
          <Link
            href="/account"
            className={cn(
              "relative flex h-full flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium transition-all duration-200 active:scale-95",
              pathname.startsWith("/account") || pathname.startsWith("/login")
                ? "text-burgundy"
                : "text-muted hover:text-burgundy"
            )}
          >
            <UserIcon className="h-5 w-5" />
            <span>Account</span>
          </Link>
        </div>
      </nav>

      {/* Drawers */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}