import { formatPrice } from "@/utils/formatPrice";

export interface PaymentMethod {
  id: string;
  label: string;
  description: string;
}

// Mirrors the backend's COD rules (app/core/config.py: cod_max_order_value/
// cod_handling_fee) — there's no endpoint to fetch these, so they're
// duplicated here for the pre-submit eligibility check in CheckoutFlow.
// The backend is still the actual authority: it re-validates both on
// POST /checkout/create and rejects with a clear error if this drifts.
export const COD_MAX_ORDER_VALUE = 5000;
export const COD_HANDLING_FEE = 50;

export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  return [
    {
      id: "payu",
      label: "PayU",
      description: "Pay securely by card, UPI, or netbanking via PayU's hosted checkout.",
    },
    {
      id: "cod",
      label: "Cash on Delivery",
      description: `Pay in cash when your order arrives. Adds a ${formatPrice(COD_HANDLING_FEE)} handling fee; available for orders up to ${formatPrice(COD_MAX_ORDER_VALUE)} where our courier partner supports it.`,
    },
  ];
}
