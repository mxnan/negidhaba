"use client";
import React, { useRef, useState, useEffect } from "react";
import { useMusicStore } from "@/store/music-store";

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

export default function ProgressBar() {
  const currentTime = useMusicStore((s) => s.currentTime);
  const duration = useMusicStore((s) => s.duration);
  const seek = useMusicStore((s) => s.seek);
  const [local, setLocal] = useState(currentTime);
  const dragging = useRef(false);

  useEffect(() => {
    if (!dragging.current) setLocal(currentTime);
  }, [currentTime]);

  const pct = duration > 0 ? Math.min(100, (local / duration) * 100) : 0;

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 text-sm">
        <div className="w-12 text-left">{formatTime(local)}</div>
        <div
          className="relative flex-1 h-2 bg-white/30 rounded-full cursor-pointer"
          onClick={(e) => {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            const x = e.clientX - rect.left;
            const t = (x / rect.width) * (duration || 0);
            seek(t || 0);
          }}
        >
          <div className="absolute left-0 top-0 h-2 bg-orange-600 rounded-full" style={{ width: `${pct}%` }} />
        </div>
        <div className="w-12 text-right">{duration ? formatTime(duration) : "0:00"}</div>
      </div>
    </div>
  );
}
