"use client";

import { ChevronDownIcon } from "@/components/icons/Icons";

export type SortOption = "newest" | "price-asc" | "price-desc" | "name-asc";

const options: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A–Z" },
];

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
        aria-label="Sort products"
        className="eyebrow appearance-none border border-silver/50 bg-white py-2 pl-3 pr-8 text-xs text-charcoal focus:border-burgundy focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
    </div>
  );
}
