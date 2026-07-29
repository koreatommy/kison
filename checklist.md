# KISON 프로젝트 체크리스트

## Phase 0: 프로젝트 부트스트랩
- [ ] Next.js 16 프로젝트 생성
- [ ] Tailwind CSS 적용 확인
- [ ] Recharts 설치
- [ ] Vitest 테스트 환경 구성
- [ ] PRD 17번 폴더 구조 생성
- [ ] 운영 문서(checklist.md, context-notes.md) 생성
- [ ] npm run build 통과
- [ ] npm run lint 통과

## Phase 1: 결과 화면 (1차 완료 기준)
- [ ] 타입 정의 (src/types/result.ts)
- [ ] 캐릭터 데이터 (src/data/characters.ts)
- [ ] 설문 문항 데이터 (src/data/questions.ts)
- [ ] 결과 템플릿 데이터 (src/data/resultTemplates.ts)
- [ ] Mock 결과 데이터 (src/data/mockResult.ts)
- [ ] /result 페이지 구현
- [ ] ResultHeader 컴포넌트
- [ ] CharacterHeroCard 컴포넌트
- [ ] RadarChartCard 컴포넌트 (Recharts)
- [ ] AbilityScoreList 컴포넌트
- [ ] ReportCard 컴포넌트
- [ ] MatchCharacterCard 컴포넌트
- [ ] ResultActionButtons 컴포넌트
- [ ] 반응형 (모바일 1열 / 데스크톱 2열)
- [ ] placeholder 캐릭터 이미지
- [ ] npm run build 통과

## Phase 2: 설문/점수/프로필 (2차 완료 기준)
- [ ] 점수 계산 로직 (src/lib/scoring.ts)
- [ ] 셔플 유틸 (src/lib/shuffle.ts)
- [ ] scoring 단위 테스트
- [ ] shuffle 단위 테스트
- [ ] Zustand 스토어 (useSurveyStore)
- [ ] 시작 화면 (src/app/page.tsx)
- [ ] 학생 프로필 입력 (src/app/profile/page.tsx)
- [ ] 설문 화면 (src/app/survey/page.tsx)
- [ ] 로딩 화면 (src/app/loading/page.tsx)
- [ ] 결과 화면 실데이터 연결
- [ ] localStorage 영속성 확인
- [ ] npm run build 통과
- [ ] npm test 통과

## Phase 3: 저장/팀구성 (3차 완료)
- [ ] 이미지 저장 (html-to-image)
- [ ] PDF 저장 (jsPDF)
- [ ] 팀 구성 알고리즘 (src/lib/team-builder.ts)
- [ ] team-builder 단위 테스트
- [ ] /team 페이지 구현
- [ ] TeamCard, TeamMemberCard, RoleBalanceChart 컴포넌트
- [ ] npm run build 통과
- [ ] npm test 통과

## Phase 4: 관리자 화면 (4차 완료)
- [ ] 저장소 의사결정 기록
- [ ] /admin 페이지 구현
- [ ] 학생 목록 표시
- [ ] 필터 (학령/학년/캐릭터)
- [ ] 역할 분포 차트
- [ ] 팀 자동 구성 트리거
- [ ] CSV 다운로드 (BOM 포함)
- [ ] npm run build 통과
- [ ] npm test 통과

## 2026-05-28: 창업 지원 단계 검증 강화
- [x] 단계별 진행 조건 정의 파일 분리 (`stepValidation.ts`)
- [x] 입력 누락 시 다음 버튼 비활성화
- [x] 누락 항목 안내 문구를 하단 푸터에 표시
- [x] 후보 생성/평가/최종확정 단계 필수 조건 적용

## 2026-07-22: /ai 진로로드맵 교안 랜딩
- [x] 교안 콘텐츠 데이터 분리 (`src/data/aiCareerCurriculum.ts`)
- [x] `/ai` 라우트 페이지 + 레이아웃
- [x] 히어로 / 핵심메시지 / 일정 / 목표 / 프롬프트 섹션
- [x] 프롬프트 복사 인터랙션
- [x] 모바일·데스크톱 반응형
- [x] `npm run build` 통과

## 2026-07-29: /shotform 숏폼 클래스 랜딩
- [x] `src/app/shortform` 정적 파일을 `public/shotform`으로 이동
- [x] HTML/JS 자산 경로를 `/shotform/...` 절대경로로 수정
- [x] `next.config.ts`에 `/shotform` rewrite 추가
- [x] `http://localhost:3000/shotform` 서빙 확인
- [x] `npm run build` 통과

## 2026-07-29: /shortform React 랜딩 이식
- [x] `shortformCurriculum.ts` 데이터 분리 + `public/images/shortform` 자산 이동
- [x] `src/app/shortform` page/layout/route.css + 전용 폰트(DM Mono·Manrope·Noto Sans KR)
- [x] `shortform-landing` 섹션 컴포넌트 13종 + `.sf-landing` 스코프 CSS
- [x] Lab 스텝 전환 인터랙션(client) — 향후 generate/video/gallery 형제 폴더 자리
- [x] 스크롤 reveal 애니메이션(client, IntersectionObserver)
- [x] `next.config.ts`의 `/shotform` rewrite 제거
- [x] `public/shotform/` 삭제
- [x] `http://localhost:3000/shortform` 서빙 확인 (`/shotform`은 404)
- [x] `npm run build` 통과

## 2026-07-29: /shortform 타임라인 섹션 재배치
- [x] Timeline을 Questions 위로 이동
- [x] 섹션 번호 01~09 순차 재정렬
- [x] `npm run build` 통과
