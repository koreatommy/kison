// Claude task별 시스템 프롬프트 + 유저 프롬프트 빌더
import { APPLICATION_FORM_SPEC } from "./applicationFormSpec";
import type { ClaudeTask } from "@/types/startup-support";

export const COMMON_SYSTEM_PROMPT = `당신은 청소년 창업경진대회 사업계획서 작성을 돕는 창업교육 전문 AI입니다.

사용자는 중·고등학생 창업동아리입니다.
답변은 청소년이 이해할 수 있도록 쉽고 명확해야 합니다.
단, 결과물은 대회 신청서에 사용할 수 있도록 공적이고 정돈된 문체로 작성해야 합니다.

중요 원칙:
1. 없는 통계, 시장 규모, 기관명, 법적 근거를 지어내지 마세요.
2. 확인되지 않은 사실은 "추후 조사 필요"라고 표시하세요.
3. 청소년 동아리가 실제로 조사, 시제품, 캠페인, 앱 화면 설계 등으로 실행 가능한 아이템을 우선 제안하세요.
4. 문제 → 고객 → 해결 방법 → 차별성 → 실행 가능성 → 사회적 가치의 흐름으로 정리하세요.
5. 응답은 반드시 JSON 형식으로만 반환하세요.
6. Markdown 코드블록을 사용하지 마세요.`;

