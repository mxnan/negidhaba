"use client";
import { useEffect, useState } from "react";

export default function TimeDisplay() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  // Use a deterministic 24-hour format to avoid server/client locale mismatches during hydration
  return (
    <div className="font-mono text-sm text-background">
      {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}
    </div>
  );
}
