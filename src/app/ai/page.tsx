// /ai — AI 우리아이 진로로드맵 교안 HTML 랜딩
import { SsgoiTransition } from "@ssgoi/react";
import AiLandingDashboard from "@/components/ai-landing/AiLandingDashboard";
import AiLandingGoals from "@/components/ai-landing/AiLandingGoals";
import AiLandingHero from "@/components/ai-landing/AiLandingHero";
import AiLandingMessage from "@/components/ai-landing/AiLandingMessage";
import AiLandingNav from "@/components/ai-landing/AiLandingNav";
import AiLandingPrompts from "@/components/ai-landing/AiLandingPrompts";
import AiLandingSchedule from "@/components/ai-landing/AiLandingSchedule";
import AiLandingTips from "@/components/ai-landing/AiLandingTips";
import "@/components/ai-landing/ai-landing.css";

type AiPageProps = {
  params: Promise<Record<string, string | string[] | undefined>>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AiPage({ params, searchParams }: AiPageProps) {
  await params;
  await searchParams;

  return (
    <SsgoiTransition id="/ai">
      <div className="ai-landing min-h-dvh w-full min-w-0">
        <AiLandingNav />
        <AiLandingHero />
        <AiLandingMessage />
        <AiLandingGoals />
        <AiLandingSchedule />
        <AiLandingDashboard />
        <AiLandingPrompts />
        <AiLandingTips />
        <footer className="border-t border-[var(--ai-ink)]/10 px-5 py-8 text-center sm:px-8">
          <p className="text-xs font-bold tracking-[0.04em] text-[var(--ai-ink)]/40">
            AI를 활용한 우리 아이 진로 로드맵 만들기 · 학부모 실습형 교안
          </p>
        </footer>
      </div>
    </SsgoiTransition>
  );
}
