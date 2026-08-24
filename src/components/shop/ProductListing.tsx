"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";
import { FilterDrawer } from "./FilterDrawer";
import { FiltersPanel, type FilterState } from "./FiltersPanel";
import { SortSelect, type SortOption } from "./SortSelect";

const PAGE_SIZE = 8;

interface ProductListingProps {
  products: Product[];
  categories?: Category[];
}

function filterProducts(products: Product[], filters: FilterState): Product[] {
  return products.filter((product) => {
    if (filters.categorySlugs.length > 0 && !filters.categorySlugs.includes(product.categorySlug)) {
      return false;
    }
    if (filters.minPrice !== undefined && product.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) return false;
    if (filters.inStockOnly && !product.inStock) return false;
    return true;
  });
}

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}

export function ProductListing({ products, categories }: ProductListingProps) {
  const [filters, setFilters] = useState<FilterState>({ categorySlugs: [], inStockOnly: false });
  const [sort, setSort] = useState<SortOption>("newest");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => sortProducts(filterProducts(products, filters), sort), [products, filters, sort]);
  const visible = filtered.slice(0, visibleCount);

  function handleFiltersChange(next: FilterState) {
    setFilters(next);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div>
      <div className="flex items-center justify-between border-b border-silver/30 pb-4">
        <p className="text-sm text-muted">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        </p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="eyebrow text-xs text-charcoal lg:hidden"
          >
            Filters
          </button>
          <SortSelect value={sort} onChange={setSort} />
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <FiltersPanel categories={categories} filters={filters} onChange={handleFiltersChange} />
        </aside>

        <div>
          {visible.length === 0 ? (
            <EmptyState
              title="No pieces match"
              description="Try adjusting or clearing your filters to see more of the collection."
              action={
                <Button variant="secondary" size="sm" onClick={() => handleFiltersChange({ categorySlugs: [], inStockOnly: false })}>
                  Clear Filters
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3 lg:gap-x-6">
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {visibleCount < filtered.length && (
            <div className="mt-12 flex justify-center">
              <Button variant="secondary" size="md" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
                Load More
              </Button>
            </div>
          )}
        </div>
      </div>

      <FilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <FiltersPanel categories={categories} filters={filters} onChange={handleFiltersChange} />
      </FilterDrawer>
    </div>
  );
}
