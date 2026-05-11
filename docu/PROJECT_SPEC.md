아래 문서를 그대로 **Cursor 프로젝트의 `docs/PROJECT_SPEC.md`** 또는 `README.md`에 붙여 넣고 개발을 시작하시면 됩니다.
기획 기준은 첨부된 “청소년 창업 팀구성 캐릭터 진단 웹서비스” 문서와 결과 리포트 설계 문서를 통합한 것입니다.  

---

# 청소년 창업 캐릭터 진단 웹서비스 개발 문서

## 0. 프로젝트 기본 정보

| 항목         | 내용                                                           |
| ---------- | ------------------------------------------------------------ |
| 프로젝트명      | KISON 청소년 창업 캐릭터 진단 웹서비스                                     |
| GitHub 저장소 | `koreatommy/kison`                                           |
| 개발 목적      | 청소년 창업 교육 프로그램에서 학생의 창업 성향을 진단하고 팀 내 적합 역할을 추천               |
| 핵심 기능      | 10문항 설문 → 캐릭터 진단 → 결과 리포트 → 팀 구성 반영                          |
| 주요 화면      | 시작 화면, 학생 정보 입력, 설문 화면, 결과 분석 로딩, 개인 결과 리포트, 팀 구성 화면, 관리자 화면 |
| 우선 구현 범위   | 결과 리포트 와이어프레임 UI                                             |
| 권장 기술      | Next.js App Router, TypeScript, Tailwind CSS, Recharts       |

---

## 1. 서비스 개요

이 서비스는 청소년 창업 교육 프로그램의 일부로, 학생들이 온라인 설문을 통해 자신의 창업 성향을 진단하고, 그 결과에 따라 창업팀 안에서 자신에게 적합한 역할과 캐릭터를 추천받는 웹서비스이다.

핵심은 단순한 성향검사가 아니라, 학생들이 자신의 창업 역할을 **게임 캐릭터 소개 화면처럼 직관적이고 재미있게 이해**하도록 만드는 것이다.

결과 화면에는 다음 요소가 포함되어야 한다.

* 대표 캐릭터 이미지
* 캐릭터 이름
* 창업 역할명
* 한 줄 소개
* 키워드 배지
* 레이더 차트
* 능력치 점수 카드
* 대표 성향
* 보조 성향
* 강점
* 성장 포인트
* 잘 맞는 팀원
* 추천 활동
* 캐릭터 대사
* 결과 이미지 저장
* PDF 저장
* 팀 구성 반영

---

## 2. 서비스 목적

| 번호 | 목적                                        |
| -: | ----------------------------------------- |
|  1 | 청소년이 창업팀 안에서 자신에게 맞는 역할을 쉽게 이해하게 한다.      |
|  2 | CEO, CTO, CMO 같은 어려운 직책을 쉬운 캐릭터 역할로 설명한다. |
|  3 | 10개 설문 문항을 통해 학생의 창업 성향을 진단한다.            |
|  4 | 결과 화면에서 캐릭터 이미지, 레이더 차트, 능력치, 리포트를 제공한다.  |
|  5 | 향후 3~5명 팀 구성 시 역할 분포 참고 자료로 활용한다.         |

---

## 3. 대상 사용자

| 구분       | 내용                                |
| -------- | --------------------------------- |
| 1차 사용자   | 초등 고학년, 중학생, 고등학생                 |
| 2차 사용자   | 강사, 교사, 운영자, 관리자                  |
| 문체 기준    | 너무 유치하지 않되 초등 고학년도 이해할 수 있는 쉬운 표현 |
| 창업 용어 처리 | 전문 직책명과 쉬운 역할명을 함께 제공             |

예시:

| 실제 직책 | 쉬운 표현   |
| ----- | ------- |
| CEO   | 방향잡이 리더 |
| CTO   | 기술 제작자  |
| CMO   | 홍보 전략가  |

---

## 4. 팀 구성 기준

팀 구성은 **3~5명**을 기준으로 한다.

기본적으로는 **4명 1팀**이 가장 안정적이다. 다만 교육 현장 상황에 따라 3명 또는 5명 팀도 가능해야 한다.

### 4-1. 3명 팀

| 인원 | 역할            |
| -: | ------------- |
| 1명 | CEO + CPO     |
| 1명 | CTO           |
| 1명 | CMO + CFO/COO |

### 4-2. 4명 팀

| 인원 | 역할            |
| -: | ------------- |
| 1명 | CEO           |
| 1명 | CPO / PM      |
| 1명 | CTO           |
| 1명 | CMO + CFO/COO |

### 4-3. 5명 팀

| 인원 | 역할        |
| -: | --------- |
| 1명 | CEO       |
| 1명 | CPO / PM  |
| 1명 | CTO       |
| 1명 | CMO       |
| 1명 | CFO / COO |

---

## 5. 확정 역할 5개

| 코드  | 실제 직책     | 쉬운 역할명   | 핵심 역할                     |
| --- | --------- | -------- | ------------------------- |
| CEO | CEO       | 방향잡이 리더  | 팀의 목표를 정하고 전체 방향을 이끈다     |
| CPO | CPO / PM  | 아이디어 설계자 | 문제를 찾고 아이디어와 서비스를 기획한다    |
| CTO | CTO       | 기술 제작자   | 앱, 웹, 제품, 시제품을 만든다        |
| CMO | CMO       | 홍보 전략가   | 고객에게 알리고 발표·홍보·마케팅을 담당한다  |
| COO | CFO / COO | 숫자 운영가   | 예산, 일정, 자료, 준비물, 운영을 관리한다 |

CFO는 청소년 교육에서 단독 재무 역할로만 설명하기보다, COO와 결합해 **돈과 운영을 함께 관리하는 역할**로 설명한다.

