// 인쇄용 HTML의 강제 줄바꿈을 웹 가독성에 맞게 정리합니다

const KOREAN_JOIN_PREFIXES = [
  "했습니다",
  "되었습니다",
  "있습니다",
  "하거나",
  "하는",
  "하게",
  "있게",
  "되었",
  "습니다",
  "자리",
  "료를",
  "드는",
  "문해력",
  "제시",
  "니다",
  "하기",
].sort((a, b) => b.length - a.length);

const SINGLE_CHAR_JOINS = new Set(["을", "를", "기"]);

/** 인쇄용 &lt;br&gt;을 문맥에 맞게 공백 또는 이어붙이기로 치환합니다 */
function replacePrintLineBreaks(html: string): string {
  return html.replace(/<br\s*\/?>/gi, (match, offset, source) => {
    const before = source[offset - 1] ?? "";
    const afterText = source.slice(offset + match.length).trimStart();

    if (!/[가-힣]/.test(before)) {
      return afterText.length === 0 ? "" : " ";
    }

    for (const prefix of KOREAN_JOIN_PREFIXES) {
      if (afterText.startsWith(prefix)) {
        return "";
      }
    }

    const firstChar = afterText.charAt(0);
    if (SINGLE_CHAR_JOINS.has(firstChar)) {
      return "";
    }

    return " ";
  });
}

/** 연속 공백을 정리하고 흔한 띄어쓰기 오류를 보정합니다 */
function collapseWhitespace(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/문해 력/g, "문해력")
    .replace(/이해하 기/g, "이해하기")
    .trim();
}

/** 긴 본문을 문단 단위로 나눕니다 */
function splitProseParagraphs(text: string, markers: string[]): string {
  let remaining = text;
  const parts: string[] = [];

  while (remaining.length > 0) {
    let splitAt = -1;

    for (const marker of markers) {
      const idx = remaining.indexOf(marker);
      if (idx > 0 && (splitAt === -1 || idx < splitAt)) {
        splitAt = idx;
      }
    }

    if (splitAt > 0) {
      parts.push(remaining.slice(0, splitAt).trim());
      remaining = remaining.slice(splitAt).trim();
    } else {
      parts.push(remaining.trim());
      remaining = "";
    }
  }

  return parts.filter(Boolean).map((p) => `<p>${p}</p>`).join("");
}

function processReportValue(inner: string): string {
  const text = collapseWhitespace(replacePrintLineBreaks(inner));
  return splitProseParagraphs(text, [
    "처음에는",
    "한국교육과정평가원",
    "한국교총",
    "저희 동아리",
  ]);
}

function processBulletAnswer(inner: string): string {
  const normalized = inner.replace(/<br\s*\/?>\s*(?=[-◦])/gi, "\n");
  const merged = replacePrintLineBreaks(normalized);

  const rawLines = merged
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const lines: string[] = [];
  for (const line of rawLines) {
    const prev = lines.at(-1);
    if (
      prev &&
      (prev.startsWith("-") || prev.startsWith("◦")) &&
      !line.startsWith("-") &&
      !line.startsWith("◦")
    ) {
      lines[lines.length - 1] = `${prev} ${line}`;
      continue;
    }
    lines.push(line);
  }

  const hasGroups = lines.some((line) => line.startsWith("◦"));

  if (hasGroups) {
    let html = '<ul class="report-grouped">';
    let groupTitle = "";
    let subItems: string[] = [];

    const flushGroup = () => {
      if (!groupTitle) return;
      if (subItems.length === 0) {
        html += `<li>${groupTitle}</li>`;
      } else {
        html += `<li><strong>${groupTitle}</strong><ul>${subItems
          .map((item) => `<li>${item}</li>`)
          .join("")}</ul></li>`;
      }
      groupTitle = "";
      subItems = [];
    };

    for (const line of lines) {
      if (line.startsWith("◦")) {
        flushGroup();
        groupTitle = line.replace(/^◦\s*/, "");
      } else if (line.startsWith("-")) {
        subItems.push(line.replace(/^-\s*/, ""));
      } else if (groupTitle) {
        groupTitle = `${groupTitle} ${line}`;
      } else {
        html += `<li>${line}</li>`;
      }
    }
    flushGroup();
    html += "</ul>";
    return html;
  }

  const items = lines
    .map((line) => line.replace(/^-\s*/, ""))
    .filter(Boolean);

  if (items.length <= 1) {
    return collapseWhitespace(replacePrintLineBreaks(inner));
  }

  return buildReportSteps(items);
}

