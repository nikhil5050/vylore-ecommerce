"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/admin/ui/card";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Textarea } from "@/components/admin/ui/textarea";
import { Label } from "@/components/admin/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/admin/ui/dialog";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { StarRating } from "@/components/admin/content/StarRating";
import { ImagePlaceholder } from "@/components/admin/ImagePlaceholder";
import { contentStatusTone } from "@/lib/admin/status";
import type { ContentStatus, Testimonial } from "@/types/admin";

const emptyTestimonial: Testimonial = {
  id: "",
  customerName: "",
  rating: 5,
  quote: "",
  status: "draft",
};

function TestimonialFormDialog({
  testimonial,
  onSave,
  trigger,
}: {
  testimonial: Testimonial | null;
  onSave: (t: Testimonial) => void;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Testimonial>(testimonial ?? emptyTestimonial);

  function update<K extends keyof Testimonial>(key: K, value: Testimonial[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit() {
    onSave({ ...form, id: form.id || `test-${Date.now()}` });
    toast.success(testimonial ? "Testimonial updated successfully." : "Testimonial added successfully.");
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setForm(testimonial ?? emptyTestimonial);
      }}
    >
      <DialogTrigger render={<span />}>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{testimonial ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <ImagePlaceholder className="h-12 w-12 shrink-0 rounded-full" />
            <div className="flex-1 space-y-1.5">
              <Label htmlFor="t-name">Customer Name</Label>
              <Input id="t-name" value={form.customerName} onChange={(e) => update("customerName", e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Rating</Label>
              <Select value={String(form.rating)} onValueChange={(v) => v && update("rating", Number(v))}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 4, 3, 2, 1].map((r) => (
                    <SelectItem key={r} value={String(r)}>
                      {r} Star{r > 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => v && update("status", v as ContentStatus)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["draft", "active", "inactive"] as ContentStatus[]).map((status) => (
                    <SelectItem key={status} value={status} className="capitalize">
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="t-quote">Quote</Label>
            <Textarea id="t-quote" rows={3} value={form.quote} onChange={(e) => update("quote", e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>{testimonial ? "Save Changes" : "Add Testimonial"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function TestimonialsManager({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);

  function upsert(testimonial: Testimonial) {
    setTestimonials((prev) => {
      const exists = prev.some((t) => t.id === testimonial.id);
      return exists ? prev.map((t) => (t.id === testimonial.id ? testimonial : t)) : [testimonial, ...prev];
    });
  }

  function remove(id: string) {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    toast.success("Testimonial deleted.");
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <TestimonialFormDialog
          testimonial={null}
          onSave={upsert}
          trigger={
            <Button className="gap-1.5">
              <Plus className="h-4 w-4" /> Add Testimonial
            </Button>
          }
        />
      </div>

      {testimonials.length === 0 ? (
        <AdminEmptyState title="No testimonials yet" description="Add your first customer testimonial." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <ImagePlaceholder className="h-9 w-9 shrink-0 rounded-full" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{testimonial.customerName}</p>
                      <StarRating rating={testimonial.rating} />
                    </div>
                  </div>
                  <StatusBadge status={testimonial.status} tone={contentStatusTone[testimonial.status] ?? "neutral"} />
                </div>
                <p className="text-sm text-muted-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-1.5 border-t border-border pt-3">
                  <TestimonialFormDialog
                    testimonial={testimonial}
                    onSave={upsert}
                    trigger={
                      <Button variant="outline" size="sm" className="gap-1.5">
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </Button>
                    }
                  />
                  <ConfirmDialog
                    trigger={
                      <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive">
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </Button>
                    }
                    title="Delete testimonial?"
                    description={`This will permanently remove ${testimonial.customerName}'s testimonial.`}
                    confirmLabel="Delete"
                    onConfirm={() => remove(testimonial.id)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
