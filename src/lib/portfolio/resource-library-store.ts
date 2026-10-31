// 자료실 게시물(이름·파일)을 IndexedDB에 저장·조회·삭제하는 유틸

const DB_NAME = "kison-resource-library";
const DB_VERSION = 1;
const STORE_NAME = "items";

export type ResourceItem = {
  id: string;
  name: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  blob: Blob;
  createdAt: number;
};

export type ResourceItemMeta = Omit<ResourceItem, "blob">;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("createdAt", "createdAt", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("IndexedDB open failed"));
  });
}

function toMeta(item: ResourceItem): ResourceItemMeta {
  return {
    id: item.id,
    name: item.name,
    fileName: item.fileName,
    fileType: item.fileType,
    fileSize: item.fileSize,
    createdAt: item.createdAt,
  };
}

export async function listResourceItems(): Promise<ResourceItemMeta[]> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const items = (request.result as ResourceItem[])
        .map(toMeta)
        .sort((a, b) => b.createdAt - a.createdAt);
      resolve(items);
    };
    request.onerror = () => reject(request.error ?? new Error("list failed"));
  });
}

export async function addResourceItem(input: {
  name: string;
  file: File;
}): Promise<ResourceItemMeta> {
  const item: ResourceItem = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    fileName: input.file.name,
    fileType: input.file.type || "application/octet-stream",
    fileSize: input.file.size,
    blob: input.file,
    createdAt: Date.now(),
  };

  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).add(item);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("add failed"));
  });

  return toMeta(item);
}

export async function getResourceBlob(id: string): Promise<Blob | null> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const request = db.transaction(STORE_NAME, "readonly").objectStore(STORE_NAME).get(id);
    request.onsuccess = () => {
      const item = request.result as ResourceItem | undefined;
      resolve(item?.blob ?? null);
    };
    request.onerror = () => reject(request.error ?? new Error("get failed"));
  });
}

export async function deleteResourceItem(id: string): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("delete failed"));
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
