# PRD: AI 창업 아이템 선정하기 MVP

## 1. 문서 개요

### 1.1 문서명

`AI 창업 아이템 선정하기 MVP.md`

### 1.2 제품명

AI 창업 아이템 선정하기 MVP

### 1.3 목적

청소년 창업경진대회 참가자가 온라인에서 간단한 입력과 AI 질문 과정을 거쳐 창업 아이템 후보를 발굴하고, 최종 창업 아이템을 선정한 뒤, 대회 신청서에 활용 가능한 핵심 결과물을 HTML로 확인하고 PDF로 저장할 수 있도록 한다.

### 1.4 핵심 방향

본 MVP는 사용자 답변 과정과 산출물을 서버에 저장하지 않는다.

- DB 사용 안 함
- 회원가입 없음
- 로그인 없음
- 사용자 답변 저장 없음
- 산출물 서버 저장 없음
- 새로고침 시 현재 작성 중인 데이터는 사라져도 무방함
- 최종 결과물은 브라우저에서 HTML로 생성
- 최종 결과물은 브라우저 인쇄 기능을 통해 PDF로 저장
- AI 모델은 Claude API 기반으로 사용
- API Key는 환경변수 또는 세션 전용 입력 방식으로 사용 가능하게 설계

---

## 2. MVP 범위

### 2.1 포함 기능

1. 팀 기본정보 입력
2. 해결하고 싶은 문제 분야 선택
3. 문제 상황 구체화 질문
4. AI 창업 아이템 후보 3개 이상 생성
5. AI 창업 아이템 비교·평가
6. 최종 후보 3개 선정
7. 최종 창업 아이템 1개 확정
8. 신청서 핵심 문장 자동 생성
9. 최종 결과물 HTML 미리보기
10. HTML 다운로드
11. PDF 저장

### 2.2 제외 기능

이번 MVP에서는 아래 기능을 구현하지 않는다.

- DB 저장
- Supabase 연동
- Prisma 설정
- 로그인/회원가입
- 사용자 계정 관리
- 산출물 저장소
- 관리자 페이지
- 결제 기능
- 협업 편집
- 파일 업로드
- 기존 문서 불러오기
- 신청서 양식 HWP/PDF 직접 편집
- 사용자별 작업 이력 관리

### 2.3 향후 2차 개발 예정 기능

나중에 DB 설계 후 아래 기능을 추가한다.

- 사용자 계정
- 팀별 프로젝트 저장
- 중간 답변 저장
- 산출물 저장
- PDF 이력 관리
- 신청서 전체 자동 작성
- 평가자 피드백 관리
- 학교/동아리별 관리자 기능

---

## 3. 기술 스택

### 3.1 권장 프레임워크

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- shadcn/ui
- lucide-react
- zod
- @anthropic-ai/sdk

### 3.2 PDF 생성 방식

MVP에서는 서버 PDF 라이브러리를 사용하지 않는다.

기본 방식:

- 최종 결과 HTML 생성
- `window.print()` 실행
- 브라우저의 “PDF로 저장” 기능 사용
- CSS `@media print` 및 `@page`로 A4 출력 최적화

선택 기능:

- HTML 파일 다운로드
- 인쇄 전용 미리보기 화면 제공

### 3.3 DB 사용 금지

아래 패키지 또는 서비스를 사용하지 않는다.

- Prisma
- Supabase
- Firebase Firestore
- MongoDB
- MySQL
- PostgreSQL
- SQLite
- Redis
- Vercel KV
- PlanetScale
- Neon
- Drizzle ORM

---

## 4. Claude API 연동 설계

### 4.1 기본 원칙

Claude API Key는 클라이언트 코드에 하드코딩하지 않는다.

권장 방식:

```env
ANTHROPIC_API_KEY=your_api_key_here
CLAUDE_MODEL=your_claude_model_id_here
```

운영 환경에서는 Vercel Environment Variables에 등록한다.

### 4.2 API Key 입력 방식

MVP에서는 두 가지 방식을 지원할 수 있도록 설계한다.

#### 방식 A. 서버 환경변수 방식

개발자 또는 운영자가 `.env.local`에 Claude API Key를 입력한다.

```env
ANTHROPIC_API_KEY=sk-ant-xxxxx
CLAUDE_MODEL=claude-model-id
```

이 방식이 기본 권장 방식이다.

#### 방식 B. 세션 전용 API Key 입력 방식

사용자가 화면에서 Claude API Key를 직접 입력할 수 있다.

조건:

- API Key는 DB에 저장하지 않음
- localStorage에 저장하지 않음
- sessionStorage 저장도 기본적으로 사용하지 않음
- React state에만 보관
- 새로고침 시 사라짐
- 서버 API Route 호출 시 헤더로만 전달
- 서버 로그에 API Key를 남기지 않음

예시 헤더:

```ts
headers: {
  "x-user-anthropic-key": apiKeyFromSessionState
}
```

서버는 아래 우선순위로 API Key를 사용한다.

1. 요청 헤더의 `x-user-anthropic-key`
2. 서버 환경변수 `ANTHROPIC_API_KEY`

둘 다 없으면 에러를 반환한다.

### 4.3 API Route

```txt
POST /api/ai/claude
```

### 4.4 Request Body

```ts
type ClaudeTask =
  | "generate_problem_questions"
  | "generate_startup_items"
  | "evaluate_startup_items"
  | "generate_final_document";

interface ClaudeRequest {
  task: ClaudeTask;
  payload: unknown;
}
```

### 4.5 Response Body

```ts
interface ClaudeResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### 4.6 Claude 호출 규칙

- 서버 API Route에서만 Claude API 호출
- 클라이언트에서 직접 Claude API 호출 금지
- 응답은 JSON 형식으로 받는 것을 원칙으로 함
- Claude 응답이 코드블록으로 감싸져 있을 경우 JSON 파싱 전 제거
- 응답 파싱 실패 시 사용자에게 재시도 안내
- AI가 없는 통계, 시장 규모, 법적 근거를 임의로 생성하지 않도록 프롬프트에 명시
- 시장 규모나 객관 데이터가 필요한 경우 “추후 조사 필요”로 표시

---

## 5. 사용자 흐름

## 5.1 전체 플로우

```txt
시작
 ↓
0. 팀 기본정보 입력
 ↓
1. 해결하고 싶은 문제 선택
 ↓
2. 문제 상황 구체화
 ↓
3. AI 창업 아이템 후보 생성
 ↓
4. AI 아이템 비교·평가
 ↓
