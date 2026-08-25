"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Pencil, Star, Images, Camera, MessageSquareQuote, PanelTop, Newspaper } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/admin/ui/card";
import { Button } from "@/components/admin/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/admin/ui/dialog";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ContentBlockForm } from "@/components/admin/content/ContentBlockForm";
import { contentStatusTone } from "@/lib/admin/status";
import type { ContentBlock, ContentSection } from "@/types/admin";

const sectionMeta: Record<ContentSection, { label: string; icon: LucideIcon; href?: string }> = {
  hero: { label: "Hero Section", icon: PanelTop, href: "/admin/content/hero" },
  offer_banner: { label: "Offer Banner", icon: Images, href: "/admin/content/banner" },
  featured_products: { label: "Featured Products", icon: Star, href: "/admin/content/featured-products" },
  collections: { label: "Collections", icon: Images },
  testimonials: { label: "Testimonials", icon: MessageSquareQuote, href: "/admin/content/testimonials" },
  about: { label: "About Section", icon: PanelTop },
  instagram: { label: "Instagram Section", icon: Camera },
  blog: { label: "Blog / Articles", icon: Newspaper, href: "/admin/content/blog" },
};

function ContentRow({ block, onSave }: { block: ContentBlock; onSave: (block: ContentBlock) => void }) {
  const meta = sectionMeta[block.section];
  const Icon = meta.icon;
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardContent className="flex items-center gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground">{meta.label}</p>
          <p className="truncate text-xs text-muted-foreground">{block.title}</p>
        </div>
        <StatusBadge status={block.status} tone={contentStatusTone[block.status] ?? "neutral"} />
        <span className="hidden text-xs text-muted-foreground sm:inline">Order {block.order}</span>
        {meta.href ? (
          <Button variant="outline" size="sm" nativeButton={false} render={<Link href={meta.href} />} className="gap-1.5">
            Edit <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        ) : (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button variant="outline" size="sm" className="gap-1.5" />}>
              <Pencil className="h-3.5 w-3.5" /> Edit
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>{meta.label}</DialogTitle>
              </DialogHeader>
              <ContentBlockForm
                title={meta.label}
                block={block}
                onSave={(updated) => {
                  onSave(updated);
                  setOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
}

export function HomepageContentOverview({ initialBlocks }: { initialBlocks: ContentBlock[] }) {
  const [blocks, setBlocks] = useState(initialBlocks);

  function update(updated: ContentBlock) {
    setBlocks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  }

  const sorted = [...blocks].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-3">
      {sorted.map((block) => (
        <ContentRow key={block.id} block={block} onSave={update} />
      ))}
    </div>
  );
}
