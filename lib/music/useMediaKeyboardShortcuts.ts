"use client";
import { useEffect } from "react";
import { useMusicStore } from "@/store/music-store";

const SEEK_STEP = 5; // seconds
const VOLUME_STEP = 0.05;

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

export function useMediaKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return; // don't hijack typing in inputs/search boxes
      if (e.metaKey || e.ctrlKey || e.altKey) return; // don't fight browser/OS shortcuts

      const {
        currentTime,
        duration,
        volume,
        togglePlay,
        next,
        previous,
        seek,
        setVolume,
      } = useMusicStore.getState();

      switch (e.key) {
        case " ":
        case "Spacebar":
          e.preventDefault(); // stop page from scrolling
          togglePlay();
          break;

        case "ArrowRight":
          e.preventDefault();
          if (duration > 0) seek(Math.min(duration, currentTime + SEEK_STEP));
          break;

        case "ArrowLeft":
          e.preventDefault();
          if (duration > 0) seek(Math.max(0, currentTime - SEEK_STEP));
          break;

        case "ArrowUp":
          e.preventDefault();
          setVolume(Math.min(1, volume + VOLUME_STEP));
          break;

        case "ArrowDown":
          e.preventDefault();
          setVolume(Math.max(0, volume - VOLUME_STEP));
          break;

        case "n":
        case "N":
          next(true);
          break;

        case "p":
        case "P":
          previous(true);
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
}