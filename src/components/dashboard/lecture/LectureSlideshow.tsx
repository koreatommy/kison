"use client";

// PDF 슬라이드쇼 최상위 컨테이너 — 렌더링·네비게이션·전체화면·판서·메모 통합
import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import SlideDrawingOverlay, {
  type DrawingTool,
  type SlideDrawingOverlayHandle,
} from "./SlideDrawingOverlay";
import SlideMemoPanel, { getPageHasMemo } from "./SlideMemoPanel";
import SlideToolbar from "./SlideToolbar";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Props = {
  pdfUrl: string;
};

type FullscreenDocument = globalThis.Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
};

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
  mozRequestFullScreen?: () => Promise<void> | void;
  msRequestFullscreen?: () => Promise<void> | void;
};

function getNativeFullscreenElement(): Element | null {
  const doc = document as FullscreenDocument;
  return document.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
}

async function requestNativeFullscreen(el: HTMLElement): Promise<boolean> {
  const node = el as FullscreenElement;
  try {
    if (typeof node.requestFullscreen === "function") {
      await node.requestFullscreen();
      return !!getNativeFullscreenElement();
    }
    if (typeof node.webkitRequestFullscreen === "function") {
      await node.webkitRequestFullscreen();
      return !!getNativeFullscreenElement();
    }
    if (typeof node.mozRequestFullScreen === "function") {
      await node.mozRequestFullScreen();
      return !!getNativeFullscreenElement();
    }
    if (typeof node.msRequestFullscreen === "function") {
      await node.msRequestFullscreen();
      return !!getNativeFullscreenElement();
    }
  } catch {
    return false;
  }
  return false;
}

async function exitNativeFullscreen(): Promise<void> {
  const doc = document as FullscreenDocument;
  try {
    if (getNativeFullscreenElement()) {
      if (typeof document.exitFullscreen === "function") {
        await document.exitFullscreen();
        return;
      }
      if (typeof doc.webkitExitFullscreen === "function") {
        await doc.webkitExitFullscreen();
      }
    }
  } catch {
    // 네이티브 종료 실패 시 CSS 폴백 상태로 정리
  }
}