---

## 6. 확정 캐릭터 5종

### 6-1. 캡틴 루미

| 항목     | 내용                          |
| ------ | --------------------------- |
| 코드     | CEO                         |
| 실제 역할  | CEO                         |
| 쉬운 역할명 | 방향잡이 리더                     |
| 캐릭터명   | 캡틴 루미                       |
| 핵심 성향  | 리더십, 결단력, 팀조율               |
| 한 줄 설명 | 팀의 목표를 정하고 친구들을 이끄는 리더형 캐릭터 |
| 캐릭터 대사 | 우리 팀의 방향은 내가 잡을게. 다 같이 해보자! |
| 대표 색상  | 골드, 하늘색                     |
| 상징     | 별, 나침반, 방향표시                |

### 6-2. 플래너 도도

| 항목     | 내용                                 |
| ------ | ---------------------------------- |
| 코드     | CPO                                |
| 실제 역할  | CPO / PM                           |
| 쉬운 역할명 | 아이디어 설계자                           |
| 캐릭터명   | 플래너 도도                             |
| 핵심 성향  | 기획력, 분석력, 구조화                      |
| 한 줄 설명 | 문제를 찾고 아이디어를 구체적인 계획으로 바꾸는 기획형 캐릭터 |
| 캐릭터 대사 | 좋은 아이디어는 문제를 제대로 이해하는 것에서 시작돼!     |
| 대표 색상  | 보라색, 민트색                           |
| 상징     | 노트, 포스트잇, 설계도, 전구                  |

### 6-3. 메이커 테오

| 항목     | 내용                                |
| ------ | --------------------------------- |
| 코드     | CTO                               |
| 실제 역할  | CTO                               |
| 쉬운 역할명 | 기술 제작자                            |
| 캐릭터명   | 메이커 테오                            |
| 핵심 성향  | 제작력, 실행력, 실험정신                    |
| 한 줄 설명 | 직접 만들고 실험하며 아이디어를 현실로 바꾸는 제작형 캐릭터 |
| 캐릭터 대사 | 직접 만들어 보면 더 좋은 답이 보여!             |
| 대표 색상  | 오렌지, 청록색                          |
| 상징     | 공구, 기어, 태블릿, 시제품                  |

### 6-4. 스토리 모아

| 항목     | 내용                                  |
| ------ | ----------------------------------- |
| 코드     | CMO                                 |
| 실제 역할  | CMO                                 |
| 쉬운 역할명 | 홍보 전략가                              |
| 캐릭터명   | 스토리 모아                              |
| 핵심 성향  | 표현력, 홍보력, 설득력                       |
| 한 줄 설명 | 아이디어를 매력적으로 알리고 사람들의 관심을 끄는 표현형 캐릭터 |
| 캐릭터 대사 | 좋은 아이디어는 잘 보여줘야 더 빛나!               |
| 대표 색상  | 핑크, 코랄, 블루 포인트                      |
| 상징     | 말풍선, 확성기, 하트, SNS 아이콘               |

### 6-5. 체크 누리

| 항목     | 내용                           |
| ------ | ---------------------------- |
| 코드     | COO                          |
| 실제 역할  | CFO·COO                      |
| 쉬운 역할명 | 숫자 운영가                       |
| 캐릭터명   | 체크 누리                        |
| 핵심 성향  | 운영력, 책임감, 꼼꼼함                |
| 한 줄 설명 | 일정, 예산, 자료, 준비를 관리하는 운영형 캐릭터 |
| 캐릭터 대사 | 작은 준비가 팀의 큰 성공을 만든다!         |
| 대표 색상  | 초록색, 네이비                     |
| 상징     | 체크리스트, 달력, 동전, 계산기           |

---

## 7. 설문 방식

| 항목     | 내용                         |
| ------ | -------------------------- |
| 문항 수   | 10문항                       |
| 선택지 수  | 문항당 5개                     |
| 선택지 연결 | 각 선택지는 5개 캐릭터 중 하나와 연결     |
| 점수 방식  | 선택한 캐릭터 코드에 +1점            |
| 대표 결과  | 최고 점수 캐릭터                  |
| 보조 결과  | 두 번째 점수 캐릭터                |
| 동점 처리  | 복합 성향으로 표시                 |
| 균형형 처리 | 5개 점수가 모두 비슷하면 균형형 창업가로 표시 |

---

## 8. 설문 문항

### Q1. 새로운 팀 프로젝트를 시작할 때 나는?

| 선택지                               | 코드  |
| --------------------------------- | --- |
| 팀 목표를 정하고 친구들이 잘 움직이도록 돕고 싶다      | CEO |
| 어떤 문제를 해결할지 먼저 정리하고 싶다            | CPO |
| 직접 만들어 보면서 아이디어를 확인하고 싶다          | CTO |
| 사람들이 관심 가질 만한 이름이나 소개 방법을 생각하고 싶다 | CMO |
| 준비물, 시간, 역할을 꼼꼼하게 정리하고 싶다         | COO |

### Q2. 창업 아이디어를 정할 때 가장 중요하다고 생각하는 것은?

| 선택지                         | 코드  |
| --------------------------- | --- |
| 팀이 같은 목표를 보고 함께 움직이는 것      | CEO |
| 진짜 불편한 문제를 찾아내는 것           | CPO |
| 실제로 작동하는 제품이나 서비스를 만드는 것    | CTO |
| 사람들이 “이거 좋아 보인다”고 느끼게 만드는 것 | CMO |
| 돈, 시간, 준비물을 낭비하지 않는 것       | COO |

### Q3. 친구들과 의견이 다를 때 나는?

