// 대시보드 공유 레이아웃 — BrowserWindowFrame + MissionMenu 고정, children만 교체
import type { Metadata } from "next";
import DashboardShell from "@/components/dashboard/DashboardShell";

export const metadata: Metadata = {
  title: "팀 구성 | KISON",
  alternates: {
    canonical: "/dashboard",
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardShell>{children}</DashboardShell>;
}
