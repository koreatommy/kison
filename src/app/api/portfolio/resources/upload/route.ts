// 자료실 Vercel Blob 클라이언트 업로드 토큰 발급
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { MAX_RESOURCE_FILE_SIZE } from "@/lib/portfolio/resource-limits";

export const runtime = "nodejs";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("portfolio-resources/")) {
          throw new Error("잘못된 업로드 경로입니다.");
        }
        if (pathname.includes("..")) {
          throw new Error("잘못된 업로드 경로입니다.");
        }

        return {
          maximumSizeInBytes: MAX_RESOURCE_FILE_SIZE,
          addRandomSuffix: false,
          allowOverwrite: false,
          validUntil: Date.now() + 60 * 60 * 1000,
        };
      },
      onUploadCompleted: async () => {
        // 로컬에서는 호출되지 않음. 메타데이터는 클라이언트가 별도 등록.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (err) {
    const message = err instanceof Error ? err.message : "업로드 토큰 발급 실패";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
