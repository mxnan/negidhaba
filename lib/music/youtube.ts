export type YouTubePlayer = {
  setVolume(volume: number): void;
  playVideo(): void;
  pauseVideo(): void;
  loadVideoById(videoId: string): void;
  cueVideoById(videoId: string): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  destroy(): void;
};

export type YouTubeStateChangeEvent = { data: number };
export type YouTubeErrorEvent = { data: number };

type YouTubePlayerOptions = {
  height: string;
  width: string;
  videoId: string;
  playerVars: Record<string, number | string>;
  events: {
    onReady: () => void;
    onStateChange?: (event: YouTubeStateChangeEvent) => void;
    onError?: (event: YouTubeErrorEvent) => void;
  };
};

type YouTubeApi = {
  Player: new (containerId: string, options: YouTubePlayerOptions) => YouTubePlayer;
};

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;

export function loadYouTubeAPI(): Promise<void> {
  if (typeof window === "undefined" || window.YT?.Player) return Promise.resolve();
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve, reject) => {
    const finish = () => resolve();
    window.onYouTubeIframeAPIReady = finish;

    const existing = document.getElementById("youtube-iframe-api");
    if (existing) return;

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.id = "youtube-iframe-api";
    script.onerror = () => {
      apiPromise = null;
      reject(new Error("YouTube API failed to load"));
    };
    document.body.appendChild(script);
  });

  return apiPromise;
}

export function createPlayer(containerId: string, videoId: string, opts: {
  onReady?: (player: YouTubePlayer) => void;
  onStateChange?: (event: YouTubeStateChangeEvent) => void;
  onError?: (event: YouTubeErrorEvent) => void;
}): YouTubePlayer | null {
  if (typeof window === "undefined") return null;
  const YT = window.YT;
  if (!YT || !YT.Player) return null;

  const player = new YT.Player(containerId, {
    height: "0",
    width: "0",
    videoId,
    playerVars: {
      autoplay: 0,
      controls: 0,
      rel: 0,
      modestbranding: 1,
      origin: window.location.origin,
    },
    events: {
      onReady: () => opts.onReady?.(player),
      onStateChange: opts.onStateChange,
      onError: opts.onError,
    },
  });

  return player;
}
