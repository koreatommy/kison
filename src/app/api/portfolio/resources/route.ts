// 포트폴리오 자료실 목록 조회·메타데이터 등록 API (파일은 Vercel Blob)
import { NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import {
  MAX_RESOURCE_FILE_SIZE,
  RESOURCE_BLOB_PREFIX,
  isVercelBlobPublicUrl,
} from "@/lib/portfolio/resource-limits";

export const runtime = "nodejs";

type ResourceRow = {
  id: string;
  name: string;
  author: string;
  file_name: string;
  file_type: string;
  file_size: number;
  storage_path: string;
  public_url: string;
  created_at: string;
};

type RegisterBody = {
  id?: string;
  name?: string;
  author?: string;
  fileName?: string;
  fileType?: string;
  fileSize?: number;
  storagePath?: string;
  publicUrl?: string;
};

function toApiItem(row: ResourceRow) {
  return {
    id: row.id,
    name: row.name,
    author: row.author ?? "",
    fileName: row.file_name,
    fileType: row.file_type,
    fileSize: Number(row.file_size),
    publicUrl: row.public_url,
    createdAt: row.created_at,
  };
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("portfolio_resources")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      items: ((data ?? []) as ResourceRow[]).map(toApiItem),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "목록 조회 실패";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegisterBody;
    const id = String(body.id ?? "").trim();
    const name = String(body.name ?? "").trim();
    const author = String(body.author ?? "").trim();
    const fileName = String(body.fileName ?? "").trim();
    const fileType =
      String(body.fileType ?? "application/octet-stream").trim() ||
      "application/octet-stream";
    const fileSize = Number(body.fileSize);
    const storagePath = String(body.storagePath ?? "").trim();
    const publicUrl = String(body.publicUrl ?? "").trim();

    if (!isUuid(id)) {
      return NextResponse.json({ error: "유효하지 않은 id입니다." }, { status: 400 });
    }
    if (!name) {
      return NextResponse.json({ error: "자료 제목을 입력해 주세요." }, { status: 400 });
    }
    if (!author) {
      return NextResponse.json({ error: "작성자 이름을 입력해 주세요." }, { status: 400 });
    }
    if (!fileName) {
      return NextResponse.json({ error: "파일 이름이 필요합니다." }, { status: 400 });
    }
    if (!Number.isFinite(fileSize) || fileSize <= 0) {
      return NextResponse.json({ error: "빈 파일은 업로드할 수 없습니다." }, { status: 400 });
    }
    if (fileSize > MAX_RESOURCE_FILE_SIZE) {
      return NextResponse.json({ error: "파일은 20MB 이하여야 합니다." }, { status: 400 });
    }
    if (
      !storagePath.startsWith(`${RESOURCE_BLOB_PREFIX}/${id}/`) ||
      storagePath.includes("..")
    ) {
      return NextResponse.json({ error: "storagePath가 id와 일치하지 않습니다." }, { status: 400 });
    }
    if (!isVercelBlobPublicUrl(publicUrl)) {
      return NextResponse.json({ error: "유효하지 않은 파일 URL입니다." }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    const { data: row, error: insertError } = await supabase
      .from("portfolio_resources")
      .insert({
        id,
        name,
        author,
        file_name: fileName,
        file_type: fileType,
        file_size: fileSize,
        storage_path: storagePath,
        public_url: publicUrl,
      })
      .select("*")
      .single();

    if (insertError || !row) {
      await del(publicUrl).catch(() => undefined);
      return NextResponse.json(
        { error: insertError?.message ?? "메타데이터 저장 실패" },
        { status: 500 },
      );
    }

    return NextResponse.json({ item: toApiItem(row as ResourceRow) }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "업로드 실패";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
