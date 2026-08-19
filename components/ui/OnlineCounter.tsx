"use client";

import { useEffect, useState } from "react";

const MIN_ONLINE = 15;
const MAX_ONLINE = 45;

function getRandomOnlineCount() {
  return Math.floor(Math.random() * (MAX_ONLINE - MIN_ONLINE + 1)) + MIN_ONLINE;
}

export default function OnlineCounter() {
  const [onlineCount, setOnlineCount] = useState(34);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setOnlineCount(getRandomOnlineCount());
      setIsUpdating(true);

      window.setTimeout(() => setIsUpdating(false), 700);
    }, 8000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      aria-label={`${onlineCount} people online`}
      className={`inline-flex items-center gap-2 rounded-full border border-background/35 bg-deep-maroon/35 px-3 py-1 text-sm font-medium tracking-wide text-background shadow-sm backdrop-blur-sm transition-all duration-500 ${isUpdating ? "scale-[1.03]" : "scale-100"}`}
      role="status"
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span
          className={`absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75 ${isUpdating ? "animate-ping" : ""}`}
        />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
      </span>
      <span className="tabular-nums">{onlineCount}</span>
      <span className="text-background/75">online</span>
    </div>
  );
}
