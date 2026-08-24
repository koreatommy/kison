// /bonus 랜딩 — 첫 로딩 시 전면 폭죽 오버레이
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  gravity: number;
  drag: number;
  spark: boolean;
};

type Rocket = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  explodeAt: number;
};

const COLORS = [
  "#f59e0b",
  "#fbbf24",
  "#ef4444",
  "#f97316",
  "#22c55e",
  "#38bdf8",
  "#f472b6",
  "#ffffff",
  "#fde68a",
];

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function burst(
  particles: Particle[],
  x: number,
  y: number,
  color: string,
  count: number,
  power: number,
) {
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + rand(-0.08, 0.08);
    const speed = rand(power * 0.45, power);
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      maxLife: rand(0.75, 1.35),
      color: Math.random() > 0.35 ? color : pick(COLORS),
      size: rand(1.6, 3.4),
      gravity: rand(0.04, 0.09),
      drag: rand(0.965, 0.985),
      spark: false,
    });
  }
  // 잔불 스파크
  for (let i = 0; i < Math.floor(count * 0.35); i++) {
    const angle = rand(0, Math.PI * 2);
    const speed = rand(power * 0.15, power * 0.55);
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      maxLife: rand(0.4, 0.9),
      color: "#fff7ed",
      size: rand(0.8, 1.6),
      gravity: 0.06,
      drag: 0.96,
      spark: true,
    });
  }
}

export default function BonusFireworks() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduceMotion) {
      const t = window.setTimeout(() => setActive(false), 600);
      return () => window.clearTimeout(t);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    const particles: Particle[] = [];
    const rockets: Rocket[] = [];
    const startedAt = performance.now();
    const DURATION_MS = 4200;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    function launchRocket(delayBias = 0) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = rand(w * 0.12, w * 0.88);
      const color = pick(COLORS);
      rockets.push({
        x,
        y: h + 8,
        vx: rand(-0.6, 0.6),
        vy: rand(-11.5, -8.2) - delayBias,
        color,
        explodeAt: rand(h * 0.18, h * 0.42),
      });
    }

    // 초반 연속 발사
    for (let i = 0; i < 7; i++) {
      window.setTimeout(() => {
        if (running) launchRocket(i * 0.15);
      }, i * 180);
    }
    // 중반 추가 폭죽
    for (let i = 0; i < 8; i++) {
      window.setTimeout(() => {
        if (running) launchRocket();
      }, 900 + i * 220);
    }
    // 피날레
    window.setTimeout(() => {
      if (!running) return;
      for (let i = 0; i < 6; i++) launchRocket(0.4);
    }, 2600);

    function frame(now: number) {
      if (!running || !ctx) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const elapsed = now - startedAt;

      // 잔상으로 꼬리 표현
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.22)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      // rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i]!;
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.085;

        ctx.beginPath();
        ctx.fillStyle = r.color;
        ctx.arc(r.x, r.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,247,237,0.85)";
        ctx.arc(r.x, r.y + 6, 1.2, 0, Math.PI * 2);
        ctx.fill();

        if (r.y <= r.explodeAt || r.vy >= -0.5) {
          const big = Math.random() > 0.55;
          burst(particles, r.x, r.y, r.color, big ? 72 : 48, big ? 7.8 : 5.6);
          // 2차 작은 버스트
          if (big) {
            burst(
              particles,
              r.x + rand(-12, 12),
              r.y + rand(-12, 12),
              pick(COLORS),
              28,
              4.2,
            );
          }
          rockets.splice(i, 1);
        }
      }

      // particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]!;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1 / (60 * p.maxLife);

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = Math.max(0, p.life);
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.spark ? p.size * 0.7 : p.size, 0, Math.PI * 2);
        ctx.fill();

        if (!p.spark && p.life > 0.55) {
          ctx.beginPath();
          ctx.fillStyle = "#fff";
          ctx.arc(p.x, p.y, p.size * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      if (elapsed < DURATION_MS || particles.length > 0 || rockets.length > 0) {
        raf = requestAnimationFrame(frame);
      } else {
        setActive(false);
      }
    }

    raf = requestAnimationFrame(frame);

    const endTimer = window.setTimeout(() => {
      // 남아 있어도 오버레이는 페이드아웃
      setActive(false);
    }, DURATION_MS + 900);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(endTimer);
      window.removeEventListener("resize", resize);
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[80]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          aria-hidden
        >
          {reduceMotion ? (
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 35%, rgba(245,158,11,0.28), transparent 55%)",
              }}
            />
          ) : (
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
