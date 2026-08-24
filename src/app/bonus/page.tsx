// /bonus — 노트북LM 슬라이드 스타일 가이드북 랜딩
import { SsgoiTransition } from "@ssgoi/react";
import BonusLandingHero from "@/components/bonus-landing/BonusLandingHero";
import BonusLandingNav from "@/components/bonus-landing/BonusLandingNav";
import BonusFireworks from "@/components/bonus-landing/BonusFireworks";
import BonusStyleGallery from "@/components/bonus-landing/BonusStyleGallery";
import BonusStyleIndex from "@/components/bonus-landing/BonusStyleIndex";
import BonusSlideWorkflow from "@/components/bonus-landing/BonusSlideWorkflow";
import BonusSlidePromptGuide from "@/components/bonus-landing/BonusSlidePromptGuide";
import BonusSlideInputPrompt from "@/components/bonus-landing/BonusSlideInputPrompt";
import { bonusMeta } from "@/data/bonusStyles";
import "@/components/bonus-landing/bonus-landing.css";

type BonusPageProps = {
  params: Promise<Record<string, string | string[] | undefined>>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function BonusPage({
  params,
  searchParams,
}: BonusPageProps) {
  await params;
  await searchParams;

  return (
    <SsgoiTransition id="/bonus">
      <div className="bonus-landing min-h-dvh w-full min-w-0">
        <BonusFireworks />
        <BonusLandingNav />
        <BonusLandingHero />
        <BonusStyleIndex />
        <BonusSlideWorkflow />
        <BonusSlidePromptGuide />
        <BonusSlideInputPrompt />
        <BonusStyleGallery />
        <footer className="border-t border-[var(--bonus-ink)]/10 px-5 py-8 text-center sm:px-8">
          <p className="text-xs font-bold tracking-[0.04em] text-[var(--bonus-ink)]/40">
            {bonusMeta.title}
          </p>
          <p className="mt-2 text-xs font-semibold tracking-[0.02em] text-[var(--bonus-ink)]/40">
            오빠두 엑셀님의 노션 페이지를 웹페이지로 재구성 하였습니다.
          </p>
        </footer>
      </div>
    </SsgoiTransition>
  );
}
