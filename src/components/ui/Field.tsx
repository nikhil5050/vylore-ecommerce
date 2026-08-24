import type { InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Field({ label, required, className, ...props }: FieldProps) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="eyebrow text-[11px] text-muted">
        {label}
        {required && " *"}
      </span>
      <input
        required={required}
        className="h-11 border border-silver/50 bg-white px-3 text-sm text-charcoal focus:border-burgundy focus:outline-none"
        {...props}
      />
    </label>
  );
}
