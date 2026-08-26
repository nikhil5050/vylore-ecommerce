"use client";

import { useRef, useState } from "react";
import { GripVertical, ImagePlus, Loader2, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ImagePlaceholder } from "@/components/admin/ImagePlaceholder";
import { uploadProductImage } from "@/services/admin/media.service";
import { addProductImage, deleteProductImage, reorderProductImages } from "@/lib/admin/api";
import type { ProductImage } from "@/types/admin";

interface ProductImageUploaderProps {
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
  // Present once the product exists on the backend — image changes are then
  // persisted immediately via the images API instead of buffered in form state.
  productId?: string;
  // ImageKit folder segment: the product id for an existing product, or a
  // client-generated temp session id while the product is still being created.
  folderId: string;
}

export function ProductImageUploader({ images, onChange, productId, folderId }: ProductImageUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  async function addFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading((n) => n + files.length);
    try {
      for (const file of Array.from(files)) {
        try {
          const asset = await uploadProductImage(file, `/vylore/products/${folderId}/`);
          if (productId) {
            const updated = await addProductImage(productId, {
              mediaAssetId: asset.mediaAssetId,
              isPrimary: images.length === 0,
            });
            onChange(updated.images);
          } else {
            const next: ProductImage = {
              id: asset.mediaAssetId,
              mediaAssetId: asset.mediaAssetId,
              url: asset.url,
              position: images.length,
              isPrimary: images.length === 0,
            };
            onChange([...images, next]);
          }
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Image upload failed.");
        } finally {
          setUploading((n) => n - 1);
        }
      }
    } finally {
      setUploading(0);
    }
  }

  async function setMain(image: ProductImage) {
    if (productId) return; // primary is fixed once attached — reorder instead.
    onChange([image, ...images.filter((i) => i.id !== image.id)].map((img, index) => ({ ...img, position: index, isPrimary: index === 0 })));
  }

  async function removeImage(image: ProductImage) {
    if (productId) {
      try {
        const updated = await deleteProductImage(productId, image.id);
        onChange(updated.images);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Couldn't remove image.");
      }
      return;
    }
    const next = images.filter((i) => i.id !== image.id).map((img, index) => ({ ...img, position: index, isPrimary: index === 0 }));
    onChange(next);
  }

  async function reorder(targetId: string) {
    if (!draggedId || draggedId === targetId) return;
    const from = images.findIndex((img) => img.id === draggedId);
    const to = images.findIndex((img) => img.id === targetId);
    if (from === -1 || to === -1) return;
    const next = [...images];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    const reindexed = next.map((img, index) => ({ ...img, position: index, isPrimary: index === 0 }));

    if (productId) {
      try {
        const updated = await reorderProductImages(productId, reindexed.map((img) => img.id));
        onChange(updated.images);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Couldn't reorder images.");
      }
      return;
    }
    onChange(reindexed);
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors",
          dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 hover:bg-muted/50",
        )}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          {uploading > 0 ? <Loader2 className="h-5 w-5 animate-spin" /> : <ImagePlus className="h-5 w-5" />}
        </span>
        <p className="text-sm font-medium text-foreground">
          {uploading > 0 ? `Uploading ${uploading} image${uploading > 1 ? "s" : ""}…` : "Drag & drop images, or click to browse"}
        </p>
        <p className="text-xs text-muted-foreground">Recommended: 1200 &times; 1200px &middot; JPG or PNG</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {[...images]
            .sort((a, b) => a.position - b.position)
            .map((image) => (
              <div
                key={image.id}
                draggable
                onDragStart={() => setDraggedId(image.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => reorder(image.id)}
                className={cn(
                  "group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted",
                  draggedId === image.id && "opacity-50",
                )}
              >
                {image.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`${image.url}?tr=w-300`} alt={image.altText ?? ""} className="h-full w-full object-cover" />
                ) : (
                  <ImagePlaceholder className="h-full w-full" />
                )}

                <span className="absolute left-1.5 top-1.5 flex h-5 w-5 cursor-grab items-center justify-center rounded bg-background/80 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  <GripVertical className="h-3.5 w-3.5" />
                </span>

                {image.position === 0 && (
                  <span className="absolute left-1.5 bottom-1.5 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                    Primary
                  </span>
                )}

                <div className="absolute right-1.5 top-1.5 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  {!productId && image.position !== 0 && (
                    <button
                      type="button"
                      onClick={() => setMain(image)}
                      title="Set as primary image"
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-background/90 text-muted-foreground hover:text-primary"
                    >
                      <Star className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(image)}
                    title="Delete image"
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-background/90 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
      {productId ? (
        <p className="text-xs text-muted-foreground">Drag to reorder — the first image is used as the primary image.</p>
      ) : null}
    </div>
  );
}
