# KISON 프로젝트 Context Notes

의사결정 로그. 각 항목은 날짜, 결정 내용, 사유를 기록한다.

---

## 2026-05-12: 스택 버전 확정

- **Next.js 16.2.6** (2026-05-07 릴리스, 최신 안정판)
- **React 19.2.4**
- **TypeScript 5.x**
- **Tailwind CSS v4** (@tailwindcss/postcss)
- **Recharts 3.8.1**
- **Vitest 4.1.6** + @testing-library/react 16.x
- 사유: 2026년 5월 기준 모든 패키지 최신 안정 버전 사용.

## 2026-05-12: 테스트 프레임워크 선택 — Vitest

- Jest 대신 Vitest 채택.
- 사유: Next.js 16 + React 19 환경에서 ESM 네이티브 지원, 빠른 실행 속도, Vite 플러그인 호환.

## 2026-05-12: 데이터 저장 방식 — Phase 4까지 보류

- Phase 1~3은 localStorage 기반.
- Phase 4(관리자 화면) 진입 시 Supabase vs JSON 시드 중 결정 예정.
- 사유: PRD에 백엔드 명시 없음. 관리자 기능의 구체 범위가 확정되면 결정.

## 2026-05-12: 저장소 의사결정 (Phase 4) — localStorage 유지

- **결정**: localStorage 기반 유지. 관리자용 학생 결과 수집은 별도 Zustand store로 구현.
- 사유: 프로토타입/교육 현장 데모 단계. 단일 브라우저에서 여러 학생이 순차적으로 진단하고, 관리자가 같은 기기에서 결과를 조회하는 시나리오.
- 향후 다중 기기 수집이 필요하면 Supabase 연동으로 전환. 현재 코드 구조(store + lib 분리)가 이를 지원할 수 있음.
