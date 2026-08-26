import { apiFetch } from "@/lib/api";

// Direct browser -> ImageKit upload flow (PRD media spec):
// 1. GET short-lived signed credentials from our backend.
// 2. POST the file straight to ImageKit's upload API with those credentials.
// 3. Report only the returned fileId back to our backend, which re-verifies
//    everything else (mime type, size, url) against ImageKit's own record —
//    browser-reported metadata is never trusted.

interface UploadAuthResponse {
  token: string;
  expire: number;
  signature: string;
  public_key: string;
  url_endpoint: string;
}

interface MediaAssetOut {
  id: number;
  provider: string;
  provider_file_id: string;
  file_path: string;
  url: string;
  mime_type: string;
  file_size: number;
  original_filename: string | null;
  status: "temporary" | "attached";
  created_at: string;
}

export interface UploadedMediaAsset {
  mediaAssetId: string;
  url: string;
  mimeType: string;
  fileSize: number;
  originalFilename: string | null;
}

function mapMediaAsset(asset: MediaAssetOut): UploadedMediaAsset {
  return {
    mediaAssetId: String(asset.id),
    url: asset.url,
    mimeType: asset.mime_type,
    fileSize: asset.file_size,
    originalFilename: asset.original_filename,
  };
}

interface ImageKitUploadResponse {
  fileId: string;
  message?: string;
}

// `folder` should be /vylore/products/{product_id}/ for an existing product,
// or /vylore/products/{tempSessionId}/ for one not yet created.
export async function uploadProductImage(file: File, folder: string): Promise<UploadedMediaAsset> {
  const auth = await apiFetch<UploadAuthResponse>("/admin/media/upload-auth");

  const form = new FormData();
  form.append("file", file);
  form.append("fileName", file.name);
  form.append("token", auth.token);
  form.append("expire", String(auth.expire));
  form.append("signature", auth.signature);
  form.append("publicKey", auth.public_key);
  form.append("folder", folder);
  form.append("useUniqueFileName", "true");

  const uploadResponse = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    body: form,
  });
  const uploadPayload = (await uploadResponse.json()) as ImageKitUploadResponse;
  if (!uploadResponse.ok) {
    throw new Error(uploadPayload?.message ?? "Image upload to ImageKit failed.");
  }

  const asset = await apiFetch<MediaAssetOut>("/admin/media", {
    method: "POST",
    body: { provider_file_id: uploadPayload.fileId },
  });
  return mapMediaAsset(asset);
}

export async function deleteMediaAsset(mediaAssetId: string): Promise<void> {
  await apiFetch(`/admin/media/${mediaAssetId}`, { method: "DELETE" });
}
