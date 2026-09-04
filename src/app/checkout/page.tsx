import { CheckoutFlow } from "@/components/checkout/CheckoutFlow";
import { getPaymentMethods } from "@/services/payment.service";
import { getDeliveryOptions } from "@/services/shipping.service";

export default async function CheckoutPage() {
  const [deliveryOptions, paymentMethods] = await Promise.all([getDeliveryOptions(), getPaymentMethods()]);

  return <CheckoutFlow deliveryOptions={deliveryOptions} paymentMethods={paymentMethods} />;
}
