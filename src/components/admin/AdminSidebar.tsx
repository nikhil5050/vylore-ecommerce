"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronsLeft, Gem } from "lucide-react";
import { adminNav } from "@/lib/admin/nav";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isSectionActive(pathname: string, item: { href: string; children?: { href: string }[] }) {
  if (isActive(pathname, item.href)) return true;
  return item.children?.some((child) => isActive(pathname, child.href)) ?? false;
}

interface AdminSidebarContentProps {
  collapsed: boolean;
  onNavigate?: () => void;
}

function SidebarContent({ collapsed, onNavigate }: AdminSidebarContentProps) {
  const pathname = usePathname();
  const [openSection, setOpenSection] = useState<string | null>(() => {
    for (const section of adminNav) {
      for (const item of section.items) {
        if (item.children && isSectionActive(pathname, item)) return item.label;
      }
    }
    return null;
  });

  return (
    <div className="flex h-full flex-col">
      <div className={cn("flex h-16 items-center border-b border-border px-4", collapsed && "justify-center px-2")}>
        <Link href="/admin" className="flex items-center gap-2.5 overflow-hidden" onClick={onNavigate}>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Gem className="h-4 w-4" />
          </span>
          {!collapsed && (
            <span className="truncate font-serif text-lg font-semibold tracking-wide text-foreground">
              Vylore <span className="font-sans text-xs font-medium tracking-widest text-muted-foreground">ADMIN</span>
            </span>
          )}
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {adminNav.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-0.5">
            {section.items.map((item) => {
              const active = isSectionActive(pathname, item);
              const hasChildren = !!item.children?.length;
              const open = openSection === item.label && !collapsed;

              return (
                <div key={item.label}>
                  {hasChildren ? (
                    <button
                      type="button"
                      onClick={() => setOpenSection(open ? null : item.label)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left text-sm font-medium transition-colors",
                        active ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-muted hover:text-foreground",
                        collapsed && "justify-center px-0",
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <item.icon className="h-4.5 w-4.5 shrink-0" strokeWidth={1.75} />
                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{item.label}</span>
                          <ChevronDown
                            className={cn("h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
                          />
                        </>
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                        active ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-muted hover:text-foreground",
                        collapsed && "justify-center px-0",
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <item.icon className="h-4.5 w-4.5 shrink-0" strokeWidth={1.75} />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                  )}

                  {hasChildren && open && (
                    <div className="ml-4 mt-0.5 space-y-0.5 border-l border-border pl-4">
                      {item.children!.map((child) => {
                        const childActive = isActive(pathname, child.href);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onNavigate}
                            className={cn(
                              "block rounded-md px-2.5 py-1.5 text-[13px] transition-colors",
                              childActive
                                ? "bg-primary/10 font-medium text-primary"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            )}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>
    </div>
  );
}

interface AdminSidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

export function AdminSidebar({ collapsed, onToggleCollapsed }: AdminSidebarProps) {
  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 border-r border-border bg-sidebar transition-[width] duration-200 lg:block",
        collapsed ? "w-[68px]" : "w-64",
      )}
    >
      <SidebarContent collapsed={collapsed} />
      <button
        type="button"
        onClick={onToggleCollapsed}
        className="absolute -right-3 top-16 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:text-primary"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronsLeft className={cn("h-3.5 w-3.5 transition-transform", collapsed && "rotate-180")} />
      </button>
    </aside>
  );
}

export { SidebarContent as AdminSidebarMobileContent };
