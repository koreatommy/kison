"use client";

// 대시보드 고정 셸 — 현재 경로에 따라 뒤로가기 대상을 동적 결정
import { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import MissionMenu from "@/components/dashboard/MissionMenu";
import BrowserWindowFrame from "@/components/layout/BrowserWindowFrame";

const BACK_MAP: Record<string, { href: string; label: string }> = {
  "/dashboard": { href: "/", label: "인트로로 이동" },
  "/dashboard/profile": { href: "/dashboard", label: "대시보드로 이동" },
  "/dashboard/survey": { href: "/dashboard/profile", label: "프로필로 이동" },
  "/dashboard/result": { href: "/dashboard/survey", label: "설문으로 이동" },
};

export default function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prev = BACK_MAP[pathname] ?? { href: "/dashboard", label: "대시보드로 이동" };

  return (
    <div className="block h-dvh max-h-dvh w-full overflow-hidden">
      <BrowserWindowFrame
        fullBleed
        className="h-full w-full"
        nav={{
          prev,
          current: { href: "/dashboard", label: "팀 구성 1단계" },
          next: null,
        }}
      >
        <MissionMenu>
          <div className="relative h-full min-h-0 overflow-y-auto bg-zinc-100">
            {children}
          </div>
        </MissionMenu>
      </BrowserWindowFrame>
    </div>
  );
}
