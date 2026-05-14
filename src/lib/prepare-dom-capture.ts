// html-to-image 캡처 전 DOM 스타일 정리 (backdrop-filter·blur 필터가 캔버스에서 글자까지 흐리게 만드는 문제 완화)
/**
 * html-to-image / canvas 합성 시 backdrop-filter·CSS blur 필터가
 * 본문 텍스트까지 번지는 경우가 있어, 캡처 직전에만 제거한다.
 */
export function applyCaptureFriendlyStyles(root: HTMLElement): () => void {
  const touched: Array<{
    el: HTMLElement;
    backdrop: boolean;
    blurFilter: boolean;
  }> = [];

  const nodes = [root, ...root.querySelectorAll<HTMLElement>("*")];

  for (const el of nodes) {
    const cs = getComputedStyle(el);
    let backdrop = false;
    let blurFilter = false;

    if (cs.backdropFilter !== "none") {
      el.style.setProperty("backdrop-filter", "none", "important");
      el.style.setProperty("-webkit-backdrop-filter", "none", "important");
      backdrop = true;
    }
    if (cs.filter !== "none" && /\bblur\s*\(/i.test(cs.filter)) {
      el.style.setProperty("filter", "none", "important");
      blurFilter = true;
    }
    if (backdrop || blurFilter) {
      touched.push({ el, backdrop, blurFilter });
    }
  }

  return () => {
    for (const t of touched) {
      if (t.backdrop) {
        t.el.style.removeProperty("backdrop-filter");
        t.el.style.removeProperty("-webkit-backdrop-filter");
      }
      if (t.blurFilter) {
        t.el.style.removeProperty("filter");
      }
    }
  };
}
