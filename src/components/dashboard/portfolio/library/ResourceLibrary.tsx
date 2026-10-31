"use client";

// 포트폴리오 자료실 — 이름+파일 업로드와 공유 목록 조회
import { useEffect, useRef, useState } from "react";
import { Download, FileUp, Trash2, Upload } from "lucide-react";
import {
  addResourceItem,
  deleteResourceItem,
  formatFileSize,
  listResourceItems,
  type ResourceItemMeta,
} from "@/lib/portfolio/resource-library-store";

export default function ResourceLibrary() {
  const [items, setItems] = useState<ResourceItemMeta[]>([]);
  const [name, setName] = useState("");
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

  const canSubmit = name.trim().length > 0 && file !== null && !busy;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name.trim()) {
      setError("이름과 파일을 모두 입력해 주세요.");
      return;
    }

    setError(null);
    setBusy(true);
    try {
      const created = await addResourceItem({ name: name.trim(), file });
      setItems((prev) => [created, ...prev]);
      setName("");
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
          이름을 적고 파일을 첨부하면 모든 사용자가 목록에서 확인할 수 있습니다.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-8 space-y-4 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5"
      >
        <div>
          <label htmlFor="resource-name" className="mb-1.5 block text-sm font-medium text-zinc-700">
            이름
          </label>
          <input
            id="resource-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="자료 이름을 입력하세요"
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 focus:bg-white"
          />
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
          <ul className="divide-y divide-zinc-100 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 px-4 py-3.5 sm:gap-4 sm:px-5"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-zinc-900">{item.name}</p>
                  <p className="mt-0.5 truncate text-xs text-zinc-500">
                    {item.fileName} · {formatFileSize(item.fileSize)} ·{" "}
                    {new Date(item.createdAt).toLocaleDateString("ko-KR")}
                  </p>
                </div>
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
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
