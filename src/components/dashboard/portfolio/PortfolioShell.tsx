"use client";

// 포트폴리오 팀 소개 — 3개 팀(초등부 A, 초등부 B, 중등부) 탭 메뉴 + 콘텐츠 전환
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TeamJcalp from "./TeamJcalp";
import TeamIm from "./TeamIm";
import TeamAce from "./TeamAce";

type TeamId = "jcalp" | "im" | "ace";

const TEAMS: {
  id: TeamId;
  label: string;
  sublabel: string;
  color: string;
  bgGradient: string;
}[] = [
  {
    id: "jcalp",
    label: "초등부 A",
    sublabel: "JCALP",
    color: "#F5A623",
    bgGradient: "from-amber-400 to-orange-500",
  },
  {
    id: "im",
    label: "초등부 B",
    sublabel: "IM",
    color: "#4F46E5",
    bgGradient: "from-indigo-500 to-violet-500",
  },
  {
    id: "ace",
    label: "중등부",
    sublabel: "ACE",
    color: "#7C3AED",
    bgGradient: "from-violet-500 to-purple-600",
  },
];

const TEAM_COMPONENTS: Record<TeamId, React.ComponentType> = {
  jcalp: TeamJcalp,
  im: TeamIm,
  ace: TeamAce,
};

export default function PortfolioShell() {
  const [activeTeam, setActiveTeam] = useState<TeamId>("jcalp");
  const ActiveComponent = TEAM_COMPONENTS[activeTeam];
  const activeTeamData = TEAMS.find((t) => t.id === activeTeam)!;

  return (
    <div className="flex h-full flex-col bg-zinc-100">
      {/* 탭 메뉴 */}
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center gap-1 overflow-x-auto px-3 py-2 sm:gap-2 sm:px-4 sm:py-3">
          {TEAMS.map((team) => {
            const isActive = activeTeam === team.id;
            return (
              <button
                key={team.id}
                type="button"
                onClick={() => setActiveTeam(team.id)}
                className={`relative flex shrink-0 flex-col items-center rounded-xl px-4 py-2 transition-all duration-200 sm:px-5 sm:py-2.5 ${
                  isActive
                    ? "bg-zinc-900 text-white shadow-lg"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                <span className="text-xs font-bold sm:text-sm">{team.label}</span>
                <span
                  className={`mt-0.5 text-[10px] font-semibold tracking-wider sm:text-xs ${
                    isActive ? "text-zinc-300" : "text-zinc-400"
                  }`}
                >
                  {team.sublabel}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute -bottom-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full sm:-bottom-2.5 sm:w-10"
                    style={{ backgroundColor: team.color }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* 콘텐츠 영역 */}
      <div className="relative min-h-0 flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTeam}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="min-h-full"
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
