"use client";

// 대시보드 고정 셸 — BrowserWindowFrame + MissionMenu로 children만 교체
import { type ReactNode } from "react";
import MissionMenu from "@/components/dashboard/MissionMenu";
import BrowserWindowFrame from "@/components/layout/BrowserWindowFrame";

export default function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="block h-dvh max-h-dvh w-full overflow-hidden">
      <BrowserWindowFrame fullBleed className="h-full w-full">
        <MissionMenu>
          <div className="relative h-full min-h-0 overflow-y-auto bg-zinc-100">
            {children}
          </div>
        </MissionMenu>
      </BrowserWindowFrame>
    </div>
  );
}
