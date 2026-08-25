"use client";

import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { CalendarIcon, Copy, ImagePlus, MoveDown, MoveUp, Pencil, PlusCircle, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/admin/ui/card";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/admin/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/admin/ui/popover";
import { Calendar } from "@/components/admin/ui/calendar";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ImagePlaceholder } from "@/components/admin/ImagePlaceholder";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { contentStatusTone } from "@/lib/admin/status";
import { formatAdminDate } from "@/lib/admin/format";
import { createBanner, updateBanner } from "@/lib/admin/api";
import type { ContentStatus, OfferBanner } from "@/types/admin";

const emptyBanner: OfferBanner = {
  id: "",
  title: "",
  subtitle: "",
  desktopImageUrl: "",
  mobileImageUrl: "",
  ctaText: "Shop Now",
  ctaLink: "/collections",
  position: 0,
  startDate: new Date().toISOString().slice(0, 10),
  endDate: new Date().toISOString().slice(0, 10),
  status: "draft",
};

function ImageDropzone({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <label className="group relative flex aspect-[16/7] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-muted/40 transition-colors hover:border-primary/40">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt={label} className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-muted-foreground">
            <ImagePlus className="h-5 w-5" />
            <span className="text-xs">Click to upload</span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onChange(URL.createObjectURL(file));
          }}
        />
      </label>
    </div>
  );
}

