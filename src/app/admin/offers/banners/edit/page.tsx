"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { BannerForm } from "@/components/admin/BannerForm";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { getBanners } from "@/lib/admin/api";
import type { AdminBanner } from "@/types/admin";

export default function EditBannerPage() {
  return (
    <Suspense fallback={null}>
      <EditBannerContent />
    </Suspense>
  );
}

function EditBannerContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [banner, setBanner] = useState<AdminBanner | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    getBanners()
      .then((banners) => setBanner(banners.find((b) => b.id === id) ?? null))
      .catch(() => setBanner(null));
  }, [id]);

  useEffect(() => {
    if (banner) document.title = `${banner.title || "Banner"} | Vylore Admin`;
  }, [banner]);

  if (banner === undefined) {
    if (!id) {
      return (
        <div className="space-y-6">
          <PageHeader title="Banner not found" />
          <AdminEmptyState title="This banner doesn't exist" description="It may have been deleted, or the link is invalid." />
        </div>
      );
    }
    return null;
  }

  if (banner === null) {
    return (
      <div className="space-y-6">
        <PageHeader title="Banner not found" />
        <AdminEmptyState title="This banner doesn't exist" description="It may have been deleted, or the link is invalid." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title={banner.title || "Edit Banner"} description={banner.linkUrl} />
      <BannerForm banner={banner} />
    </div>
  );
}
