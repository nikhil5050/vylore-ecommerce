import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  FolderTree,
  Boxes,
  Users,
  CreditCard,
  Truck,
  Megaphone,
  BarChart3,
  Settings,
} from "lucide-react";

export interface AdminNavChild {
  label: string;
  href: string;
}

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  children?: AdminNavChild[];
}

export interface AdminNavSection {
  items: AdminNavItem[];
}

export const adminNav: AdminNavSection[] = [
  {
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      {
        label: "Orders",
        href: "/admin/orders",
        icon: ShoppingBag,
        children: [
          { label: "All Orders", href: "/admin/orders" },
          { label: "Pending", href: "/admin/orders/pending" },
          { label: "Processing", href: "/admin/orders/processing" },
          { label: "Shipped", href: "/admin/orders/shipped" },
          { label: "Delivered", href: "/admin/orders/delivered" },
          { label: "Cancelled", href: "/admin/orders/cancelled" },
          { label: "Returns / Refunds", href: "/admin/orders/returns" },
        ],
      },
      {
        label: "Products",
        href: "/admin/products",
        icon: Package,
        children: [
          { label: "All Products", href: "/admin/products" },
          { label: "Add Product", href: "/admin/products/add" },
          { label: "Draft Products", href: "/admin/products/draft" },
          { label: "Out of Stock", href: "/admin/products/out-of-stock" },
        ],
      },
      {
        label: "Categories",
        href: "/admin/categories",
        icon: FolderTree,
        children: [
          { label: "All Categories", href: "/admin/categories" },
          { label: "Add Category", href: "/admin/categories/add" },
        ],
      },
      {
        label: "Inventory",
        href: "/admin/inventory",
        icon: Boxes,
        children: [
          { label: "Stock Overview", href: "/admin/inventory" },
          { label: "Low Stock", href: "/admin/inventory/low-stock" },
          { label: "Stock Adjustments", href: "/admin/inventory/adjustments" },
        ],
      },
      {
        label: "Customers",
        href: "/admin/customers",
        icon: Users,
        children: [
          { label: "All Customers", href: "/admin/customers" },
          { label: "Customer Groups", href: "/admin/customers/groups" },
        ],
      },
      {
        label: "Payments",
        href: "/admin/payments",
        icon: CreditCard,
        children: [
          { label: "Transactions", href: "/admin/payments" },
          { label: "Successful", href: "/admin/payments/successful" },
          { label: "Failed", href: "/admin/payments/failed" },
          { label: "Refunds", href: "/admin/payments/refunds" },
        ],
      },
      {
        label: "Shipping",
        href: "/admin/shipping",
        icon: Truck,
        children: [
          { label: "Shipments", href: "/admin/shipping" },
          { label: "Tracking", href: "/admin/shipping/tracking" },
          { label: "Delivery Partners", href: "/admin/shipping/delivery-partners" },
          { label: "iCarry Integration", href: "/admin/shipping/icarry" },
        ],
      },
      {
        label: "Offers & Promotions",
        href: "/admin/offers/banners",
        icon: Megaphone,
        children: [
          { label: "Offer Banners", href: "/admin/offers/banners" },
          // { label: "Coupons", href: "/admin/offers/coupons" },
          // { label: "Product Offers", href: "/admin/offers/product-offers" },
          // { label: "Festival Offers", href: "/admin/offers/festival-offers" },
        ],
      },
      {
        label: "Analytics",
        href: "/admin/analytics/sales",
        icon: BarChart3,
        children: [
          { label: "Sales Analytics", href: "/admin/analytics/sales" },
          { label: "Product Analytics", href: "/admin/analytics/products" },
          { label: "Customer Analytics", href: "/admin/analytics/customers" },
          { label: "Revenue Analytics", href: "/admin/analytics/revenue" },
        ],
      },
      {
        label: "Settings",
        href: "/admin/settings/store",
        icon: Settings,
        children: [
          { label: "Store Settings", href: "/admin/settings/store" },
          { label: "Admin Profile", href: "/admin/settings/profile" },
          { label: "Payment Settings", href: "/admin/settings/payment" },
          { label: "Shipping Settings", href: "/admin/settings/shipping" },
          { label: "iCarry Settings", href: "/admin/settings/icarry" },
          { label: "Tax Settings", href: "/admin/settings/tax" },
          { label: "Notification Settings", href: "/admin/settings/notifications" },
        ],
      },
    ],
  },
];