function processDiagramParagraph(inner: string): string {
  const text = inner
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
  return `<pre class="report-diagram">${text}</pre>`;
}

function processMultiParagraph(inner: string): string {
  const parts = inner
    .split(/<br\s*\/?>\s*<br\s*\/?>/gi)
    .map((part) => collapseWhitespace(replacePrintLineBreaks(part)))
    .filter(Boolean);

  return parts.map((p) => `<p>${p}</p>`).join("");
}

const FEATURE_STEP_TITLES = [
  "게임팩 개요",
  "온라인 게임",
  "오프라인 카드",
  "오답 카드 연동",
  "카드 구성",
];

function parseUlItems(ulInner: string): string[] {
  const matches = ulInner.match(/<li>([\s\S]*?)<\/li>/g) ?? [];
  return matches.map((item) => item.replace(/<\/?li>/g, "").trim());
}

function buildReportSteps(items: string[], section?: string): string {
  const presetTitles =
    section === "핵심 기능" || section === "창업 아이템 소개"
      ? FEATURE_STEP_TITLES
      : undefined;

  const lis = items.map((item, index) => {
    const stepMatch = item.match(/^(\d+단계(?:\s*\([^)]+\))?)\s*:\s*(.+)$/);
    if (stepMatch) {
      return `<li><strong>${stepMatch[1]}</strong> — ${stepMatch[2]}</li>`;
    }

    const labelMatch = item.match(/^([^:：]+)\s*:\s*(.+)$/);
    if (labelMatch && labelMatch[1].length <= 24) {
      const label = labelMatch[1].trim();
      const body = labelMatch[2].trim();
      const useLabel =
        section === "보완" ||
        section === "판매 전략" ||
        /^\d+단계/.test(label) ||
        label.startsWith("추후 조사 필요") ||
        label.startsWith("검증 필요") ||
        ["초기 단계", "기관 연계", "판매 방식", "구독 모델"].includes(label);

      if (useLabel) {
        return `<li><strong>${label}</strong> — ${body}</li>`;
      }
    }

    const title = presetTitles?.[index];
    if (title) {
      return `<li><strong>${title}</strong> — ${item}</li>`;
    }

    return `<li>${item}</li>`;
  });

  return `<ol class="report-steps">${lis.join("")}</ol>`;
}

function buildReportGrouped(items: string[]): string {
  const lis = items.map((item) => {
    const labelMatch = item.match(/^([^:：]+)\s*:\s*(.+)$/);
    if (labelMatch && labelMatch[1].length <= 24) {
      return `<li><strong>${labelMatch[1].trim()}</strong><ul><li>${labelMatch[2].trim()}</li></ul></li>`;
    }
    return `<li>${item}</li>`;
  });

  return `<ul class="report-grouped">${lis.join("")}</ul>`;
}

function buildMarketAnalysisList(items: string[]): string {
  const groupedLabels = new Set([
    "주요 고객",
    "구매 결정자",
    "기관 고객",
    "추후 조사 필요",
  ]);
  const grouped: string[] = [];
  const research: string[] = [];

  for (const item of items) {
    const labelMatch = item.match(/^([^:：]+)\s*:\s*(.+)$/);
    if (labelMatch && groupedLabels.has(labelMatch[1].trim())) {
      grouped.push(item);
    } else {
      research.push(item);
    }
  }

  let html = buildReportGrouped(grouped);
  if (research.length > 0) {
    html += `<ol class="report-steps">${research
      .map((item) => `<li>${item}</li>`)
      .join("")}</ol>`;
  }
  return html;
}