| 선택지                         | 코드  |
| --------------------------- | --- |
| 서로의 의견을 듣고 최종 방향을 정하려고 한다   | CEO |
| 왜 의견이 다른지 차분히 정리한다          | CPO |
| 말로만 하지 말고 한번 실험해 보자고 한다     | CTO |
| 분위기를 풀고 친구들이 다시 말할 수 있게 돕는다 | CMO |
| 정해진 시간 안에 결정할 수 있도록 정리한다    | COO |

### Q4. 내가 가장 자신 있는 활동은?

| 선택지                       | 코드  |
| ------------------------- | --- |
| 팀을 대표해서 발표하거나 결정을 이끄는 것   | CEO |
| 복잡한 생각을 보기 쉽게 정리하는 것      | CPO |
| 만들기, 코딩, 실험, 시제품 제작       | CTO |
| 발표 자료, 디자인, 영상, 홍보 문구 만들기 | CMO |
| 일정표, 예산표, 체크리스트 정리하기      | COO |

### Q5. 창업팀에서 내가 맡고 싶은 역할은?

| 선택지                     | 코드  |
| ----------------------- | --- |
| 팀을 이끌고 전체 방향을 정하는 역할    | CEO |
| 아이디어와 사업 계획을 만드는 역할     | CPO |
| 앱, 웹, 제품, 모형을 만드는 역할    | CTO |
| 브랜드, 광고, 발표를 맡는 역할      | CMO |
| 돈, 일정, 자료, 준비물을 관리하는 역할 | COO |

### Q6. 발표 준비를 할 때 나는?

| 선택지                      | 코드  |
| ------------------------ | --- |
| 누가 어떤 부분을 맡을지 정한다        | CEO |
| 발표 순서와 핵심 내용을 정리한다       | CPO |
| 보여줄 시제품이나 화면이 잘 되는지 확인한다 | CTO |
| 발표 문장과 디자인을 더 멋지게 만든다    | CMO |
| 발표 시간, 제출 자료, 준비물을 확인한다  | COO |

### Q7. 문제가 생겼을 때 나의 행동은?

| 선택지                     | 코드  |
| ----------------------- | --- |
| 팀원들을 모아 해결 방향을 정한다      | CEO |
| 문제를 작은 부분으로 나누어 원인을 찾는다 | CPO |
| 여러 방법을 직접 해보며 해결책을 찾는다  | CTO |
| 친구들에게 설명하고 도움을 구한다      | CMO |
| 빠진 것이 없는지 체크리스트로 확인한다   | COO |

### Q8. 내가 가장 재미있게 느끼는 창업 활동은?

| 선택지                    | 코드  |
| ---------------------- | --- |
| 팀을 대표해서 의사결정하기         | CEO |
| 고객의 불편함을 조사하고 아이디어 만들기 | CPO |
| 제품, 앱, 웹페이지, 모형 만들기    | CTO |
| 이름, 로고, 광고, 발표 자료 만들기  | CMO |
| 가격, 예산, 일정, 역할표 정리하기   | COO |

### Q9. 친구들이 나를 설명한다면?

| 선택지                | 코드  |
| ------------------ | --- |
| “팀을 잘 이끌어 주는 친구”   | CEO |
| “생각을 잘 정리하는 친구”    | CPO |
| “무언가를 잘 만들어 내는 친구” | CTO |
| “말과 표현을 잘하는 친구”    | CMO |
| “꼼꼼하고 책임감 있는 친구”   | COO |

### Q10. 창업 발표회 마지막 날, 내가 가장 잘할 수 있는 일은?

| 선택지                        | 코드  |
| -------------------------- | --- |
| 팀 전체를 점검하고 마지막 결정을 내리는 일   | CEO |
| 발표 내용과 사업 아이디어를 정리하는 일     | CPO |
| 시제품이나 웹페이지가 잘 작동하는지 확인하는 일 | CTO |
| 발표 자료와 홍보 문구를 멋지게 완성하는 일   | CMO |
| 제출 자료, 시간, 준비물을 최종 확인하는 일  | COO |

---

## 9. 설문 구현 주의사항

선택지 순서는 화면마다 무작위로 섞는다.

이유:

* 같은 위치의 선택지만 반복 클릭하는 문제 방지
* 특정 캐릭터가 항상 같은 순서에 노출되는 편향 방지
* 학생의 실제 성향 응답 유도

내부 데이터에는 선택지와 캐릭터 코드를 고정하고, 화면 출력 시에만 셔플한다.

예시:

```ts
type QuestionOption = {
  id: string;
  text: string;
  type: CharacterCode;
};

type Question = {
  id: string;
  question: string;
  options: QuestionOption[];
};
```

---

## 10. 점수 계산 로직

### 10-1. 원점수 구조

```ts
type RawScores = {
  CEO: number;
  CPO: number;
  CTO: number;
  CMO: number;
  COO: number;
};
```

초기값:

```ts
const rawScores: RawScores = {
  CEO: 0,
  CPO: 0,
  CTO: 0,
  CMO: 0,
  COO: 0,
};
```

응답 처리:

```ts
answers.forEach((answer) => {
  rawScores[answer.type] += 1;
});
```

---

### 10-2. 레이더 차트 환산 점수

원점수는 각 캐릭터별 선택 횟수이다.
화면에서는 100점 만점 기준으로 환산한다.

```ts
const abilityScores = {
  leadership: Math.min(rawScores.CEO * 20, 100),
  planning: Math.min(rawScores.CPO * 20, 100),
  making: Math.min(rawScores.CTO * 20, 100),
  expression: Math.min(rawScores.CMO * 20, 100),
  operation: Math.min(rawScores.COO * 20, 100),
};
```

