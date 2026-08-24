import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/utils/formatPrice";
import { CouponForm } from "./CouponForm";

export function CartSummary({ subtotal }: { subtotal: number }) {
  return (
    <div className="h-fit border border-silver/30 p-6">
      <h2 className="font-serif text-xl text-charcoal">Order Summary</h2>

      <div className="mt-4 flex flex-col gap-2 text-sm text-muted">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="text-charcoal">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
      </div>

      <CouponForm />

      <div className="mt-4 flex justify-between border-t border-silver/30 pt-4 text-base">
        <span className="text-charcoal">Total</span>
        <span className="text-charcoal">{formatPrice(subtotal)}</span>
      </div>

      <Button href="/checkout" variant="primary" size="lg" className="mt-6 w-full">
        Proceed to Checkout
      </Button>
    </div>
  );
}
