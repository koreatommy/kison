// 대시보드 AI 창업지원 라우트 — 클라이언트 동적 로딩
"use client";

import dynamic from "next/dynamic";
import { SsgoiTransition } from "@ssgoi/react";

const StartupSupportShell = dynamic(
  () => import("@/components/dashboard/startup-support/StartupSupportShell"),
  { ssr: false },
);

export default function StartupSupportPage() {
  return (
    <SsgoiTransition id="/dashboard/startup-support" className="h-full">
      <StartupSupportShell />
    </SsgoiTransition>
  );
}
