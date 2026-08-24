"use client";

import type { ReactNode } from "react";
import { CloseIcon } from "@/components/icons/Icons";
import { useDialogA11y } from "@/hooks/useDialogA11y";
import { cn } from "@/utils/cn";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function FilterDrawer({ open, onClose, children }: FilterDrawerProps) {
  const panelRef = useDialogA11y(open, onClose);

  return (
    <div
      className={cn("fixed inset-0 z-[60] lg:hidden", open ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close filters"
        tabIndex={open ? 0 : -1}
        className={cn(
          "absolute inset-0 bg-charcoal/40 transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filter products"
        tabIndex={-1}
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-ivory shadow-xl outline-none transition-transform duration-500 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="eyebrow text-xs text-muted">Filters</span>
          <button type="button" aria-label="Close filters" onClick={onClose} className="p-2 text-charcoal">
            <CloseIcon />
          </button>
        </div>

        <div className="px-6 py-2">{children}</div>

        <div className="mt-auto px-6 py-6">
          <button
            type="button"
            onClick={onClose}
            className="eyebrow w-full bg-burgundy py-3 text-xs text-ivory transition-colors hover:bg-burgundy-dark"
          >
            View Results
          </button>
        </div>
      </div>
    </div>
  );
}
