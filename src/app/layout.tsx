// KISON 청소년 창업 캐릭터 진단 웹서비스 루트 레이아웃
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_ORIGIN } from "@/lib/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const siteDescription =
  "청소년 창업 교육 프로그램 – 10문항 설문으로 나의 창업 캐릭터를 진단하세요";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: "KISON 청소년 창업 캐릭터 진단",
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_ORIGIN,
    siteName: "KISON 청소년 창업 캐릭터 진단",
    title: "KISON 청소년 창업 캐릭터 진단",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "KISON 청소년 창업 캐릭터 진단",
    description: siteDescription,
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<Record<string, string | string[] | undefined>>;
}>) {
  await params;

  return (
    <html lang="ko" className="h-full min-w-0 antialiased">
      <body className="min-h-full min-w-0 flex flex-col font-sans bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
