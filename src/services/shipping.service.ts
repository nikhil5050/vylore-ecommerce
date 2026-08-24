export interface DeliveryOption {
  id: string;
  label: string;
  description: string;
}

// Single mock option — do not hard-code real carrier/provider logic here;
// that belongs behind the backend once shipping is integrated.
export async function getDeliveryOptions(): Promise<DeliveryOption[]> {
  return [
    {
      id: "standard",
      label: "Standard Delivery",
      description: "Dispatched within 2–4 business days. Exact timelines confirmed after payment.",
    },
  ];
}
