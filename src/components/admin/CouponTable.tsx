"use client";

import { Pencil, Ticket } from "lucide-react";
import { Card } from "@/components/admin/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";
import { Button } from "@/components/admin/ui/button";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { CouponForm } from "@/components/admin/CouponForm";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { contentStatusTone } from "@/lib/admin/status";
import { formatAdminDate } from "@/lib/admin/format";
import { formatPrice } from "@/utils/formatPrice";
import type { Coupon } from "@/types/admin";

function formatDiscount(coupon: Coupon) {
  return coupon.discountType === "percentage" ? `${coupon.discountValue}%` : formatPrice(coupon.discountValue);
}

interface CouponTableProps {
  coupons: Coupon[];
  onSaved: (coupon: Coupon) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (coupon: Coupon) => void;
}

export function CouponTable({ coupons, onSaved, onDelete, onToggleStatus }: CouponTableProps) {
  if (coupons.length === 0) {
    return <AdminEmptyState icon={Ticket} title="No coupons found" description="Coupons you create will show up here." />;
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Min Order</TableHead>
            <TableHead>Max Discount</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead>Validity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupons.map((coupon) => (
            <TableRow key={coupon.id}>
              <TableCell className="font-mono text-sm font-medium text-foreground">{coupon.code}</TableCell>
              <TableCell>{formatDiscount(coupon)}</TableCell>
              <TableCell className="text-muted-foreground">{coupon.minOrderAmount ? formatPrice(coupon.minOrderAmount) : "—"}</TableCell>
              <TableCell className="text-muted-foreground">{coupon.maxDiscount ? formatPrice(coupon.maxDiscount) : "—"}</TableCell>
              <TableCell className="text-muted-foreground">
                {coupon.usedCount}
                {coupon.usageLimit ? ` / ${coupon.usageLimit}` : ""}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatAdminDate(coupon.startDate, { year: undefined })} – {formatAdminDate(coupon.endDate, { year: undefined })}
              </TableCell>
              <TableCell>
                <StatusBadge status={coupon.status} tone={contentStatusTone[coupon.status] ?? "neutral"} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1.5">
                  <CouponForm
                    coupon={coupon}
                    onSaved={onSaved}
                    trigger={
                      <Button variant="ghost" size="icon-sm" aria-label="Edit coupon">
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                    }
                  />
                  <Button variant="outline" size="sm" onClick={() => onToggleStatus(coupon)}>
                    {coupon.status === "active" ? "Deactivate" : "Activate"}
                  </Button>
                  <ConfirmDialog
                    title="Delete coupon?"
                    description={`"${coupon.code}" will no longer be redeemable at checkout.`}
                    confirmLabel="Delete"
                    onConfirm={() => onDelete(coupon.id)}
                    trigger={
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        Delete
                      </Button>
                    }
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
