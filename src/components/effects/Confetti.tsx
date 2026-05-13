// 결과 화면 진입 시 캐릭터 컬러 기반 컨페티 이펙트
"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

type Props = {
  colors: string[];
  trigger: unknown;
};

export default function Confetti({ colors, trigger }: Props) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const duration = 800;
    const end = Date.now() + duration;

    const fire = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors,
        scalar: 0.9,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors,
        scalar: 0.9,
      });

      if (Date.now() < end) {
        requestAnimationFrame(fire);
      }
    };

    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors,
      scalar: 1.1,
    });
    fire();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return null;
}
