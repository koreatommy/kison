"use client";

// 포트폴리오 자료실 — 제목·작성자·파일 업로드와 공유 목록 조회
import { useEffect, useRef, useState } from "react";
import { Download, FileText, FileUp, Image as ImageIcon, Trash2, Upload } from "lucide-react";
import {
  addResourceItem,
  deleteResourceItem,
  formatFileSize,
  listResourceItems,
  type ResourceItemMeta,
} from "@/lib/portfolio/resource-library-store";

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|bmp|svg|heic|heif|avif|tiff?)$/i;

function isImageResource(item: Pick<ResourceItemMeta, "fileType" | "fileName">): boolean {
  if (item.fileType.startsWith("image/")) return true;
  return IMAGE_EXT.test(item.fileName);
}

function ResourceTypeIcon({ item }: { item: ResourceItemMeta }) {
  const isImage = isImageResource(item);
  const Icon = isImage ? ImageIcon : FileText;
  const label = isImage ? "사진" : "문서";

  return (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
        isImage ? "bg-sky-50 text-sky-600" : "bg-amber-50 text-amber-700"
      }`}
      aria-label={label}
      title={label}
    >
      <Icon className="h-4 w-4" />
    </span>
  );
}

export default function ResourceLibrary() {
  const [items, setItems] = useState<ResourceItemMeta[]>([]);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    listResourceItems()
      .then((list) => {
        if (!cancelled) setItems(list);
      })
      .catch(() => {
        if (!cancelled) setError("자료 목록을 불러오지 못했습니다.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const canSubmit =
    name.trim().length > 0 && author.trim().length > 0 && file !== null && !busy;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name.trim() || !author.trim()) {
      setError("자료 제목, 작성자, 파일을 모두 입력해 주세요.");
      return;
    }

    setError(null);
    setBusy(true);
    try {
      const created = await addResourceItem({
        name: name.trim(),
        author: author.trim(),
        file,
      });
      setItems((prev) => [created, ...prev]);
      setName("");
      setAuthor("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "업로드에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setBusy(false);
    }
  };

  const handleDownload = (item: ResourceItemMeta) => {
    const a = document.createElement("a");
    a.href = item.publicUrl;
    a.download = item.fileName;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  };

  const handleDelete = async (id: string) => {
    setBusy(true);
    setError(null);
    try {
      await deleteResourceItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      setError("삭제에 실패했습니다.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-zinc-900 sm:text-2xl">자료실</h1>
        <p className="mt-1 text-sm text-zinc-500">
          제목과 작성자를 적고 파일을 첨부하면 모든 사용자가 목록에서 확인할 수 있습니다. 파일은
          20MB까지 업로드할 수 있습니다.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-8 space-y-4 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="resource-name"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              자료 제목
            </label>
            <input
              id="resource-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="자료 제목을 입력하세요"
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 focus:bg-white"
            />
          </div>
          <div>
            <label
              htmlFor="resource-author"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              작성자
            </label>
            <input
              id="resource-author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="작성자 이름을 입력하세요"
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 focus:bg-white"
            />
          </div>
        </div>

        <div>
          <span className="mb-1.5 block text-sm font-medium text-zinc-700">파일</span>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full items-center gap-3 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-3 text-left transition hover:border-zinc-400 hover:bg-zinc-100"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-zinc-500 shadow-sm">
              <FileUp className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              {file ? (
                <>
                  <span className="block truncate text-sm font-medium text-zinc-800">
                    {file.name}
                  </span>
                  <span className="text-xs text-zinc-500">{formatFileSize(file.size)}</span>
                </>
              ) : (
                <span className="text-sm text-zinc-500">클릭해서 파일을 선택하세요</span>
              )}
            </span>
          </button>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          <Upload className="h-4 w-4" />
          {busy ? "업로드 중…" : "업로드"}
        </button>
      </form>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-zinc-700">
          자료 목록
          {!loading && (
            <span className="ml-1.5 font-normal text-zinc-400">({items.length})</span>
          )}
        </h2>

        {loading ? (
          <p className="py-10 text-center text-sm text-zinc-400">불러오는 중…</p>
        ) : items.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-zinc-200 bg-white py-12 text-center text-sm text-zinc-400">
            아직 업로드된 자료가 없습니다.
          </p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            <div className="grid grid-cols-[2.5rem_minmax(0,1fr)_5.5rem_4.5rem] items-center gap-2 border-b border-zinc-100 bg-zinc-50 px-3 py-2.5 text-xs font-medium text-zinc-500 sm:grid-cols-[3rem_2.5rem_minmax(0,1fr)_7rem_5rem] sm:gap-3 sm:px-4">
              <span className="text-center">순번</span>
              <span className="hidden sm:block" aria-hidden />
              <span>자료 제목</span>
              <span>작성자</span>
              <span className="sr-only">관리</span>
            </div>
            <ul className="divide-y divide-zinc-100">
              {items.map((item, index) => (
                <li
                  key={item.id}
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)_5.5rem_4.5rem] items-center gap-2 px-3 py-3 sm:grid-cols-[3rem_2.5rem_minmax(0,1fr)_7rem_5rem] sm:gap-3 sm:px-4"
                >
                  <span className="text-center text-sm tabular-nums text-zinc-500">
                    {index + 1}
                  </span>
                  <span className="hidden sm:flex sm:justify-center">
                    <ResourceTypeIcon item={item} />
                  </span>
                  <div className="min-w-0">
                    <div className="flex min-w-0 items-center gap-2 sm:block">
                      <span className="sm:hidden">
                        <ResourceTypeIcon item={item} />
                      </span>
                      <p className="truncate text-sm font-semibold text-zinc-900">{item.name}</p>
                    </div>
                  </div>
                  <p className="truncate text-sm text-zinc-600">{item.author || "-"}</p>
                  <div className="flex items-center justify-end gap-0.5">
                    <button
                      type="button"
                      onClick={() => handleDownload(item)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
                      aria-label={`${item.name} 다운로드`}
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      disabled={busy}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                      aria-label={`${item.name} 삭제`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
