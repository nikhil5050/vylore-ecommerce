import type { PaymentStatus } from "./order";

export type { PaymentStatus };

export interface PaymentTransaction {
  id: string;
  orderId: string;
  customerName: string;
  amount: number;
  gateway: "PayU" | "Razorpay" | "COD";
  method: string;
  status: PaymentStatus;
  createdAt: string;
}
