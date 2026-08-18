import DhabaHero from "@/components/hero/DhabaHero";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import TimeDisplay from "@/components/ui/TimeDisplay";
import OnlineCounter from "@/components/ui/OnlineCounter";
import SocialLinks from "@/components/ui/SocialLinks";
import MusicPlayer from "@/components/music/MusicPlayer";
import YouTubePlayer from "@/components/music/YouTubePlayer";

export default function Home() {
  return (
    <div className="min-h-screen relative bg-amber-50">
      <NoiseOverlay />
      <header className="fixed my-4 top-4 left-0 right-0 max-w-3xl mx-auto flex items-center justify-between px-4 z-10">
        <div className="flex items-center gap-4 text-zinc-700">
          <TimeDisplay />
          <OnlineCounter />
        </div>
        <SocialLinks />
      </header>

      <main className="absolute inset-0 flex flex-col items-center justify-center">
        <DhabaHero />
      </main>

      <YouTubePlayer />
      <MusicPlayer />
    </div>
  );
}
