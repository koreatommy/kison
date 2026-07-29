// /shortform — AI 숏폼 크리에이터 클래스 랜딩
import { SsgoiTransition } from "@ssgoi/react";
import ShortformLandingNav from "@/components/shortform-landing/ShortformLandingNav";
import ShortformLandingHero from "@/components/shortform-landing/ShortformLandingHero";
import ShortformAbout from "@/components/shortform-landing/ShortformAbout";
import ShortformMediaLiteracy from "@/components/shortform-landing/ShortformMediaLiteracy";
import ShortformGoodShort from "@/components/shortform-landing/ShortformGoodShort";
import ShortformLab from "@/components/shortform-landing/ShortformLab";
import ShortformCreate from "@/components/shortform-landing/ShortformCreate";
import ShortformOutcome from "@/components/shortform-landing/ShortformOutcome";
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
      <div className="sf-landing min-h-dvh w-full min-w-0">
        <ShortformLandingNav />
        <ShortformLandingHero />
        <ShortformAbout />
        <ShortformMediaLiteracy />
        <ShortformGoodShort />
        <ShortformLab />
        <ShortformCreate />
        <ShortformOutcome />
      </div>
    </SsgoiTransition>
  );
}
