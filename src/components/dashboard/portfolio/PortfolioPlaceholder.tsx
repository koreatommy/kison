"use client";

// 포트폴리오 서브 섹션 준비 중 플레이스홀더
type PortfolioPlaceholderProps = {
  title: string;
  description?: string;
};

export default function PortfolioPlaceholder({
  title,
  description = "콘텐츠를 준비 중입니다.",
}: PortfolioPlaceholderProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-200 text-2xl">
        📋
      </div>
      <h2 className="text-lg font-bold text-zinc-800 sm:text-xl">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-zinc-500">{description}</p>
    </div>
  );
}
