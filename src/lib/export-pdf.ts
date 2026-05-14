// 결과 리포트를 PDF로 저장 (PNG 변환 → jsPDF 삽입)
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { applyCaptureFriendlyStyles } from "@/lib/prepare-dom-capture";

export async function saveAsPdf(
  node: HTMLElement,
  filename = "kison-result.pdf"
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

  const img = new Image();
  img.src = dataUrl;
  await new Promise<void>((resolve) => {
    img.onload = () => resolve();
  });

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const maxWidth = pageWidth - margin * 2;

  const ratio = img.height / img.width;
  const imgWidth = maxWidth;
  const imgHeight = imgWidth * ratio;

  if (imgHeight > pageHeight - margin * 2) {
    const fitHeight = pageHeight - margin * 2;
    const fitWidth = fitHeight / ratio;
    pdf.addImage(dataUrl, "PNG", margin, margin, fitWidth, fitHeight);
  } else {
    pdf.addImage(dataUrl, "PNG", margin, margin, imgWidth, imgHeight);
  }

  pdf.save(filename);
}
