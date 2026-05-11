// KISON 청소년 창업 캐릭터 진단 웹서비스 루트 레이아웃
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KISON 청소년 창업 캐릭터 진단",
  description:
    "청소년 창업 교육 프로그램 – 10문항 설문으로 나의 창업 캐릭터를 진단하세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
