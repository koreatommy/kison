"use client";

// 브라우저 주소창 스타일 영역에 창업 명언을 5초 간격으로 교차 페이드
import { useEffect, useState } from "react";
import { STARTUP_QUOTES } from "@/lib/startup-quotes";

const ROTATE_MS = 5000;
const EXIT_MS = 420;

export default function BrowserWindowAddressQuotes() {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsExiting(true);
    }, ROTATE_MS);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isExiting) return;

    const timeout = setTimeout(() => {
      setIndex((i) => (i + 1) % STARTUP_QUOTES.length);
      setIsExiting(false);
    }, EXIT_MS);

    return () => clearTimeout(timeout);
  }, [isExiting]);

  const quote = STARTUP_QUOTES[index];

  return (
    <span
      key={index}
      title={quote}
      className={`address-quote-glow block min-w-0 truncate text-sm font-bold leading-snug sm:text-base ${
        isExiting ? "animate-address-quote-out" : "animate-address-quote-in"
      }`}
      aria-live="polite"
    >
      {quote}
    </span>
  );
}
