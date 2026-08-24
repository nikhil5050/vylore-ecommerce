import { Button } from "@/components/ui/Button";
import type { PaymentMethod } from "@/services/payment.service";
import type { DeliveryOption } from "@/services/shipping.service";
import type { ShippingAddress } from "@/types/order";
import type { ContactInfo } from "./types";

interface ReviewStepProps {
  contact: ContactInfo;
  address: ShippingAddress;
  deliveryOption: DeliveryOption;
  paymentMethod: PaymentMethod;
  onPlaceOrder: () => void;
  placing: boolean;
}

export function ReviewStep({ contact, address, deliveryOption, paymentMethod, onPlaceOrder, placing }: ReviewStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="eyebrow text-xs text-muted">Contact</p>
          <p className="mt-1 text-sm text-charcoal">{contact.email}</p>
          <p className="text-sm text-charcoal">{contact.phone}</p>
        </div>
        <div>
          <p className="eyebrow text-xs text-muted">Shipping Address</p>
          <p className="mt-1 text-sm text-charcoal">{address.fullName}</p>
          <p className="text-sm text-charcoal">
            {address.line1}
            {address.line2 ? `, ${address.line2}` : ""}
          </p>
          <p className="text-sm text-charcoal">
            {address.city}, {address.state} {address.postalCode}
          </p>
        </div>
        <div>
          <p className="eyebrow text-xs text-muted">Delivery</p>
          <p className="mt-1 text-sm text-charcoal">{deliveryOption.label}</p>
        </div>
        <div>
          <p className="eyebrow text-xs text-muted">Payment</p>
          <p className="mt-1 text-sm text-charcoal">{paymentMethod.label}</p>
        </div>
      </div>

      <p className="border-t border-silver/30 pt-4 text-xs text-muted">
        This checkout is a frontend prototype. Payment processing via PayU will be enabled once backend
        integration is complete — placing an order now will not charge you.
      </p>

      <Button variant="primary" size="lg" onClick={onPlaceOrder} disabled={placing} className="w-fit">
        {placing ? "Placing Order…" : "Place Order"}
      </Button>
    </div>
  );
}
