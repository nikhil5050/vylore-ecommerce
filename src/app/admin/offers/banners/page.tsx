"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Megaphone, Plus, SquarePen, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { SafeImage } from "@/components/admin/SafeImage";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { Button } from "@/components/admin/ui/button";
import { Card } from "@/components/admin/ui/card";
import { getBanners, deleteBanner } from "@/lib/admin/api";
import type { AdminBanner } from "@/types/admin";

export default function OfferBannersPage() {
  const [banners, setBanners] = useState<AdminBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    getBanners()
      .then(setBanners)
      .catch(() => setConnected(false))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(banner: AdminBanner) {
    try {
      await deleteBanner(banner.id);
      setBanners((prev) => prev.filter((b) => b.id !== banner.id));
      toast.success("Banner deleted.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Couldn't delete banner.");
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Offer Banners"
        description="Manage the promotional banners shown on the storefront homepage."
        actions={
          <Button nativeButton={false} render={<Link href="/admin/offers/banners/add" />}>
            <Plus className="h-4 w-4" /> Add Banner
          </Button>
        }
      />

      {!loading && !connected ? (
        <AdminEmptyState
          icon={Megaphone}
          title="Offer banners aren't connected yet"
          description="The backend doesn't have a /admin/banners endpoint yet. This page is ready to go live the moment it ships."
        />
      ) : !loading && banners.length === 0 ? (
        <AdminEmptyState title="No banners yet" description="Add your first banner to show it on the homepage." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {banners.map((banner) => (
            <Card key={banner.id} className="overflow-hidden py-0">
              <SafeImage src={banner.imageUrl} transform="w-600" className="aspect-[16/5] w-full object-cover" />
              <div className="space-y-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-foreground">{banner.title || "Untitled banner"}</p>
                    <p className="text-xs text-muted-foreground">{banner.linkUrl || "No link"} · order {banner.sortOrder}</p>
                  </div>
                  <StatusBadge status={banner.active ? "active" : "inactive"} tone={banner.active ? "success" : "neutral"} />
                </div>
                <div className="flex items-center justify-end gap-1 pt-1">
                  <Link
                    href={`/admin/offers/banners/edit?id=${banner.id}`}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                    aria-label="Edit banner"
                  >
                    <SquarePen className="h-3.5 w-3.5" />
                  </Link>
                  <ConfirmDialog
                    trigger={
                      <button
                        type="button"
                        className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        aria-label="Delete banner"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    }
                    title="Delete this banner?"
                    description="It will be removed from the homepage immediately."
                    confirmLabel="Delete"
                    onConfirm={() => handleDelete(banner)}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
