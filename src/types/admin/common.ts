export type AdminRole =
  | "super_admin"
  | "admin"
  | "manager"
  | "content_manager"
  | "order_manager";

export type ContentStatus = "draft" | "active" | "inactive" | "scheduled" | "expired";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatarUrl?: string;
}

export type NotificationType =
  | "new_order"
  | "low_stock"
  | "payment_failed"
  | "delivery_issue"
  | "return_request";

export interface AdminNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  href?: string;
}
