// /shortform — AI 숏폼 크리에이터 클래스 랜딩 (정적 HTML 이식)
import { SsgoiTransition } from "@ssgoi/react";
import ShortformLandingCreate from "@/components/shortform-landing/ShortformLandingCreate";
import ShortformLandingFinal from "@/components/shortform-landing/ShortformLandingFinal";
import ShortformLandingFooter from "@/components/shortform-landing/ShortformLandingFooter";
import ShortformLandingFormat from "@/components/shortform-landing/ShortformLandingFormat";
import ShortformLandingGoodShort from "@/components/shortform-landing/ShortformLandingGoodShort";
import ShortformLandingHero from "@/components/shortform-landing/ShortformLandingHero";
import ShortformLandingLearning from "@/components/shortform-landing/ShortformLandingLearning";
import ShortformLandingNav from "@/components/shortform-landing/ShortformLandingNav";
import ShortformLandingProgram from "@/components/shortform-landing/ShortformLandingProgram";
import ShortformLandingQuestions from "@/components/shortform-landing/ShortformLandingQuestions";
import ShortformLandingResult from "@/components/shortform-landing/ShortformLandingResult";
import ShortformLandingTimeline from "@/components/shortform-landing/ShortformLandingTimeline";
import ShortformRevealObserver from "@/components/shortform-landing/ShortformRevealObserver";
import { sfFontDisplay, sfFontMono, sfFontSans } from "@/components/shortform-landing/shortform-fonts";
import ShortformLandingLab from "@/components/shortform-landing/lab/ShortformLandingLab";
import "@/components/shortform-landing/shortform-landing.css";

type ShortformPageProps = {
  params: Promise<Record<string, string | string[] | undefined>>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ShortformPage({
  params,
  searchParams,
}: ShortformPageProps) {
  await params;
  await searchParams;

  return (
    <SsgoiTransition id="/shortform">
      <div
        className={`sf-landing min-h-dvh w-full min-w-0 ${sfFontMono.variable} ${sfFontDisplay.variable} ${sfFontSans.variable}`}
      >
        <ShortformRevealObserver />
        <ShortformLandingNav />
        <ShortformLandingHero />
        <ShortformLandingProgram />
        <ShortformLandingTimeline />
        <ShortformLandingQuestions />
        <ShortformLandingFormat />
        <ShortformLandingGoodShort />
        <ShortformLandingLab />
        <ShortformLandingCreate />
        <ShortformLandingResult />
        <ShortformLandingLearning />
        <ShortformLandingFinal />
        <ShortformLandingFooter />
      </div>
    </SsgoiTransition>
  );
}