5. 최종 후보 3개 선정
 ↓
6. 최종 창업 아이템 확정
 ↓
7. 신청서 핵심 문장 자동 생성
 ↓
8. HTML 결과 미리보기
 ↓
9. HTML 다운로드 또는 PDF 저장
```

---

# 6. 화면별 상세 요구사항

## 6.1 시작 화면

### 화면명

`창업 아이템 선정하기`

### 목적

사용자에게 이 도구가 무엇을 하는지 간단히 안내하고 시작 버튼을 제공한다.

### 화면 문구

```txt
AI와 함께 우리 동아리의 창업 아이템을 선정해 보세요.

이 과정에서는 해결하고 싶은 문제를 선택하고,
AI 질문을 통해 문제를 구체화한 뒤,
창업 아이템 후보를 만들고,
최종 아이템을 선정합니다.

입력한 내용은 서버에 저장되지 않습니다.
최종 결과물은 HTML로 확인하고 PDF로 저장할 수 있습니다.
```

### 버튼

- 시작하기
- Claude API Key 설정

---

## 6.2 0단계: 팀 기본정보 입력

### 화면명

`우리 팀 정보 입력`

### 목적

최종 결과물 HTML/PDF에 들어갈 최소한의 팀 정보를 입력한다.

DB 저장용 정보가 아니라, 현재 세션에서 최종 결과물에 표시하기 위한 정보다.

### 입력 항목

#### 팀명

```ts
teamName: string;
```

필수 여부:

- 필수

예시:

```txt
AI 창업동아리
```

#### 구성원 정보

동적 행 추가 방식으로 입력한다.

```ts
interface TeamMember {
  id: string;
  school: string;
  grade: string;
  name: string;
}
```

입력 필드:

- 구성원 학교
- 학년
- 이름

예시:


| 구성원 학교 | 학년  | 이름  |
| ------ | --- | --- |
| 창업중학교  | 2학년 | 김민준 |
| 창업중학교  | 2학년 | 이서연 |


### 기능 요구사항

- 기본 구성원 입력 행 3개 제공
- 행 추가 가능
- 행 삭제 가능
- 최소 1명 이상 입력 권장
- 팀명은 필수
- 구성원 정보는 최종 결과물 상단에 표로 표시

### 저장 방식

- React state에만 저장
- DB 저장 금지
- localStorage 저장 금지

---

## 6.3 1단계: 해결하고 싶은 문제 선택

### 화면명

`어떤 문제를 해결하고 싶나요?`

### 목적

창업 아이템이 아니라 문제에서 출발하도록 유도한다.

### 문제 분야 선택 카드

복수 선택 가능.

```ts
type ProblemCategory =
  | "환경 문제"
  | "교육 문제"
  | "교통 문제"
  | "보건·의료 문제"
  | "주거 문제"
  | "안전·치안 문제"
  | "경제 문제"
  | "문화·여가 문제"
  | "사회복지 문제"
  | "인구감소 문제"
  | "기타";
```

### 화면 표시 항목


| 문제 분야    | 설명                     |
| -------- | ---------------------- |
| 환경 문제    | 쓰레기, 일회용품, 재활용, 에너지 낭비 |
| 교육 문제    | 학습 격차, 진로 정보 부족, 공부 습관 |
| 교통 문제    | 통학 안전, 교통약자 이동, 교통 불편  |
| 보건·의료 문제 | 마음 건강, 건강관리, 응급상황      |
| 주거 문제    | 청소년 공간, 안전한 생활환경       |
| 안전·치안 문제 | 학교 주변 위험, 야간 귀가, 재난 대응 |
| 경제 문제    | 지역상권, 용돈관리, 청소년 금융     |
| 문화·여가 문제 | 청소년 활동공간, 지역문화 접근성     |
| 사회복지 문제  | 돌봄 공백, 노인·장애인 지원       |
| 인구감소 문제  | 지역 활력 저하, 청년 유출        |
| 기타       | 직접 입력                  |


### 추가 입력

```txt
우리 주변에서 실제로 불편하다고 느낀 상황을 적어주세요.
```

입력 예시:

```txt
학교 앞 횡단보도에서 학생들이 스마트폰을 보며 건너는 경우가 많아 사고 위험이 있습니다.
```

### 유효성 검사

- 문제 분야 최소 1개 선택
- 불편 상황 10자 이상 입력 권장
- 입력이 짧을 경우 경고하되 다음 단계 진행은 허용

---

## 6.4 2단계: 문제 상황 구체화

### 화면명

`문제를 조금 더 자세히 알려주세요`

### 목적

사용자의 문제 인식을 사업계획서에 활용 가능한 문제 정의로 정리한다.

### 기본 질문

초기 MVP에서는 고정 질문을 사용한다.

```txt
1. 이 문제는 주로 어디에서 발생하나요?
2. 이 문제를 가장 많이 겪는 사람은 누구인가요?
3. 그 사람이 가장 불편함을 느끼는 순간은 언제인가요?
4. 현재는 이 문제를 어떻게 해결하고 있나요?
5. 기존 해결 방법의 부족한 점은 무엇인가요?
6. 이 문제가 해결되면 어떤 변화가 생기나요?
```

### AI 질문 생성 기능

선택 기능으로 제공한다.

사용자가 문제 분야와 불편 상황을 입력하면 AI가 맞춤형 질문을 생성한다.

#### 요청 Task

```ts
task: "generate_problem_questions"
```

#### 기대 응답

```ts
interface ProblemQuestion {
  id: string;
  question: string;
  helpText?: string;
  placeholder?: string;
}

