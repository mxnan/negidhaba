"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { Track } from "@/lib/music/playlist";
import { useMusicStore } from "@/store/music-store";
import { useMediaKeyboardShortcuts } from "@/lib/music/useMediaKeyboardShortcuts";
import { PauseIcon, PlayIcon } from "@/components/ui/play-pause";
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
        className="h-12 w-12 shrink-0 rounded-full border border-mustard/30 object-cover"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-earth/40 text-xl text-background/60">
      ♪
    </div>
  );
}

export default function MusicPlayer() {
  useMediaKeyboardShortcuts(); // Space / ←→ / ↑↓ / N / P, works anywhere on the page

  const track = useMusicStore((s) => s.playlist[s.currentTrackIndex]);
  const isPlaying = useMusicStore((s) => s.isPlaying);
  const playerError = useMusicStore((s) => s.playerError);
  const volume = useMusicStore((s) => s.volume);
  const toggle = useMusicStore((s) => s.togglePlay);
  const next = useMusicStore((s) => s.next);
  const previous = useMusicStore((s) => s.previous);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="fixed bottom-4 left-1/2 z-10 flex max-w-xl -translate-x-1/2 flex-col gap-3 rounded-2xl border border-mustard/25 bg-deep-maroon/90 p-4 text-background shadow-lg backdrop-blur-xl sm:bottom-6 sm:w-[min(980px,92%)]"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={
              isPlaying
                ? { duration: 8, repeat: Infinity, ease: "linear" }
                : { duration: 0.3, ease: "easeOut" }
            }
            className="shrink-0 rounded-full p-0.5"
            style={{
              background:
                volume > 0
                  ? `conic-gradient(var(--accent-mustard) ${volume * 360}deg, transparent ${volume * 360}deg)`
                  : "transparent",
            }}
            aria-label={`Volume ${Math.round(volume * 100)} percent`}
            role="img"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={track?.videoId ?? "empty"}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              >
                <TrackArtwork key={track?.videoId ?? "empty"} track={track} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={track?.videoId ?? "empty"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="min-w-0"
            >
              <div className="truncate text-base font-semibold text-background sm:text-lg">
                {track?.title ?? "Loading playlist..."}
              </div>
              <div className="truncate text-sm text-background/85">
                {track?.artist ?? "YouTube"}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <motion.button
            type="button"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.88 }}
            aria-label="Previous"
            onClick={() => previous(true)}
            className="flex h-12 w-12 items-center justify-center rounded-full p-0 text-background/90 transition hover:bg-background/10 hover:text-background"
          >
            ◀︎
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={toggle}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-mustard p-0 text-deep-maroon shadow-lg transition hover:bg-burnt-orange"
          >
            <motion.span
              key={isPlaying ? "pause" : "play"}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15 }}
            >
              {isPlaying ? (
                <PauseIcon
                  aria-hidden="true"
                  className="h-[18px] w-[18px] animate-spin ease-in-out duration-1000"
                />
              ) : (
                <PlayIcon aria-hidden="true" className="h-[18px] w-[18px]" />
              )}
            </motion.span>
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.88 }}
            aria-label="Next"
            onClick={() => next(true)}
            className="flex h-12 w-12 items-center justify-center rounded-full p-0 text-background/90 transition hover:bg-background/10 hover:text-background"
          >
            ▶︎
          </motion.button>
        </div>
      </div>
      <AnimatePresence>
        {playerError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-background"
            role="alert"
          >
            {playerError}
          </motion.div>
        )}
      </AnimatePresence>
      <ProgressBar />
    </motion.div>
  );
}
