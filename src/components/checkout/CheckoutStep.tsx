import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface CheckoutStepProps {
  index: number;
  title: string;
  status: "active" | "complete" | "upcoming";
  summary?: ReactNode;
  onEdit?: () => void;
  children?: ReactNode;
}

export function CheckoutStep({ index, title, status, summary, onEdit, children }: CheckoutStepProps) {
  return (
    <div className="border border-silver/30">
      <div className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-4">
          <span
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs",
              status === "upcoming" ? "border-silver/50 text-muted" : "border-burgundy text-burgundy",
            )}
          >
            {index}
          </span>
          <span className={cn("font-serif text-lg", status === "upcoming" ? "text-muted" : "text-charcoal")}>
            {title}
          </span>
        </div>
        {status === "complete" && onEdit && (
          <button type="button" onClick={onEdit} className="eyebrow text-xs text-burgundy">
            Edit
          </button>
        )}
      </div>

      {status === "active" && <div className="border-t border-silver/30 px-6 py-6">{children}</div>}
      {status === "complete" && summary && (
        <div className="border-t border-silver/30 px-6 py-4 text-sm text-muted">{summary}</div>
      )}
    </div>
  );
}