function enrichStructuredLists(html: string): string {
  let result = html;

  for (const field of ["핵심 기능", "차별성", "사회적 가치"] as const) {
    result = result.replace(
      new RegExp(
        `<tr><th>${field}</th><td><ul>([\\s\\S]*?)</ul></td></tr>`,
        "g"
      ),
      (_match, inner: string) =>
        `<tr><th>${field}</th><td>${buildReportSteps(parseUlItems(inner), field)}</td></tr>`
    );
  }

  result = result.replace(
    /<tr><th>주요 고객<\/th><td><ul>([\s\S]*?)<\/ul><\/td><\/tr>/g,
    (_match, inner: string) =>
      `<tr><th>주요 고객</th><td>${buildReportGrouped(parseUlItems(inner))}</td></tr>`
  );

  for (const section of [
    "창업 아이템 소개",
    "차별성",
    "판매 전략",
    "홍보 전략",
    "사회적 가치 창출",
    "발전 과정",
  ] as const) {
    result = result.replace(
      new RegExp(`<h3>${section}</h3>\\s*<ul>([\\s\\S]*?)</ul>`, "g"),
      (_match, inner: string) =>
        `<h3>${section}</h3>${buildReportSteps(parseUlItems(inner), section)}`
    );
  }

  result = result.replace(
    /<h3>주요 고객<\/h3>\s*<ul>([\s\S]*?)<\/ul>/g,
    (_match, inner: string) =>
      `<h3>주요 고객</h3>${buildReportGrouped(parseUlItems(inner))}`
  );

  result = result.replace(
    /<h3>시장 및 고객 분석<\/h3>\s*<ul>([\s\S]*?)<\/ul>/g,
    (_match, inner: string) =>
      `<h3>시장 및 고객 분석</h3>${buildMarketAnalysisList(parseUlItems(inner))}`
  );

  result = result.replace(
    /<h3>필요 자원<\/h3>\s*<ul>([\s\S]*?)<\/ul>/g,
    (_match, inner: string) =>
      `<h3>필요 자원</h3>${buildReportGrouped(parseUlItems(inner))}`
  );

  result = result.replace(
    /<h3>보완 필요사항<\/h3>\s*<ul>([\s\S]*?)<\/ul>/g,
    (_match, inner: string) =>
      `<h3>보완 필요사항</h3>${buildReportSteps(parseUlItems(inner), "보완")}`
  );

  return result;
}

/** 포트폴리오 창업아이템 선정 보고서 HTML을 웹 뷰어용으로 정리합니다 */
export function normalizeReportHtmlForWeb(html: string): string {
  let result = html;

  result = result.replace(
    /<div class="report-value">([\s\S]*?)<\/div>/g,
    (_match, inner: string) =>
      `<div class="report-value">${processReportValue(inner)}</div>`
  );

  result = result.replace(
    /<div class="report-qa-answer">([\s\S]*?)<\/div>/g,
    (_match, inner: string) => {
      if (
        /<br\s*\/?>/i.test(inner) &&
        /(?:^|\n)\s*[-◦]/.test(inner.replace(/<br\s*\/?>/gi, "\n"))
      ) {
        return `<div class="report-qa-answer">${processBulletAnswer(inner)}</div>`;
      }
      if (/<br\s*\/?>/i.test(inner)) {
        return `<div class="report-qa-answer">${processMultiParagraph(inner)}</div>`;
      }
      return `<div class="report-qa-answer">${inner}</div>`;
    }
  );

  result = result.replace(
    /<p>【뜻캐치! 말뜻 게임팩 구성도】[\s\S]*?<\/p>/,
    (match) => {
      const inner = match.replace(/^<p>/, "").replace(/<\/p>$/, "");
      return processDiagramParagraph(inner);
    }
  );

  result = result.replace(
    /<h3>창업 아이템의 개발 동기<\/h3>\s*<p>([\s\S]*?)<\/p>/,
    (_match, inner: string) =>
      `<h3>창업 아이템의 개발 동기</h3>${processMultiParagraph(inner)}`
  );

  result = result.replace(
    /<h2>8\. 다음 단계<\/h2>\s*<ul>([\s\S]*?)<\/ul>/,
    (_match, inner: string) => {
      const items = inner.match(/<li>([\s\S]*?)<\/li>/g) ?? [];
      return `<h2>8. 다음 단계</h2><ol class="report-checklist">${items.join("")}</ol>`;
    }
  );

  result = enrichStructuredLists(result);

  return result;
}
