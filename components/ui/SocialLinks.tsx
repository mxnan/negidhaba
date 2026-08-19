"use client";
import { YOUTUBEPLAYLIST_URL } from "@/lib/config";
import { motion } from "motion/react";

export default function SocialLinks() {
  return (
    <div className="flex gap-3 items-center text-sm">
      <motion.a
        href={YOUTUBEPLAYLIST_URL}
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="rounded-full bg-gradient-to-r from-deep-maroon via-burnt-orange to-mustard px-4 py-2 font-semibold text-background shadow-md transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-mustard focus:ring-offset-2"
      >
        Get Playlist 🎶
      </motion.a>
    </div>
  );
}
