// 자료실 업로드 용량·경로 공통 상수
export const MAX_RESOURCE_FILE_SIZE = 20 * 1024 * 1024;
export const RESOURCE_BLOB_PREFIX = "portfolio-resources";

export function sanitizeResourceFileName(fileName: string): string {
  return fileName.replace(/[^\w.\-()\s가-힣]/g, "_");
}

export function isVercelBlobPublicUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      parsed.hostname.endsWith(".blob.vercel-storage.com")
    );
  } catch {
    return false;
  }
}
