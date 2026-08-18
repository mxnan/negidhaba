import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const devanagari = Noto_Serif_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
});

export const metadata: Metadata = {
  title: "नेगी ढाबा — Classic Garhwali Bangers",
  description: "A nostalgic digital dhaba playing classic Garhwali songs from the mountains.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${geistSans.variable} ${geistMono.variable} ${devanagari.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
