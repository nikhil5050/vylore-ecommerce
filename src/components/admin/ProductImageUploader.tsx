"use client";

import { useRef, useState } from "react";
import { GripVertical, ImagePlus, Star, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImagePlaceholder } from "@/components/admin/ImagePlaceholder";
import type { ProductImage } from "@/types/admin";

interface ProductImageUploaderProps {
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
}

export function ProductImageUploader({ images, onChange }: ProductImageUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(files: FileList | null) {
    if (!files?.length) return;
    const next: ProductImage[] = Array.from(files).map((file, index) => ({
      id: `img-${Date.now()}-${index}-${Math.round(Math.random() * 1e6)}`,
      url: URL.createObjectURL(file),
      isMain: images.length === 0 && index === 0,
      order: images.length + index,
    }));
    onChange([...images, ...next]);
  }

  function setMain(id: string) {
    onChange(images.map((img) => ({ ...img, isMain: img.id === id })));
  }

  function removeImage(id: string) {
    const wasMain = images.find((img) => img.id === id)?.isMain;
    const next = images.filter((img) => img.id !== id);
    if (wasMain && next.length > 0) next[0] = { ...next[0], isMain: true };
    onChange(next.map((img, index) => ({ ...img, order: index })));
  }

  function reorder(targetId: string) {
    if (!draggedId || draggedId === targetId) return;
    const from = images.findIndex((img) => img.id === draggedId);
    const to = images.findIndex((img) => img.id === targetId);
    if (from === -1 || to === -1) return;
    const next = [...images];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next.map((img, index) => ({ ...img, order: index })));
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
          <ImagePlus className="h-5 w-5" />
        </span>
        <p className="text-sm font-medium text-foreground">Drag & drop images, or click to browse</p>
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
            .sort((a, b) => a.order - b.order)
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
                  <img src={image.url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <ImagePlaceholder className="h-full w-full" />
                )}

                <span className="absolute left-1.5 top-1.5 flex h-5 w-5 cursor-grab items-center justify-center rounded bg-background/80 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  <GripVertical className="h-3.5 w-3.5" />
                </span>

                {image.isMain && (
                  <span className="absolute left-1.5 bottom-1.5 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                    Main
                  </span>
                )}

                <div className="absolute right-1.5 top-1.5 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  {!image.isMain && (
                    <button
                      type="button"
                      onClick={() => setMain(image.id)}
                      title="Set as main image"
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-background/90 text-muted-foreground hover:text-primary"
                    >
                      <Star className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
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
    </div>
  );
}
