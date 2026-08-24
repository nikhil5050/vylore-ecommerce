import type { AdminOrder, OrderStatus, PaymentStatus } from "@/types/admin";
import { mockCustomers } from "./customers";
import { mockProducts } from "./products";

const statusCycle: OrderStatus[] = [
  "delivered",
  "delivered",
  "delivered",
  "shipped",
  "processing",
  "pending",
  "cancelled",
  "refunded",
  "delivered",
  "processing",
];

const paymentCycle: PaymentStatus[] = ["paid", "paid", "paid", "pending", "paid", "failed", "refunded", "paid"];
const gateways = ["PayU", "PayU", "PayU", "Razorpay", "COD"];
const deliveryPartners = ["iCarry"];

function orderDate(offsetDays: number) {
  const base = new Date("2026-08-24T10:00:00Z");
  base.setDate(base.getDate() - offsetDays);
  return base.toISOString().slice(0, 10);
}

export const mockOrders: AdminOrder[] = Array.from({ length: 28 }).map((_, index) => {
  const customer = mockCustomers[index % mockCustomers.length];
  const address = customer.addresses[0];
  const itemCount = (index % 3) + 1;
  const items = Array.from({ length: itemCount }).map((__, itemIndex) => {
    const product = mockProducts[(index * 3 + itemIndex) % mockProducts.length];
    const quantity = 1 + (itemIndex % 2);
    return {
      productId: product.id,
      name: product.name,
      imageUrl: product.images.find((i) => i.isMain)?.url,
      sku: product.sku,
      quantity,
      price: product.pricing.sellingPrice,
      subtotal: product.pricing.sellingPrice * quantity,
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const discount = index % 4 === 0 ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal > 3000 ? 0 : 99;
  const tax = Math.round((subtotal - discount) * 0.03);
  const total = subtotal - discount + shipping + tax;
  const status = statusCycle[index % statusCycle.length];
  const paymentStatus: PaymentStatus =
    status === "cancelled" ? "refunded" : status === "refunded" ? "refunded" : paymentCycle[index % paymentCycle.length];

  return {
    id: `VYL${(10284 + index).toString()}`,
    customerId: customer.id,
    customerName: customer.name,
    customerEmail: customer.email,
    customerPhone: customer.phone,
    items,
    billingAddress: address,
    shippingAddress: address,
    summary: { subtotal, discount, shipping, tax, total },
    payment: {
      gateway: gateways[index % gateways.length],
      transactionId: `TXN${(900000 + index * 37).toString()}`,
      status: paymentStatus,
    },
    deliveryPartner: deliveryPartners[0],
    status,
    placedAt: orderDate(index),
  };
});
