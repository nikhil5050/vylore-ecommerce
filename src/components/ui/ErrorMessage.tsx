import type { ReactNode } from "react";
import { GemIcon } from "@/components/icons/Icons";

interface ErrorMessageProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function ErrorMessage({ title, description, action }: ErrorMessageProps) {
  return (
    <div role="alert" className="flex flex-col items-center gap-4 py-24 text-center">
      <GemIcon className="h-8 w-8 text-burgundy" />
      <h3 className="font-serif text-2xl text-charcoal">{title}</h3>
      {description && <p className="max-w-sm text-sm text-muted">{description}</p>}
      {action}
    </div>
  );
}
