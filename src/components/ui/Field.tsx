"use client";

import { useState, type InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import { EyeIcon, EyeOffIcon } from "@/components/icons/Icons";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Field({ label, required, className, type, ...props }: FieldProps) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="eyebrow text-[11px] text-muted">
        {label}
        {required && " *"}
      </span>
      <span className="relative flex items-center">
        <input
          required={required}
          type={isPassword && visible ? "text" : type}
          className={cn(
            "h-11 w-full border border-silver/50 bg-white px-3 text-sm text-charcoal focus:border-burgundy focus:outline-none",
            isPassword && "pr-10",
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute right-3 flex items-center text-muted hover:text-charcoal"
            aria-label={visible ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {visible ? <EyeOffIcon aria-hidden width={18} height={18} /> : <EyeIcon aria-hidden width={18} height={18} />}
          </button>
        )}
      </span>
    </label>
  );
}