export function buildUserPrompt(task: ClaudeTask, payload: unknown): string {
  const payloadStr = JSON.stringify(payload, null, 2);

  switch (task) {
    case "generate_problem_questions":
      return `아래 정보를 바탕으로 문제를 구체화하기 위한 추가 질문 3~5개를 생성하세요.

입력 정보:
${payloadStr}

반환 JSON 형식:
{
  "questions": [
    { "id": "ai-q1", "question": "", "helpText": "", "placeholder": "" }
  ]
}`;

    case "generate_startup_items":
      return `아래 정보를 바탕으로 청소년 창업동아리가 추진할 수 있는 창업 아이템 후보를 정확히 3개 생성하세요.

입력 정보:
${payloadStr}

출력 조건:
- 너는 청소년 창업경진대회 사업계획서 작성을 돕는 창업 아이템 발굴 전문가다.
- 단순히 흔한 앱, 웹서비스, 캠페인을 나열하지 말고, 청소년이 관찰한 지역·학교·생활 문제를 새롭게 해석하고, 창의적이면서도 시제품화 가능한 해결책으로 발전시켜라.
- 주변, 학교, 지역사회에서 실제로 관찰 가능한 문제를 출발점으로 삼아라.
- 문제를 표면적으로 해결하지 말고, 문제의 원인·행동·상황·이해관계자를 재해석하라.
- 기존에 흔한 "앱 하나 만들기", "플랫폼 만들기", "교육 프로그램 운영하기" 수준에서 멈추지 마라.
- 제품, 서비스, 캠페인, 키트, 공간 활용, 데이터 시각화, 지역 협력 모델, 행동 유도 장치, 구독형 서비스, 학교 실험 프로젝트 등 다양한 형태를 검토하라.
- 각 후보는 문제 영역, 고객, 해결 방식, 구현 형태가 서로 명확히 달라야 한다.
- 청소년 팀이 설명하고, 간단한 MVP 또는 시제품으로 보여줄 수 있는 수준이어야 한다.
- 과도한 전문기술, 대규모 설비, 인허가, 의료행위, 금융투자, 대규모 자본이 필요한 아이템은 피하라.
- 존재하지 않는 통계, 시장 규모, 기관명, 실험 결과, 고객 반응은 절대 생성하지 마라.
- 데이터가 필요한 경우 "확인 필요", "추후 조사 필요", "공공데이터·설문·인터뷰로 검증 가능"이라고 명확히 표시하라.

창의성 강화 원칙:
- 문제 뒤집기: 문제를 단순히 없애는 대신, 문제 상황을 다른 방식으로 활용하거나 전환할 수 있는지 검토하라.
- 약자·소외 관점 반영: 일반 사용자보다 문제를 더 크게 겪는 사람을 우선 고객 또는 수혜자로 설정하라.
- 행동 변화 설계: 단순 정보 제공에 그치지 말고 알림, 체크리스트, 포인트, 챌린지, 스탬프, 인증, 비교표, 위험 점수, 시각화, 친구 초대, 지역 미션, 학교 게시판 연동 등 행동 변화 장치를 포함하라.
- 로컬 자원 결합: 학교, 동아리, 도서관, 주민센터, 전통시장, 공원, 유휴공간, 지역 상점, 공공데이터, 지역 축제 등 기존 자원을 연결하는 방식을 우선 검토하라.
- 하이브리드 아이템 우선: 단순 앱 또는 단순 제품보다 앱+오프라인 키트, 웹서비스+학교 캠페인, 제품+지역 수거 시스템, 지도 서비스+안전 점검 활동, 교육 프로그램+결과물 판매, 데이터 시각화+주민 참여 신고, 챌린지+지역 상점 보상, AI 도우미+학생 활동 기록지 같은 결합형 아이템을 우선 제안하라.

후보별 필수 작성 항목:
- 아이템명: 사업계획서에 바로 사용할 수 있는 이름으로 제안하고, 추상적/일반적 명칭은 피하라.
- 한 줄 설명: "누가 겪는 어떤 문제를 어떤 방식으로 해결하는지"가 드러나게 작성하라.
- 해결하고 싶은 지역·학교·생활 문제: 문제 상황을 구체적으로 작성하되 검증되지 않은 수치/통계는 쓰지 마라.
- 기존 해결 방식의 한계: 기존 앱, 캠페인, 안내문, 교육, 신고제도, 제품 등이 왜 충분하지 않은지 설명하라.
- 창의적 해결 방식: 새로운 관점, 작동 방식, 사용자 경험, 참여 구조를 설명하고, 단순 기능 나열은 피하라.
- 사회적 가치: 환경, 안전, 교육격차, 지역경제, 사회복지, 문화 접근성, 공동체 회복, 디지털 포용 등 긍정적 변화를 기대 효과 수준으로 작성하라.
- 주요 고객·수혜자: 실제 돈을 내거나 사용하는 고객과 사회적 혜택을 받는 수혜자를 구분할 수 있으면 구분하라.
- MVP 또는 시제품화 방법: 청소년 팀이 2~4주 안에 만들거나 실험할 수 있는 형태로 제안하라.
- 차별성: 기존 서비스와 다른 점을 2~3개로 정리하고, "AI 활용", "편리함", "저렴함" 같은 추상 표현만 쓰지 마라.
- 주의할 점·검증 필요 사항: 개인정보, 안전성, 비용, 지속 운영, 고객 검증, 기술 난이도, 법적 이슈 등 확인 필요 요소를 작성하라.

창의성 수준 조절:
- 각 아이템은 최소 2단계 이상의 창의성을 포함해야 한다.
- 문제 관점의 창의성: 남들이 보지 못한 불편, 사각지대, 지역 문제를 발견했는가.
- 해결 방식의 창의성: 기존 해결책과 다른 작동 방식이나 참여 구조가 있는가.
- 실행 방식의 창의성: 청소년이 가진 자원, 학교, 지역, 동아리 활동을 독창적으로 활용하는가.
- 단순히 "AI 앱", "지역 플랫폼", "온라인 교육", "홍보 캠페인"처럼 흔한 형태로만 제안하지 마라.
- 그런 형태가 필요하면 반드시 오프라인 활동, 데이터 수집, 지역 자원, 행동 변화 장치, 사회적 가치 모델 중 하나 이상과 결합하라.

금지 사항:
- 이미 흔한 아이디어를 이름만 바꿔 제안하는 것.
- "AI가 자동으로 해결한다"처럼 작동 원리가 모호한 아이템.
- 청소년이 실제로 설명하거나 시제품화하기 어려운 고난도 기술 아이템.
- 대규모 투자, 제조 설비, 병원·금융·법률 전문 인허가가 필요한 아이템.
- 검증되지 않은 시장 규모, 통계, 고객 수, 매출 전망을 단정하는 것.
- 사회적 가치를 과장하거나 전국 단위 효과를 근거 없이 주장하는 것.
- 후보 간 차이가 거의 없는 아이템을 여러 개 나열하는 것.

반환 JSON 형식:
{
  "candidates": [
    {
      "id": "item-1",
      "itemName": "",
      "oneLineDescription": "",
      "problemToSolve": "",
      "existingSolutionLimitations": "",
      "creativeSolutionApproach": "",
      "socialValueDetail": "",
      "targetCustomer": "",
      "beneficiaries": [],
      "coreFeatures": [],
      "differentiation": "",
      "studentExecutionMethod": "",
      "mvpPlan": "",
      "expectedSocialValue": "",
      "risks": [],
      "validationNeeds": []
    }
  ]
}`;

    case "evaluate_startup_items":
      return `아래 창업 아이템 후보들을 평가 기준에 따라 비교 평가하세요.

평가 기준:
- 문제 명확성: 20점
- 고객 명확성: 15점
- 해결 방법 적합성: 20점
- 차별성: 15점
- 실행 가능성: 20점
- 사회적 가치: 10점
- 총점: 100점

평가 원칙:
1. 점수는 과도하게 후하게 주지 마세요.
2. 청소년 동아리가 실행 가능한지를 중요하게 보세요.
3. 문제와 고객이 모호하면 감점하세요.
4. 차별성이 약하면 보완점을 제시하세요.
5. 각 아이템의 강점, 약점, 개선 방향을 구체적으로 작성하세요.
6. 후보에 포함된 기존 해결 방식의 한계, 창의적 해결 방식, MVP 계획, 검증 필요 사항을 반드시 읽고 평가 근거에 반영하세요.
7. 실행 가능성 점수는 2~4주 MVP 실험 가능성, 필요한 자원 수준, 안전/법적 리스크를 종합해 판단하세요.
8. recommendationReason에는 선택 이유뿐 아니라 가장 중요한 검증 필요 사항 1개 이상을 포함하세요.
9. summary는 전체 비교 결론을 2~4문장으로 작성하고, keyRisks에는 전체 후보를 비교할 때 공통적으로 중요한 리스크를 정확히 3개 작성하세요.

입력 정보:
${payloadStr}

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
  "keyRisks": ["", "", ""],
  "recommendedCandidateId": ""
}`;

    case "generate_final_document":
      return `아래 정보를 바탕으로 청소년 창업경진대회 신청서에 활용할 수 있는 핵심 문장을 작성하세요.

아래 APPLICATION_FORM_SPEC은 최종 결과물이 따라야 할 신청서 양식 기준입니다.
출력은 반드시 이 기준에 맞춰 작성하세요.

APPLICATION_FORM_SPEC:
${JSON.stringify(APPLICATION_FORM_SPEC, null, 2)}

중요:
1. 사용자가 선택한 문제 분야와 최종 선택 아이템을 변경하지 마세요.
2. 신청서 항목과 관계없는 장황한 설명을 생성하지 마세요.
3. 없는 통계, 시장 규모, 기관명, 법률 근거를 생성하지 마세요.
4. 확인되지 않은 내용은 '추후 조사 필요'로 표시하세요.
5. 청소년 창업동아리가 실행할 수 있는 수준으로 작성하세요.
6. teamInfo.members에 characterId가 있으면 teamCompositionDraft.suggestedRoles에 반드시 반영하세요. suggestedRole은 해당 캐릭터의 역할·타이틀을 사용하고, memberName은 입력된 이름과 일치시키세요.
7. 캐릭터 ID 매핑: captain_lumi=캡틴 루미(CEO), planner_dodo=플래너 도도(CPO/PM), maker_theo=메이커 테오(CTO), story_moa=스토리 모아(CMO), check_nuri=체크 누리(CFO·COO).
8. 반드시 JSON 형식으로만 응답하세요.

입력 정보:
${payloadStr}

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
  "salesStrategy": [],
  "promotionStrategy": [],
  "expectedSocialValue": [],
  "prototypeIdea": "",
  "imageOrDiagramIdea": "",
  "developmentMotivationDraft": "",
  "feasibilityDraft": {
    "developmentProcess": [],
    "marketAndCustomerAnalysis": [],
    "expectedObstacles": [{ "obstacle": "", "solution": "" }]
  },
  "growthStrategyDraft": {
    "requiredResources": [],
    "salesPlan": [],
    "promotionPlan": []
  },
  "teamCompositionDraft": {
    "suggestedRoles": [{ "memberName": "", "suggestedRole": "", "reason": "" }],
    "conflictResolutionMethod": ""
  },
  "finalSelectionReason": "",
  "limitationsAndNextResearch": []
}`;

    default:
      return payloadStr;
  }
}

export function getMaxTokens(task: ClaudeTask): number {
  switch (task) {
    case "generate_final_document":
      return 16000;
    case "evaluate_startup_items":
      return 8000;
    case "generate_startup_items":
      return 10000;
    default:
      return 2000;
  }
}

export function getTemperature(task: ClaudeTask): number {
  switch (task) {
    case "generate_startup_items":
      return 0.6;
    case "evaluate_startup_items":
      return 0.2;
    default:
      return 0.4;
  }
}
