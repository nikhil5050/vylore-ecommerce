import type { ReactNode } from "react";
import { GemIcon } from "@/components/icons/Icons";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center">
      <GemIcon className="h-8 w-8 text-silver" />
      <h3 className="font-serif text-2xl text-charcoal">{title}</h3>
      {description && <p className="max-w-sm text-sm text-muted">{description}</p>}
      {action}
    </div>
  );
}
