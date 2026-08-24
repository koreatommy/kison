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

## 2026-05-28: 창업 지원 단계 진행 규칙 강화

- **결정**: 단계 이동은 `goNext` 직접 차단 대신, UI 레이어에서 `nextDisabled`를 통해 제어.
- **사유**: 기존 컴포넌트 구조를 크게 바꾸지 않고 최소 변경으로 즉시 적용하기 위함.
- **결정**: 각 단계 입력란을 사실상 필수화.
- **사유**: 학습 목적상 단계별 사고/작성 과정을 강제하는 요구사항 반영.
- **결정**: 누락 시 하단 푸터에 구체적인 이유 문구 노출.
- **사유**: 사용자가 왜 막혔는지 즉시 이해하고 다음 행동을 알 수 있게 하기 위함.

## 2026-05-29: 창업 지원 진입 시 이어하기/새로 시작 모달

- **결정**: 진행 데이터가 있을 때만 `ResumeOrRestartModal`을 표시하고, 사이드바 링크 재클릭 시에도 동일 모달을 띄움.
- **사유**: Zustand 전역 스토어 특성상 페이지 재진입 시 단계가 유지되는 것은 의도된 동작이지만, 사용자는 "새로 시작"을 기대할 수 있어 선택권을 제공.
- **구현**: `hasStartupSupportProgress()`로 판별, `requestResumePrompt()` nonce로 같은 페이지 내 재클릭 처리, `reset()`은 "새로 시작"과 최종 단계 재시작 버튼에서만 호출.

## 2026-07-22: /ai 진로로드맵 교안 랜딩

- **목표**: PDF 교안을 `/ai`에서 HTML 랜딩으로 서빙.
- **톤**: 학부모 대상(초등 5~6·중학 1~3) · 따뜻한 교육감 · 라이트 모드. indigo/보라·크림+테라코타 세리프 조합 회피.
- **비주얼**: teal(`#0f766e`) 포인트, mint tint 배경, Nunito 유지 + 섹션 리듬으로 구분.
- **구조**: 히어로(브랜드 우선) → 핵심메시지(예언이 아닌 기록) → 메타 → 학습목표 → 60분 타임라인 → 대시보드 구성 → 복사 가능한 Lovable 프롬프트 → 운영팁 → CTA.
- **Refero**: 구독 만료로 MCP 리서치 불가. anti-ai-slop / craft 가이드로 대체.
- **데이터**: 교안 본문은 `aiCareerCurriculum.ts`에 두고 UI와 분리.

## 2026-07-22: /ai 대상 학년 수정

- **결정**: 대상을 초등 4~6학년에서 **초등 5~6학년, 중학 1~3학년**으로 변경.
- **반영**: 메타·학습목표·핵심메시지·일정·Lovable 프롬프트·운영팁·메타데이터 description.

## 2026-07-29: /shotform 숏폼 클래스 랜딩 서빙

- **목표**: `src/app/shortform`의 정적 HTML/CSS/JS 랜딩을 `/shotform`에서 서빙.
- **결정**: React 변환 대신 `public/shotform` + rewrite 방식 채택.
- **사유**: 기존 HTML/CSS/JS(IntersectionObserver, lab step 전환)를 그대로 유지하는 게 최소 변경. App Router의 `page.tsx`로 옮기면 인터랙션·스타일 재작업이 큼.
- **URL**: 요청대로 `/shotform`(shortform 아님) 사용.
- **경로**: CSS/JS/이미지 모두 `/shotform/...` 절대경로로 맞춤.

## 2026-07-29: /shortform 타임라인 섹션 재배치

- **결정**: `100 MINUTES` 타임라인을 `MEDIA LITERACY` 질문 섹션 위로 이동.
- **사유**: 수업 개요(01 THE CLASS) 직후 진행 순서를 먼저 보여 주고, 미디어 리터러시 질문으로 이어지는 흐름이 더 자연스러움.
- **번호 재정렬**: 01 THE CLASS → 02 100 MINUTES → 03 MEDIA LITERACY → 04 FORMAT → 05 GOOD SHORT → 06 LAB → 07 CREATE → 08 RESULT → 09 LEARNING.

## 2026-07-29: /shortform React 랜딩 이식 (생성형 AI 확장 대비)

