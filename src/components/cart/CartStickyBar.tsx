import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/utils/formatPrice";

export function CartStickyBar({ total }: { total: number }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-silver/30 bg-ivory/95 px-4 py-3 backdrop-blur lg:hidden">
      <div>
        <p className="text-xs text-muted">Total</p>
        <p className="text-base text-charcoal">{formatPrice(total)}</p>
      </div>
      <Button href="/checkout" variant="primary" size="md" className="max-w-[220px] flex-1">
        Checkout
      </Button>
    </div>
  );
}
