export default function NoiseOverlay() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 mix-blend-overlay opacity-10">
      <svg width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <filter id="n"><feTurbulence baseFrequency="0.9" numOctaves="1" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#n)" opacity="0.04" fill="#000" />
      </svg>
    </div>
  );
}
