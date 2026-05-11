// 결과 분석 중 로딩 화면 (1.5초 후 /result로 자동 이동)
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoadingResultPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/result");
    }, 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-200 border-t-blue-500" />
      <div className="text-center">
        <p className="text-lg font-bold text-zinc-800">결과를 분석하고 있어요</p>
        <p className="mt-1 text-sm text-zinc-500">
          나에게 맞는 창업 캐릭터를 찾고 있어요...
        </p>
      </div>
    </div>
  );
}