### 10-3. 대표 캐릭터 산출

```ts
const sortedScores = Object.entries(rawScores).sort((a, b) => b[1] - a[1]);

const primaryCode = sortedScores[0][0];
const secondaryCode = sortedScores[1][0];
```

### 10-4. 결과 유형

| 결과 유형      | 조건                   | 표시 방식                |
| ---------- | -------------------- | -------------------- |
| `single`   | 1위 점수가 단독 최고         | 대표 캐릭터 1개 + 보조 성향 1개 |
| `mixed`    | 1위 점수에 동점 캐릭터가 2개 이상 | 복합 성향으로 표시           |
| `balanced` | 5개 캐릭터 점수 차이가 작음     | 균형형 창업가로 표시          |

균형형 판단 기준:

```ts
const values = Object.values(rawScores);
const max = Math.max(...values);
const min = Math.min(...values);

const isBalanced = max - min <= 1;
```

---

## 11. 결과 리포트 설계

결과 리포트는 **게임 캐릭터 프로필 카드**처럼 구성한다.
학생이 자신의 캐릭터를 “획득했다”는 느낌을 받을 수 있어야 한다.

### 11-1. 필수 구성요소

| 순서 | 요소        | 내용                      |
| -: | --------- | ----------------------- |
|  1 | 결과 타이틀    | 나의 창업 캐릭터 결과            |
|  2 | 캐릭터 이미지   | 대표 캐릭터 이미지              |
|  3 | 캐릭터 이름    | 캡틴 루미 등                 |
|  4 | 역할명       | CEO / 방향잡이 리더           |
|  5 | 한 줄 소개    | 캐릭터 성향 요약               |
|  6 | 키워드 배지    | 리더십, 결단력, 팀조율 등         |
|  7 | 레이더 차트    | 5개 성향 시각화               |
|  8 | 능력치 점수 카드 | 리더십, 기획력, 제작력, 표현력, 운영력 |
|  9 | 대표 성향     | 1순위 캐릭터                 |
| 10 | 보조 성향     | 2순위 캐릭터                 |
| 11 | 강점        | 3개 내외                   |
| 12 | 성장 포인트    | 2~3개                    |
| 13 | 잘 맞는 팀원   | 궁합 좋은 캐릭터 2명            |
| 14 | 추천 활동     | 팀장, 발표, 제작, 홍보 등        |
| 15 | 캐릭터 대사    | 말풍선형 한마디                |

---

## 12. 레이더 차트 축

| 축 이름 | 의미                     | 연결 캐릭터 |
| ---- | ---------------------- | ------ |
| 리더십  | 팀을 이끌고 방향을 정하는 힘       | 캡틴 루미  |
| 기획력  | 문제를 찾고 아이디어를 구조화하는 힘   | 플래너 도도 |
| 제작력  | 직접 만들고 실험하는 힘          | 메이커 테오 |
| 표현력  | 발표, 홍보, 설득, 스토리 전달 능력  | 스토리 모아 |
| 운영력  | 일정, 예산, 자료, 준비를 관리하는 힘 | 체크 누리  |

---

## 13. 화면 구조

### 13-1. 데스크톱 결과 화면

```text
┌──────────────────────────────────────────────────────────────┐
│ 상단 헤더                                                     │
│ [나의 창업 캐릭터 결과]                  [이미지 저장] [PDF] │
├──────────────────────────────────────────────────────────────┤
│ 메인 결과 카드                                                │
│ ┌──────────────────────┬───────────────────────────────────┐ │
│ │                      │ 획득 캐릭터                         │ │
│ │   캐릭터 이미지       │ 캡틴 루미                           │ │
│ │                      │ CEO / 방향잡이 리더                  │ │
│ │                      │ 한 줄 소개                           │ │
│ │                      │ #리더십 #결단력 #팀조율              │ │
│ │                      │ 캐릭터 대사 말풍선                    │ │
│ └──────────────────────┴───────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────┤
│ 성향 분석 영역                                                │
│ ┌────────────────────────┬─────────────────────────────────┐ │
│ │ 레이더 차트             │ 능력치 점수 카드                  │ │
│ │ 리더십/기획력/제작력    │ 리더십 80                         │ │
│ │ 표현력/운영력           │ 기획력 40                         │ │
│ │                        │ 제작력 20                         │ │
│ │                        │ 표현력 60                         │ │
│ │                        │ 운영력 40                         │ │
│ └────────────────────────┴─────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────┤
│ 상세 리포트 카드 영역                                         │
│ ┌────────────┬────────────┬────────────┬────────────┐         │
│ │ 강점        │ 성장 포인트 │ 잘 맞는 팀원 │ 추천 활동   │         │
│ └────────────┴────────────┴────────────┴────────────┘         │
├──────────────────────────────────────────────────────────────┤
│ 하단 CTA                                                      │
│ [다시 검사하기] [팀 구성에 반영하기] [결과 공유하기]          │
└──────────────────────────────────────────────────────────────┘
```

### 13-2. 모바일 결과 화면

```text
나의 창업 캐릭터 결과
10문항 성향 분석 완료

[캐릭터 이미지]

획득 캐릭터
캡틴 루미
CEO / 방향잡이 리더
#리더십 #결단력 #팀조율
“우리 팀의 방향은 내가 잡을게.”

[레이더 차트]

나의 창업 능력치
리더십 80
기획력 40
제작력 20
표현력 60
운영력 40

[대표 성향]
[보조 성향]

[강점 카드]
[성장 포인트 카드]
[잘 맞는 팀원 카드]
[추천 활동 카드]

[결과 저장] [팀 구성 반영]
```

---

