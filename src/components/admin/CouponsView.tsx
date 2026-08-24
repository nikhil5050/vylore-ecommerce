"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { CouponForm } from "@/components/admin/CouponForm";
import { CouponTable } from "@/components/admin/CouponTable";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { mockCategories } from "@/lib/admin/mock";
import { Sparkles } from "lucide-react";
import type { Coupon } from "@/types/admin";

export type CouponsViewMode = "all" | "product-offers" | "festival-offers";

function useCouponActions(initial: Coupon[]) {
  const [coupons, setCoupons] = useState<Coupon[]>(initial);

  function upsert(coupon: Coupon) {
    setCoupons((prev) => {
      const exists = prev.some((c) => c.id === coupon.id);
      return exists ? prev.map((c) => (c.id === coupon.id ? coupon : c)) : [coupon, ...prev];
    });
  }

  function remove(id: string) {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    toast.success("Coupon deleted.");
  }

  function toggleStatus(coupon: Coupon) {
    upsert({ ...coupon, status: coupon.status === "active" ? "inactive" : "active" });
  }

  return { coupons, upsert, remove, toggleStatus };
}

export function CouponsView({ coupons: initial, mode = "all" }: { coupons: Coupon[]; mode?: CouponsViewMode }) {
  const { coupons, upsert, remove, toggleStatus } = useCouponActions(initial);

  const addTrigger = (
    <CouponForm
      onSaved={upsert}
      trigger={
        <Button>
          <PlusCircle className="h-4 w-4" /> Add Coupon
        </Button>
      }
    />
  );

  const productOfferGroups = useMemo(() => {
    const byCategory = new Map<string, Coupon[]>();
    for (const coupon of coupons) {
      for (const categoryId of coupon.applicableCategories) {
        const list = byCategory.get(categoryId) ?? [];
        list.push(coupon);
        byCategory.set(categoryId, list);
      }
    }
    return byCategory;
  }, [coupons]);

  if (mode === "product-offers") {
    const groups = productOfferGroups;

    return (
      <div className="space-y-6">
        <div className="flex justify-end">{addTrigger}</div>
        {groups.size === 0 ? (
          <AdminEmptyState
            icon={Sparkles}
            title="No category-specific offers yet"
            description="Assign applicable categories to a coupon to see it grouped here."
          />
        ) : (
          Array.from(groups.entries()).map(([categoryId, categoryCoupons]) => {
            const category = mockCategories.find((c) => c.id === categoryId);
            return (
              <div key={categoryId} className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">{category?.name ?? "Uncategorised"}</h3>
                <CouponTable coupons={categoryCoupons} onSaved={upsert} onDelete={remove} onToggleStatus={toggleStatus} />
              </div>
            );
          })
        )}
      </div>
    );
  }

  if (mode === "festival-offers") {
    const sections: { label: string; description: string; items: Coupon[] }[] = [
      { label: "Active Now", description: "Live and redeemable at checkout.", items: coupons.filter((c) => c.status === "active") },
      { label: "Upcoming", description: "Scheduled to go live automatically.", items: coupons.filter((c) => c.status === "scheduled") },
      { label: "Past", description: "Expired or deactivated offers.", items: coupons.filter((c) => c.status === "expired" || c.status === "inactive" || c.status === "draft") },
    ];

    return (
      <div className="space-y-6">
        <div className="flex justify-end">{addTrigger}</div>
        {sections.map((section) => (
          <div key={section.label} className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">{section.label}</h3>
              <p className="text-xs text-muted-foreground">{section.description}</p>
            </div>
            {section.items.length > 0 ? (
              <CouponTable coupons={section.items} onSaved={upsert} onDelete={remove} onToggleStatus={toggleStatus} />
            ) : (
              <p className="rounded-lg border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
                Nothing here yet.
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">{addTrigger}</div>
      <CouponTable coupons={coupons} onSaved={upsert} onDelete={remove} onToggleStatus={toggleStatus} />
    </div>
  );
}
