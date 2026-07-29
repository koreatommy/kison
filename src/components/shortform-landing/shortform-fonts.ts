// 숏폼 랜딩 전용 웹폰트 (DM Mono / Manrope / Noto Sans KR)
import { DM_Mono, Manrope, Noto_Sans_KR } from "next/font/google";

export const sfFontMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--sf-font-mono",
});

export const sfFontDisplay = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--sf-font-display",
});

export const sfFontSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--sf-font-sans",
});