## 14. 페이지 라우팅 설계

초기 개발은 결과 화면부터 구현한다.
이후 전체 서비스 구조는 아래처럼 확장한다.

```text
/
├── 시작 화면
│
/profile
├── 이름, 학년, 관심분야 입력
│
/survey
├── 10문항 설문 진행
│
/loading
├── 결과 분석 중 화면
│
/result
├── 개인 결과 리포트
│
/team
├── 팀 구성 결과 화면
│
/admin
└── 관리자용 결과 확인 화면
```

### 우선 구현 순서

1. `/result` 결과 리포트 화면
2. `/survey` 설문 화면
3. `/profile` 학생 정보 입력
4. `/team` 팀 구성 화면
5. `/admin` 관리자 화면

---

## 15. 권장 기술 스택

| 영역      | 기술                        |
| ------- | ------------------------- |
| 프레임워크   | Next.js App Router        |
| 언어      | TypeScript                |
| 스타일     | Tailwind CSS              |
| 차트      | Recharts                  |
| 상태관리 초기 | React State               |
| 상태관리 확장 | Zustand                   |
| 데이터     | TypeScript 객체 또는 JSON     |
| 이미지 저장  | html-to-image             |
| PDF 저장  | jsPDF 또는 react-to-print   |
| 배포      | Vercel                    |
| 저장소     | GitHub `koreatommy/kison` |

---

## 16. 패키지 설치 기준

```bash
npm install recharts
npm install html-to-image
npm install jspdf
npm install zustand
```

초기 1차 구현에서는 `recharts`만 필수이다.

---

## 17. 폴더 구조

```text
src
├── app
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   ├── result
│   │   └── page.tsx
│   ├── survey
│   │   └── page.tsx
│   ├── profile
│   │   └── page.tsx
│   ├── team
│   │   └── page.tsx
│   └── admin
│       └── page.tsx
│
├── components
│   ├── layout
│   │   ├── AppHeader.tsx
│   │   └── PageContainer.tsx
│   │
│   ├── result
│   │   ├── ResultHeader.tsx
│   │   ├── CharacterHeroCard.tsx
│   │   ├── RadarChartCard.tsx
│   │   ├── AbilityScoreList.tsx
│   │   ├── ReportCard.tsx
│   │   ├── MatchCharacterCard.tsx
│   │   └── ResultActionButtons.tsx
│   │
│   ├── survey
│   │   ├── SurveyProgress.tsx
│   │   ├── QuestionCard.tsx
│   │   └── OptionButton.tsx
│   │
│   └── team
│       ├── TeamCard.tsx
│       ├── TeamMemberCard.tsx
│       └── RoleBalanceChart.tsx
│
├── data
│   ├── characters.ts
│   ├── questions.ts
│   ├── resultTemplates.ts
│   └── mockResult.ts
│
├── lib
│   ├── scoring.ts
│   ├── shuffle.ts
│   ├── character-map.ts
│   └── team-builder.ts
│
├── store
│   └── useSurveyStore.ts
│
└── types
    └── result.ts
```

---

## 18. 타입 정의

파일 위치:

```text
src/types/result.ts
```

```ts
export type CharacterCode = "CEO" | "CPO" | "CTO" | "CMO" | "COO";

export type CharacterId =
  | "captain_lumi"
  | "planner_dodo"
  | "maker_theo"
  | "story_moa"
  | "check_nuri";

export type ResultType = "single" | "mixed" | "balanced";

export type RawScores = {
  CEO: number;
  CPO: number;
  CTO: number;
  CMO: number;
  COO: number;
};

export type AbilityScores = {
  leadership: number;
  planning: number;
  making: number;
  expression: number;
  operation: number;
};

export type Character = {
  id: CharacterId;
  code: CharacterCode;
  name: string;
  role: string;
  title: string;
  shortDescription: string;
  keywords: string[];
  imageUrl: string;
  quote: string;
  color: {
    primary: string;
    secondary: string;
  };
};

export type ResultTemplate = {
  strengths: string[];
  growthPoints: string[];
  bestMatches: CharacterId[];
  recommendedActivities: string[];
};

export type QuestionOption = {
  id: string;
  text: string;
  type: CharacterCode;
};

export type Question = {
  id: string;
  question: string;
  options: QuestionOption[];
};

export type StudentProfile = {
  name: string;
  grade: string;
  schoolLevel?: "elementary" | "middle" | "high";
  interest?: string;
};

export type StudentResult = {
  student: StudentProfile;
  result: {
    primaryCharacter: CharacterId;
    secondaryCharacter?: CharacterId;
    mixedCharacters?: CharacterId[];
    resultType: ResultType;
    rawScores: RawScores;
    scores: AbilityScores;
  };
};
```

---

## 19. 데이터 파일 설계

### 19-1. `characters.ts`

파일 위치:

```text
src/data/characters.ts
```

역할:

* 5개 캐릭터 기본 정보 관리
* 결과 화면의 캐릭터 카드에 사용
* 팀 궁합 카드에도 재사용

포함 데이터:

* id
* code
* name
* role
* title
* shortDescription
* keywords
* imageUrl
* quote
* color

---

### 19-2. `questions.ts`

파일 위치:

```text
src/data/questions.ts
```

역할:

* 10문항 설문 데이터 관리
* 각 선택지는 `CharacterCode`와 연결
* 화면 출력 시 `shuffleOptions()`로 순서 섞기

---

### 19-3. `resultTemplates.ts`

파일 위치:

```text
src/data/resultTemplates.ts
```

역할:

* 캐릭터별 결과 리포트 문안 관리
* 강점, 성장 포인트, 잘 맞는 팀원, 추천 활동

---

