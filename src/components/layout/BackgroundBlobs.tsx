// 배경 장식용 파스텔 블롭 (시작/프로필/로딩 페이지 공통)
type Props = {
  variant?: "indigo" | "pink" | "amber";
};

const variants: Record<NonNullable<Props["variant"]>, string[]> = {
  indigo: ["bg-indigo-200/40", "bg-violet-200/40", "bg-sky-200/40"],
  pink: ["bg-pink-200/40", "bg-rose-200/40", "bg-amber-200/40"],
  amber: ["bg-amber-200/40", "bg-emerald-200/40", "bg-sky-200/40"],
};

export default function BackgroundBlobs({ variant = "indigo" }: Props) {
  const [a, b, c] = variants[variant];

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className={`absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl animate-blob ${a}`}
      />
      <div
        className={`absolute top-1/3 -right-32 h-96 w-96 rounded-full blur-3xl animate-blob ${b}`}
        style={{ animationDelay: "3s" }}
      />
      <div
        className={`absolute -bottom-32 left-1/4 h-80 w-80 rounded-full blur-3xl animate-blob ${c}`}
        style={{ animationDelay: "6s" }}
      />
    </div>
  );
}
