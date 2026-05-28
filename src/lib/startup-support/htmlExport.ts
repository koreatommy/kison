// 최종 결과물 HTML 문서 생성 pure 함수 (spec 8.1~8.9 순서 준수)
import type { StartupSupportState } from "@/types/startup-support";
import {
  buildTeamRoleReportRows,
  formatMemberRoleShort,
} from "@/lib/startup-support/teamMemberRole";

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function nl2br(str: string): string {
  return esc(str).replace(/\n/g, "<br />");
}

function ul(items: string[]): string {
  if (!items.length) return "<p>-</p>";
  return `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
}

function reportField(label: string, content: string): string {
  return `<div class="report-field">
<h3>${esc(label)}</h3>
<div class="report-value">${content || "-"}</div>
</div>`;
}

function reportProblemSection(problemInput: StartupSupportState["problemInput"], problemAnswers: StartupSupportState["problemAnswers"]): string {
  return `${reportField("선택한 문제 분야", problemInput.selectedCategories.map(esc).join(", ") || "-")}
${reportField("불편 상황", nl2br(problemInput.problemText) || "-")}
<div class="report-subsection">
<h3>문제 구체화 답변</h3>
${reportQaList(problemAnswers)}
</div>`;
}

function reportQaList(answers: StartupSupportState["problemAnswers"]): string {
  if (!answers.length) return `<div class="report-value">-</div>`;
  return `<div class="report-qa-list">${answers.map((a) => `<div class="report-qa-item">
<p class="report-qa-question">${esc(a.question)}</p>
<div class="report-qa-answer">${nl2br(a.answer) || "-"}</div>
</div>`).join("")}</div>`;
}

const RESULT_CONTENT_STYLES = `
.report-field { margin-bottom: 1.25rem; }
.report-field h3,
.report-subsection h3 {
  font-size: 0.75rem; font-weight: 700; letter-spacing: 0.04em;
  text-transform: uppercase; color: #6366f1; margin: 0 0 0.5rem;
}
.report-value {
  font-size: 0.875rem; color: #18181b; line-height: 1.7;
  background: #f9fafb; border-left: 3px solid #c7d2fe;
  padding: 0.625rem 0.875rem; border-radius: 0 0.375rem 0.375rem 0;
}
.report-subsection { margin-top: 1.5rem; }
.report-subsection h3 { margin-bottom: 0.75rem; }
.report-qa-list { display: flex; flex-direction: column; gap: 0.75rem; }
.report-qa-item {
  border: 1px solid #e4e4e7; border-radius: 0.5rem;
  padding: 0.75rem 0.875rem; background: #fafafa;
}
.report-qa-question {
  font-size: 0.8125rem; font-weight: 600; color: #3f3f46;
  margin: 0 0 0.5rem; line-height: 1.5;
}
.report-qa-answer {
  font-size: 0.875rem; color: #18181b; line-height: 1.7;
  padding-left: 0.75rem; border-left: 2px solid #a5b4fc;
}
`;

/** 화면 표시용 본문 HTML 반환 (프린트용 전체 문서와 분리) */
export function generateResultBodyHtml(state: StartupSupportState): string {
  const { teamInfo, problemInput, problemAnswers, candidates, evaluations, shortlistedItems, finalSelection, finalDocument } = state;
  const today = new Date().toLocaleDateString("ko-KR");
  const finalCandidate = candidates.find((c) => c.id === finalSelection?.candidateId);
  const fd = finalDocument;

  return `
<div class="cover">
<h1>창업 아이템 선정 결과</h1>
<p class="team-info"><strong>팀명:</strong> ${esc(teamInfo.teamName)}</p>
<p class="date-info">작성일: ${today}</p>
</div>

<h2>1. 팀 정보</h2>
<table>
<thead><tr><th>학교</th><th>학년</th><th>이름</th><th>담당 역할</th></tr></thead>
<tbody>
${teamInfo.members.map((m) => `<tr><td>${esc(m.school) || "-"}</td><td>${esc(m.grade) || "-"}</td><td>${esc(m.name) || "-"}</td><td>${esc(formatMemberRoleShort(m.characterId))}</td></tr>`).join("")}
</tbody>
</table>

<h2>2. 해결하고 싶은 문제</h2>
${reportProblemSection(problemInput, problemAnswers)}

<h2>3. AI 창업 아이템 후보</h2>
<table>
<thead><tr><th>순번</th><th>아이템명</th><th>한 줄 설명</th><th>주요 고객</th><th>총점</th></tr></thead>
<tbody>
${candidates.map((c, i) => {
  const ev = evaluations.find((e) => e.candidateId === c.id);
  return `<tr><td>${i + 1}</td><td>${esc(c.itemName)}</td><td>${esc(c.oneLineDescription)}</td><td>${esc(c.targetCustomer)}</td><td>${ev?.score.total ?? "-"}</td></tr>`;
}).join("")}
</tbody>
</table>

<h2>4. 최종 후보 3개</h2>
<table>
<thead><tr><th>우선순위</th><th>창업 아이템</th><th>선택한 이유</th></tr></thead>
<tbody>
${shortlistedItems.sort((a, b) => a.rank - b.rank).map((si) => {
  const c = candidates.find((cc) => cc.id === si.candidateId);
  return `<tr><td>${si.rank}순위</td><td>${esc(c?.itemName ?? "-")}</td><td>${esc(si.reason) || "-"}</td></tr>`;
}).join("")}
</tbody>
</table>

<h2>5. 최종 창업 아이템</h2>
<table>
<tbody>
<tr><th>최종 아이템명</th><td>${esc(fd?.selectedItemName ?? finalCandidate?.itemName ?? "-")}</td></tr>
<tr><th>한 줄 설명</th><td>${esc(fd?.oneLineItemDescription ?? finalCandidate?.oneLineDescription ?? "-")}</td></tr>
<tr><th>주제</th><td>${esc(fd?.topic ?? "-")}</td></tr>
<tr><th>최종 선정 이유</th><td>${nl2br(fd?.finalSelectionReason ?? finalSelection?.finalReason ?? "-")}</td></tr>
<tr><th>핵심 기능</th><td>${fd?.itemIntroduction ? ul(fd.itemIntroduction) : esc(finalCandidate?.coreFeatures.join(", ") ?? "-")}</td></tr>
<tr><th>주요 고객</th><td>${fd?.targetCustomers ? ul(fd.targetCustomers) : esc(finalCandidate?.targetCustomer ?? "-")}</td></tr>
<tr><th>차별성</th><td>${fd?.differentiation ? ul(fd.differentiation) : esc(finalCandidate?.differentiation ?? "-")}</td></tr>
<tr><th>사회적 가치</th><td>${fd?.expectedSocialValue ? ul(fd.expectedSocialValue) : esc(finalCandidate?.expectedSocialValue ?? "-")}</td></tr>
</tbody>
</table>

${fd ? `
<h2>6. 신청서 핵심 작성 문안</h2>
<h3>우리 동아리가 해결하고 싶은 지역 문제</h3>
<p>${nl2br(fd.localProblemToSolve)}</p>
<h3>창업 아이템 소개</h3>
${ul(fd.itemIntroduction)}
<h3>차별성</h3>
${ul(fd.differentiation)}
<h3>주요 고객</h3>
${ul(fd.targetCustomers)}
<h3>판매 전략</h3>
${ul(fd.salesStrategy)}
<h3>홍보 전략</h3>
${ul(fd.promotionStrategy)}
<h3>이미지 또는 설계도 아이디어</h3>
<p>${nl2br(fd.imageOrDiagramIdea)}</p>

<h2>7. 사업계획서 본문 확장 초안</h2>
<h3>창업 아이템의 개발 동기</h3>
<p>${nl2br(fd.developmentMotivationDraft)}</p>
<h3>사회적 가치 창출</h3>
${ul(fd.expectedSocialValue)}
<h3>발전 과정</h3>
${ul(fd.feasibilityDraft.developmentProcess)}
<h3>시장 및 고객 분석</h3>
${ul(fd.feasibilityDraft.marketAndCustomerAnalysis)}
<h3>예상 장애 요소 및 개선 방안</h3>
<table>
<thead><tr><th>장애 요소</th><th>개선 방안</th></tr></thead>
<tbody>
${fd.feasibilityDraft.expectedObstacles.map((o) => `<tr><td>${esc(o.obstacle)}</td><td>${esc(o.solution)}</td></tr>`).join("")}
</tbody>
</table>
<h3>필요 자원</h3>
${ul(fd.growthStrategyDraft.requiredResources)}
<h3>팀 역할 제안</h3>
<table>
<thead><tr><th>이름</th><th>역할(제안)</th><th>이유</th></tr></thead>
<tbody>
${buildTeamRoleReportRows(teamInfo.members, fd.teamCompositionDraft).map((r) => `<tr><td>${esc(r.memberName)}</td><td>${esc(r.suggestedRole)}</td><td>${esc(r.reason)}</td></tr>`).join("")}
</tbody>
</table>
<h3>갈등 해결 방법</h3>
<p>${nl2br(fd.teamCompositionDraft.conflictResolutionMethod)}</p>
` : ""}

<h2>${fd ? "8" : "6"}. 다음 단계</h2>
${ul([
  "고객 인터뷰 필요",
  "유사 서비스 조사 필요",
  "시제품 제작 필요",
  "사업계획서 본문 작성 필요",
  "시장·고객 데이터 조사 필요",
])}

${fd?.limitationsAndNextResearch?.length ? `
<h3>보완 필요사항</h3>
${ul(fd.limitationsAndNextResearch)}
` : ""}
`;
}

export function generateResultHtml(state: StartupSupportState): string {
  const { teamInfo, problemInput, problemAnswers, candidates, evaluations, shortlistedItems, finalSelection, finalDocument } = state;
  const today = new Date().toLocaleDateString("ko-KR");
  const finalCandidate = candidates.find((c) => c.id === finalSelection?.candidateId);
  const fd = finalDocument;

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<title>창업 아이템 선정 결과</title>
<style>
@page { size: A4; margin: 15mm; }
body {
  font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
  color: #111827; line-height: 1.7; background: #ffffff;
  max-width: 800px; margin: 0 auto; padding: 20px;
}
h1 { font-size: 22px; border-bottom: 3px solid #4f46e5; padding-bottom: 8px; margin-top: 0; }
h2 { font-size: 17px; color: #4f46e5; margin-top: 32px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; }
h3 { font-size: 14px; color: #374151; margin-top: 20px; }
table { width: 100%; border-collapse: collapse; margin: 12px 0; }
th, td { border: 1px solid #d1d5db; padding: 8px 10px; vertical-align: top; font-size: 13px; }
th { background: #f3f4f6; font-weight: 700; text-align: left; }
ul { padding-left: 20px; margin: 6px 0; }
li { margin-bottom: 4px; font-size: 13px; }
p { font-size: 13px; margin: 6px 0; }
${RESULT_CONTENT_STYLES}
.cover { text-align: center; padding: 60px 0 40px; }
.cover h1 { border: none; font-size: 28px; }
.page-break { break-before: page; }
tr, h2, h3 { break-inside: avoid; }
@media print {
  body { background: #fff; }
  .no-print { display: none !important; }
}
</style>
</head>
<body>

<div class="cover">
<h1>창업 아이템 선정 결과</h1>
<p style="font-size:16px;margin-top:16px;"><strong>팀명:</strong> ${esc(teamInfo.teamName)}</p>
<p style="font-size:14px;color:#6b7280;">작성일: ${today}</p>
</div>

<div class="page-break"></div>

<h2>1. 팀 정보</h2>
<table>
<thead><tr><th>학교</th><th>학년</th><th>이름</th><th>담당 역할</th></tr></thead>
<tbody>
${teamInfo.members.map((m) => `<tr><td>${esc(m.school) || "-"}</td><td>${esc(m.grade) || "-"}</td><td>${esc(m.name) || "-"}</td><td>${esc(formatMemberRoleShort(m.characterId))}</td></tr>`).join("")}
</tbody>
</table>

<h2>2. 해결하고 싶은 문제</h2>
${reportProblemSection(problemInput, problemAnswers)}

<h2>3. AI 창업 아이템 후보</h2>
<table>
<thead><tr><th>순번</th><th>아이템명</th><th>한 줄 설명</th><th>주요 고객</th><th>총점</th></tr></thead>
<tbody>
${candidates.map((c, i) => {
  const ev = evaluations.find((e) => e.candidateId === c.id);
  return `<tr><td>${i + 1}</td><td>${esc(c.itemName)}</td><td>${esc(c.oneLineDescription)}</td><td>${esc(c.targetCustomer)}</td><td>${ev?.score.total ?? "-"}</td></tr>`;
}).join("")}
</tbody>
</table>

<h2>4. 최종 후보 3개</h2>
<table>
<thead><tr><th>우선순위</th><th>창업 아이템</th><th>선택한 이유</th></tr></thead>
<tbody>
${shortlistedItems.sort((a, b) => a.rank - b.rank).map((si) => {
  const c = candidates.find((cc) => cc.id === si.candidateId);
  return `<tr><td>${si.rank}순위</td><td>${esc(c?.itemName ?? "-")}</td><td>${esc(si.reason) || "-"}</td></tr>`;
}).join("")}
</tbody>
</table>

<div class="page-break"></div>

<h2>5. 최종 창업 아이템</h2>
<table>
<tbody>
<tr><th>최종 아이템명</th><td>${esc(fd?.selectedItemName ?? finalCandidate?.itemName ?? "-")}</td></tr>
<tr><th>한 줄 설명</th><td>${esc(fd?.oneLineItemDescription ?? finalCandidate?.oneLineDescription ?? "-")}</td></tr>
<tr><th>주제</th><td>${esc(fd?.topic ?? "-")}</td></tr>
<tr><th>최종 선정 이유</th><td>${nl2br(fd?.finalSelectionReason ?? finalSelection?.finalReason ?? "-")}</td></tr>
<tr><th>핵심 기능</th><td>${fd?.itemIntroduction ? ul(fd.itemIntroduction) : esc(finalCandidate?.coreFeatures.join(", ") ?? "-")}</td></tr>
<tr><th>주요 고객</th><td>${fd?.targetCustomers ? ul(fd.targetCustomers) : esc(finalCandidate?.targetCustomer ?? "-")}</td></tr>
<tr><th>차별성</th><td>${fd?.differentiation ? ul(fd.differentiation) : esc(finalCandidate?.differentiation ?? "-")}</td></tr>
<tr><th>사회적 가치</th><td>${fd?.expectedSocialValue ? ul(fd.expectedSocialValue) : esc(finalCandidate?.expectedSocialValue ?? "-")}</td></tr>
</tbody>
</table>

${fd ? `
<h2>6. 신청서 핵심 작성 문안</h2>
<h3>우리 동아리가 해결하고 싶은 지역 문제</h3>
<p>${nl2br(fd.localProblemToSolve)}</p>
<h3>창업 아이템 소개</h3>
${ul(fd.itemIntroduction)}
<h3>차별성</h3>
${ul(fd.differentiation)}
<h3>주요 고객</h3>
${ul(fd.targetCustomers)}
<h3>판매 전략</h3>
${ul(fd.salesStrategy)}
<h3>홍보 전략</h3>
${ul(fd.promotionStrategy)}
<h3>이미지 또는 설계도 아이디어</h3>
<p>${nl2br(fd.imageOrDiagramIdea)}</p>

<div class="page-break"></div>

<h2>7. 사업계획서 본문 확장 초안</h2>
<h3>창업 아이템의 개발 동기</h3>
<p>${nl2br(fd.developmentMotivationDraft)}</p>
<h3>사회적 가치 창출</h3>
${ul(fd.expectedSocialValue)}
<h3>발전 과정</h3>
${ul(fd.feasibilityDraft.developmentProcess)}
<h3>시장 및 고객 분석</h3>
${ul(fd.feasibilityDraft.marketAndCustomerAnalysis)}
<h3>예상 장애 요소 및 개선 방안</h3>
<table>
<thead><tr><th>장애 요소</th><th>개선 방안</th></tr></thead>
<tbody>
${fd.feasibilityDraft.expectedObstacles.map((o) => `<tr><td>${esc(o.obstacle)}</td><td>${esc(o.solution)}</td></tr>`).join("")}
</tbody>
</table>
<h3>필요 자원</h3>
${ul(fd.growthStrategyDraft.requiredResources)}
<h3>팀 역할 제안</h3>
<table>
<thead><tr><th>이름</th><th>역할(제안)</th><th>이유</th></tr></thead>
<tbody>
${buildTeamRoleReportRows(teamInfo.members, fd.teamCompositionDraft).map((r) => `<tr><td>${esc(r.memberName)}</td><td>${esc(r.suggestedRole)}</td><td>${esc(r.reason)}</td></tr>`).join("")}
</tbody>
</table>
<h3>갈등 해결 방법</h3>
<p>${nl2br(fd.teamCompositionDraft.conflictResolutionMethod)}</p>
` : ""}

<h2>${fd ? "8" : "6"}. 다음 단계</h2>
${ul([
  "고객 인터뷰 필요",
  "유사 서비스 조사 필요",
  "시제품 제작 필요",
  "사업계획서 본문 작성 필요",
  "시장·고객 데이터 조사 필요",
])}

${fd?.limitationsAndNextResearch?.length ? `
<h3>보완 필요사항</h3>
${ul(fd.limitationsAndNextResearch)}
` : ""}

</body>
</html>`;
}
