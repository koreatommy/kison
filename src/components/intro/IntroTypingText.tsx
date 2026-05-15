// THINK BIG 타이핑 효과 + 글로우 깜빡이는 커서 컴포넌트
"use client";

import { useEffect, useState } from "react";

const FULL_TEXT = "THINK BIG";
const TYPING_SPEED_MS = 120;
const START_DELAY_MS = 400;

export default function IntroTypingText() {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let charIndex = 0;
    let timer: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      charIndex += 1;
      setDisplayed(FULL_TEXT.slice(0, charIndex));
      if (charIndex < FULL_TEXT.length) {
        timer = setTimeout(typeNext, TYPING_SPEED_MS);
      }
    };

    timer = setTimeout(typeNext, START_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <h1
      className="text-5xl font-black tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
      aria-label="THINK BIG"
    >
      {displayed}
      <span
        className="animate-cursor-blink ml-[0.08em] inline-block w-[3px] translate-y-[0.04em] rounded-full align-middle sm:w-[4px] md:w-[5px]"
        style={{
          height: "0.82em",
          background: "linear-gradient(180deg, #fde68a 0%, #f59e0b 50%, #fbbf24 100%)",
        }}
        aria-hidden
      />
    </h1>
  );
}
