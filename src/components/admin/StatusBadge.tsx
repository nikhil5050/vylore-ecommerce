import { cn } from "@/lib/utils";
import { statusToneClass, toTitleCase, type StatusTone } from "@/lib/admin/status";

interface StatusBadgeProps {
  status: string;
  tone: StatusTone;
  className?: string;
}

export function StatusBadge({ status, tone, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        statusToneClass(tone),
        className,
      )}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
      {toTitleCase(status)}
    </span>
  );
}
