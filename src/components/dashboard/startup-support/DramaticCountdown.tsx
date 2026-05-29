// D-Day 드라마틱 카운트다운 위젯 — 마감 시각까지 일·시·분·초 표시
"use client";

import { useEffect, useState } from "react";
import styles from "./dramatic-countdown.module.css";

const TARGET_MS = new Date("2026-07-07T21:59:59+09:00").getTime();

const TARGET_CONFIG = {
  title: "D-DAY",
  subtitle: "2026. 7. 7.(화) 21:59:59까지",
} as const;

type CountdownParts = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

function getCountdownParts(nowMs: number): CountdownParts | null {
  const diff = TARGET_MS - nowMs;
  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

const PLACEHOLDER: CountdownParts = {
  days: "--",
  hours: "--",
  minutes: "--",
  seconds: "--",
};

export default function DramaticCountdown() {
  const [parts, setParts] = useState<CountdownParts>(PLACEHOLDER);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    function tick() {
      const next = getCountdownParts(Date.now());
      if (!next) {
        setExpired(true);
        return false;
      }
      setParts(next);
      setExpired(false);
      return true;
    }

    if (!tick()) return;

    const timerId = window.setInterval(() => {
      if (!tick()) window.clearInterval(timerId);
    }, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  return (
    <div className={styles.container} aria-live="polite">
      <div className={styles.title}>{TARGET_CONFIG.title}</div>
      <div className={styles.subtitle}>{TARGET_CONFIG.subtitle}</div>

      {expired ? (
        <div className={styles.timeout}>THE TIME HAS COME</div>
      ) : (
        <div className={styles.grid}>
          <div className={styles.box}>
            <span className={styles.digit}>{parts.days}</span>
            <span className={styles.label}>Days</span>
          </div>
          <div className={styles.box}>
            <span className={styles.digit}>{parts.hours}</span>
            <span className={styles.label}>Hours</span>
          </div>
          <div className={styles.box}>
            <span className={styles.digit}>{parts.minutes}</span>
            <span className={styles.label}>Mins</span>
          </div>
          <div className={`${styles.box} ${styles.boxSecs}`}>
            <span className={styles.digit}>{parts.seconds}</span>
            <span className={styles.label}>Secs</span>
          </div>
        </div>
      )}
    </div>
  );
}
