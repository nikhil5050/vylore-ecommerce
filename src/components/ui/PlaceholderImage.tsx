import { GemIcon } from "@/components/icons/Icons";
import { cn } from "@/utils/cn";

interface PlaceholderImageProps {
  className?: string;
  tone?: "ivory" | "burgundy";
}

// Stand-in for real product/lifestyle photography until assets are supplied.
export function PlaceholderImage({ className, tone = "ivory" }: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        tone === "ivory" ? "bg-gradient-to-br from-ivory to-silver/30" : "bg-gradient-to-br from-burgundy to-burgundy-dark",
        className,
      )}
    >
      <GemIcon className={cn("h-8 w-8", tone === "ivory" ? "text-silver" : "text-champagne/60")} />
    </div>
  );
}