export default function LectureSlideshow({ pdfUrl }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const drawingRef = useRef<SlideDrawingOverlayHandle>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [activeTool, setActiveTool] = useState<DrawingTool | null>(null);
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);
  const [isCssFullscreen, setIsCssFullscreen] = useState(false);
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const [memoPages, setMemoPages] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const drawingsCache = useRef<Record<number, string>>({});
  const isFullscreen = isNativeFullscreen || isCssFullscreen;

  const refreshMemoPages = useCallback(() => setMemoPages(getPageHasMemo()), []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setContainerWidth(width);
      setContainerHeight(height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const saveCurrentDrawing = useCallback(() => {
    const data = drawingRef.current?.save();
    if (data) {
      drawingsCache.current[currentPage] = data;
    } else {
      delete drawingsCache.current[currentPage];
    }
  }, [currentPage]);

  const restoreDrawing = useCallback((page: number) => {
    const cached = drawingsCache.current[page];
    if (cached) {
      requestAnimationFrame(() => drawingRef.current?.restore(cached));
    }
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages || page === currentPage) return;
      saveCurrentDrawing();
      drawingRef.current?.clear();
      setCurrentPage(page);
      restoreDrawing(page);
      refreshMemoPages();
    },
    [totalPages, currentPage, saveCurrentDrawing, restoreDrawing, refreshMemoPages],
  );

  const toggleFullscreen = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;

    if (getNativeFullscreenElement()) {
      await exitNativeFullscreen();
      setIsCssFullscreen(false);
      return;
    }

    if (isCssFullscreen) {
      setIsCssFullscreen(false);
      return;
    }

    const entered = await requestNativeFullscreen(el);
    if (!entered) {
      // iOS Safari 등 Element Fullscreen 미지원 환경용 CSS 전체화면
      setIsCssFullscreen(true);
    }
  }, [isCssFullscreen]);

  useEffect(() => {
    const handler = () => {
      const native = !!getNativeFullscreenElement();
      setIsNativeFullscreen(native);
      if (native) setIsCssFullscreen(false);
    };
    document.addEventListener("fullscreenchange", handler);
    document.addEventListener("webkitfullscreenchange", handler);
    return () => {
      document.removeEventListener("fullscreenchange", handler);
      document.removeEventListener("webkitfullscreenchange", handler);
    };
  }, []);

  useEffect(() => {
    if (!isCssFullscreen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isCssFullscreen]);

  useEffect(() => {
    if (!isFullscreen) {
      setToolbarVisible(true);
      return;
    }
    const showToolbar = () => {
      setToolbarVisible(true);
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setToolbarVisible(false), 3000);
    };
    showToolbar();
    window.addEventListener("mousemove", showToolbar);
    window.addEventListener("touchstart", showToolbar);
    return () => {
      window.removeEventListener("mousemove", showToolbar);
      window.removeEventListener("touchstart", showToolbar);
      clearTimeout(idleTimer.current);
    };
  }, [isFullscreen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return;
      switch (e.key) {
        case "ArrowLeft":
          goToPage(currentPage - 1);
          break;
        case "ArrowRight":
          goToPage(currentPage + 1);
          break;
        case "f":
        case "F":
          void toggleFullscreen();
          break;
        case "p":
        case "P":
          setActiveTool((t) => (t === "pen" ? null : "pen"));
          break;
        case "h":
        case "H":
          setActiveTool((t) => (t === "highlighter" ? null : "highlighter"));
          break;
        case "e":
        case "E":
          setActiveTool((t) => (t === "eraser" ? null : "eraser"));
          break;
        case "m":
        case "M":
          setIsMemoOpen((v) => !v);
          break;
        case "Escape":
          if (isCssFullscreen) {
            setIsCssFullscreen(false);
            break;
          }
          if (activeTool) setActiveTool(null);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentPage, activeTool, goToPage, toggleFullscreen, isCssFullscreen]);

  const slideWidth = isMemoOpen ? containerWidth - 320 : containerWidth;
  const toolbarHeight = 48;
  const availableHeight = containerHeight - toolbarHeight;
  const pdfWidth = Math.max(slideWidth - 32, 200);
  const pdfScale = Math.min(pdfWidth / 960, availableHeight / 720, 2);
  const renderedWidth = Math.round(960 * pdfScale);

  return (
    <div
      ref={containerRef}
      className={`relative flex min-h-0 w-full flex-col bg-zinc-950 ${
        isCssFullscreen
          ? "fixed inset-0 z-[200] h-dvh max-h-dvh"
          : "h-full"
      }`}
    >
      {/* PDF + 드로잉 영역 */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <div className="relative" style={{ width: renderedWidth }}>
          <Document
            file={pdfUrl}
            onLoadSuccess={(pdf) => {
              setTotalPages(pdf.numPages);
              setIsLoading(false);
              refreshMemoPages();
            }}
            onLoadError={() => setIsLoading(false)}
            loading={null}
          >
            {isLoading && (
              <div className="flex h-64 items-center justify-center">
                <div className="size-8 animate-spin rounded-full border-2 border-zinc-600 border-t-amber-400" />
              </div>
            )}
            {!isLoading && (
              <Page
                pageNumber={currentPage}
                width={renderedWidth}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                loading={null}
              />
            )}
          </Document>
          {!isLoading && (
            <SlideDrawingOverlay
              ref={drawingRef}
              width={renderedWidth}
              height={Math.round(renderedWidth * (720 / 960))}
              activeTool={activeTool}
            />
          )}
        </div>

        {/* 메모 패널 */}
        <SlideMemoPanel
          currentPage={currentPage}
          totalPages={totalPages}
          isOpen={isMemoOpen}
          onClose={() => {
            setIsMemoOpen(false);
            refreshMemoPages();
          }}
        />
      </div>

      {/* 툴바 */}
      <div
        className={`transition-opacity duration-300 ${
          toolbarVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <SlideToolbar
          currentPage={currentPage}
          totalPages={totalPages}
          activeTool={activeTool}
          isFullscreen={isFullscreen}
          isMemoOpen={isMemoOpen}
          memoPages={memoPages}
          onPrev={() => goToPage(currentPage - 1)}
          onNext={() => goToPage(currentPage + 1)}
          onToolChange={setActiveTool}
          onClearDrawing={() => drawingRef.current?.clear()}
          onToggleMemo={() => {
            setIsMemoOpen((v) => {
              if (v) refreshMemoPages();
              return !v;
            });
          }}
          onToggleFullscreen={() => {
            void toggleFullscreen();
          }}
        />
      </div>
    </div>
  );
}
