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