interface GenerateProblemQuestionsResponse {
  questions: ProblemQuestion[];
}
```

### 사용자 답변 구조

```ts
interface ProblemAnswer {
  questionId: string;
  question: string;
  answer: string;
}
```

### 저장 방식

- React state에만 저장
- 서버 저장 금지
- DB 저장 금지

---

## 6.5 3단계: AI 창업 아이템 후보 생성

### 화면명

`AI가 창업 아이템을 만들어 드립니다`

### 목적

문제 분야, 불편 상황, 구체화 답변을 바탕으로 창업 아이템 후보를 3개 이상 생성한다.

### 버튼

```txt
AI 창업 아이템 생성하기
```

### Claude Task

```ts
task: "generate_startup_items"
```

### 요청 Payload

```ts
interface GenerateStartupItemsPayload {
  teamInfo: TeamInfo;
  selectedCategories: ProblemCategory[];
  problemText: string;
  problemAnswers: ProblemAnswer[];
}
```

### 기대 응답

```ts
interface StartupItemCandidate {
  id: string;
  itemName: string;
  oneLineDescription: string;
  problemToSolve: string;
  targetCustomer: string;
  coreFeatures: string[];
  differentiation: string;
  studentExecutionMethod: string;
  expectedSocialValue: string;
  risks: string[];
}
```

```ts
interface GenerateStartupItemsResponse {
  candidates: StartupItemCandidate[];
}
```

### 생성 기준

Claude는 아래 기준으로 후보를 생성해야 한다.

- 최소 3개 이상
- 최대 5개 이하
- 청소년 동아리가 설명 가능한 수준
- 앱, 웹서비스, 제품, 캠페인, 키트, 교육 프로그램 등 다양한 형태 가능
- 신청서 작성으로 확장 가능한 아이템 우선
- 과도한 기술 구현이 필요한 아이템은 피함
- 시장 규모, 통계, 법적 근거는 임의 생성 금지
- 모르는 정보는 “추후 조사 필요”로 표시

### 후보 카드 표시 항목

각 후보는 카드 형태로 표시한다.

- 아이템명
- 한 줄 설명
- 해결 문제
- 주요 고객
- 핵심 기능
- 차별성
- 청소년 동아리 실행 방법
- 예상 사회적 가치
- 위험 요소

---

## 6.6 4단계: AI 아이템 비교·평가

### 화면명

`어떤 아이템이 가장 좋을까요?`

### 목적

생성된 후보를 AI가 점수화하고, 장점과 보완점을 제시한다.

### Claude Task

```ts
task: "evaluate_startup_items"
```

### 요청 Payload

```ts
interface EvaluateStartupItemsPayload {
  candidates: StartupItemCandidate[];
  problemText: string;
  problemAnswers: ProblemAnswer[];
}
```

### 평가 기준

```ts
interface EvaluationScore {
  problemClarity: number;
  customerClarity: number;
  solutionFit: number;
  differentiation: number;
  feasibility: number;
  socialValue: number;
  total: number;
}
```

배점:


| 평가 항목     | 배점  |
| --------- | --- |
| 문제 명확성    | 20  |
| 고객 명확성    | 15  |
| 해결 방법 적합성 | 20  |
| 차별성       | 15  |
| 실행 가능성    | 15  |
| 사회적 가치    | 15  |
| 합계        | 100 |


### 기대 응답

```ts
interface StartupItemEvaluation {
  candidateId: string;
  score: EvaluationScore;
  strengths: string[];
  weaknesses: string[];
  improvementSuggestions: string[];
  recommendationRank: number;
  recommendationReason: string;
}

