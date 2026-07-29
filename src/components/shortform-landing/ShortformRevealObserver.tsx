// .reveal 요소가 뷰포트에 들어오면 .visible을 붙이는 스크롤 관찰자
"use client";

import { useEffect } from "react";

export default function ShortformRevealObserver() {
  useEffect(() => {
    const targets = document.querySelectorAll(".sf-landing .reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.12 },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return null;
}
