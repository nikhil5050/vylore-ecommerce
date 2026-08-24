export interface PaymentMethod {
  id: string;
  label: string;
  description: string;
}

// Only PayU is planned per the brand spec. Merchant keys and hash generation
// must happen server-side once the backend exists — never in frontend code.
export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  return [
    {
      id: "payu",
      label: "PayU",
      description: "Pay securely by card, UPI, or netbanking via PayU's hosted checkout.",
    },
  ];
}
