"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useMemo } from "react";
import {
  AlertTriangle,
  Bell,
  ChevronRight,
  CreditCard,
  LogOut,
  Menu,
  PackageX,
  Search,
  Settings,
  ShoppingBag,
  Truck,
  User,
} from "lucide-react";
import { adminNav, type AdminNavChild } from "@/lib/admin/nav";
import { mockNotifications } from "@/lib/admin/mock";
import { relativeTimeFromNow } from "@/lib/admin/format";
import { cn } from "@/lib/utils";
import { Input } from "@/components/admin/ui/input";
import { Badge } from "@/components/admin/ui/badge";
import { Avatar, AvatarFallback } from "@/components/admin/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/admin/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/admin/ui/sheet";
import { AdminSidebarMobileContent } from "@/components/admin/AdminSidebar";

const notificationIcon = {
  new_order: ShoppingBag,
  low_stock: PackageX,
  payment_failed: CreditCard,
  delivery_issue: Truck,
  return_request: AlertTriangle,
};

function useBreadcrumbs() {
  const pathname = usePathname();

  return useMemo(() => {
    if (pathname === "/admin") return [{ label: "Dashboard", href: "/admin" }];

    const allChildren: (AdminNavChild & { parentLabel: string })[] = [];
    for (const section of adminNav) {
      for (const item of section.items) {
        for (const child of item.children ?? []) {
          allChildren.push({ ...child, parentLabel: item.label });
        }
      }
    }

    const exactChild = allChildren.find((child) => child.href === pathname);
    if (exactChild) {
      return [
        { label: "Dashboard", href: "/admin" },
        { label: exactChild.parentLabel, href: exactChild.href },
        { label: exactChild.label, href: exactChild.href },
      ];
    }

    const topItem = adminNav[0].items.find((item) => pathname.startsWith(item.href));
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    const label = topItem?.label ?? lastSegment.replace(/-/g, " ");

    return [
      { label: "Dashboard", href: "/admin" },
      { label: topItem?.label ?? "Admin", href: topItem?.href ?? "/admin" },
      ...(lastSegment && lastSegment !== segments[1] && topItem
        ? [{ label: label.charAt(0).toUpperCase() + label.slice(1), href: pathname }]
        : []),
    ];
  }, [pathname]);
}

interface AdminHeaderProps {
  onOpenMobileNav: () => void;
  mobileNavOpen: boolean;
  onMobileNavOpenChange: (open: boolean) => void;
}

export function AdminHeader({ mobileNavOpen, onMobileNavOpenChange, onOpenMobileNav }: AdminHeaderProps) {
  const breadcrumbs = useBreadcrumbs();
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/80 sm:px-6">
      <button
        type="button"
        onClick={onOpenMobileNav}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-foreground/70 hover:bg-muted lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      <Sheet open={mobileNavOpen} onOpenChange={onMobileNavOpenChange}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <AdminSidebarMobileContent collapsed={false} onNavigate={() => onMobileNavOpenChange(false)} />
        </SheetContent>
      </Sheet>

      <nav aria-label="Breadcrumb" className="hidden min-w-0 flex-1 items-center gap-1.5 text-sm text-muted-foreground md:flex">
        {breadcrumbs.map((crumb, index) => (
          <Fragment key={`${crumb.href}-${index}`}>
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />}
            {index === breadcrumbs.length - 1 ? (
              <span className="truncate font-medium text-foreground">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="truncate transition-colors hover:text-foreground">
                {crumb.label}
              </Link>
            )}
          </Fragment>
        ))}
      </nav>

      {/* <div className="relative ml-auto hidden max-w-xs flex-1 items-center sm:flex md:ml-0">
        <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search orders, products, customers…" className="h-9 pl-9" />
      </div> */}

      <div className="ml-auto flex items-center gap-1.5 sm:ml-0">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="relative flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 hover:bg-muted"
                aria-label="Notifications"
              />
            }
          >
            <Bell className="h-[18px] w-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between px-1.5 py-1.5 text-sm text-foreground">
              Notifications
              {unreadCount > 0 && <Badge variant="secondary">{unreadCount} new</Badge>}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto py-1">
              {mockNotifications.map((notification) => {
                const Icon = notificationIcon[notification.type];
                return (
                  <DropdownMenuItem
                    key={notification.id}
                    render={<Link href={notification.href ?? "/admin"} />}
                    className="flex items-start gap-2.5 py-2"
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                        notification.read ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary",
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="flex-1 space-y-0.5">
                      <span className="block text-sm font-medium text-foreground">{notification.title}</span>
                      <span className="block text-xs text-muted-foreground">{notification.message}</span>
                      <span className="block text-[11px] text-muted-foreground/70">
                        {relativeTimeFromNow(notification.createdAt)}
                      </span>
                    </span>
                    {!notification.read && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                  </DropdownMenuItem>
                );
              })}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="flex items-center gap-2 rounded-md py-1 pl-1 pr-2 hover:bg-muted"
              />
            }
          >
            <Avatar size="sm">
              <AvatarFallback>AU</AvatarFallback>
            </Avatar>
            <span className="hidden text-left text-sm leading-tight sm:block">
              <span className="block font-medium text-foreground">Admin User</span>
              <span className="block text-xs text-muted-foreground">Super Admin</span>
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/admin/settings/profile" />}>
              <User className="h-4 w-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/admin/settings/store" />}>
              <Settings className="h-4 w-4" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <LogOut className="h-4 w-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
