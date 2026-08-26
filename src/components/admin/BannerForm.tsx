"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/admin/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Switch } from "@/components/admin/ui/switch";
import { BannerImageUploader } from "@/components/admin/BannerImageUploader";
import { createBanner, updateBanner } from "@/lib/admin/api";
import type { AdminBanner } from "@/types/admin";

const bannerSchema = z.object({
  title: z.string().optional(),
  linkUrl: z.string().optional(),
  sortOrder: z.number().int(),
  active: z.boolean(),
});

type BannerFormValues = z.infer<typeof bannerSchema>;

function tempSessionId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `tmp-${Date.now()}`;
}

export function BannerForm({ banner }: { banner?: AdminBanner }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState(banner?.imageUrl);
  const [imageError, setImageError] = useState(false);
  const [folderId] = useState(() => banner?.id ?? tempSessionId());

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      title: banner?.title ?? "",
      linkUrl: banner?.linkUrl ?? "",
      sortOrder: banner?.sortOrder ?? 0,
      active: banner?.active ?? true,
    },
  });

  async function onSubmit(data: BannerFormValues) {
    if (!imageUrl) {
      setImageError(true);
      toast.error("Upload a banner image before saving.");
      return;
    }
    setSubmitting(true);
    try {
      if (banner) {
        await updateBanner(banner.id, {
          imageUrl,
          title: data.title,
          linkUrl: data.linkUrl,
          sortOrder: data.sortOrder,
          active: data.active,
        });
        toast.success("Banner updated successfully.");
      } else {
        await createBanner({
          imageUrl,
          title: data.title,
          linkUrl: data.linkUrl,
          sortOrder: data.sortOrder,
          active: data.active,
        });
        toast.success("Banner created successfully.");
      }
      router.push("/admin/offers/banners");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Couldn't save the banner.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-base">Banner Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 pt-4">
          <div className="space-y-1.5">
            <Label>Banner Image *</Label>
            <BannerImageUploader
              imageUrl={imageUrl}
              onChange={(url) => {
                setImageUrl(url);
                setImageError(false);
              }}
              folderId={folderId}
            />
            {imageError && <p className="text-xs text-destructive">A banner image is required.</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Internal reference only, not shown on the banner" {...register("title")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="linkUrl">Link URL</Label>
              <Input id="linkUrl" placeholder="/collections/summer-sale" {...register("linkUrl")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sortOrder">Sort Order</Label>
              <Input id="sortOrder" type="number" {...register("sortOrder", { valueAsNumber: true })} />
              {errors.sortOrder && <p className="text-xs text-destructive">{errors.sortOrder.message}</p>}
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
            <div>
              <p className="text-sm font-medium text-foreground">Active</p>
              <p className="text-xs text-muted-foreground">Shown in the homepage offer banner section.</p>
            </div>
            <Controller control={control} name="active" render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={submitting}>
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {banner ? "Save Changes" : "Create Banner"}
        </Button>
      </div>
    </form>
  );
}
