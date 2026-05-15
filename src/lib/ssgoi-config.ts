// SSGOI 페이지 전환 라우트 규칙 — KISON 설문 플로우 기준
import { drill, fade, rotate, scroll } from "@ssgoi/react/view-transitions";
import type { SsgoiConfig } from "@ssgoi/react";

export const ssgoiConfig: SsgoiConfig = {
  transitions: [
    { from: "/", to: "/dashboard", transition: fade() },
    { from: "/dashboard", to: "/", transition: fade() },
    // 대시보드 내부 전환: rotate
    { from: "/dashboard", to: "/dashboard/profile", transition: rotate() },
    { from: "/dashboard/profile", to: "/dashboard", transition: rotate() },
    { from: "/dashboard/profile", to: "/dashboard/survey", transition: rotate() },
    { from: "/dashboard/survey", to: "/dashboard/profile", transition: rotate() },
    { from: "/dashboard/survey", to: "/dashboard/result", transition: rotate() },
    { from: "/dashboard/result", to: "/dashboard/survey", transition: rotate() },
    { from: "/dashboard/*", to: "/dashboard/*", transition: rotate(), symmetric: true },
    // 기존 최상위 페이지 전환
    { from: "*", to: "/profile", transition: drill({ direction: "enter" }) },
    { from: "/profile", to: "*", transition: drill({ direction: "exit" }) },
    { from: "/profile", to: "/survey", transition: scroll({ direction: "up" }) },
    { from: "/survey", to: "/profile", transition: scroll({ direction: "down" }) },
    { from: "/survey", to: "/loading-result", transition: fade() },
    { from: "/loading-result", to: "/result", transition: fade() },
  ],
  defaultTransition: fade(),
  preserveScroll: {
    exclude: ["/survey", "/loading-result", "/result", "/dashboard/survey", "/dashboard/result"],
  },
};
