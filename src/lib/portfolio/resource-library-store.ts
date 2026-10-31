// 자료실 게시물 API 클라이언트 (Supabase 공유 저장)

export type ResourceItemMeta = {
  id: string;
  name: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  publicUrl: string;
  createdAt: number;
};

type ApiResource = {
  id: string;
  name: string;
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
    fileName: item.fileName,
    fileType: item.fileType,
    fileSize: item.fileSize,
    publicUrl: item.publicUrl,
    createdAt: new Date(item.createdAt).getTime(),
  };
}

export async function listResourceItems(): Promise<ResourceItemMeta[]> {
  const res = await fetch("/api/portfolio/resources", { cache: "no-store" });
  if (!res.ok) throw new Error("list failed");
  const data = (await res.json()) as { items: ApiResource[] };
  return data.items.map(toMeta);
}

export async function addResourceItem(input: {
  name: string;
  file: File;
}): Promise<ResourceItemMeta> {
  const form = new FormData();
  form.set("name", input.name.trim());
  form.set("file", input.file);

  const res = await fetch("/api/portfolio/resources", {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? "upload failed");
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
