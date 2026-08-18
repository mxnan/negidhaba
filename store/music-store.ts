import { create } from "zustand";
import type { Track } from "@/lib/music/playlist";

type State = {
  playlist: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playerError?: string | null;
  seekRequest: number | null;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  next: (autoplay?: boolean) => void;
  previous: (autoplay?: boolean) => void;
  selectTrack: (index: number, autoplay?: boolean) => void;
  seek: (time: number) => void;
  clearSeekRequest: () => void;
  setTime: (t: number, d?: number) => void;
  setPlaying: (v: boolean) => void;
  setVolume: (v: number) => void;
  setError: (e?: string | null) => void;
  setPlaylist: (playlist: Track[]) => void;
};

export const useMusicStore = create<State>((set) => ({
  playlist: [],
  currentTrackIndex: 0,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  playerError: null,
  seekRequest: null,
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
  next: (autoplay = true) => {
    set((s) => {
      if (s.playlist.length === 0) return s;
      const nextIndex = (s.currentTrackIndex + 1) % s.playlist.length;
      return { currentTrackIndex: nextIndex, currentTime: 0, duration: 0, isPlaying: autoplay };
    });
  },
  previous: (autoplay = true) => {
    set((s) => {
      if (s.playlist.length === 0) return s;
      const prev = (s.currentTrackIndex - 1 + s.playlist.length) % s.playlist.length;
      return { currentTrackIndex: prev, currentTime: 0, duration: 0, isPlaying: autoplay };
    });
  },
  selectTrack: (index: number, autoplay = true) => set({ currentTrackIndex: index, currentTime: 0, duration: 0, isPlaying: autoplay }),
  seek: (time: number) => set({ seekRequest: time }),
  clearSeekRequest: () => set({ seekRequest: null }),
  setTime: (t: number, d?: number) => set((s) => ({ currentTime: t, duration: d ?? s.duration })),
  setPlaying: (v: boolean) => set({ isPlaying: v }),
  setVolume: (v: number) => set({ volume: v }),
  setError: (e?: string | null) => set({ playerError: e ?? null }),
  setPlaylist: (playlist) => {
    if (playlist.length === 0) return;
    set({ playlist, currentTrackIndex: 0, currentTime: 0, duration: 0 });
  },
}));