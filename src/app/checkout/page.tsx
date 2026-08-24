import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/checkout/CheckoutFlow";
import { getPaymentMethods } from "@/services/payment.service";
import { getDeliveryOptions } from "@/services/shipping.service";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Checkout",
  description: "Complete your Vylore order.",
  path: "/checkout",
  noIndex: true,
});

export default async function CheckoutPage() {
  const [deliveryOptions, paymentMethods] = await Promise.all([getDeliveryOptions(), getPaymentMethods()]);

  return <CheckoutFlow deliveryOptions={deliveryOptions} paymentMethods={paymentMethods} />;
}
