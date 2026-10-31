// 포트폴리오 자료실 단건 삭제 API
import { NextResponse } from "next/server";
import {
  getSupabaseServerClient,
  PORTFOLIO_RESOURCES_BUCKET,
} from "@/lib/supabase/server";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: "id가 필요합니다." }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    const { data: row, error: fetchError } = await supabase
      .from("portfolio_resources")
      .select("id, storage_path")
      .eq("id", id)
      .maybeSingle();

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }
    if (!row) {
      return NextResponse.json({ error: "자료를 찾을 수 없습니다." }, { status: 404 });
    }

    const { error: storageError } = await supabase.storage
      .from(PORTFOLIO_RESOURCES_BUCKET)
      .remove([row.storage_path as string]);

    if (storageError) {
      return NextResponse.json({ error: storageError.message }, { status: 500 });
    }

    const { error: deleteError } = await supabase
      .from("portfolio_resources")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "삭제 실패";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
