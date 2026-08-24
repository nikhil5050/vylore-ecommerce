import { cn } from "@/utils/cn";

export function CountBadge({ count, className }: { count: number; className?: string }) {
  if (count <= 0) return null;

  return (
    <span
      className={cn(
        "flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] font-medium text-ivory",
        className ?? "absolute -right-1.5 -top-1.5",
      )}
    >
      {count > 9 ? "9+" : count}
    </span>
  );
}
