// Claude 응답에서 JSON 추출 — 코드블록 제거 + 다중 전략 파싱
export function extractJson(raw: string): unknown {
  let text = raw.trim();

  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) {
    text = fenceMatch[1].trim();
  }

  const objStart = text.indexOf("{");
  const arrStart = text.indexOf("[");
  const start =
    objStart === -1
      ? arrStart
      : arrStart === -1
        ? objStart
        : Math.min(objStart, arrStart);

  if (start === -1) {
    throw new Error("AI 응답에서 JSON을 찾을 수 없습니다.");
  }

  const textFromStart = text.slice(start);

  // 1차 시도: 직접 파싱 (JSON이 응답 전체인 경우)
  try {
    return JSON.parse(textFromStart);
  } catch {
    // 계속 시도
  }

  // 2차 시도: 괄호 매칭으로 정확한 범위 추출
  const end = findJsonEnd(textFromStart);
  if (end !== -1) {
    const jsonStr = textFromStart.slice(0, end + 1);
    try {
      return JSON.parse(jsonStr);
    } catch {
      // 계속 시도
    }
  }

  // 3차 시도: 끝에서부터 역방향으로 닫는 괄호 찾아서 시도
  const closeChar = textFromStart[0] === "{" ? "}" : "]";
  let lastClose = textFromStart.lastIndexOf(closeChar);
  while (lastClose > 0) {
    const candidate = textFromStart.slice(0, lastClose + 1);
    try {
      return JSON.parse(candidate);
    } catch {
      lastClose = textFromStart.lastIndexOf(closeChar, lastClose - 1);
    }
  }

  throw new Error("AI 응답 형식이 올바르지 않습니다. 다시 생성해 주세요.");
}

function findJsonEnd(text: string): number {
  let depth = 0;
  let inString = false;
  let escapeNext = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (ch === "\\") {
      escapeNext = true;
      continue;
    }

    if (ch === '"') {
      inString = !inString;
      continue;
    }

    if (inString) continue;

    if (ch === "{" || ch === "[") {
      depth++;
    } else if (ch === "}" || ch === "]") {
      depth--;
      if (depth === 0) {
        return i;
      }
    }
  }

  return -1;
}
