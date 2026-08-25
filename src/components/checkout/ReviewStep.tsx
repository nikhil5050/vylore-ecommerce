import { Button } from "@/components/ui/Button";
import type { PaymentMethod } from "@/services/payment.service";
import type { DeliveryOption } from "@/services/shipping.service";
import { useAuthStore } from "@/store/auth.store";
import type { ShippingAddress } from "@/types/order";

interface ReviewStepProps {
  address: ShippingAddress;
  deliveryOption: DeliveryOption;
  paymentMethod: PaymentMethod;
  onPlaceOrder: () => void;
  placing: boolean;
  error?: string | null;
}

export function ReviewStep({ address, deliveryOption, paymentMethod, onPlaceOrder, placing, error }: ReviewStepProps) {
  const email = useAuthStore((state) => state.user?.email);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="eyebrow text-xs text-muted">Contact</p>
          <p className="mt-1 text-sm text-charcoal">{email}</p>
          <p className="text-sm text-charcoal">{address.phone}</p>
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
        You&apos;ll be redirected to PayU&apos;s secure checkout to complete payment.
      </p>

      {error && <p className="text-sm text-burgundy">{error}</p>}

      <Button variant="primary" size="lg" onClick={onPlaceOrder} disabled={placing} className="w-fit">
        {placing ? "Placing Order…" : "Place Order"}
      </Button>
    </div>
  );
}
