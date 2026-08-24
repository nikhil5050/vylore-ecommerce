import { cn } from "@/utils/cn";

export function Loader({ className }: { className?: string }) {
  return (
    <div role="status" className={cn("flex items-center justify-center py-16", className)}>
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-silver/40 border-t-burgundy" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
