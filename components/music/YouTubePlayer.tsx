"use client";

import { useEffect, useRef } from "react";
import {
  createPlayer,
  loadYouTubeAPI,
  type YouTubePlayer as YouTubePlayerInstance,
} from "@/lib/music/youtube";
import { useMusicStore } from "@/store/music-store";

const CONTAINER_ID = "negidhaba-yt-player";

type PlaylistResponse = {
  tracks?: ReturnType<typeof useMusicStore.getState>["playlist"];
  error?: string;
  details?: string;
};

export default function YouTubePlayer() {
  const playerRef = useRef<YouTubePlayerInstance | null>(null);
  const ignoreUntilRef = useRef(0);
  const volume = useMusicStore((state) => state.volume);
  const videoId = useMusicStore((state) => state.playlist[state.currentTrackIndex]?.videoId);
  const isPlaying = useMusicStore((state) => state.isPlaying);
  const seekRequest = useMusicStore((state) => state.seekRequest);
  const clearSeekRequest = useMusicStore((state) => state.clearSeekRequest);
  const next = useMusicStore((state) => state.next);
  const setError = useMusicStore((state) => state.setError);
  const setPlaying = useMusicStore((state) => state.setPlaying);
  const setPlaylist = useMusicStore((state) => state.setPlaylist);
  const setTime = useMusicStore((state) => state.setTime);

  useEffect(() => {
    let cancelled = false;
    let pollInterval: ReturnType<typeof setInterval> | undefined;

    const initialize = async () => {
      try {
        const response = await fetch("/api/playlist");
        const data = (await response.json().catch(() => null)) as PlaylistResponse | null;
        if (!response.ok) {
          throw new Error(data?.details ?? data?.error ?? "Unable to load YouTube playlist");
        }
        if (!data?.tracks?.length) {
          throw new Error("No songs found in the YouTube playlist");
        }

        setPlaylist(data.tracks);
        await loadYouTubeAPI();
        if (cancelled) return;

        const firstVideoId = useMusicStore.getState().playlist[0]?.videoId;
        if (!firstVideoId) throw new Error("Playlist has no playable videos");

        playerRef.current = createPlayer(CONTAINER_ID, firstVideoId, {
          onReady: (player) => {
            player.setVolume(Math.round(useMusicStore.getState().volume * 100));
            if (useMusicStore.getState().isPlaying) player.playVideo();
          },
          onStateChange: ({ data: state }) => {
            if (state === 0) next(true);
            else if (state === 1 || state === 3) setPlaying(true);
            else if (state === 2) setPlaying(false);
          },
          onError: () => setError("YouTube could not play this video"),
        });

        pollInterval = setInterval(() => {
          const player = playerRef.current;
          if (!player || Date.now() < ignoreUntilRef.current) return;
          try {
            setTime(player.getCurrentTime(), player.getDuration());
          } catch {
            // The iframe can briefly reject calls while changing videos.
          }
        }, 500);
      } catch (error) {
        if (!cancelled) {
          setError(error instanceof Error ? error.message : "Unable to load YouTube playlist");
        }
      }
    };

    void initialize();
    return () => {
      cancelled = true;
      if (pollInterval) clearInterval(pollInterval);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [next, setError, setPlaying, setPlaylist, setTime]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || !videoId) return;

    try {
      player.loadVideoById(videoId);
    } catch {
      setError("YouTube could not load this video");
    }
  }, [videoId, setError]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    try {
      if (isPlaying) player.playVideo();
      else player.pauseVideo();
    } catch {
      // The player is not ready during initial hydration.
    }
  }, [isPlaying]);

  useEffect(() => {
    try {
      playerRef.current?.setVolume(Math.round(volume * 100));
    } catch {
      // Ignore volume updates before the iframe is ready.
    }
  }, [volume]);

  useEffect(() => {
    if (seekRequest == null) return;
    const player = playerRef.current;
    clearSeekRequest();
    if (!player) return;

    try {
      player.seekTo(seekRequest, true);
      setTime(seekRequest);
      ignoreUntilRef.current = Date.now() + 800;
    } catch {
      setError("YouTube could not seek this video");
    }
  }, [seekRequest, clearSeekRequest, setError, setTime]);

  return <div id={CONTAINER_ID} className="absolute -left-[9999px] -top-[9999px]" />;
}