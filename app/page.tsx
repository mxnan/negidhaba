import DhabaHero from "@/components/hero/DhabaHero";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import TimeDisplay from "@/components/ui/TimeDisplay";
import OnlineCounter from "@/components/ui/OnlineCounter";
import SocialLinks from "@/components/ui/SocialLinks";
import MusicPlayer from "@/components/music/MusicPlayer";
import YouTubePlayer from "@/components/music/YouTubePlayer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50 text-foreground">
      <NoiseOverlay />
      <header className="fixed top-4 left-0 right-0 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <TimeDisplay />
          <OnlineCounter />
        </div>
        <SocialLinks />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center">
        <DhabaHero />
      </main>

      <YouTubePlayer />
      <MusicPlayer />
    </div>
  );
}
