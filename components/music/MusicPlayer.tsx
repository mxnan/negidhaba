"use client";
import { useState } from "react";
import Image from "next/image";
import type { Track } from "@/lib/music/playlist";
import { useMusicStore } from "@/store/music-store";
import { useMediaKeyboardShortcuts } from "@/lib/music/useMediaKeyboardShortcuts";
import ProgressBar from "./ProgressBar";

function TrackArtwork({ track }: { track?: Track }) {
  const [failed, setFailed] = useState(false);

  if (track?.thumbnailUrl && !failed) {
    return (
      <Image
        width={48}
        height={48}
        src={track.thumbnailUrl}
        alt={track.title}
        className="w-12 h-12 rounded-lg object-cover shrink-0 border border-amber-200/20"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className="w-12 h-12 rounded-lg bg-amber-900/40 flex items-center justify-center shrink-0 text-amber-100/60 text-xl">
      ♪
    </div>
  );
}

export default function MusicPlayer() {
  useMediaKeyboardShortcuts(); // Space / ←→ / ↑↓ / N / P, works anywhere on the page

  const track = useMusicStore((s) => s.playlist[s.currentTrackIndex]);
  const isPlaying = useMusicStore((s) => s.isPlaying);
  const playerError = useMusicStore((s) => s.playerError);
  const toggle = useMusicStore((s) => s.togglePlay);
  const next = useMusicStore((s) => s.next);
  const previous = useMusicStore((s) => s.previous);

  return (
    <div className="fixed max-w-xl z-10 left-1/2 bottom-6 transform -translate-x-1/2 w-[min(980px,92%)] bg-[#3b1f1d]/90 backdrop-blur-md border border-amber-200/30 rounded-xl shadow-[0_12px_28px_rgba(42,18,13,0.42)] p-4 flex flex-col gap-3 text-white">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <TrackArtwork key={track?.videoId ?? "empty"} track={track} />
          <div className="min-w-0">
            <div className="text-lg font-semibold text-white truncate">{track?.title ?? "Loading playlist..."}</div>
            <div className="text-sm text-amber-100/80 truncate">{track?.artist ?? "YouTube"}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button aria-label="Previous" onClick={() => previous(true)} className="p-2 rounded-full text-amber-50/90 transition hover:bg-white/10 hover:text-white">◀︎</button>
          <button aria-label={isPlaying ? "Pause" : "Play"} onClick={toggle} className="p-3 bg-amber-500 rounded-full text-[#2a120d] shadow-lg transition hover:bg-amber-400">
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <button aria-label="Next" onClick={() => next(true)} className="p-2 rounded-full text-amber-50/90 transition hover:bg-white/10 hover:text-white">▶︎</button>
        </div>
      </div>
      {playerError && (
        <div className="text-xs text-red-200/90" role="alert">
          {playerError}
        </div>
      )}
      <ProgressBar />
    </div>
  );
}