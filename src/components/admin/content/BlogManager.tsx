"use client";

import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/admin/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";
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
import { ImagePlaceholder } from "@/components/admin/ImagePlaceholder";
import { contentStatusTone } from "@/lib/admin/status";
import { formatAdminDate } from "@/lib/admin/format";
import type { BlogArticle, ContentStatus } from "@/types/admin";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const emptyArticle: BlogArticle = {
  id: "",
  title: "",
  slug: "",
  excerpt: "",
  author: "Vylore Editorial",
  status: "draft",
};

function ArticleFormDialog({
  article,
  onSave,
  trigger,
}: {
  article: BlogArticle | null;
  onSave: (article: BlogArticle) => void;
  trigger: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<BlogArticle>(article ?? emptyArticle);

  function update<K extends keyof BlogArticle>(key: K, value: BlogArticle[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(title: string) {
    setForm((prev) => ({ ...prev, title, slug: article ? prev.slug : slugify(title) }));
  }

  function handleSubmit() {
    onSave({ ...form, id: form.id || `blog-${Date.now()}`, slug: form.slug || slugify(form.title) });
    toast.success(article ? "Article updated successfully." : "Article created successfully.");
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setForm(article ?? emptyArticle);
      }}
    >
      <DialogTrigger render={<span />}>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{article ? "Edit Article" : "New Article"}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[96px_1fr]">
          <ImagePlaceholder className="h-24 w-24 rounded-lg border border-dashed border-border" />
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="a-title">Title</Label>
              <Input id="a-title" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="a-slug">Slug</Label>
              <Input id="a-slug" value={form.slug} onChange={(e) => update("slug", slugify(e.target.value))} />
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="a-excerpt">Excerpt</Label>
          <Textarea id="a-excerpt" rows={3} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="a-author">Author</Label>
            <Input id="a-author" value={form.author} onChange={(e) => update("author", e.target.value)} />
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
        <DialogFooter>
          <Button onClick={handleSubmit}>{article ? "Save Changes" : "Create Article"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function BlogManager({ initialArticles }: { initialArticles: BlogArticle[] }) {
  const [articles, setArticles] = useState(initialArticles);

  function upsert(article: BlogArticle) {
    setArticles((prev) => {
      const exists = prev.some((a) => a.id === article.id);
      return exists ? prev.map((a) => (a.id === article.id ? article : a)) : [article, ...prev];
    });
  }

  function remove(id: string) {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    toast.success("Article deleted.");
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ArticleFormDialog
          article={null}
          onSave={upsert}
          trigger={
            <Button className="gap-1.5">
              <Plus className="h-4 w-4" /> New Article
            </Button>
          }
        />
      </div>

      {articles.length === 0 ? (
        <AdminEmptyState title="No articles yet" description="Publish your first blog article." />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Article</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <ImagePlaceholder className="h-10 w-10 shrink-0 rounded-md" />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{article.title}</p>
                        <p className="truncate text-xs text-muted-foreground">/{article.slug}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{article.author}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {article.publishedAt ? formatAdminDate(article.publishedAt) : "—"}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={article.status} tone={contentStatusTone[article.status] ?? "neutral"} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <ArticleFormDialog
                        article={article}
                        onSave={upsert}
                        trigger={
                          <Button variant="ghost" size="icon-sm" aria-label="Edit article">
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                        }
                      />
                      <ConfirmDialog
                        trigger={
                          <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive" aria-label="Delete article">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        }
                        title="Delete article?"
                        description={`This will permanently remove "${article.title}".`}
                        confirmLabel="Delete"
                        onConfirm={() => remove(article.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
