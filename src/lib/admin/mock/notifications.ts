import type { AdminNotification } from "@/types/admin";

export const mockNotifications: AdminNotification[] = [
  { id: "ntf-001", type: "new_order", title: "New order placed", message: "Priya Sharma placed order #VYL10307 for ₹4,999.", createdAt: "2026-08-24T08:12:00Z", read: false, href: "/admin/orders/VYL10307" },
  { id: "ntf-002", type: "low_stock", title: "Low stock alert", message: "Pearl Stud Earrings has only 3 units left.", createdAt: "2026-08-24T06:45:00Z", read: false, href: "/admin/inventory" },
  { id: "ntf-003", type: "payment_failed", title: "Payment failed", message: "Payment for order #VYL10299 failed via PayU.", createdAt: "2026-08-23T19:20:00Z", read: false, href: "/admin/payments" },
  { id: "ntf-004", type: "delivery_issue", title: "Delivery issue reported", message: "iCarry reported a failed delivery attempt for #VYL10281.", createdAt: "2026-08-23T14:05:00Z", read: true, href: "/admin/shipping" },
  { id: "ntf-005", type: "return_request", title: "Return request", message: "Kavya Nair requested a return for #VYL10276.", createdAt: "2026-08-22T11:30:00Z", read: true, href: "/admin/orders" },
];
