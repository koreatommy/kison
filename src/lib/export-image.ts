// 결과 리포트 영역을 PNG 이미지로 저장
import { toPng } from "html-to-image";

export async function saveAsImage(
  node: HTMLElement,
  filename = "kison-result.png"
) {
  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
  });
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
