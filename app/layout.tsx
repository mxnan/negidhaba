import type { Metadata } from "next";
import { Geist_Mono, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const devanagari = Noto_Serif_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const socialImage = siteUrl
  ? new URL("/images/bg.jpg", siteUrl).toString()
  : undefined;

export const metadata: Metadata = {
  title: "नेगी ढाबा — Classic Garhwali Bangers",
  description:
    "A nostalgic digital dhaba playing classic Garhwali songs from the mountains.",
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  openGraph: {
    type: "website",
    title: "नेगी ढाबा — Classic Garhwali Bangers",
    description:
      "A nostalgic digital dhaba playing classic Garhwali songs from the mountains.",
    siteName: "नेगी ढाबा",
    ...(socialImage
      ? {
          images: [
            {
              url: socialImage,
              width: 768,
              height: 1365,
              alt: "A mountain road through Garhwal with a colorful bus",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "नेगी ढाबा — Classic Garhwali Bangers",
    description:
      "A nostalgic digital dhaba playing classic Garhwali songs from the mountains.",
    ...(socialImage ? { images: [socialImage] } : {}),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={` ${geistMono.variable} ${devanagari.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
