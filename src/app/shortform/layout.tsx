// /shortform 라우트 — 숏폼 크리에이터 클래스 랜딩 전용 레이아웃 (라이트 배경)
import type { Metadata } from "next";
import "./shortform-route.css";

export const metadata: Metadata = {
  title: "AI Short-form Creator Class",
  description:
    "AI와 함께 만드는 나만의 숏폼 — 초등학교 4~6학년 대상 100분 미디어 리터러시 실습형 캠프",
  alternates: {
    canonical: "/shortform",
  },
};

type ShortformLayoutProps = {
  children: React.ReactNode;
  params: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ShortformLayout({
  children,
  params,
}: ShortformLayoutProps) {
  await params;
  return children;
}
