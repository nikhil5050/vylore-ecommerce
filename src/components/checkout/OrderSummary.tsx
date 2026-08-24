import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import type { CartLine } from "@/store/cart.store";
import { formatPrice } from "@/utils/formatPrice";

export function OrderSummary({ lines, total }: { lines: CartLine[]; total: number }) {
  return (
    <div className="h-fit border border-silver/30 p-6 lg:sticky lg:top-28">
      <h2 className="font-serif text-xl text-charcoal">Order Summary</h2>

      <div className="mt-4 flex flex-col divide-y divide-silver/20">
        {lines.map((line) => (
          <div key={`${line.product.id}-${line.size ?? ""}`} className="flex gap-3 py-3">
            <div className="h-16 w-12 shrink-0 overflow-hidden">
              <PlaceholderImage />
            </div>
            <div className="flex flex-1 items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm text-charcoal">{line.product.name}</p>
                <p className="text-xs text-muted">
                  Qty {line.quantity}
                  {line.size && ` · Size ${line.size}`}
                </p>
              </div>
              <span className="shrink-0 text-sm text-charcoal">{formatPrice(line.product.price * line.quantity)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between border-t border-silver/30 pt-4 text-sm text-muted">
        <span>Shipping</span>
        <span>Calculated after address</span>
      </div>
      <div className="mt-2 flex justify-between text-base">
        <span className="text-charcoal">Total</span>
        <span className="text-charcoal">{formatPrice(total)}</span>
      </div>
    </div>
  );
}
