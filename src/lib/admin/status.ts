export type StatusTone = "success" | "warning" | "error" | "info" | "neutral";

const toneClasses: Record<StatusTone, string> = {
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  error: "bg-destructive/10 text-destructive border-destructive/20",
  info: "bg-primary/10 text-primary border-primary/20",
  neutral: "bg-muted text-muted-foreground border-border",
};

export function statusToneClass(tone: StatusTone) {
  return toneClasses[tone];
}

const dotClasses: Record<StatusTone, string> = {
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-destructive",
  info: "bg-primary",
  neutral: "bg-muted-foreground",
};

export function statusDotClass(tone: StatusTone) {
  return dotClasses[tone];
}

export const orderStatusTone: Record<string, StatusTone> = {
  pending_payment: "warning",
  payment_failed: "error",
  paid: "info",
  processing: "info",
  shipped: "info",
  out_for_delivery: "info",
  delivered: "success",
  cancelled: "error",
  refund_pending: "warning",
  refunded: "neutral",
};

export const paymentStatusTone: Record<string, StatusTone> = {
  pending: "warning",
  paid: "success",
  failed: "error",
};

export const shippingStatusTone: Record<string, StatusTone> = {
  not_shipped: "neutral",
  shipped: "info",
  out_for_delivery: "info",
  delivered: "success",
  cancelled: "error",
};

export const stockStatusTone: Record<string, StatusTone> = {
  in_stock: "success",
  low_stock: "warning",
  out_of_stock: "error",
};

export const productStatusTone: Record<string, StatusTone> = {
  active: "success",
  inactive: "neutral",
};

export function toTitleCase(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
