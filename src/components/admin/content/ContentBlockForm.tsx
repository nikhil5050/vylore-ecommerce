"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Textarea } from "@/components/admin/ui/textarea";
import { Label } from "@/components/admin/ui/label";
import { Button } from "@/components/admin/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import { ImagePlaceholder } from "@/components/admin/ImagePlaceholder";
import type { ContentBlock, ContentStatus } from "@/types/admin";

const statusOptions: ContentStatus[] = ["draft", "active", "inactive", "scheduled", "expired"];

interface ContentBlockFormProps {
  title: string;
  description?: string;
  block: ContentBlock;
  onSave?: (block: ContentBlock) => void;
}

export function ContentBlockForm({ title, description, block, onSave }: ContentBlockFormProps) {
  const [form, setForm] = useState<ContentBlock>(block);
  const [saving, setSaving] = useState(false);

  function update<K extends keyof ContentBlock>(key: K, value: ContentBlock[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setSaving(false);
    onSave?.(form);
    toast.success(`${title} saved successfully.`);
  }

  return (
    <Card>
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-base">{title}</CardTitle>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 pt-4 lg:grid-cols-[220px_1fr]">
        <div className="space-y-2">
          <Label>Image</Label>
          <ImagePlaceholder className="aspect-square w-full rounded-lg border border-dashed border-border" />
          <p className="text-xs text-muted-foreground">Recommended: 1600 × 1000px. Cloudinary upload coming soon.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="cb-title">Title</Label>
            <Input id="cb-title" value={form.title} onChange={(e) => update("title", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cb-subtitle">Subtitle</Label>
            <Input id="cb-subtitle" value={form.subtitle ?? ""} onChange={(e) => update("subtitle", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cb-order">Ordering</Label>
            <Input
              id="cb-order"
              type="number"
              value={form.order}
              onChange={(e) => update("order", Number(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="cb-description">Description</Label>
            <Textarea
              id="cb-description"
              rows={3}
              value={form.description ?? ""}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cb-cta-text">CTA Text</Label>
            <Input id="cb-cta-text" value={form.ctaText ?? ""} onChange={(e) => update("ctaText", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cb-cta-link">CTA Link</Label>
            <Input id="cb-cta-link" value={form.ctaLink ?? ""} onChange={(e) => update("ctaLink", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Status</Label>
            <Select value={form.status} onValueChange={(value) => value && update("status", value as ContentStatus)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status} className="capitalize">
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={saving} className="gap-1.5">
          <Save className="h-4 w-4" />
          {saving ? "Saving…" : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  );
}
