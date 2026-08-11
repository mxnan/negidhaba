import { SPOTIFY_URL, YOUTUBEMUSIC_URL } from "@/lib/config";

export default function SocialLinks() {
  return (
    <div className="flex gap-3 items-center text-sm opacity-90">
      <a href={SPOTIFY_URL} target="_blank" rel="noreferrer" className="underline">Spotify</a>
      <a href={YOUTUBEMUSIC_URL} target="_blank" rel="noreferrer" className="underline">YouTube Music</a>
    </div>
  );
}