interface EvaluateStartupItemsResponse {
  evaluations: StartupItemEvaluation[];
  summary: string;
  recommendedCandidateId: string;
}
```

### 화면 표시

- 후보별 총점
- 항목별 점수
- 추천 순위
- 강점
- 약점
- 보완 방향
- AI 추천 아이템

---

## 6.7 5단계: 최종 후보 3개 선정

### 화면명

`우리 팀의 후보 3개를 선택하세요`

### 목적

AI가 정한 결과를 그대로 따르지 않고, 팀이 최종 후보 3개를 직접 선택하게 한다.

### 화면 구성


| 우선순위 | 창업 아이템 | 선택한 이유      |
| ---- | ------ | ----------- |
| 1순위  | 선택     | 입력 또는 AI 초안 |
| 2순위  | 선택     | 입력 또는 AI 초안 |
| 3순위  | 선택     | 입력 또는 AI 초안 |


### 기능

- 후보 카드에서 1순위, 2순위, 3순위 지정
- 같은 후보 중복 선택 방지
- AI 추천순 자동 배치 버튼
- 선택 이유 자동 작성 버튼
- 선택 이유 직접 수정 가능

### 데이터 구조

```ts
interface ShortlistedItem {
  rank: 1 | 2 | 3;
  candidateId: string;
  reason: string;
}
```

---

## 6.8 6단계: 최종 창업 아이템 확정

### 화면명

`최종 창업 아이템을 확정하세요`

### 목적

후보 3개 중 최종 창업 아이템 1개를 선정한다.

### 확인 질문

최종 확정 전 아래 체크리스트를 보여준다.

```txt
1. 이 아이템은 우리가 해결하고 싶은 문제와 직접 연결되나요?
2. 사용할 사람이 명확한가요?
3. 기존 해결 방법보다 나은 점이 있나요?
4. 우리 동아리가 시제품, 설문, 캠페인, 앱 화면 중 하나라도 만들 수 있나요?
5. 사업계획서의 문제인식, 실현가능성, 성장전략으로 확장할 수 있나요?
```

### 입력

```ts
interface FinalSelection {
  candidateId: string;
  finalReason: string;
  checkedItems: {
    problemFit: boolean;
    customerClear: boolean;
    differentiationClear: boolean;
    prototypePossible: boolean;
    planExpandable: boolean;
  };
}
```

### 기능

- 최종 아이템 1개 선택
- 최종 선정 이유 입력
- AI가 선정 이유 초안 생성
- 사용자가 직접 수정 가능

---

## 6.9 7단계: 신청서 핵심 문장 자동 생성

### 화면명

`신청서에 들어갈 문장을 완성합니다`

### 목적

최종 아이템을 대회 신청서에 활용 가능한 형태로 정리한다.

### Claude Task

```ts
task: "generate_final_document"
```

### 요청 Payload

```ts
interface GenerateFinalDocumentPayload {
  teamInfo: TeamInfo;
  selectedCategories: ProblemCategory[];
  problemText: string;
  problemAnswers: ProblemAnswer[];
  candidates: StartupItemCandidate[];
  evaluations: StartupItemEvaluation[];
  shortlistedItems: ShortlistedItem[];
  finalSelection: FinalSelection;
}
```

### 기대 응답

```ts
interface FinalDocument {
  itemNameSuggestions: string[];
  selectedItemName: string;
  oneLineItemDescription: string;
  topic: string;
  localProblemToSolve: string;
  itemIntroduction: string[];
  differentiation: string[];
  targetCustomers: string[];
  promotionAndSalesStrategy: string[];
  expectedSocialValue: string[];
  prototypeIdea: string;
  imageOrDiagramIdea: string;
  developmentMotivationDraft: string;
  finalSelectionReason: string;
  limitationsAndNextResearch: string[];
}
```

### 자동 작성 항목


| 항목                    | 설명                          |
| --------------------- | --------------------------- |
| 창업아이템명                | 기억하기 쉬운 이름 3~5개 제안 후 최종 추천  |
| 한 줄 아이템 설명            | 누구의 어떤 문제를 어떤 방식으로 해결하는지 작성 |
| 주제                    | 아이템의 핵심 주제                  |
| 우리 동아리가 해결하고 싶은 지역 문제 | 문제 배경, 대상자, 기존 한계, 해결 필요성   |
| 창업 아이템 소개             | 핵심 기능 중심으로 3개 이상 작성         |
| 차별성                   | 기존 방식과 다른 점                 |
| 주요 고객                 | 사용자, 구매자, 수혜자 구분            |
| 판매 및 홍보 전략            | 학교, 지역기관, SNS, 캠페인 등 확산 방식  |
| 사회적 가치                | 기대되는 사회적 기여                 |
| 시제품 아이디어              | 학생 동아리가 만들 수 있는 시제품 방향      |
| 이미지/설계도 아이디어          | 최종 결과물에 들어갈 이미지 또는 구조도 제안   |
| 개발 동기 초안              | 신청서 본문 작성에 활용 가능한 문단        |
| 보완 필요사항               | 추후 조사 또는 검증 필요 항목           |


---

# 7. 최종 결과물 HTML/PDF 설계

## 7.1 결과물 화면명

`창업 아이템 선정 결과`

## 7.2 HTML 결과물 구성

최종 결과물은 단일 HTML 문서 형태로 생성한다.

### 섹션 1. 표지

```txt
창업 아이템 선정 결과
팀명:
작성일:
```

### 섹션 2. 팀 정보


| 학교  | 학년  | 이름  |
| --- | --- | --- |


### 섹션 3. 선택한 문제

- 선택한 문제 분야
- 사용자가 입력한 불편 상황
- 문제 구체화 답변 요약

### 섹션 4. AI 창업 아이템 후보


| 순번  | 아이템명 | 한 줄 설명 | 주요 고객 | 총점  |
| --- | ---- | ------ | ----- | --- |


### 섹션 5. 최종 후보 3개


| 우선순위 | 창업 아이템 | 선택한 이유 |
| ---- | ------ | ------ |


### 섹션 6. 최종 창업 아이템

- 최종 아이템명
- 한 줄 설명
- 최종 선정 이유
- 핵심 기능
- 주요 고객
- 차별성
- 사회적 가치

### 섹션 7. 신청서 핵심 작성 문안

- 창업아이템명
- 한 줄 아이템 설명
- 주제
- 우리 동아리가 해결하고 싶은 지역 문제
- 창업 아이템 소개
- 차별성
- 주요 고객 및 판매 전략
- 이미지 또는 설계도 아이디어

### 섹션 8. 다음 단계

- 고객 인터뷰 필요
- 기존 유사 서비스 조사 필요
- 시제품 화면 또는 설계도 제작 필요
- 사업계획서 본문 작성 필요

---

## 7.3 HTML 다운로드 기능

### 버튼명

```txt
HTML 다운로드
```

### 파일명 규칙

```txt
창업아이템선정결과_{팀명}_{아이템명}.html
```

### 구현 방식

```ts
function downloadHtml(html: string, filename: string) {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
```

---

## 7.4 PDF 저장 기능

### 버튼명

```txt
PDF 저장
```

### 구현 방식

```ts
function saveAsPdf() {
  window.print();
}
```

### 출력 CSS

```css
@page {
  size: A4;
  margin: 15mm;
}

@media print {
  body {
    background: #ffffff;
  }

  .no-print {
    display: none !important;
  }

  .print-container {
    width: 100%;
    box-shadow: none;
  }

  .page-break {
    page-break-before: always;
  }
}
```

---

# 8. 데이터 구조

## 8.1 전체 세션 상태

```ts
interface AppState {
  currentStep: number;
  teamInfo: TeamInfo;
  problemInput: ProblemInput;
  problemAnswers: ProblemAnswer[];
  candidates: StartupItemCandidate[];
  evaluations: StartupItemEvaluation[];
  shortlistedItems: ShortlistedItem[];
  finalSelection: FinalSelection | null;
  finalDocument: FinalDocument | null;
}
```

## 8.2 팀 정보

```ts
interface TeamInfo {
  teamName: string;
  members: TeamMember[];
}
```

```ts
interface TeamMember {
  id: string;
  school: string;
  grade: string;
  name: string;
}
```

## 8.3 문제 입력

```ts
interface ProblemInput {
  selectedCategories: ProblemCategory[];
  problemText: string;
}
```

## 8.4 문제 답변

```ts
interface ProblemAnswer {
  questionId: string;
  question: string;
  answer: string;
}
```

## 8.5 창업 아이템 후보

```ts
interface StartupItemCandidate {
  id: string;
  itemName: string;
  oneLineDescription: string;
  problemToSolve: string;
  targetCustomer: string;
  coreFeatures: string[];
  differentiation: string;
  studentExecutionMethod: string;
  expectedSocialValue: string;
  risks: string[];
}
```

## 8.6 평가 결과

```ts
interface EvaluationScore {
  problemClarity: number;
  customerClarity: number;
  solutionFit: number;
  differentiation: number;
  feasibility: number;
  socialValue: number;
  total: number;
}
```

```ts
interface StartupItemEvaluation {
  candidateId: string;
  score: EvaluationScore;
  strengths: string[];
  weaknesses: string[];
  improvementSuggestions: string[];
  recommendationRank: number;
  recommendationReason: string;
}
```

## 8.7 최종 후보

```ts
interface ShortlistedItem {
  rank: 1 | 2 | 3;
  candidateId: string;
  reason: string;
}
```

## 8.8 최종 선택

```ts
interface FinalSelection {
  candidateId: string;
  finalReason: string;
  checkedItems: {
    problemFit: boolean;
    customerClear: boolean;
    differentiationClear: boolean;
    prototypePossible: boolean;
    planExpandable: boolean;
  };
}
```

## 8.9 최종 문서

```ts
interface FinalDocument {
  itemNameSuggestions: string[];
  selectedItemName: string;
  oneLineItemDescription: string;
  topic: string;
  localProblemToSolve: string;
  itemIntroduction: string[];
  differentiation: string[];
  targetCustomers: string[];
  promotionAndSalesStrategy: string[];
  expectedSocialValue: string[];
  prototypeIdea: string;
  imageOrDiagramIdea: string;
  developmentMotivationDraft: string;
  finalSelectionReason: string;
  limitationsAndNextResearch: string[];
}
```

---

# 9. AI 프롬프트 설계

## 9.1 공통 시스템 프롬프트

```txt
당신은 청소년 창업경진대회 사업계획서 작성을 돕는 창업교육 전문 AI입니다.

사용자는 중·고등학생 창업동아리입니다.
답변은 청소년이 이해할 수 있도록 쉽고 명확해야 합니다.
단, 결과물은 대회 신청서에 사용할 수 있도록 공적이고 정돈된 문체로 작성해야 합니다.

중요 원칙:
1. 없는 통계, 시장 규모, 기관명, 법적 근거를 지어내지 마세요.
2. 확인되지 않은 사실은 "추후 조사 필요"라고 표시하세요.
3. 청소년 동아리가 실제로 조사, 시제품, 캠페인, 앱 화면 설계 등으로 실행 가능한 아이템을 우선 제안하세요.
4. 문제 → 고객 → 해결 방법 → 차별성 → 실행 가능성 → 사회적 가치의 흐름으로 정리하세요.
5. 응답은 반드시 JSON 형식으로만 반환하세요.
6. Markdown 코드블록을 사용하지 마세요.
```

## 9.2 창업 아이템 후보 생성 프롬프트

```txt
아래 정보를 바탕으로 청소년 창업동아리가 추진할 수 있는 창업 아이템 후보를 3개 이상 5개 이하로 생성하세요.

입력 정보:
- 팀명
- 구성원 정보
- 선택한 문제 분야
- 사용자가 직접 입력한 불편 상황
- 문제 구체화 질문과 답변

출력 조건:
- 각 아이템은 서로 명확히 달라야 합니다.
- 앱/웹서비스/제품/캠페인/키트/교육 프로그램 등 다양한 유형을 고려하세요.
- 청소년이 설명하고 시제품화할 수 있는 수준이어야 합니다.
- 과도한 기술이나 막대한 자본이 필요한 아이템은 피하세요.
- 없는 데이터는 만들지 마세요.

반환 JSON 형식:
{
  "candidates": [
    {
      "id": "item-1",
      "itemName": "",
      "oneLineDescription": "",
      "problemToSolve": "",
      "targetCustomer": "",
      "coreFeatures": [],
      "differentiation": "",
      "studentExecutionMethod": "",
      "expectedSocialValue": "",
      "risks": []
    }
  ]
}
```

## 9.3 평가 프롬프트

```txt
아래 창업 아이템 후보들을 평가 기준에 따라 비교 평가하세요.

평가 기준:
- 문제 명확성: 20점
- 고객 명확성: 15점
- 해결 방법 적합성: 20점
- 차별성: 15점
- 실행 가능성: 15점
- 사회적 가치: 15점
- 총점: 100점

평가 원칙:
1. 점수는 과도하게 후하게 주지 마세요.
2. 청소년 동아리가 실행 가능한지를 중요하게 보세요.
3. 문제와 고객이 모호하면 감점하세요.
4. 차별성이 약하면 보완점을 제시하세요.
5. 각 아이템의 강점, 약점, 개선 방향을 구체적으로 작성하세요.

반환 JSON 형식:
{
  "evaluations": [
    {
      "candidateId": "",
      "score": {
        "problemClarity": 0,
        "customerClarity": 0,
        "solutionFit": 0,
        "differentiation": 0,
        "feasibility": 0,
        "socialValue": 0,
        "total": 0
      },
      "strengths": [],
      "weaknesses": [],
      "improvementSuggestions": [],
      "recommendationRank": 1,
      "recommendationReason": ""
    }
  ],
  "summary": "",
  "recommendedCandidateId": ""
}
```

## 9.4 최종 문서 생성 프롬프트

```txt
아래 정보를 바탕으로 청소년 창업경진대회 신청서에 활용할 수 있는 핵심 문장을 작성하세요.

입력 정보:
- 팀 정보
- 선택한 문제 분야
- 문제 상황
- 문제 구체화 답변
- 창업 아이템 후보
- AI 평가 결과
- 팀이 선정한 최종 후보 3개
- 최종 선택한 창업 아이템

작성해야 할 항목:
1. 창업아이템명 후보 3~5개
2. 최종 추천 창업아이템명
3. 한 줄 아이템 설명
4. 주제
5. 우리 동아리가 해결하고 싶은 지역 문제
6. 창업 아이템 소개
7. 차별성
8. 주요 고객
9. 판매 및 홍보 전략
10. 사회적 가치
11. 시제품 아이디어
12. 이미지 또는 설계도 아이디어
13. 개발 동기 초안
14. 최종 선정 이유
15. 보완 필요사항

작성 원칙:
- 공적이고 전문적인 문체로 작성하세요.
- 중·고등학생이 발표하고 설명할 수 있는 수준으로 작성하세요.
- 없는 통계나 시장규모는 만들지 마세요.
- 조사되지 않은 내용은 "추후 조사 필요"로 표시하세요.
- 신청서에 바로 옮겨 적을 수 있도록 문장을 정돈하세요.

반환 JSON 형식:
{
  "itemNameSuggestions": [],
  "selectedItemName": "",
  "oneLineItemDescription": "",
  "topic": "",
  "localProblemToSolve": "",
  "itemIntroduction": [],
  "differentiation": [],
  "targetCustomers": [],
  "promotionAndSalesStrategy": [],
  "expectedSocialValue": [],
  "prototypeIdea": "",
  "imageOrDiagramIdea": "",
  "developmentMotivationDraft": "",
  "finalSelectionReason": "",
  "limitationsAndNextResearch": []
}
```

---

# 10. UI/UX 요구사항

## 10.1 전체 레이아웃

- 상단: 서비스명, 진행률
- 중앙: 현재 단계 입력/결과 영역
- 하단: 이전/다음 버튼
- 우측 또는 상단: 현재 단계 표시
- 모바일 반응형 지원

## 10.2 진행률 표시

예시:

```txt
1 / 8 팀 정보 입력
2 / 8 문제 선택
3 / 8 문제 구체화
4 / 8 아이템 생성
5 / 8 아이템 평가
6 / 8 후보 3개 선정
7 / 8 최종 확정
8 / 8 결과 저장
```

## 10.3 디자인 톤

- 청소년이 사용하기 쉬운 밝은 UI
- 공공 교육 플랫폼 느낌
- 과도한 장식보다 명확한 카드형 구성
- 주요 버튼은 명확하게 강조
- 결과물 영역은 A4 문서처럼 보이게 구성

## 10.4 주요 컴포넌트

```txt
components/
  ApiKeySettings.tsx
  Stepper.tsx
  TeamInfoStep.tsx
  ProblemCategoryStep.tsx
  ProblemDetailStep.tsx
  CandidateGenerationStep.tsx
  EvaluationStep.tsx
  ShortlistStep.tsx
  FinalSelectionStep.tsx
  FinalDocumentStep.tsx
  ResultHtmlPreview.tsx
  PrintButton.tsx
  DownloadHtmlButton.tsx
```

---

# 11. 파일 구조

```txt
app/
  page.tsx
  layout.tsx
  globals.css
  api/
    ai/
      claude/
        route.ts

components/
  ApiKeySettings.tsx
  Stepper.tsx
  TeamInfoStep.tsx
  ProblemCategoryStep.tsx
  ProblemDetailStep.tsx
  CandidateGenerationStep.tsx
  EvaluationStep.tsx
  ShortlistStep.tsx
  FinalSelectionStep.tsx
  FinalDocumentStep.tsx
  ResultHtmlPreview.tsx
  PrintButton.tsx
  DownloadHtmlButton.tsx

lib/
  anthropic.ts
  prompts.ts
  htmlExport.ts
  print.ts
  sanitizeFilename.ts
  jsonParser.ts

types/
  app.ts
  ai.ts

.env.example
README.md
prd.md
```

---

# 12. API Route 구현 요구사항

## 12.1 `app/api/ai/claude/route.ts`

### 기능

- Claude API 호출
- API Key 확인
- Task별 프롬프트 구성
- JSON 응답 파싱
- 에러 처리

### 의사코드

```ts
import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userApiKey = req.headers.get("x-user-anthropic-key");
    const apiKey = userApiKey || process.env.ANTHROPIC_API_KEY;
    const model = process.env.CLAUDE_MODEL;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Claude API Key가 설정되지 않았습니다." },
        { status: 400 }
      );
    }

    if (!model) {
      return NextResponse.json(
        { success: false, error: "CLAUDE_MODEL 환경변수가 설정되지 않았습니다." },
        { status: 400 }
      );
    }

    const anthropic = new Anthropic({ apiKey });

    const { task, payload } = body;

    const prompt = buildPromptByTask(task, payload);

    const message = await anthropic.messages.create({
      model,
      max_tokens: 4000,
      temperature: 0.4,
      system: COMMON_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text = extractTextFromClaudeMessage(message);
    const json = safeParseJson(text);

    return NextResponse.json({
      success: true,
      data: json,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "AI 응답 처리 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
```

### 주의사항

- API Key를 console.log로 출력하지 않는다.
- 사용자 입력 전문을 서버 로그에 남기지 않는다.
- Claude 응답 원문을 불필요하게 로그로 남기지 않는다.
- JSON 파싱 실패 시 사용자에게 재시도 버튼 제공
- API 호출 중 로딩 상태 표시

---

# 13. HTML 생성 함수 요구사항

## 13.1 `lib/htmlExport.ts`

### 함수

```ts
export function generateResultHtml(state: AppState): string
```

### 요구사항

- 완전한 HTML 문서 반환
- UTF-8 인코딩
- 인쇄 전용 CSS 포함
- A4 출력 최적화
- 표와 제목 구조 명확화
- 사용자 입력값은 escape 처리
- 줄바꿈은 `<br />`로 변환
- 배열 데이터는 `<ul><li>` 형태로 변환

### HTML 기본 구조

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <title>창업 아이템 선정 결과</title>
  <style>
    @page {
      size: A4;
      margin: 15mm;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
      color: #111827;
      line-height: 1.6;
      background: #ffffff;
    }

    h1, h2, h3 {
      color: #111827;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
    }

    th, td {
      border: 1px solid #d1d5db;
      padding: 8px;
      vertical-align: top;
    }

    th {
      background: #f3f4f6;
    }

    .page-break {
      page-break-before: always;
    }
  </style>
</head>
<body>
  <main>
    <!-- result content -->
  </main>
</body>
</html>
```

---

# 14. 유효성 검사

## 14.1 팀 정보

- 팀명 필수
- 구성원은 최소 1명 권장
- 구성원 학교, 학년, 이름 중 일부가 비어 있어도 저장은 허용
- 단, 최종 결과물에서는 빈 값은 `-`로 표시

## 14.2 문제 선택

- 문제 분야 최소 1개 선택
- 직접 입력한 불편 상황이 없으면 경고 표시
- 불편 상황이 없더라도 진행은 가능

## 14.3 AI 아이템 생성

- 문제 분야 또는 불편 상황 중 하나 이상은 있어야 함
- Claude API Key 또는 환경변수가 없으면 생성 버튼 비활성화
- API 실패 시 재시도 버튼 표시

## 14.4 최종 후보 선정

- 1순위, 2순위, 3순위 중복 선택 방지
- 후보가 3개 미만이면 현재 후보 수만큼 선택 허용

## 14.5 최종 확정

- 최종 아이템 1개 선택 필수
- 체크리스트는 권장사항
- 체크리스트가 모두 체크되지 않아도 진행 가능
- 다만 미체크 항목은 최종 결과물의 보완 필요사항에 반영

---

# 15. 보안 및 개인정보 원칙

## 15.1 개인정보 최소화

MVP에서 입력받는 정보는 아래로 제한한다.

- 팀명
- 구성원 학교
- 학년
- 이름
- 창업 문제 관련 답변

전화번호, 이메일, 주소 등은 입력받지 않는다.

## 15.2 저장 금지

- 사용자 답변 DB 저장 금지
- API Key DB 저장 금지
- 산출물 서버 저장 금지
- 쿠키 저장 금지
- localStorage 저장 금지

## 15.3 Claude API 전송 고지

화면에 아래 문구를 표시한다.

```txt
AI 생성을 위해 입력한 내용이 Claude API로 전송될 수 있습니다.
입력한 내용은 본 서비스 서버에 저장되지 않습니다.
```

---

# 16. 에러 처리

## 16.1 API Key 없음

```txt
Claude API Key가 설정되지 않았습니다.
.env.local에 ANTHROPIC_API_KEY를 입력하거나 화면에서 세션 전용 API Key를 입력해 주세요.
```

## 16.2 모델명 없음

```txt
CLAUDE_MODEL 환경변수가 설정되지 않았습니다.
Anthropic Console에서 사용할 모델 ID를 확인한 뒤 .env.local에 입력해 주세요.
```

## 16.3 AI 응답 실패

```txt
AI 응답 생성 중 문제가 발생했습니다.
잠시 후 다시 시도해 주세요.
```

## 16.4 JSON 파싱 실패

```txt
AI 응답 형식이 올바르지 않습니다.
다시 생성해 주세요.
```

## 16.5 PDF 저장 안내

```txt
PDF 저장 창이 열리면 프린터 대상을 'PDF로 저장'으로 선택해 주세요.
```

---

# 17. 완료 기준

## 17.1 기능 완료 기준

- 팀명, 구성원 학교, 학년, 이름 입력 가능
- 문제 분야 선택 가능
- 문제 상황 입력 가능
- 문제 구체화 질문 답변 가능
- Claude API를 통해 창업 아이템 후보 3개 이상 생성 가능
- 후보별 AI 평가 가능
- 최종 후보 3개 선택 가능
- 최종 아이템 1개 확정 가능
- 신청서 핵심 문장 자동 생성 가능
- 최종 결과 HTML 미리보기 가능
- HTML 다운로드 가능
- PDF 저장 가능

## 17.2 비기능 완료 기준

- DB 관련 코드 없음
- 사용자 답변 서버 저장 없음
- 새로고침 시 작성 중 데이터가 사라짐
- API Key가 클라이언트 코드에 하드코딩되지 않음
- 환경변수 또는 세션 전용 입력 방식으로 Claude API 사용 가능
- 모바일 화면에서도 기본 사용 가능
- 최종 결과물은 A4 기준으로 출력 가능

## 17.3 코드 검증 기준

아래 항목이 없어야 한다.

```txt
prisma
supabase
firebase
mongodb
postgres
mysql
sqlite
drizzle
localStorage.setItem
document.cookie
```

단, `localStorage.setItem`은 명시적으로 사용하지 않는다.

---

# 18. Cursor 개발 지시사항

Cursor는 아래 순서로 구현한다.

## 18.1 1차 구현

1. Next.js App Router 프로젝트 구조 생성
2. Tailwind CSS 적용
3. shadcn/ui 기본 컴포넌트 적용
4. 타입 정의 작성
5. 단일 페이지 Wizard UI 구현
6. React state 기반 단계 이동 구현
7. 팀 정보 입력 구현
8. 문제 분야 선택 구현
9. 문제 구체화 질문 구현

## 18.2 2차 구현

1. Claude API Route 구현
2. API Key 설정 UI 구현
3. 창업 아이템 후보 생성 구현
4. AI 평가 구현
5. 최종 문서 생성 구현

## 18.3 3차 구현

1. 최종 결과 HTML 생성
2. HTML 미리보기 구현
3. HTML 다운로드 구현
4. PDF 저장 구현
5. 인쇄 CSS 최적화
6. 에러 처리 및 빈 상태 처리

## 18.4 절대 하지 말 것

- DB 붙이지 말 것
- 로그인 붙이지 말 것
- Supabase 붙이지 말 것
- Prisma 설치하지 말 것
- 사용자 답변 저장하지 말 것
- API Key를 코드에 하드코딩하지 말 것
- 산출물을 서버에 저장하지 말 것

---

# 19. `.env.example`

```env
# Claude API Key
ANTHROPIC_API_KEY=

# Claude Model ID
# Anthropic Console에서 사용할 모델 ID를 확인해 입력하세요.
CLAUDE_MODEL=
```

---

# 20. README에 포함할 실행 방법

```txt
1. 패키지 설치

npm install

2. 환경변수 설정

.env.local 파일을 만들고 아래 값을 입력합니다.

ANTHROPIC_API_KEY=your_api_key_here
CLAUDE_MODEL=your_claude_model_id_here

3. 개발 서버 실행

npm run dev

4. 브라우저 접속

http://localhost:3000
```

---

# 21. 최종 산출물 예시 구조

최종 결과물에는 아래 항목이 포함되어야 한다.

```txt
창업 아이템 선정 결과

1. 팀 정보
- 팀명
- 구성원 학교, 학년, 이름

2. 해결하고 싶은 문제
- 선택한 문제 분야
- 불편 상황
- 문제 구체화 답변

3. AI 창업 아이템 후보
- 후보 1
- 후보 2
- 후보 3

4. AI 평가 결과
- 평가 점수
- 강점
- 약점
- 보완 방향

5. 최종 후보 3개
- 1순위
- 2순위
- 3순위

6. 최종 창업 아이템
- 최종 아이템명
- 한 줄 설명
- 선정 이유

7. 신청서 핵심 문장
- 창업아이템명
- 한 줄 아이템 설명
- 주제
- 우리 동아리가 해결하고 싶은 지역 문제
- 창업 아이템 소개
- 차별성
- 주요 고객 및 판매 전략
- 이미지 또는 설계도 아이디어

8. 다음 단계
- 고객 인터뷰
- 유사 서비스 조사
- 시제품 제작
- 사업계획서 본문 작성
```

---

# 22. 핵심 성공 기준

이 MVP의 성공 기준은 저장 기능이 아니라, 사용자가 짧은 시간 안에 아래 결과를 얻는 것이다.

```txt
우리 팀이 어떤 문제를 해결할지 정리했다.
AI가 창업 아이템 후보를 3개 이상 제안했다.
후보를 비교 평가했다.
최종 창업 아이템을 선정했다.
신청서에 바로 활용 가능한 핵심 문장이 생성되었다.
결과물을 HTML로 확인하고 PDF로 저장했다.
```

# 23. AI 오케스트레이션 및 맥락 유지 설계

## 23.1 기본 원칙

본 서비스의 AI는 단순 질의응답형 챗봇이 아니라, 단계형 창업 아이템 선정 워크플로우를 수행하는 AI 코치로 동작해야 한다.

Claude API는 호출 간 기억을 유지하지 않으므로, 모든 AI 호출 시 현재까지의 전체 워크플로우 상태를 구조화된 Context로 전달한다.

DB는 사용하지 않으며, Context는 React state에만 존재한다.

## 23.2 WorkflowContext

모든 AI 요청은 다음 구조를 포함해야 한다.

- 서비스 목적
- 현재 단계
- 현재 단계에서 AI가 해야 할 역할
- 팀 정보
- 선택한 문제 분야
- 사용자가 입력한 불편 상황
- 문제 구체화 답변
- 확정된 문제 요약
- 생성된 창업 아이템 후보
- AI 평가 결과
- 팀이 선정한 후보 3개
- 최종 선택 아이템
- 신청서 양식 기준 출력 규칙

## 23.3 단계별 AI 역할

1. 문제 구체화 단계: 창업교육 인터뷰어
2. 아이템 생성 단계: 청소년 창업 아이템 기획자
3. 아이템 평가 단계: 창업경진대회 예비 심사위원
4. 후보 선정 단계: 팀 토론 조력자
5. 최종 문서 생성 단계: 신청서 작성 코치

## 23.4 확정 맥락 고정 규칙

다음 값은 한 번 확정되면 사용자가 직접 수정하지 않는 한 AI가 임의로 변경할 수 없다.

- 선택한 문제 분야
- 사용자가 입력한 원문 문제 상황
- 확정된 문제 정의
- 최종 후보 3개
- 최종 선택 아이템
- 최종 아이템명

## 23.5 Claude 요청 구조

모든 Claude 요청은 다음 구조를 따른다.

{
  "task": "generate_startup_items",
  "workflowContext": {},
  "instruction": "현재 단계에서 수행할 구체적 작업",
  "outputSchema": {}
}

## 23.6 AI 금지사항

AI는 다음을 수행하면 안 된다.

- 없는 통계 생성
- 확인되지 않은 시장 규모 생성
- 사용자 문제와 무관한 아이템 생성
- 최종 선택 아이템 임의 변경
- 신청서 양식과 관계없는 장황한 설명 생성
- 청소년 동아리가 실행하기 어려운 과도한 기술 제안

## 23.7 응답 검증

AI 응답은 반드시 zod schema로 검증한다.
검증 실패 시 repair prompt를 통해 JSON 형식을 재생성한다.

# 24. 신청서 양식 참조 기준

## 24.1 참조문서

본 서비스의 최종 산출물은 아래 신청서 양식을 기준으로 작성한다.

- 참조문서명: 2026 대한민국 청소년 창업경진대회 사업계획서 신청서 양식
- 파일 위치: `/docu/ai창업사업계획서/2026-youth-startup-application-form.pdf`
- 용도: 최종 HTML/PDF 결과물의 항목 구성 및 AI 출력 기준으로 사용

주의:

- 본 MVP에서는 신청서 PDF 파일을 직접 편집하지 않는다.
- 신청서 양식을 서버에 업로드하거나 Claude API에 매번 전송하지 않는다.
- 신청서 양식의 핵심 작성 항목만 구조화하여 AI 프롬프트와 결과물 생성 로직에 반영한다.

## 24.2 신청서 핵심 출력 항목

AI 최종 결과물은 반드시 아래 항목을 포함해야 한다.

### 1. 기본 아이템 정보

- 창업아이템명
- 한 줄 아이템 설명
- 주제
- 우리 동아리가 해결하고 싶은 지역 문제

### 2. 창업 아이템 개요

- 창업 아이템 소개
- 차별성
- 주요 고객
- 판매 및 홍보 전략
- 이미지 또는 설계도 아이디어

### 3. 사업계획서 본문 확장 항목

- 문제인식
  - 창업 아이템의 개발 동기
  - 창업 아이템의 사회적 가치 창출
- 실현가능성
  - 창업 아이템의 발전 과정
  - 창업 아이템의 시장 및 고객 분석
  - 창업 아이템 개발 과정 중 예상되는 장애 요소
- 성장전략
  - 창업 아이템 개발을 위한 필요 자원
  - 판매 전략
  - 홍보 전략
- 팀 구성
  - 동아리 구성원 담당 역할
  - 구성원 역량
  - 동아리 구성원 간 갈등 해결 방법

## 24.3 AI 출력 제한 규칙

AI는 최종 산출물을 생성할 때 신청서 양식과 직접 연결되는 내용만 작성해야 한다.

금지사항:

- 신청서 양식과 관계없는 장황한 창업 이론 설명
- 확인되지 않은 통계, 시장 규모, 법률, 기관명 생성
- 사용자가 선택하지 않은 문제 분야로 주제 변경
- 최종 선택된 창업 아이템명 임의 변경
- 청소년 동아리가 실행하기 어려운 과도한 기술 제안
- 신청서 항목에 넣기 어려운 추상적 문장 생성

## 24.4 ApplicationFormSpec

코드에는 아래와 같은 신청서 참조 규격을 상수로 둔다.

```ts
export const APPLICATION_FORM_SPEC = {
  formTitle: "2026 대한민국 청소년 창업경진대회 사업계획서",
  fixedOutputSections: [
    {
      id: "item-basic-info",
      title: "기본 아이템 정보",
      requiredFields: [
        "창업아이템명",
        "한 줄 아이템 설명",
        "주제",
        "우리 동아리가 해결하고 싶은 지역 문제"
      ]
    },
    {
      id: "item-summary",
      title: "창업 아이템 개요",
      requiredFields: [
        "창업 아이템 소개",
        "차별성",
        "주요 고객",
        "판매 및 홍보 전략",
        "이미지 또는 설계도 아이디어"
      ]
    },
    {
      id: "problem-recognition",
      title: "1. 문제인식",
      requiredFields: [
        "창업 아이템의 개발 동기",
        "창업 아이템의 사회적 가치 창출"
      ]
    },
    {
      id: "feasibility",
      title: "2. 실현가능성",
      requiredFields: [
        "창업 아이템의 발전 과정",
        "창업 아이템의 시장 및 고객 분석",
        "창업 아이템 개발 과정 중 예상되는 장애 요소"
      ]
    },
    {
      id: "growth-strategy",
      title: "3. 성장전략",
      requiredFields: [
        "창업 아이템 개발을 위한 필요 자원",
        "판매 전략",
        "홍보 전략"
      ]
    },
    {
      id: "team",
      title: "4. 팀 구성",
      requiredFields: [
        "동아리 구성원 담당 역할",
        "구성원 역량",
        "동아리 구성원 간 갈등 해결 방법"
      ]
    }
  ],
  aiWritingRules: [
    "신청서 항목에 바로 옮겨 적을 수 있는 문장으로 작성한다.",
    "없는 통계나 시장 규모는 생성하지 않는다.",
    "확인되지 않은 내용은 '추후 조사 필요'로 표시한다.",
    "문제 → 고객 → 해결 방법 → 차별성 → 실행 가능성 → 사회적 가치 흐름을 유지한다.",
    "청소년 창업동아리가 설명하고 실행할 수 있는 수준으로 작성한다."
  ]
};
```