### 19-4. `mockResult.ts`

파일 위치:

```text
src/data/mockResult.ts
```

역할:

* 설문 기능 구현 전 결과 화면 테스트용 데이터
* `/result` 화면 개발에 우선 사용

---

## 20. 컴포넌트 설계

### 20-1. 결과 화면 컴포넌트 구조

```text
ResultPage
├── ResultHeader
├── CharacterHeroCard
│   ├── CharacterImage
│   ├── CharacterProfile
│   ├── KeywordBadges
│   └── CharacterQuote
├── ScoreAnalysisSection
│   ├── RadarChartCard
│   └── AbilityScoreList
├── ResultSummarySection
│   ├── PrimaryTraitCard
│   └── SecondaryTraitCard
├── DetailReportGrid
│   ├── ReportCard - 강점
│   ├── ReportCard - 성장 포인트
│   ├── MatchCharacterCard - 잘 맞는 팀원
│   └── ReportCard - 추천 활동
└── ResultActionButtons
    ├── SaveImageButton
    ├── DownloadPdfButton
    ├── RetakeButton
    └── ApplyTeamButton
```

---

## 21. 결과 리포트 문안

### 21-1. 캡틴 루미

강점:

* 팀의 목표를 빠르게 정할 수 있어요.
* 친구들의 의견을 모아 방향을 잡는 데 강해요.
* 발표나 최종 결정 상황에서 적극적이에요.

성장 포인트:

* 혼자 너무 빨리 결정하지 않도록 주의해요.
* 조용한 팀원의 의견도 끝까지 듣는 연습이 필요해요.
* 세부 실행은 팀원과 함께 나누면 더 좋아요.

잘 맞는 팀원:

* 플래너 도도
* 체크 누리

추천 활동:

* 팀장
* 발표 대표
* 최종 의사결정
* 역할 분배

---

### 21-2. 플래너 도도

강점:

* 아이디어를 정리하고 체계적으로 구성하는 능력이 좋아요.
* 고객의 문제나 불편을 잘 발견해요.
* 발표 흐름이나 사업계획 구조를 잘 잡아요.

성장 포인트:

* 생각만 길어지고 실행이 늦어지지 않도록 주의해요.
* 실제 사용자 반응을 빠르게 확인해보는 연습이 필요해요.
* 팀원들과 아이디어를 자주 공유하면 더 좋아요.

잘 맞는 팀원:

* 캡틴 루미
* 메이커 테오

추천 활동:

* 사업 아이디어 설계
* 문제 정의
* 발표 내용 구성
* 기획서 작성

---

### 21-3. 메이커 테오

강점:

* 말보다 직접 만들어 보며 해결하는 데 강해요.
* 시제품, 앱, 웹, 모형 제작에 적합해요.
* 문제를 테스트하며 빠르게 개선할 수 있어요.

성장 포인트:

* 기술이나 제작에만 집중하지 않도록 주의해요.
* 사용자 입장에서 보기 쉽게 설명하는 연습이 필요해요.
* 일정과 협업 소통을 함께 챙기면 더 강해져요.

잘 맞는 팀원:

* 플래너 도도
* 스토리 모아

추천 활동:

* 프로토타입 제작
* 코딩
* 기능 테스트
* 시제품 개선

---

### 21-4. 스토리 모아

강점:

* 발표, 홍보, 설명, 디자인에 강해요.
* 사람들의 관심을 끄는 표현 방식을 잘 찾아요.
* 브랜드 이름, 로고, 소개 문구 구성에 적합해요.

성장 포인트:

* 겉으로 보이는 부분만 강조하지 않도록 주의해요.
* 내용과 근거를 함께 준비하면 더 설득력 있어져요.
* 팀원들과 핵심 메시지를 맞추는 연습이 필요해요.

잘 맞는 팀원:

* 캡틴 루미
* 메이커 테오

추천 활동:

* 발표자
* 홍보물 제작
* 소개 문구 작성
* 브랜드 콘셉트 정리

---

### 21-5. 체크 누리

강점:

* 준비물, 자료, 시간, 예산 관리를 잘해요.
* 빠진 부분을 점검하고 완성도를 높이는 데 강해요.
* 팀 프로젝트의 안정감을 높여줘요.

성장 포인트:

* 완벽하게 하려다 속도가 늦어지지 않도록 주의해요.
* 변화가 생길 때 유연하게 대응하는 연습이 필요해요.
* 숫자와 운영뿐 아니라 아이디어에도 관심을 가지면 더 좋아요.

잘 맞는 팀원:

* 캡틴 루미
* 플래너 도도

추천 활동:

* 일정 관리
* 예산 정리
* 준비물 체크
* 제출 자료 관리

---

## 22. 저장 기능 설계

### 22-1. 이미지 저장

목표:

* 결과 리포트 영역을 PNG 이미지로 저장

권장 라이브러리:

```bash
npm install html-to-image
```

구현 방식:

```ts
import { toPng } from "html-to-image";

const saveAsImage = async (node: HTMLElement) => {
  const dataUrl = await toPng(node);
  const link = document.createElement("a");
  link.download = "startup-character-result.png";
  link.href = dataUrl;
  link.click();
};
```

### 22-2. PDF 저장

목표:

* 결과 리포트를 PDF로 저장

권장 라이브러리:

```bash
npm install jspdf
```

초기 구현은 PNG 변환 후 PDF에 삽입하는 방식으로 처리한다.

---

## 23. 팀 구성 기능 설계

### 23-1. 학생 결과 데이터

```ts
type TeamCandidate = {
  id: string;
  name: string;
  grade: string;
  schoolLevel?: "elementary" | "middle" | "high";
  primaryCharacter: CharacterId;
  secondaryCharacter?: CharacterId;
  scores: AbilityScores;
};
```

