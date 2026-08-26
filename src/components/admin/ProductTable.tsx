"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Eye, MoreHorizontal, Package, Pencil, Search, Trash2 } from "lucide-react";
import { Card } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/admin/ui/dropdown-menu";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { ImagePlaceholder } from "@/components/admin/ImagePlaceholder";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { stockStatusTone } from "@/lib/admin/status";
import { formatAdminDate } from "@/lib/admin/format";
import { formatPrice } from "@/utils/formatPrice";
import { deleteProduct } from "@/lib/admin/api";
import type { ProductListItem } from "@/types/admin";

interface ProductTableProps {
  products: ProductListItem[];
  categories?: string[];
}

export function ProductTable({ products: initialProducts, categories = [] }: ProductTableProps) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || product.categoryName === category;
      const matchesStatus = status === "all" || (status === "active" ? product.isActive : !product.isActive);
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, search, category, status]);

  async function handleDelete(product: ProductListItem) {
    try {
      await deleteProduct(product.id);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
      toast.success(`${product.name} deleted.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Couldn't delete product.");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or SKU…"
            className="pl-8"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {categories.length > 0 && (
            <Select value={category} onValueChange={(value) => setCategory(value ?? "all")}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Select value={status} onValueChange={(value) => setStatus(value ?? "all")}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="overflow-hidden py-0">
        {filtered.length === 0 ? (
          <AdminEmptyState icon={Package} title="No products found" description="Try adjusting your search or filters." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Link href={`/admin/products/${product.id}`} className="flex items-center gap-2.5">
                      {product.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={`${product.imageUrl}?tr=w-72`} alt="" className="h-9 w-9 shrink-0 rounded-md object-cover" />
                      ) : (
                        <ImagePlaceholder className="h-9 w-9 shrink-0 rounded-md" />
                      )}
                      <span className="font-medium text-foreground hover:text-primary hover:underline">{product.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                  <TableCell className="text-muted-foreground">{product.categoryName}</TableCell>
                  <TableCell>
                    <span className="font-medium text-foreground">{formatPrice(product.price)}</span>
                    {product.compareAtPrice && product.compareAtPrice > product.price && (
                      <span className="ml-1.5 text-xs text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{product.stock}</span>
                      <StatusBadge status={product.stockStatus} tone={stockStatusTone[product.stockStatus] ?? "neutral"} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={product.isActive ? "active" : "inactive"} tone={product.isActive ? "success" : "neutral"} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">{formatAdminDate(product.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <button
                              type="button"
                              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                              aria-label="Product actions"
                            />
                          }
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem render={<Link href={`/admin/products/${product.id}`} />}>
                            <Eye className="h-4 w-4" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem render={<Link href={`/admin/products/${product.id}`} />}>
                            <Pencil className="h-4 w-4" /> Edit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <ConfirmDialog
                        trigger={
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            aria-label="Delete product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        }
                        title="Delete this product?"
                        description={`"${product.name}" will be permanently removed. This action cannot be undone.`}
                        confirmLabel="Delete"
                        onConfirm={() => handleDelete(product)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
