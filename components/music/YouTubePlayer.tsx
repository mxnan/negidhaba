"use client";
import { useEffect, useRef } from "react";
import { loadYouTubeAPI, createPlayer } from "@/lib/music/youtube";
import { useMusicStore } from "@/store/music-store";

export default function YouTubePlayer() {
  const containerId = "negidhaba-yt-player";
  const playerRef = useRef<any>(null);
  const currentIndex = useMusicStore((s) => s.currentTrackIndex);
  const playlist = useMusicStore((s) => s.playlist);
  const isPlaying = useMusicStore((s) => s.isPlaying);
  const setReady = useMusicStore((s) => s.setReady);
  const setTime = useMusicStore((s) => s.setTime);
  const next = useMusicStore((s) => s.next);
  const setError = useMusicStore((s) => s.setError);

  useEffect(() => {
    let mounted = true;
    loadYouTubeAPI()
      .then(() => {
        if (!mounted) return;
        const videoId = playlist[currentIndex]?.videoId;
        playerRef.current = createPlayer(containerId, videoId, {
          onReady: (player) => {
            setReady(true);
          },
          onStateChange: (e) => {
            const state = e.data;
            const P = (window as any).YT?.Player?.State || {};
            // 0 ended
            if (state === 0) {
              next();
            }
          },
          onError: (e) => {
            setError("Playback error");
          },
        });

        // poll time while playing
        const interval = setInterval(() => {
          const p = playerRef.current;
          if (p && p.getCurrentTime) {
            try {
              const t = p.getCurrentTime();
              const d = p.getDuration();
              setTime(Math.max(0, t), d || undefined);
              if (isPlaying) p.playVideo?.();
            } catch (err) {
              // ignore
            }
          }
        }, 500);

        return () => {
          clearInterval(interval);
          mounted = false;
          try {
            playerRef.current?.destroy();
          } catch (e) {}
        };
      })
      .catch(() => setError("YouTube API failed to load"));
  }, []);

  // respond to track change
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    const nextVideoId = playlist[currentIndex]?.videoId;
    try {
      p.cueVideoById(nextVideoId);
      if (isPlaying) p.playVideo();
    } catch (e) {}
  }, [currentIndex]);

  // respond to play/pause
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    try {
      if (isPlaying) p.playVideo(); else p.pauseVideo();
    } catch (e) {}
  }, [isPlaying]);

  return <div id={containerId} style={{ position: "absolute", left: -9999, top: -9999 }} />;
}
