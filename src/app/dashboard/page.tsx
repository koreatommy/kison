// 대시보드 기본 콘텐츠 — 랜딩페이지
import { SsgoiTransition } from "@ssgoi/react";
import DashboardLanding from "@/components/dashboard/DashboardLanding";

export default function DashboardPage() {
  return (
    <SsgoiTransition id="/dashboard" className="h-full">
      <DashboardLanding />
    </SsgoiTransition>
  );
}
