"use client";
import { useEffect, useState } from "react";
import { SIMULATED_ONLINE } from "@/lib/config";

// export default function OnlineCounter() {
//   // start as null so server and client markup match; populate only on client
//   const [n, setN] = useState<number | null>(null);
//   useEffect(() => {
//     // set initial value after mount
//     setN(SIMULATED_ONLINE());
//     const id = setInterval(() => setN(SIMULATED_ONLINE()), 15000);
//     return () => clearInterval(id);
//   }, []);

//   return <div className="text-sm opacity-90">{n === null ? "— online" : `${n} online`}</div>;
// }

export default function OnlineCounter() {

    return <div className="text-sm opacity-90">34</div>;
}