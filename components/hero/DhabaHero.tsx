import Image from "next/image";

export default function DhabaHero() {
  return (
    <div className="">
      <div className="max-w-3xl z-10 relative text-center px-4">
        <h1 className="text-6xl md:text-8xl font-serif leading-tight text-amber-800 drop-shadow-sm">
          नेगी.fm
        </h1>
        <div className="mt-3 text-xl ">
          Classic Garhwali Bangers
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 z-5">
        <Image
          src="/images/bg-img.png"
          alt="negidhaba background"
          fill
          
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
    </div>
  );
}
