"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMusicStore } from "@/store/music-store";

function formatTime(t: number) {
  if (!isFinite(t) || t < 0) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function ProgressBar() {
  const currentTime = useMusicStore((s) => s.currentTime);
  const duration = useMusicStore((s) => s.duration);
  const seek = useMusicStore((s) => s.seek);

  const barRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const pendingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [dragTime, setDragTime] = useState<number | null>(null); // live preview while dragging
  const [pendingSeek, setPendingSeek] = useState<number | null>(null); // committed, waiting on store
  const [hovering, setHovering] = useState(false);

  const seekable = duration > 0 && isFinite(duration);
  const displayTime = dragTime ?? pendingSeek ?? currentTime;
  const pct = seekable ? Math.min(100, Math.max(0, (displayTime / duration) * 100)) : 0;

  // hard fallback: never let a stuck pendingSeek freeze the bar
  useEffect(() => {
    if (pendingSeek == null) return;
    if (pendingTimeoutRef.current) clearTimeout(pendingTimeoutRef.current);
    pendingTimeoutRef.current = setTimeout(() => setPendingSeek(null), 1500);
    return () => {
      if (pendingTimeoutRef.current) clearTimeout(pendingTimeoutRef.current);
    };
  }, [pendingSeek]);

  const timeFromClientX = useCallback(
    (clientX: number) => {
      const bar = barRef.current;
      if (!bar || !seekable) return 0;
      const rect = bar.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      return ratio * duration;
    },
    [duration, seekable]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!seekable) return;
      draggingRef.current = true;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      setDragTime(timeFromClientX(e.clientX));
      e.preventDefault();
    },
    [seekable, timeFromClientX]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;
      setDragTime(timeFromClientX(e.clientX));
    },
    [timeFromClientX]
  );

  const commitSeek = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      const t = timeFromClientX(e.clientX);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
      setDragTime(null);
      setPendingSeek(t);
      seek(t);
    },
    [timeFromClientX, seek]
  );

  const handlePointerCancel = useCallback(() => {
    draggingRef.current = false;
    setDragTime(null);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!seekable) return;
      let target: number | null = null;
      if (e.key === "ArrowRight") target = Math.min(duration, currentTime + 5);
      else if (e.key === "ArrowLeft") target = Math.max(0, currentTime - 5);
      else if (e.key === "Home") target = 0;
      else if (e.key === "End") target = duration;
      else return;
      e.preventDefault();
      setPendingSeek(target);
      seek(target);
    },
    [seekable, duration, currentTime, seek]
  );

  return (
    <div className="flex items-center gap-2 text-xs text-amber-100/70 select-none">
      <span className="w-10 text-right tabular-nums">{formatTime(displayTime)}</span>

      <div
        ref={barRef}
        role="slider"
        tabIndex={seekable ? 0 : -1}
        aria-label="Seek"
        aria-disabled={!seekable}
        aria-valuemin={0}
        aria-valuemax={duration || 0}
        aria-valuenow={displayTime}
        aria-valuetext={formatTime(displayTime)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={commitSeek}
        onPointerCancel={handlePointerCancel}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className={`relative flex-1 h-2 rounded-full bg-white/10 touch-none ${
          seekable ? "cursor-pointer" : "cursor-default opacity-50"
        }`}
      >
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-amber-500 pointer-events-none"
          style={{ width: `${pct}%` }}
        />
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-300 shadow pointer-events-none transition-opacity ${
            hovering || dragTime !== null ? "opacity-100" : "opacity-0"
          }`}
          style={{ left: `${pct}%` }}
        />
      </div>

      <span className="w-10 tabular-nums">{formatTime(duration)}</span>
    </div>
  );
}