### 23-2. 팀 구성 기준

* 1팀 3~5명
* 가능하면 4명 팀 우선
* 학령 우선
* 같은 학령 내에서는 동일 학년 우선
* 팀 간 인원 격차 최소화
* 팀 내 역할 분포 균형 고려

### 23-3. 팀 구성 알고리즘 기본 방향

1. 학생을 학령별로 그룹화한다.
2. 같은 학령 내에서 학년별로 그룹화한다.
3. 전체 인원을 3~5명 팀으로 균등 배분한다.
4. 각 팀에 CEO, CPO, CTO, CMO, COO 성향이 최대한 분산되도록 배치한다.
5. 특정 역할이 몰리는 경우 보조 성향을 활용한다.
6. 남는 인원이 1명 발생하지 않도록 3명/4명/5명 조합으로 조정한다.

---

## 24. 관리자 화면 설계

관리자 화면은 후순위 구현이지만 데이터 구조는 미리 고려한다.

### 주요 기능

| 기능      | 설명                            |
| ------- | ----------------------------- |
| 학생 목록   | 이름, 학년, 대표 캐릭터, 보조 성향 확인      |
| 결과 필터   | 학령, 학년, 캐릭터별 필터               |
| 역할 분포   | CEO, CPO, CTO, CMO, COO 분포 차트 |
| 팀 자동 구성 | 3~5명 기준 팀 자동 생성               |
| 팀 수동 수정 | 드래그 앤 드롭 방식 후보                |
| 결과 다운로드 | CSV, PDF, 이미지                 |

---

## 25. 개발 단계

### 1단계. 프로젝트 기본 세팅

목표:

* Next.js 프로젝트 실행
* Tailwind 적용 확인
* Recharts 설치

산출물:

```text
package.json
src/app/page.tsx
src/app/layout.tsx
src/app/globals.css
```

---

### 2단계. 타입과 데이터 작성

목표:

* 캐릭터, 문항, 결과 타입 정의
* 캐릭터 데이터 작성
* 설문 문항 데이터 작성
* 결과 템플릿 작성

산출물:

```text
src/types/result.ts
src/data/characters.ts
src/data/questions.ts
src/data/resultTemplates.ts
src/data/mockResult.ts
```

---

### 3단계. 결과 리포트 화면 구현

목표:

* `/result` 화면 구현
* Mock 데이터 기반으로 결과 리포트 표시
* 데스크톱/모바일 반응형 적용

산출물:

```text
src/app/result/page.tsx
src/components/result/ResultHeader.tsx
src/components/result/CharacterHeroCard.tsx
src/components/result/RadarChartCard.tsx
src/components/result/AbilityScoreList.tsx
src/components/result/ReportCard.tsx
src/components/result/MatchCharacterCard.tsx
src/components/result/ResultActionButtons.tsx
```

---

### 4단계. 설문 화면 구현

목표:

* 10문항 진행
* 선택지 랜덤 출력
* 진행률 표시
* 이전/다음 버튼
* 응답 상태 저장

산출물:

```text
src/app/survey/page.tsx
src/components/survey/SurveyProgress.tsx
src/components/survey/QuestionCard.tsx
src/components/survey/OptionButton.tsx
src/lib/shuffle.ts
```

---

### 5단계. 점수 계산 연결

목표:

* 응답 데이터를 점수로 변환
* 대표 캐릭터, 보조 성향 산출
* 동점, 균형형 처리

산출물:

```text
src/lib/scoring.ts
```

---

### 6단계. 학생 정보 입력 화면 구현

목표:

* 이름, 학령, 학년, 관심분야 입력
* 설문 결과와 학생 정보 연결

산출물:

```text
src/app/profile/page.tsx
```

---

### 7단계. 이미지/PDF 저장 기능 구현

목표:

* 결과 리포트 이미지 저장
* PDF 저장

산출물:

```text
src/lib/export-image.ts
src/lib/export-pdf.ts
```

---

### 8단계. 팀 구성 화면 구현

목표:

* 여러 학생 결과 기반 팀 구성
* 역할 분포 시각화
* 팀별 카드 표시

산출물:

```text
src/app/team/page.tsx
src/lib/team-builder.ts
src/components/team/TeamCard.tsx
src/components/team/TeamMemberCard.tsx
src/components/team/RoleBalanceChart.tsx
```

---

## 26. Cursor 작업 지시문

Cursor에서 아래 순서로 작업하면 된다.

### Cursor 지시문 1: 기본 구조 생성

```text
이 프로젝트는 Next.js App Router, TypeScript, Tailwind CSS 기반의 청소년 창업 캐릭터 진단 웹서비스입니다.

먼저 아래 폴더 구조를 생성해 주세요.

src/app/result
src/app/survey
src/app/profile
src/app/team
src/app/admin
src/components/result
src/components/survey
src/components/team
src/components/layout
src/data
src/lib
src/store
src/types

그 다음 src/types/result.ts 파일에 CharacterCode, CharacterId, RawScores, AbilityScores, Character, ResultTemplate, Question, StudentProfile, StudentResult 타입을 정의해 주세요.
```

### Cursor 지시문 2: 데이터 파일 생성

