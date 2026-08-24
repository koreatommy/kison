// /bonus 라우트 — 노트북LM 스타일 가이드북 랜딩 전용 레이아웃
import type { Metadata } from "next";
import "./bonus-route.css";

export const metadata: Metadata = {
  title: "노트북LM 슬라이드 스타일 가이드북 | 보너스 자료",
  description:
    "노트북LM용 슬라이드 스타일 가이드북 49종 — 예시 이미지와 복사 가능한 영문 프롬프트",
  alternates: {
    canonical: "/bonus",
  },
};

type BonusLayoutProps = {
  children: React.ReactNode;
  params: Promise<Record<string, string | string[] | undefined>>;
};

export default async function BonusLayout({
  children,
  params,
}: BonusLayoutProps) {
  await params;
  return children;
}
