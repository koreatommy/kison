// 자료실 클라이언트 — Vercel Blob 직접 업로드 + Supabase 메타 등록
import { upload } from "@vercel/blob/client";
import {
  MAX_RESOURCE_FILE_SIZE,
  RESOURCE_BLOB_PREFIX,
  sanitizeResourceFileName,
} from "@/lib/portfolio/resource-limits";

export type ResourceItemMeta = {
  id: string;
  name: string;
  author: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  publicUrl: string;
  createdAt: number;
};

type ApiResource = {
  id: string;
  name: string;
  author: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  publicUrl: string;
  createdAt: string;
};

function toMeta(item: ApiResource): ResourceItemMeta {
  return {
    id: item.id,
    name: item.name,
    author: item.author ?? "",
    fileName: item.fileName,
    fileType: item.fileType,
    fileSize: item.fileSize,
    publicUrl: item.publicUrl,
    createdAt: new Date(item.createdAt).getTime(),
  };
}

async function readErrorMessage(res: Response): Promise<string> {
  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    if (body?.error) return body.error;
  } else {
    const text = await res.text().catch(() => "");
    if (text.includes("FUNCTION_PAYLOAD_TOO_LARGE") || res.status === 413) {
      return "파일이 너무 큽니다. 20MB 이하로 올려 주세요.";
    }
    if (text.trim()) return text.trim().slice(0, 200);
  }
  return "upload failed";
}

export async function listResourceItems(): Promise<ResourceItemMeta[]> {
  const res = await fetch("/api/portfolio/resources", { cache: "no-store" });
  if (!res.ok) throw new Error("list failed");
  const data = (await res.json()) as { items: ApiResource[] };
  return data.items.map(toMeta);
}

export async function addResourceItem(input: {
  name: string;
  author: string;
  file: File;
}): Promise<ResourceItemMeta> {
  const name = input.name.trim();
  const author = input.author.trim();
  const file = input.file;

  if (!name) throw new Error("자료 제목을 입력해 주세요.");
  if (!author) throw new Error("작성자 이름을 입력해 주세요.");
  if (file.size <= 0) throw new Error("빈 파일은 업로드할 수 없습니다.");
  if (file.size > MAX_RESOURCE_FILE_SIZE) {
    throw new Error("파일은 20MB 이하여야 합니다.");
  }

  const id = crypto.randomUUID();
  const safeName = sanitizeResourceFileName(file.name);
  const storagePath = `${RESOURCE_BLOB_PREFIX}/${id}/${safeName}`;
  const fileType = file.type || "application/octet-stream";

  const blob = await upload(storagePath, file, {
    access: "public",
    contentType: fileType,
    handleUploadUrl: "/api/portfolio/resources/upload",
    multipart: file.size > 4 * 1024 * 1024,
  });

  const res = await fetch("/api/portfolio/resources", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      name,
      author,
      fileName: file.name,
      fileType,
      fileSize: file.size,
      storagePath,
      publicUrl: blob.url,
    }),
  });

  if (!res.ok) {
    throw new Error(await readErrorMessage(res));
  }

  const data = (await res.json()) as { item: ApiResource };
  return toMeta(data.item);
}

export async function deleteResourceItem(id: string): Promise<void> {
  const res = await fetch(`/api/portfolio/resources/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("delete failed");
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
