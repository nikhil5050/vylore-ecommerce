"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { CustomerDetail } from "@/components/admin/CustomerDetail";
import { getCustomer } from "@/lib/admin/api";
import type { AdminOrder, Customer } from "@/types/admin";

export default function CustomerDetailPage() {
  return (
    <Suspense fallback={null}>
      <CustomerDetailContent />
    </Suspense>
  );
}

function CustomerDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [result, setResult] = useState<{ customer: Customer; orders: AdminOrder[] } | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    getCustomer(id).then((value) => setResult(value ?? null));
  }, [id]);

  useEffect(() => {
    if (result) document.title = `${result.customer.name} | Vylore Admin`;
  }, [result]);

  if (result === undefined) {
    if (!id) {
      return (
        <div className="space-y-6">
          <PageHeader title="Customer not found" />
          <AdminEmptyState title="This customer doesn't exist" description="It may have been deleted, or the link is invalid." />
        </div>
      );
    }
    return null;
  }

  if (result === null) {
    return (
      <div className="space-y-6">
        <PageHeader title="Customer not found" />
        <AdminEmptyState title="This customer doesn't exist" description="It may have been deleted, or the link is invalid." />
      </div>
    );
  }

  return <CustomerDetail customer={result.customer} orders={result.orders} />;
}
