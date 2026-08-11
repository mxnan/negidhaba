This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Negidhaba

This repository contains the Negidhaba single-page experience: a nostalgic illustrated dhaba with a YouTube-powered music player.

Key points:
- Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS, Zustand for state
- Music playback: YouTube IFrame Player API used as an audio engine (hidden iframe). See `components/music/YouTubePlayer.tsx` and `lib/music/youtube.ts`.
- Playlist: `lib/music/playlist.ts`

Adding songs: edit `lib/music/playlist.ts` and add entries with `videoId`.

Background illustration: replace `public/images/negidhaba-bg.svg` with a richer `negidhaba-bg.webp` or `svg` of your choice.

Local dev:
```bash
pnpm install
pnpm dev
```


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
