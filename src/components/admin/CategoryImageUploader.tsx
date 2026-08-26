"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/admin/SafeImage";
import { uploadProductImage } from "@/services/admin/media.service";

interface CategoryImageUploaderProps {
  imageUrl?: string;
  onChange: (url: string | undefined) => void;
  folderId: string;
}

export function CategoryImageUploader({ imageUrl, onChange, folderId }: CategoryImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    try {
      const asset = await uploadProductImage(file, `/vylore/categories/${folderId}/`);
      onChange(asset.url);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  if (imageUrl) {
    return (
      <div className="relative h-32 w-32 overflow-hidden rounded-lg border border-border">
        <SafeImage src={imageUrl} transform="w-300" className="h-full w-full object-cover" />
        <button
          type="button"
          onClick={() => onChange(undefined)}
          title="Remove image"
          className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-background/90 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFile(e.dataTransfer.files?.[0]);
      }}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "flex h-32 w-32 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed text-center transition-colors",
        dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 hover:bg-muted/50",
      )}
    >
      {uploading ? (
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      ) : (
        <>
          <ImagePlus className="h-5 w-5 text-muted-foreground" />
          <p className="px-2 text-xs text-muted-foreground">Upload image</p>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
}
