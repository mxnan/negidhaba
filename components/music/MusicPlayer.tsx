"use client";
import React from "react";
import { useMusicStore } from "@/store/music-store";
import ProgressBar from "./ProgressBar";

export default function MusicPlayer() {
  const track = useMusicStore((s) => s.playlist[s.currentTrackIndex]);
  const isPlaying = useMusicStore((s) => s.isPlaying);
  const toggle = useMusicStore((s) => s.togglePlay);
  const next = useMusicStore((s) => s.next);

  return (
    <div className="fixed left-1/2 bottom-6 transform -translate-x-1/2 w-[min(980px,92%)] bg-white/60 backdrop-blur-md border border-white/20 rounded-xl shadow-md p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">{track?.title}</div>
          <div className="text-sm text-zinc-700">{track?.artist}</div>
        </div>
        <div className="flex items-center gap-3">
          <button aria-label="Previous" className="p-2">◀︎</button>
          <button aria-label={isPlaying ? "Pause" : "Play"} onClick={toggle} className="p-3 bg-amber-600 rounded-full text-white">
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <button aria-label="Next" onClick={next} className="p-2">▶︎</button>
        </div>
      </div>
      <ProgressBar />
    </div>
  );
}
