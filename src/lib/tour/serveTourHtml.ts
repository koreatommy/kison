// docu/tour_ep1.html을 읽어 ETag·캐시 제어와 함께 Response로 반환
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

export const TOUR_HTML_FILE = "tour_ep1.html";

/** 캐시 무효화 + 버전 체크 강제 새로고침 */
const TOUR_HTML_HEAD_INJECT = `<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta name="tour-version" content="__TOUR_VERSION__" />
<script>
(function () {
  // 버전 체크 — 캐시된 구버전이면 강제 새로고침
  var meta = document.querySelector('meta[name="tour-version"]');
  var ver = meta ? meta.content : "";
  var key = "tour-ep1-ver";
  var saved = localStorage.getItem(key);
  if (ver && saved && saved !== ver) {
    localStorage.setItem(key, ver);
    location.reload(true);
    return;
  }
  if (ver) localStorage.setItem(key, ver);
  // bfcache에서 복원된 경우 강제 새로고침
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) window.location.reload();
  });
  // /tour → /tour/ep1 리다이렉트
  var p = location.pathname.replace(/\\/$/, "");
  if (p === "/tour") location.replace("/tour/ep1" + location.search + location.hash);
})();
</script>`;

const TOUR_HTML_PATH = path.join(
  process.cwd(),
  "docu",
  "ai창업사업계획서",
  TOUR_HTML_FILE
);

async function loadTourAsset() {
  const [html, fileStat] = await Promise.all([
    readFile(TOUR_HTML_PATH, "utf-8"),
    stat(TOUR_HTML_PATH),
  ]);
  const etag = `"tour-ep1-${fileStat.mtimeMs}-${fileStat.size}"`;
  return { html, etag, lastModified: fileStat.mtime.toUTCString() };
}

export async function serveTourHtml(request: Request): Promise<Response> {
  const { html, etag, lastModified } = await loadTourAsset();

  if (request.headers.get("if-none-match") === etag) {
    return new Response(null, {
      status: 304,
      headers: {
        ETag: etag,
        "Cache-Control": "no-cache, must-revalidate",
      },
    });
  }

  // 버전 메타 태그에 etag 주입
  const headInject = TOUR_HTML_HEAD_INJECT.replace("__TOUR_VERSION__", etag);
  const body = html.includes("<head>")
    ? html.replace("<head>", `<head>\n${headInject}`)
    : html;

  return new Response(body, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
      ETag: etag,
      "Last-Modified": lastModified,
    },
  });
}
