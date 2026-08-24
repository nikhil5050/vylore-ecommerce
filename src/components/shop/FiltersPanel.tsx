"use client";

import type { Category } from "@/types/category";

export interface FilterState {
  categorySlugs: string[];
  minPrice?: number;
  maxPrice?: number;
  inStockOnly: boolean;
}

interface PriceBand {
  label: string;
  min?: number;
  max?: number;
}

const priceBands: PriceBand[] = [
  { label: "Under ₹5,000", max: 5000 },
  { label: "₹5,000 – ₹8,000", min: 5000, max: 8000 },
  { label: "Above ₹8,000", min: 8000 },
];

interface FiltersPanelProps {
  categories?: Category[];
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export function FiltersPanel({ categories, filters, onChange }: FiltersPanelProps) {
  function toggleCategory(slug: string) {
    const next = filters.categorySlugs.includes(slug)
      ? filters.categorySlugs.filter((s) => s !== slug)
      : [...filters.categorySlugs, slug];
    onChange({ ...filters, categorySlugs: next });
  }

  function selectPriceBand(band: PriceBand) {
    const isActive = filters.minPrice === band.min && filters.maxPrice === band.max;
    onChange({
      ...filters,
      minPrice: isActive ? undefined : band.min,
      maxPrice: isActive ? undefined : band.max,
    });
  }

  return (
    <div className="flex flex-col gap-8">
      {categories && categories.length > 0 && (
        <div>
          <p className="eyebrow text-xs text-muted">Category</p>
          <div className="mt-4 flex flex-col gap-3">
            {categories.map((category) => (
              <label key={category.slug} className="flex items-center gap-3 py-1 text-sm text-charcoal">
                <input
                  type="checkbox"
                  checked={filters.categorySlugs.includes(category.slug)}
                  onChange={() => toggleCategory(category.slug)}
                  className="h-4 w-4 accent-burgundy"
                />
                {category.name}
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="eyebrow text-xs text-muted">Price</p>
        <div className="mt-4 flex flex-col gap-3">
          {priceBands.map((band) => (
            <label key={band.label} className="flex items-center gap-3 py-1 text-sm text-charcoal">
              <input
                type="radio"
                name="price-band"
                checked={filters.minPrice === band.min && filters.maxPrice === band.max}
                onChange={() => selectPriceBand(band)}
                className="h-4 w-4 accent-burgundy"
              />
              {band.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-3 py-1 text-sm text-charcoal">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })}
            className="h-4 w-4 accent-burgundy"
          />
          In Stock Only
        </label>
      </div>
    </div>
  );
}
