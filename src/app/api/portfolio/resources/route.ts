// 포트폴리오 자료실 목록 조회·업로드 API
import { NextResponse } from "next/server";
import {
  getSupabaseServerClient,
  PORTFOLIO_RESOURCES_BUCKET,
} from "@/lib/supabase/server";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

type ResourceRow = {
  id: string;
  name: string;
  file_name: string;
  file_type: string;
  file_size: number;
  storage_path: string;
  public_url: string;
  created_at: string;
};

function toApiItem(row: ResourceRow) {
  return {
    id: row.id,
    name: row.name,
    fileName: row.file_name,
    fileType: row.file_type,
    fileSize: Number(row.file_size),
    publicUrl: row.public_url,
    createdAt: row.created_at,
  };
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
    const form = await request.formData();
    const name = String(form.get("name") ?? "").trim();
    const file = form.get("file");

    if (!name) {
      return NextResponse.json({ error: "이름을 입력해 주세요." }, { status: 400 });
    }
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "파일을 첨부해 주세요." }, { status: 400 });
    }
    if (file.size <= 0) {
      return NextResponse.json({ error: "빈 파일은 업로드할 수 없습니다." }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "파일은 50MB 이하여야 합니다." }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    const id = crypto.randomUUID();
    const safeName = file.name.replace(/[^\w.\-()\s가-힣]/g, "_");
    const storagePath = `${id}/${safeName}`;
    const fileType = file.type || "application/octet-stream";

    const buffer = Buffer.from(await file.arrayBuffer());
    const { error: uploadError } = await supabase.storage
      .from(PORTFOLIO_RESOURCES_BUCKET)
      .upload(storagePath, buffer, {
        contentType: fileType,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: publicData } = supabase.storage
      .from(PORTFOLIO_RESOURCES_BUCKET)
      .getPublicUrl(storagePath);

    const { data: row, error: insertError } = await supabase
      .from("portfolio_resources")
      .insert({
        id,
        name,
        file_name: file.name,
        file_type: fileType,
        file_size: file.size,
        storage_path: storagePath,
        public_url: publicData.publicUrl,
      })
      .select("*")
      .single();

    if (insertError || !row) {
      await supabase.storage.from(PORTFOLIO_RESOURCES_BUCKET).remove([storagePath]);
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
