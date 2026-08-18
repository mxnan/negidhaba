import { NextResponse } from "next/server";
import type { Track } from "@/lib/music/playlist";

const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/playlistItems";
const YOUTUBE_VIDEOS_URL = "https://www.googleapis.com/youtube/v3/videos";

type YouTubePlaylistItem = {
  id?: string;
  snippet?: {
    title?: string;
    channelTitle?: string;
    videoOwnerChannelTitle?: string;
    description?: string;
    thumbnails?: { high?: { url?: string }; medium?: { url?: string }; default?: { url?: string } };
    resourceId?: { videoId?: string };
  };
};

type YouTubeVideo = {
  id?: string;
  snippet?: {
    channelTitle?: string;
    description?: string;
    thumbnails?: { high?: { url?: string }; medium?: { url?: string }; default?: { url?: string } };
  };
  contentDetails?: { duration?: string };
};

type YouTubeResponse<T> = { items?: T[]; nextPageToken?: string };

async function fetchYouTube<T>(url: string, params: URLSearchParams) {
  const response = await fetch(`${url}?${params}`, { next: { revalidate: 300 } });
  const data = (await response.json()) as YouTubeResponse<T> & {
    error?: { errors?: Array<{ reason?: string }>; message?: string };
  };
  if (!response.ok) {
    const reason = data.error?.errors?.[0]?.reason ?? data.error?.message ?? "YouTube request failed";
    throw new Error(reason);
  }
  return data;
}

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const playlistId = process.env.YOUTUBE_PLAYLIST_ID;

  if (!apiKey || !playlistId) {
    return NextResponse.json({ error: "YouTube playlist is not configured" }, { status: 503 });
  }

  try {
    const items: YouTubePlaylistItem[] = [];
    let pageToken: string | undefined;

    do {
      const params = new URLSearchParams({
        part: "snippet",
        maxResults: "50",
        playlistId,
        key: apiKey,
      });
      if (pageToken) params.set("pageToken", pageToken);
      const page = await fetchYouTube<YouTubePlaylistItem>(YOUTUBE_API_URL, params);
      items.push(...(page.items ?? []));
      pageToken = page.nextPageToken;
    } while (pageToken);

    const basicTracks: Track[] = items.flatMap((item) => {
      const id = item.id;
      const title = item.snippet?.title;
      const videoId = item.snippet?.resourceId?.videoId;
      if (!id || !title || !videoId) return [];

      const thumbnailUrl =
        item.snippet?.thumbnails?.high?.url ??
        item.snippet?.thumbnails?.medium?.url ??
        item.snippet?.thumbnails?.default?.url;
      const description = item.snippet?.description;

      return [{
        id,
        title,
        artist: item.snippet?.videoOwnerChannelTitle ?? item.snippet?.channelTitle ?? "YouTube",
        videoId,
        ...(thumbnailUrl ? { thumbnailUrl } : {}),
        ...(description ? { description } : {}),
      }];
    });

    const details = new Map<string, YouTubeVideo>();
    for (let index = 0; index < basicTracks.length; index += 50) {
      const batch = basicTracks.slice(index, index + 50);
      const videoParams = new URLSearchParams({
        part: "snippet,contentDetails",
        id: batch.map((track) => track.videoId).join(","),
        key: apiKey,
      });
      const videoPage = await fetchYouTube<YouTubeVideo>(YOUTUBE_VIDEOS_URL, videoParams);
      for (const video of videoPage.items ?? []) {
        if (video.id) details.set(video.id, video);
      }
    }

    const tracks = basicTracks.map((track) => {
      const video = details.get(track.videoId);
      return {
        ...track,
        artist: video?.snippet?.channelTitle ?? track.artist,
        thumbnailUrl:
          video?.snippet?.thumbnails?.high?.url ??
          video?.snippet?.thumbnails?.medium?.url ??
          track.thumbnailUrl,
        description: video?.snippet?.description ?? track.description,
        duration: video?.contentDetails?.duration,
      };
    });

    return NextResponse.json({ tracks });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unable to load YouTube playlist";
    return NextResponse.json(
      {
        error: "Unable to load YouTube playlist",
        ...(process.env.NODE_ENV === "development" ? { details: reason } : {}),
      },
      { status: 502 }
    );
  }
}