function DatePickerField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const date = value ? new Date(value) : undefined;
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger
          render={
            <Button variant="outline" className="w-full justify-start font-normal">
              <CalendarIcon className="h-4 w-4" />
              {value ? formatAdminDate(value) : "Select date"}
            </Button>
          }
        />
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selected) => selected && onChange(selected.toISOString().slice(0, 10))}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function BannerFormDialog({
  banner,
  trigger,
  onSaved,
}: {
  banner?: OfferBanner;
  trigger: ReactNode;
  onSaved: (banner: OfferBanner) => void;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<OfferBanner>(banner ?? emptyBanner);
  const [saving, setSaving] = useState(false);
  const isEdit = !!banner;

  function update<K extends keyof OfferBanner>(key: K, value: OfferBanner[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!form.title.trim()) {
      toast.error("Banner title is required.");
      return;
    }
    setSaving(true);
    const saved = isEdit ? await updateBanner(banner!.id, form) : await createBanner(form);
    setSaving(false);
    setOpen(false);
    onSaved(saved as OfferBanner);
    toast.success(isEdit ? "Banner updated." : "Banner published successfully.");
    if (!isEdit) setForm(emptyBanner);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setForm(banner ?? emptyBanner);
      }}
    >
      <DialogTrigger nativeButton={false} render={<span />}>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Offer Banner" : "Add Offer Banner"}</DialogTitle>
          <DialogDescription>Banners appear on the storefront homepage within their scheduled window.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ImageDropzone label="Desktop Banner Image" value={form.desktopImageUrl} onChange={(v) => update("desktopImageUrl", v)} />
            <ImageDropzone label="Mobile Banner Image" value={form.mobileImageUrl} onChange={(v) => update("mobileImageUrl", v)} />
          </div>
          <p className="text-xs text-muted-foreground">Recommended: 1600×500px desktop, 800×900px mobile. Prepared for Cloudinary.</p>

          <div className="space-y-1.5">
            <Label htmlFor="banner-title">Banner Title</Label>
            <Input id="banner-title" value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Festive Silver Edit" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="banner-subtitle">Banner Subtitle</Label>
            <Input id="banner-subtitle" value={form.subtitle} onChange={(e) => update("subtitle", e.target.value)} placeholder="Up to 25% Off" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="banner-cta-text">CTA Text</Label>
              <Input id="banner-cta-text" value={form.ctaText} onChange={(e) => update("ctaText", e.target.value)} placeholder="Shop Now" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="banner-cta-link">CTA Link</Label>
              <Input id="banner-cta-link" value={form.ctaLink} onChange={(e) => update("ctaLink", e.target.value)} placeholder="/collections" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DatePickerField label="Start Date" value={form.startDate} onChange={(v) => update("startDate", v)} />
            <DatePickerField label="End Date" value={form.endDate} onChange={(v) => update("endDate", v)} />
          </div>

          <div className="space-y-1.5 sm:max-w-xs">
            <Label htmlFor="banner-status">Status</Label>
            <Select value={form.status} onValueChange={(value) => update("status", value as ContentStatus)}>
              <SelectTrigger id="banner-status" className="w-full">
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
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Publish Banner"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function BannerManager({ banners: initialBanners }: { banners: OfferBanner[] }) {
  const [banners, setBanners] = useState<OfferBanner[]>([...initialBanners].sort((a, b) => a.position - b.position));

  function upsert(banner: OfferBanner) {
    setBanners((prev) => {
      const exists = prev.some((b) => b.id === banner.id);
      const next = exists ? prev.map((b) => (b.id === banner.id ? banner : b)) : [...prev, { ...banner, position: prev.length + 1 }];
      return next.sort((a, b) => a.position - b.position);
    });
  }

  function remove(id: string) {
    setBanners((prev) => prev.filter((b) => b.id !== id));
    toast.success("Banner deleted.");
  }

  function duplicate(banner: OfferBanner) {
    setBanners((prev) => [
      ...prev,
      { ...banner, id: `ban-${Date.now()}`, title: `${banner.title} (Copy)`, status: "draft", position: prev.length + 1 },
    ]);
    toast.success("Banner duplicated.");
  }

  function toggleStatus(banner: OfferBanner) {
    upsert({ ...banner, status: banner.status === "active" ? "inactive" : "active" });
  }

  function move(index: number, direction: -1 | 1) {
    setBanners((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next.map((b, i) => ({ ...b, position: i + 1 }));
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <BannerFormDialog
          onSaved={upsert}
          trigger={
            <Button>
              <PlusCircle className="h-4 w-4" /> Add Offer Banner
            </Button>
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {banners.map((banner, index) => (
          <Card key={banner.id} className="overflow-hidden">
            <div className="relative aspect-[16/6]">
              <ImagePlaceholder variant="image" className="h-full w-full" />
              <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2 py-0.5 text-xs font-medium text-foreground shadow-sm">
                Position {banner.position}
              </span>
              <span className="absolute right-3 top-3">
                <StatusBadge status={banner.status} tone={contentStatusTone[banner.status] ?? "neutral"} />
              </span>
            </div>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium text-foreground">{banner.title || "Untitled banner"}</p>
                <p className="text-sm text-muted-foreground">{banner.subtitle}</p>
              </div>
              <p className="text-xs text-muted-foreground">
                {formatAdminDate(banner.startDate)} – {formatAdminDate(banner.endDate)}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 border-t border-border pt-3">
                <BannerFormDialog
                  banner={banner}
                  onSaved={upsert}
                  trigger={
                    <Button variant="outline" size="sm">
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </Button>
                  }
                />
                <Button variant="outline" size="sm" onClick={() => duplicate(banner)}>
                  <Copy className="h-3.5 w-3.5" /> Duplicate
                </Button>
                <Button variant="outline" size="sm" onClick={() => toggleStatus(banner)}>
                  {banner.status === "active" ? "Deactivate" : "Activate"}
                </Button>
                <div className="ml-auto flex items-center gap-1">
                  <Button variant="ghost" size="icon-sm" onClick={() => move(index, -1)} aria-label="Move up">
                    <MoveUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" onClick={() => move(index, 1)} aria-label="Move down">
                    <MoveDown className="h-3.5 w-3.5" />
                  </Button>
                  <ConfirmDialog
                    title="Delete banner?"
                    description={`"${banner.title || "This banner"}" will be permanently removed from the homepage.`}
                    confirmLabel="Delete"
                    onConfirm={() => remove(banner.id)}
                    trigger={
                      <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
