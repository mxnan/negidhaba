import Image from "next/image";

export default function DhabaHero() {
  return (
    <div className="relative isolate flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#24130f]">
      <div className="pointer-events-none absolute inset-0 z-1 bg-[linear-gradient(180deg,rgba(28,14,8,0.2),rgba(28,14,8,0.52)_72%,rgba(28,14,8,0.72))]" />
      <div className="relative z-10 max-w-3xl px-6 text-center text-white">
        <div className="mb-8 text-xs font-semibold uppercase tracking-[0.32em] text-amber-200/90">
          Pahadi radio from the mountains
        </div>
        <h1 className="font-serif text-6xl font-semibold leading-none text-amber-100 drop-shadow-[0_4px_16px_rgba(0,0,0,0.42)] md:text-8xl">
          नेगी.fm
        </h1>
        <div className="mx-auto mt-5 max-w-md text-base font-medium tracking-wide text-white/90 md:text-xl">
          Classic Garhwali Bangers from the mountains, streaming 24/7.
        </div>
 
      <div className="mt-8 flex items-center justify-center gap-4 text-sm font-medium text-white/80">
        <kbd className="rounded-md border border-amber-200/20 bg-[#3b1f1d]/90 px-2 py-1 text-xs font-semibold text-amber-100/80 shadow-[0_4px_16px_rgba(0,0,0,0.42)] backdrop-blur-sm">
          Space
        </kbd>
        <span>to play/pause</span>
      </div>
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#24130f] via-[#24130f]/80 to-[#24130f]/90" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#24130f]/40 via-[#24130f]/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#24130f]/40 via-[#24130f]/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#24130f]/40 via-[#24130f]/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-[#24130f]/40 via-[#24130f]/20 to-transparent" />
  
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/images/3.jpg"
          alt="negidhaba background"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      </div>
    </div>
  );
}
