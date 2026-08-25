"use client";

import { useState, type ReactNode } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Checkbox } from "@/components/admin/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/admin/ui/dialog";
import { createCoupon, updateCoupon } from "@/lib/admin/api";
import { mockCategories } from "@/lib/admin/mock";
import type { Coupon } from "@/types/admin";

const couponSchema = z.object({
  code: z.string().trim().min(3, "Coupon code is required."),
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z.coerce.number().positive("Discount value must be greater than 0."),
  minOrderAmount: z.coerce.number().min(0).optional(),
  maxDiscount: z.coerce.number().min(0).optional(),
  usageLimit: z.coerce.number().min(0).optional(),
  perCustomerLimit: z.coerce.number().min(0).optional(),
  startDate: z.string().min(1, "Start date is required."),
  endDate: z.string().min(1, "End date is required."),
  applicableCategories: z.array(z.string()).default([]),
  applicableProductsText: z.string().optional(),
  status: z.enum(["draft", "active", "inactive", "scheduled", "expired"]),
});

type CouponFormInput = z.input<typeof couponSchema>;
type CouponFormOutput = z.output<typeof couponSchema>;

function toFormValues(coupon?: Coupon): CouponFormInput {
  return {
    code: coupon?.code ?? "",
    discountType: coupon?.discountType ?? "percentage",
    discountValue: coupon?.discountValue ?? 10,
    minOrderAmount: coupon?.minOrderAmount,
    maxDiscount: coupon?.maxDiscount,
    usageLimit: coupon?.usageLimit,
    perCustomerLimit: coupon?.perCustomerLimit,
    startDate: coupon?.startDate ?? new Date().toISOString().slice(0, 10),
    endDate: coupon?.endDate ?? new Date().toISOString().slice(0, 10),
    applicableCategories: coupon?.applicableCategories ?? [],
    applicableProductsText: coupon?.applicableProducts.join(", ") ?? "",
    status: coupon?.status ?? "active",
  };
}

interface CouponFormProps {
  coupon?: Coupon;
  trigger: ReactNode;
  onSaved: (coupon: Coupon) => void;
}

export function CouponForm({ coupon, trigger, onSaved }: CouponFormProps) {
  const [open, setOpen] = useState(false);
  const isEdit = !!coupon;

  const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<
    CouponFormInput,
    unknown,
    CouponFormOutput
  >({
    resolver: zodResolver(couponSchema),
    defaultValues: toFormValues(coupon),
  });

  async function onSubmit(values: CouponFormOutput) {
    const payload: Partial<Coupon> = {
      ...values,
      code: values.code.toUpperCase(),
      applicableProducts: values.applicableProductsText
        ? values.applicableProductsText.split(",").map((p) => p.trim()).filter(Boolean)
        : [],
    };
    const saved = isEdit ? await updateCoupon(coupon!.id, payload) : await createCoupon(payload);
    setOpen(false);
    onSaved(saved as Coupon);
    toast.success(isEdit ? "Coupon updated." : "Coupon created.");
    if (!isEdit) reset(toFormValues(undefined));
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) reset(toFormValues(coupon));
      }}
    >
      <DialogTrigger nativeButton={false} render={<span />}>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Coupon" : "Add Coupon"}</DialogTitle>
          <DialogDescription>Coupons apply automatically at checkout once valid and within their usage limits.</DialogDescription>
        </DialogHeader>

        <form id="coupon-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="coupon-code">Coupon Code</Label>
              <Input id="coupon-code" placeholder="FESTIVE25" {...register("code")} />
              {errors.code && <p className="text-xs text-destructive">{errors.code.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="coupon-status">Status</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="coupon-status" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="coupon-discount-type">Discount Type</Label>
              <Controller
                control={control}
                name="discountType"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="coupon-discount-type" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="coupon-discount-value">Discount Value</Label>
              <Input id="coupon-discount-value" type="number" step="any" {...register("discountValue")} />
              {errors.discountValue && <p className="text-xs text-destructive">{errors.discountValue.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="coupon-min-order">Minimum Order Amount</Label>
              <Input id="coupon-min-order" type="number" {...register("minOrderAmount")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="coupon-max-discount">Maximum Discount</Label>
              <Input id="coupon-max-discount" type="number" {...register("maxDiscount")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="coupon-usage-limit">Usage Limit</Label>
              <Input id="coupon-usage-limit" type="number" {...register("usageLimit")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="coupon-per-customer">Per Customer Limit</Label>
              <Input id="coupon-per-customer" type="number" {...register("perCustomerLimit")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="coupon-start">Start Date</Label>
              <Input id="coupon-start" type="date" {...register("startDate")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="coupon-end">End Date</Label>
              <Input id="coupon-end" type="date" {...register("endDate")} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Applicable Categories</Label>
            <Controller
              control={control}
              name="applicableCategories"
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-2 rounded-lg border border-border p-3 sm:grid-cols-3">
                  {mockCategories.map((category) => {
                    const selected = field.value ?? [];
                    const checked = selected.includes(category.id);
                    return (
                      <label key={category.id} className="flex items-center gap-2 text-sm text-foreground">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(next) =>
                            field.onChange(
                              next ? [...selected, category.id] : selected.filter((id) => id !== category.id),
                            )
                          }
                        />
                        {category.name}
                      </label>
                    );
                  })}
                </div>
              )}
            />
            <p className="text-xs text-muted-foreground">Leave all unchecked to apply the coupon storewide.</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="coupon-products">Applicable Products</Label>
            <Input id="coupon-products" placeholder="Comma-separated product names (optional)" {...register("applicableProductsText")} />
          </div>
        </form>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" form="coupon-form" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : isEdit ? "Save Changes" : "Create Coupon"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
