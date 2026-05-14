// 결과 리포트 영역을 PNG 이미지로 저장
import { toPng } from "html-to-image";
import { applyCaptureFriendlyStyles } from "@/lib/prepare-dom-capture";

export async function saveAsImage(
  node: HTMLElement,
  filename = "kison-result.png"
) {
  const restoreStyles = applyCaptureFriendlyStyles(node);
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });

  let dataUrl: string;
  try {
    dataUrl = await toPng(node, {
      cacheBust: true,
      pixelRatio: 2,
    });
  } finally {
    restoreStyles();
  }
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
