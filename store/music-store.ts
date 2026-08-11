import {create} from "zustand";
import { PLAYLIST, Track } from "@/lib/music/playlist";

type State = {
  playlist: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isReady: boolean;
  playerError?: string | null;
  // actions
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  selectTrack: (index: number) => void;
  seek: (time: number) => void;
  setReady: (v: boolean) => void;
  setTime: (t: number, d?: number) => void;
  setVolume: (v: number) => void;
  setError: (e?: string | null) => void;
};

export const useMusicStore = create<State>((set, get) => ({
  playlist: PLAYLIST,
  currentTrackIndex: 0,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  isReady: false,
  playerError: null,
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
  next: () => {
    set((s) => {
      const nextIndex = (s.currentTrackIndex + 1) % s.playlist.length;
      return { currentTrackIndex: nextIndex, currentTime: 0, duration: 0, isPlaying: true };
    });
  },
  previous: () => {
    set((s) => {
      const prev = (s.currentTrackIndex - 1 + s.playlist.length) % s.playlist.length;
      return { currentTrackIndex: prev, currentTime: 0, duration: 0, isPlaying: true };
    });
  },
  selectTrack: (index: number) => set({ currentTrackIndex: index, currentTime: 0, duration: 0, isPlaying: true }),
  seek: (time: number) => set({ currentTime: time }),
  setReady: (v: boolean) => set({ isReady: v }),
  setTime: (t: number, d?: number) => set((s) => ({ currentTime: t, duration: d ?? s.duration })),
  setVolume: (v: number) => set({ volume: v }),
  setError: (e?: string | null) => set({ playerError: e ?? null }),
}));
