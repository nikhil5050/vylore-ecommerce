import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/utils/formatPrice";

export function CartStickyBar({ total }: { total: number }) {
  return (
    // bottom-[...] sits this flush above the fixed mobile bottom nav (Header.tsx,
    // 4.75rem tall + safe-area-inset-bottom) instead of bottom-0, which put it
    // underneath that nav's higher z-index — hiding the Checkout button.
    <div className="fixed inset-x-0 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-40 flex items-center justify-between gap-4 border-t border-silver/30 bg-ivory/95 px-4 py-3 backdrop-blur lg:hidden">
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
