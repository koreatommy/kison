// 단일 Claude API Route — task별 분기 + API Key 우선순위 처리
import Anthropic from "@anthropic-ai/sdk";
import { COMMON_SYSTEM_PROMPT, buildUserPrompt, getMaxTokens, getTemperature } from "@/lib/startup-support/prompts";
import { extractJson } from "@/lib/startup-support/jsonParser";
import type { ClaudeTask, TokenUsage } from "@/types/startup-support";

export const runtime = "nodejs";

const VALID_TASKS: ClaudeTask[] = [
  "generate_problem_questions",
  "generate_startup_items",
  "evaluate_startup_items",
  "generate_final_document",
];

export async function POST(req: Request) {
  const startedAt = Date.now();
  let taskLabel = "unknown_task";
  try {
    const body = await req.json();
    const { task, payload } = body as { task: string; payload: unknown };
    taskLabel = task ?? "unknown_task";

    if (!task || !VALID_TASKS.includes(task as ClaudeTask)) {
      return Response.json(
        { success: false, error: "유효하지 않은 task입니다." },
        { status: 400 },
      );
    }

    const userApiKey = req.headers.get("x-user-anthropic-key");
    const apiKey = userApiKey || process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return Response.json(
        {
          success: false,
          error:
            "Claude API Key가 설정되지 않았습니다. .env.local에 ANTHROPIC_API_KEY를 입력하거나 화면에서 세션 전용 API Key를 입력해 주세요.",
        },
        { status: 400 },
      );
    }

    const model = process.env.CLAUDE_MODEL;
    if (!model) {
      return Response.json(
        {
          success: false,
          error:
            "CLAUDE_MODEL 환경변수가 설정되지 않았습니다. Anthropic Console에서 사용할 모델 ID를 확인한 뒤 .env.local에 입력해 주세요.",
        },
        { status: 400 },
      );
    }

    const anthropic = new Anthropic({ apiKey });
    const claudeTask = task as ClaudeTask;
    const userPrompt = buildUserPrompt(claudeTask, payload);

    const message = await anthropic.messages.create({
      model,
      max_tokens: getMaxTokens(claudeTask),
      temperature: getTemperature(claudeTask),
      system: COMMON_SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return Response.json(
        { success: false, error: "AI 응답에서 텍스트를 찾을 수 없습니다." },
        { status: 500 },
      );
    }

    console.log(`[AI][${taskLabel}] raw response (first 500 chars):`, textBlock.text.slice(0, 500));
    console.log(`[AI][${taskLabel}] raw response (last 500 chars):`, textBlock.text.slice(-500));
    console.log(`[AI][${taskLabel}] stop_reason:`, message.stop_reason);

    const data = extractJson(textBlock.text);
    const usage: TokenUsage = {
      inputTokens: message.usage.input_tokens ?? 0,
      outputTokens: message.usage.output_tokens ?? 0,
      totalTokens:
        (message.usage.input_tokens ?? 0) +
        (message.usage.output_tokens ?? 0),
    };
    const elapsedSec = ((Date.now() - startedAt) / 1000).toFixed(1);
    console.log(
      `[AI][${taskLabel}] success ${elapsedSec}s input=${usage.inputTokens} output=${usage.outputTokens} total=${usage.totalTokens}`,
    );

    return Response.json({ success: true, data, usage, task: claudeTask });
  } catch (err: unknown) {
    const elapsedSec = ((Date.now() - startedAt) / 1000).toFixed(1);
    const errorMessage = err instanceof Error ? err.message : "알 수 없는 오류";
    console.error(`[AI][${taskLabel}] failed ${elapsedSec}s - ${errorMessage}`);
    return Response.json(
      { success: false, error: "AI 응답 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 },
    );
  }
}
