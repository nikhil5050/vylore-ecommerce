import { Gem, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  className?: string;
  variant?: "gem" | "image";
}

// Stand-in for real product/banner photography until Cloudinary assets exist.
export function ImagePlaceholder({ className, variant = "gem" }: ImagePlaceholderProps) {
  const Icon = variant === "gem" ? Gem : ImageIcon;
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gradient-to-br from-muted to-secondary text-muted-foreground",
        className,
      )}
    >
      <Icon className="h-1/3 w-1/3 min-h-4 min-w-4" strokeWidth={1.5} />
    </div>
  );
}
