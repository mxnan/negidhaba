type YTPlayer = any;

export function loadYouTubeAPI(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve();
    if ((window as any).YT && (window as any).YT.Player) return resolve();

    const existing = document.getElementById("youtube-iframe-api");
    if (existing) return resolve();

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.id = "youtube-iframe-api";
    document.body.appendChild(tag);

    (window as any).onYouTubeIframeAPIReady = () => resolve();
  });
}

export function createPlayer(containerId: string, videoId: string, opts: {
  onReady?: (player: YTPlayer) => void;
  onStateChange?: (event: any) => void;
  onError?: (e: any) => void;
}): YTPlayer | null {
  if (typeof window === "undefined") return null;
  const YT = (window as any).YT;
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
    },
    events: {
      onReady: (e: any) => opts.onReady?.(player),
      onStateChange: opts.onStateChange,
      onError: opts.onError,
    },
  });

  return player;
}
