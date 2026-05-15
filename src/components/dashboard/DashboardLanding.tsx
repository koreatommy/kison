"use client";
// 대시보드 메인 랜딩페이지 — 모든 섹션을 스크롤 가능한 노란 캔버스 위에 조합
import HeroSection from "@/components/dashboard/landing/HeroSection";
import FeatureCards from "@/components/dashboard/landing/FeatureCards";
import CurriculumTimeline from "@/components/dashboard/landing/CurriculumTimeline";
import CompetencyCards from "@/components/dashboard/landing/CompetencyCards";
import ActionFlow from "@/components/dashboard/landing/ActionFlow";
import BottomCTA from "@/components/dashboard/landing/BottomCTA";

export default function DashboardLanding() {
  return (
    <div className="h-full overflow-y-auto bg-[#facc15]">
      <HeroSection />
      <FeatureCards />
      <CurriculumTimeline />
      <CompetencyCards />
      <ActionFlow />
      <BottomCTA />
    </div>
  );
}
