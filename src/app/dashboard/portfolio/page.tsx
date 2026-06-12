// 대시보드 포트폴리오 라우트 — 클라이언트 동적 로딩
"use client";

import dynamic from "next/dynamic";
import { SsgoiTransition } from "@ssgoi/react";

const PortfolioShell = dynamic(
  () => import("@/components/dashboard/portfolio/PortfolioShell"),
  { ssr: false },
);

export default function PortfolioPage() {
  return (
    <SsgoiTransition id="/dashboard/portfolio" className="h-full">
      <PortfolioShell />
    </SsgoiTransition>
  );
}
