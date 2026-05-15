"use client";

// PDF 위에 겹치는 투명 캔버스 — 펜/형광펜/지우개 판서 레이어
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export type DrawingTool = "pen" | "highlighter" | "eraser";

export type SlideDrawingOverlayHandle = {
  clear: () => void;
  save: () => string | null;
  restore: (dataUrl: string) => void;
};

type Props = {
  width: number;
  height: number;
  activeTool: DrawingTool | null;
};

const TOOL_STYLES: Record<DrawingTool, { lineWidth: number; color: string; compositeOp: GlobalCompositeOperation }> = {
  pen: { lineWidth: 2.5, color: "#ef4444", compositeOp: "source-over" },
  highlighter: { lineWidth: 22, color: "rgba(250,204,21,0.35)", compositeOp: "source-over" },
  eraser: { lineWidth: 28, color: "rgba(0,0,0,1)", compositeOp: "destination-out" },
};

const SlideDrawingOverlay = forwardRef<SlideDrawingOverlayHandle, Props>(
  function SlideDrawingOverlay({ width, height, activeTool }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDrawing = useRef(false);

    const getCtx = useCallback(() => canvasRef.current?.getContext("2d") ?? null, []);

    useImperativeHandle(ref, () => ({
      clear() {
        const ctx = getCtx();
        if (ctx) ctx.clearRect(0, 0, width, height);
      },
      save() {
        const canvas = canvasRef.current;
        if (!canvas) return null;
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;
        const empty = !ctx.getImageData(0, 0, width, height).data.some((v) => v !== 0);
        return empty ? null : canvas.toDataURL("image/png");
      },
      restore(dataUrl: string) {
        const ctx = getCtx();
        if (!ctx) return;
        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
        };
        img.src = dataUrl;
      },
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = width;
      canvas.height = height;
    }, [width, height]);

    const startDraw = useCallback(
      (e: React.PointerEvent) => {
        if (!activeTool) return;
        isDrawing.current = true;
        const ctx = getCtx();
        if (!ctx) return;
        const style = TOOL_STYLES[activeTool];
        ctx.globalCompositeOperation = style.compositeOp;
        ctx.strokeStyle = style.color;
        ctx.lineWidth = style.lineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        const rect = canvasRef.current!.getBoundingClientRect();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      },
      [activeTool, getCtx],
    );

    const draw = useCallback(
      (e: React.PointerEvent) => {
        if (!isDrawing.current) return;
        const ctx = getCtx();
        if (!ctx) return;
        const rect = canvasRef.current!.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
      },
      [getCtx],
    );

    const endDraw = useCallback(() => {
      isDrawing.current = false;
    }, []);

    return (
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          width,
          height,
          pointerEvents: activeTool ? "auto" : "none",
          cursor: activeTool === "eraser" ? "cell" : activeTool ? "crosshair" : "default",
          touchAction: "none",
        }}
        onPointerDown={startDraw}
        onPointerMove={draw}
        onPointerUp={endDraw}
        onPointerLeave={endDraw}
      />
    );
  },
);

export default SlideDrawingOverlay;
