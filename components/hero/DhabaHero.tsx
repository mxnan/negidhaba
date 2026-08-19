"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const contentVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delayChildren: 0.15, staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 18 },
  },
};

export default function DhabaHero() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative isolate flex h-full w-full flex-col items-center justify-center overflow-hidden bg-deep-maroon">
      <motion.div
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-b from-deep-maroon/20 via-deep-maroon/52 via-72% to-deep-maroon/72"
      />
      <motion.div
        variants={contentVariants}
        initial={reducedMotion ? false : "hidden"}
        animate="visible"
        className="relative z-10 max-w-3xl px-6 text-center text-background"
      >
        <motion.div variants={itemVariants} className="mb-8 text-xs font-semibold uppercase tracking-[0.32em] text-background">
          Pahadi radio from the mountains
        </motion.div>
        <motion.h1 variants={itemVariants} className="font-display text-6xl font-semibold leading-none text-background md:text-8xl">
          नेगी.fm
        </motion.h1>
        <motion.div variants={itemVariants} className="mx-auto mt-5 max-w-md text-base font-medium tracking-wide text-background/90 md:text-xl">
          Classic Garhwali Bangers from the mountains, streaming 24/7.
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8 hidden grid-cols-2 gap-x-4 gap-y-2 text-sm font-medium text-background/80 sm:grid sm:grid-cols-4">
          <span><kbd>Space</kbd> play/pause</span>
          <span><kbd>← →</kbd> seek 5s</span>
          <span><kbd>↑ ↓</kbd> volume</span>
          <span><kbd>N / P</kbd> next/previous</span>
        </motion.div>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-deep-maroon via-deep-maroon/80 to-deep-maroon/90" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-deep-maroon/40 via-deep-maroon/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-deep-maroon/40 via-deep-maroon/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-deep-maroon/40 via-deep-maroon/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-deep-maroon/40 via-deep-maroon/20 to-transparent" />
  
      <picture className="pointer-events-none absolute inset-0 -z-10">
        <source media="(max-width: 767px)" srcSet="/images/bg-mobile.png" />
        <Image
          src="/images/bg.jpg"
          alt="negidhaba background"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      </picture>
    </div>
  );
}
