import Image from "next/image";

export default function DhabaHero() {
  return (
    <div className="relative flex-1 flex items-center justify-center text-center px-6 py-12">
      <div className="max-w-3xl">
        <h1 className="text-6xl md:text-8xl font-serif leading-tight text-amber-800 drop-shadow-sm">नेगी ढाबा</h1>
        <div className="mt-3 text-xl text-zinc-800">Classic Garhwali Bangers</div>
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image src="/images/negidhaba-bg.svg" alt="negidhaba background" fill style={{ objectFit: 'cover' }} priority />
      </div>
    </div>
  );
}
