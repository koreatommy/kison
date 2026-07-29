"use client";

// 포트폴리오 팀 소개 — 3개 팀(초등부 A, 초등부 B, 중등부) 탭 메뉴 + 콘텐츠 전환
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TeamJcalp from "./TeamJcalp";
import TeamIm from "./TeamIm";
import TeamAce from "./TeamAce";
import PortfolioPlaceholder from "./PortfolioPlaceholder";
import FinalBusinessPlanViewer from "./FinalBusinessPlanViewer";
import FinalPlanPasswordModal from "./FinalPlanPasswordModal";
import AceItemSelection from "./ace/AceItemSelection";
import ImItemSelection from "./im/ImItemSelection";
import JcalpItemSelection from "./jcalp/JcalpItemSelection";
import { PORTFOLIO_FINAL_PLAN_PDFS } from "./portfolio-pdfs";

type TeamId = "jcalp" | "im" | "ace";
type SubSection = "intro" | "item-selection" | "club-activity";

const SUBSECTIONS: { id: SubSection; label: string }[] = [
  { id: "intro", label: "팀 소개" },
  { id: "item-selection", label: "창업아이템 선정" },
  { id: "club-activity", label: "최종사업계획서" },
];

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

function getTeamContent(team: TeamId, subsection: SubSection) {
  if (subsection === "intro") {
    return TEAM_COMPONENTS[team];
  }
  if (subsection === "item-selection") {
    if (team === "ace") {
      return AceItemSelection;
    }
    if (team === "im") {
      return ImItemSelection;
    }
    if (team === "jcalp") {
      return JcalpItemSelection;
    }
    return () => <PortfolioPlaceholder title="창업아이템 선정" />;
  }
  const plan = PORTFOLIO_FINAL_PLAN_PDFS[team];
  return () => <FinalBusinessPlanViewer {...plan} />;
}

export default function PortfolioShell() {
  const [activeTeam, setActiveTeam] = useState<TeamId>("jcalp");
  const [activeSubSection, setActiveSubSection] = useState<SubSection>("intro");
  const [hoveredTeam, setHoveredTeam] = useState<TeamId | null>(null);
  const [pendingFinalPlanTeam, setPendingFinalPlanTeam] = useState<TeamId | null>(null);
  const [isFinalPlanUnlocked, setIsFinalPlanUnlocked] = useState(false);

  const ActiveComponent = getTeamContent(activeTeam, activeSubSection);
  const contentKey = `${activeTeam}-${activeSubSection}`;
  const pendingTeamMeta = pendingFinalPlanTeam
    ? TEAMS.find((team) => team.id === pendingFinalPlanTeam)
    : null;

  const handleTeamClick = (teamId: TeamId) => {
    setActiveTeam(teamId);
    setActiveSubSection("intro");
  };

  const openFinalPlan = (teamId: TeamId) => {
    setActiveTeam(teamId);
    setActiveSubSection("club-activity");
    setHoveredTeam(null);
    setPendingFinalPlanTeam(null);
  };

  const handleSubSectionClick = (teamId: TeamId, sectionId: SubSection) => {
    if (sectionId === "club-activity" && !isFinalPlanUnlocked) {
      setPendingFinalPlanTeam(teamId);
      setHoveredTeam(null);
      return;
    }

    setActiveTeam(teamId);
    setActiveSubSection(sectionId);
    setHoveredTeam(null);
  };

  const handlePasswordSuccess = () => {
    if (!pendingFinalPlanTeam) return;
    setIsFinalPlanUnlocked(true);
    openFinalPlan(pendingFinalPlanTeam);
  };

  return (
    <div className="flex h-full flex-col bg-zinc-100">
      {/* 탭 메뉴 — 미션 햄버거와 겹치지 않도록 --mission-hamburger-gutter 사용 */}
      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center gap-1 overflow-x-auto overflow-y-visible py-2 pr-3 pl-[max(0.75rem,var(--mission-hamburger-gutter,4.5rem))] sm:gap-2 sm:py-3 sm:pr-4">
          {TEAMS.map((team) => {
            const isActive = activeTeam === team.id;
            const isHovered = hoveredTeam === team.id;
            return (
              <div
                key={team.id}
                className="relative"
                onMouseEnter={() => setHoveredTeam(team.id)}
                onMouseLeave={() => setHoveredTeam(null)}
              >
                <button
                  type="button"
                  onClick={() => handleTeamClick(team.id)}
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

                {/* 드롭다운 서브 메뉴 */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute left-0 top-full z-40 mt-2 min-w-[148px] overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xl shadow-zinc-200/60"
                    >
                      {SUBSECTIONS.map((section, idx) => {
                        const isSubActive =
                          activeTeam === team.id && activeSubSection === section.id;
                        return (
                          <button
                            key={section.id}
                            type="button"
                            onClick={() => handleSubSectionClick(team.id, section.id)}
                            className={`flex w-full items-center px-4 py-2.5 text-left text-sm font-medium transition-colors duration-150 ${
                              idx !== 0 ? "border-t border-zinc-100" : ""
                            } ${
                              isSubActive
                                ? "bg-zinc-900 text-white"
                                : "text-zinc-700 hover:bg-zinc-50"
                            }`}
                          >
                            {section.label}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </header>

      {/* 콘텐츠 영역 — PDF 뷰어는 h-full 내부 스크롤, 일반 섹션은 영역 스크롤 */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={contentKey}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={
              activeSubSection === "club-activity" ? "h-full overflow-hidden" : "h-full overflow-y-auto"
            }
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {pendingFinalPlanTeam && pendingTeamMeta && (
        <FinalPlanPasswordModal
          teamLabel={pendingTeamMeta.sublabel}
          onSuccess={handlePasswordSuccess}
          onClose={() => setPendingFinalPlanTeam(null)}
        />
      )}
    </div>
  );
}
