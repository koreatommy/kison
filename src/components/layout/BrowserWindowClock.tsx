"use client";

// 브라우저 크롬 우측 실시간 날짜·시간 표시 (한 줄 레이아웃)
import { useEffect, useState } from "react";

function formatParts(date: Date) {
  const year = new Intl.DateTimeFormat("ko-KR", { year: "numeric" }).format(date);
  const monthDay = new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
  }).format(date);
  const weekday = new Intl.DateTimeFormat("ko-KR", { weekday: "long" }).format(
    date,
  );
  const time = new Intl.DateTimeFormat("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
  const timeShort = new Intl.DateTimeFormat("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  return { year, monthDay, weekday, time, timeShort };
}

const pillClass =
  "flex shrink-0 items-center gap-2 rounded-full border border-white/[0.06] bg-[#2a2a2c] px-2.5 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:gap-2.5 sm:px-3";

export default function BrowserWindowClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return <div className={`h-7 w-36 ${pillClass}`} aria-hidden />;
  }

  const { year, monthDay, weekday, time, timeShort } = formatParts(now);
  const ariaLabel = `${year} ${monthDay} ${weekday} ${time}`;

  return (
    <div className={pillClass} aria-label={ariaLabel}>
      <p className="min-w-0 truncate whitespace-nowrap text-[10px] font-extrabold leading-none text-zinc-200 sm:text-[11px]">
        <span className="font-bold text-zinc-500">{year}</span> {monthDay}{" "}
        <span className="text-amber-400/90">{weekday}</span>
      </p>

      <span className="h-3.5 w-px shrink-0 bg-white/12" aria-hidden />

      <time
        dateTime={now.toISOString()}
        className="shrink-0 whitespace-nowrap text-xs font-black tabular-nums text-amber-300 sm:text-sm"
        suppressHydrationWarning
      >
        <span className="sm:hidden">{timeShort}</span>
        <span className="hidden sm:inline">{time}</span>
      </time>
    </div>
  );
}
