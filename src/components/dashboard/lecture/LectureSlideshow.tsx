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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const [memoPages, setMemoPages] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const drawingsCache = useRef<Record<number, string>>({});

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

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen();
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

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
          toggleFullscreen();
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
          if (activeTool) setActiveTool(null);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentPage, activeTool, goToPage, toggleFullscreen]);

  const slideWidth = isMemoOpen ? containerWidth - 320 : containerWidth;
  const toolbarHeight = 48;
  const availableHeight = containerHeight - toolbarHeight;
  const pdfWidth = Math.max(slideWidth - 32, 200);
  const pdfScale = Math.min(pdfWidth / 960, availableHeight / 720, 2);
  const renderedWidth = Math.round(960 * pdfScale);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full min-h-0 w-full flex-col bg-zinc-950"
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
          onToggleFullscreen={toggleFullscreen}
        />
      </div>
    </div>
  );
}
