"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/icons/Icons";
import { ProductThumbnail } from "@/components/ui/ProductThumbnail";
import { getCategories } from "@/services/category.service";
import type { Category } from "@/types/category";

const MAX_RESULTS = 6;

/**
 * Mobile-only hero search: replaces the static "Emerald & Diamond Necklace"
 * product callout with a functional category finder. Typing filters the
 * (small, mostly-static) category list; picking a result — by click or
 * Enter — routes straight to that category's page.
 */
export function HeroCategorySearch() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getCategories()
      .then((data) => {
        if (!cancelled) setCategories(data);
      })
      .catch(() => {
        // Silent — search just shows no suggestions if categories fail to load.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    const pool = trimmed
      ? categories.filter((category) =>
          category.name.toLowerCase().includes(trimmed),
        )
      : categories;
    return pool.slice(0, MAX_RESULTS);
  }, [categories, query]);

  function goToCategory(category: Category) {
    setQuery("");
    setOpen(false);
    router.push(`/category/${category.slug}`);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && results.length > 0) {
      event.preventDefault();
      goToCategory(results[0]);
    } else if (event.key === "Escape") {
      setOpen(false);
      event.currentTarget.blur();
    }
  }

  return (
    <div
      ref={containerRef}
      className="pointer-events-auto relative mt-5 w-full max-w-[290px] sm:hidden"
    >
      <div className="flex items-center gap-2 rounded-full border border-white/50 bg-ivory/75 px-4 py-2.5 shadow-md backdrop-blur-md transition-colors focus-within:border-burgundy/40 focus-within:bg-ivory/90">
        <SearchIcon className="h-4 w-4 shrink-0 text-charcoal/50" />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search categories…"
          aria-label="Search categories"
          className="min-w-0 flex-1 bg-transparent text-[13px] text-charcoal placeholder:text-charcoal/40 focus:outline-none"
        />
      </div>

      {open && results.length > 0 && (
        <ul className="no-scrollbar absolute inset-x-0 top-[calc(100%+8px)] z-10 max-h-64 overflow-y-auto rounded-2xl border border-charcoal/10 bg-white/95 p-1.5 shadow-xl shadow-charcoal/10 backdrop-blur-md">
          {results.map((category) => (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => goToCategory(category)}
                className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-burgundy/5 active:bg-burgundy/10"
              >
                <span className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-charcoal/10 bg-white">
                  <ProductThumbnail
                    src={category.imageUrl}
                    alt=""
                    transform="w-100"
                  />
                </span>
                <span className="truncate text-[13px] font-medium text-charcoal">
                  {category.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && query.trim() && results.length === 0 && (
        <div className="absolute inset-x-0 top-[calc(100%+8px)] z-10 rounded-2xl border border-charcoal/10 bg-white/95 px-4 py-3 text-center text-[12px] text-charcoal/50 shadow-xl backdrop-blur-md">
          No categories found
        </div>
      )}
    </div>
  );
}