- **목표**: 정적 `public/shotform`을 `/ai` 패턴과 동일한 App Router React 랜딩(`/shortform`)으로 재구축. 향후 이미지 생성·영상 생성·갤러리 기능 추가를 염두에 둠.
- **URL 변경**: `/shotform` → `/shortform`으로 확정(폴더명·브랜드와 일치). 기존 `next.config.ts`의 `/shotform` rewrite 제거, `public/shotform/` 삭제.
- **구조**: `src/app/shortform/{page,layout,shortform-route.css}` + `src/components/shortform-landing/*` + `src/data/shortformCurriculum.ts` — `/ai`(`ai-landing` + `aiCareerCurriculum.ts`) 구조를 그대로 미러링.
- **CSS**: 원본 `styles.css`(태그/클래스 전역 선택자)를 `.sf-landing` 스코프 아래로 전부 이식(`shortform-landing.css`). CSS 변수도 `--ink`→`--sf-ink` 등으로 접두사 부여해 다른 라우트와 충돌 방지. 루트 블랙 배경 오버라이드는 `/ai`의 `html:has()` 패턴을 재사용(`shortform-route.css`).
- **폰트**: 정적 HTML의 Google Fonts `<link>` 대신 `next/font/google`(DM Mono·Manrope·Noto Sans KR)로 전환 — Next.js 폰트 최적화(레이아웃 시프트 방지, self-host) 활용.
- **인터랙션**: 원본 `script.js`의 IntersectionObserver reveal 애니메이션을 `ShortformRevealObserver`(client) 컴포넌트로, Lab 스텝 전환/프롬프트 다듬기 버튼을 `ShortformLandingLab`(client, `useState`)으로 이식.
- **향후 확장 자리**: `src/components/shortform-landing/lab/`에 Lab을 두어, 이후 `generate/`(이미지 생성형 AI), `video/`(영상 생성형 AI), `gallery/`(결과물 갤러리)를 형제 폴더로 추가할 수 있게 함. 이번 작업에서는 스텁 폴더나 빈 barrel을 만들지 않고, `shortformCurriculum.ts`의 `futureModules` 주석에만 관례를 기록.
- **이미지 자산**: `public/images/shortform/{hero-rabbit,image-cta,video-cta}.png` — 다른 페이지 이미지(`public/images/...`) 규칙과 일치시킴.

## 2026-08-25: /bonus 노트북LM 스타일 가이드북 랜딩

- **목표**: 노션 공개 페이지(노트북LM 슬라이드 스타일 가이드북)를 `/bonus` HTML 랜딩으로 복제.
- **콘텐츠**: 제목은 "50종"이지만 DOM에는 **1–49**만 존재. 있는 그대로 복제(49종).
- **구조**: Hero → Sticky Nav → 1–49 점프 인덱스 → StyleCard(이미지 2장 + 프롬프트 + 복사) → Footer. `/ai`·`/shortform` 라우트 패턴 미러링.
- **비주얼**: 따뜻한 종이 톤 배경 `#f3eee6`, 잉크 `#1c1916`, 액센트 앰버 `#b45309`. indigo/violet 회피. 예시 이미지는 다크 프레임 16:9.
- **이미지**: 노션 서명 URL은 만료되므로 `public/images/bonus/{id}-a.webp` / `{id}-b.webp`로 로컬 저장.
- **데이터**: `src/data/bonusStyles.ts`에 제목·프롬프트·이미지 경로 분리.
- **Refero**: 구독 만료로 MCP 리서치 불가. `/ai` 패턴 + lookbook craft로 진행.
- **폭죽**: 첫 로딩 시 `BonusFireworks` 캔버스 오버레이(약 4초) 후 자동 페이드아웃. `prefers-reduced-motion`이면 짧은 글로우만.

## 2026-08-25: /bonus 슬라이드 생성 기본 프롬프트 안내

- **위치**: Jump to style 인덱스 바로 아래, 스타일 갤러리 위.
- **역할**: 주제·슬라이드 장수를 사용자가 채우면 고정 템플릿과 합쳐진 전체 프롬프트를 미리보고 원클릭 복사.
- **작성 규칙 1번**: 원문 그대로 빈 항목 유지(사용자 제공 텍스트 준수).
- **기본값**: 주제 미입력 시 예시 문구, 장수 기본 `5`.
- **재사용**: 기존 `BonusCopyButton`으로 복사 UX 통일.

## 2026-08-25: /bonus 슬라이드 제작 워크플로우

- **위치**: Jump to style 아래 → 워크플로우 → 기본 프롬프트 안내 → 스타일 갤러리.
- **6단계**: 소스추가 → 가이드 작성 요청 → 메모에 저장 → 소스로 변환 → 슬라이드 자료 입력 → 확인·편집.
- **자산**: `public/images/bonus/workflow/01`~`06` (사용자 첨부 스크린샷).
- **데이터**: `src/data/bonusWorkflow.ts`에 단계 제목·설명·이미지 경로 분리.
- **레이아웃**: sm 이상 2열(좌→우 화살표, 행 사이 ↓). 모바일은 1열 + ↓.
- **모션**: `whileInView`로 스크롤 시 카드·화살표 점진 등장. `useReducedMotion`이면 즉시 표시.

## 2026-08-25: /bonus 슬라이드 자료 입력 프롬프트

- **위치**: 가이드 생성 프롬프트 안내 아래, 스타일 갤러리 위.
- **입력**: 주제 + 스타일 영문 프롬프트(아래 스타일에서 복사해 붙여넣기).
- **출력**: `[주제] 이 소스에…` + `슬라이드 디자인 및 스타일 : …` 전체 프롬프트 미리보기·복사.