```text
src/data/characters.ts, src/data/questions.ts, src/data/resultTemplates.ts, src/data/mockResult.ts 파일을 생성해 주세요.

characters.ts에는 캡틴 루미, 플래너 도도, 메이커 테오, 스토리 모아, 체크 누리 5개 캐릭터 데이터를 넣어 주세요.

questions.ts에는 10문항 5지선다 설문 데이터를 넣어 주세요. 각 선택지는 CEO, CPO, CTO, CMO, COO 코드 중 하나와 연결되어야 합니다.

resultTemplates.ts에는 캐릭터별 강점, 성장 포인트, 잘 맞는 팀원, 추천 활동 데이터를 넣어 주세요.

mockResult.ts에는 캡틴 루미가 대표 캐릭터이고 스토리 모아가 보조 성향인 테스트 결과 데이터를 넣어 주세요.
```

### Cursor 지시문 3: 결과 화면 구현

```text
/result 페이지를 구현해 주세요.

mockResult 데이터를 사용해서 다음 컴포넌트를 조합해 결과 리포트 화면을 만들어 주세요.

- ResultHeader
- CharacterHeroCard
- RadarChartCard
- AbilityScoreList
- ReportCard
- MatchCharacterCard
- ResultActionButtons

디자인은 게임 캐릭터 프로필 카드 느낌으로 구성하고, 데스크톱에서는 2열 레이아웃, 모바일에서는 1열 세로 스크롤 구조로 만들어 주세요.

레이더 차트는 Recharts RadarChart를 사용해 주세요.
```

### Cursor 지시문 4: 점수 계산 로직 구현

```text
src/lib/scoring.ts 파일을 생성해 주세요.

다음 함수를 구현해 주세요.

- createInitialRawScores()
- calculateRawScores(answers)
- convertRawScoresToAbilityScores(rawScores)
- getPrimaryCharacter(rawScores)
- getSecondaryCharacter(rawScores)
- getResultType(rawScores)
- calculateResult(student, answers)

동점이면 mixed, 5개 점수 차이가 1 이하이면 balanced로 처리해 주세요.
```

### Cursor 지시문 5: 설문 화면 구현

```text
/survey 페이지를 구현해 주세요.

questions.ts의 10개 문항을 순차적으로 보여주고, 각 문항의 선택지는 화면에 표시할 때마다 랜덤 순서로 섞어 주세요.

기능:
- 현재 문항 번호 표시
- 진행률 표시
- 선택지 버튼
- 이전 버튼
- 다음 버튼
- 마지막 문항 완료 시 결과 계산 후 /result로 이동

초기에는 localStorage를 사용해 응답 결과를 저장해 주세요.
```

---

## 27. 1차 완료 기준

결과 리포트 화면 1차 완료 기준은 다음과 같다.

| 항목           | 완료 기준                               |
| ------------ | ----------------------------------- |
| `/result` 접속 | 결과 리포트 화면 표시                        |
| 캐릭터 카드       | 캐릭터 이미지, 이름, 역할, 설명, 키워드, 대사 표시     |
| 레이더 차트       | 5개 축 표시                             |
| 능력치 카드       | 리더십, 기획력, 제작력, 표현력, 운영력 점수 표시       |
| 상세 카드        | 강점, 성장 포인트, 잘 맞는 팀원, 추천 활동 표시       |
| 반응형          | 모바일 1열, 데스크톱 2열 표시                  |
| 데이터 분리       | 화면 문구가 컴포넌트에 하드코딩되지 않고 data 파일에서 로드 |
| 타입 안정성       | TypeScript 오류 없음                    |
| 빌드           | `npm run build` 통과                  |

---

## 28. 2차 완료 기준

설문 기능까지 완료되면 다음 기준을 충족해야 한다.

| 항목           | 완료 기준                      |
| ------------ | -------------------------- |
| 10문항 설문      | 모든 문항 응답 가능                |
| 선택지 랜덤       | 문항별 선택지 순서 랜덤 표시           |
| 점수 계산        | 선택한 코드별 점수 합산              |
| 결과 유형        | single, mixed, balanced 처리 |
| 결과 연결        | 설문 완료 후 결과 화면 표시           |
| localStorage | 새로고침 후에도 응답 유지             |
| 다시 검사        | 기존 응답 초기화 후 재시작 가능         |

---

## 29. 개발 시 주의사항

1. 캐릭터 이름과 역할명은 확정값이므로 임의 변경하지 않는다.
2. CEO, CPO, CTO, CMO, COO 코드는 점수 계산의 기준값이므로 일관되게 사용한다.
3. 체크 누리는 실제 역할 표기는 `CFO·COO`, 내부 코드는 `COO`로 통일한다.
4. 설문 선택지는 화면에서만 랜덤 처리하고 원본 데이터는 변경하지 않는다.
5. 결과 화면 문구는 컴포넌트에 직접 쓰지 말고 데이터 파일에서 관리한다.
6. 캐릭터 이미지는 초기에는 임시 이미지 또는 placeholder를 사용하되, 경로는 `/characters/*.png` 구조로 고정한다.
7. 결과 리포트는 교육용이므로 부정적 표현보다 성장 안내형 문장으로 작성한다.
8. 모바일 화면에서 레이더 차트가 작아지지 않도록 최소 높이 280px 이상을 확보한다.
9. PDF 저장 기능은 1차 구현 이후 붙인다.
10. 팀 구성 기능은 개인 결과 기능이 안정화된 후 구현한다.

---

## 30. 우선 작업 명령

바로 시작할 경우 첫 작업은 아래 순서가 적합하다.

```bash
npm install
npm install recharts
npm run dev
```

그다음  다음 요청을 넣는다.

```text
docs/PROJECT_SPEC.md 문서를 기준으로 1단계 개발을 시작해 주세요.

우선 src/types/result.ts, src/data/characters.ts, src/data/resultTemplates.ts, src/data/mockResult.ts를 생성하고, /result 페이지에서 mockResult 기반 결과 리포트 화면을 표시할 수 있도록 기본 컴포넌트 구조를 만들어 주세요.
```

---
