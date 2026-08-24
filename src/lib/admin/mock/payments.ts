import type { PaymentTransaction } from "@/types/admin";
import { mockOrders } from "./orders";

export const mockPayments: PaymentTransaction[] = mockOrders.map((order, index) => ({
  id: `PAY-${(500000 + index * 41).toString()}`,
  orderId: order.id,
  customerName: order.customerName,
  amount: order.summary.total,
  gateway: order.payment.gateway === "COD" ? "COD" : order.payment.gateway === "Razorpay" ? "Razorpay" : "PayU",
  method: order.payment.gateway === "COD" ? "Cash on Delivery" : index % 3 === 0 ? "UPI" : index % 3 === 1 ? "Credit Card" : "Debit Card",
  status: order.payment.status,
  createdAt: order.placedAt,
}));
