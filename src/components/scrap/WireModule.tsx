import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Kicker } from "./ScrapCard";

type Wire = { id: number; color: "red" | "blue" | "yellow" | "white"; cut: boolean };

const COLOR_CLASS: Record<Wire["color"], string> = {
  red: "bg-wire-red",
  blue: "bg-wire-blue",
  yellow: "bg-wire-yellow",
  white: "bg-wire-white",
};

const HINTS = [
  "Strike. The manual says READ the manual.",
  "Strike two. Deep breath. Count the red ones.",
  "Strike three. (The timer is fake, take your time.)",
  "Okay this bomb is just flirting with you at this point.",
];

export function WireModule({ onDefused }: { onDefused: () => void }) {
  // Fixed puzzle: exactly one red wire -> cut the last wire.
  const [wires, setWires] = useState<Wire[]>(() => [
    { id: 0, color: "blue", cut: false },
    { id: 1, color: "red", cut: false },
    { id: 2, color: "white", cut: false },
    { id: 3, color: "yellow", cut: false },
  ]);
  const [strikes, setStrikes] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [seconds, setSeconds] = useState(180);

  const correctId = useMemo(() => wires[wires.length - 1]!.id, [wires]);

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setSeconds((s) => (s <= 1 ? 60 : s - 1)), 1000);
    return () => clearInterval(t);
  }, [done]);

  const cut = (wire: Wire) => {
    if (done || wire.cut) return;
    setWires((ws) => ws.map((w) => (w.id === wire.id ? { ...w, cut: true } : w)));
    if (wire.id === correctId) {
      setDone(true);
      setStatus("DEFUSED. The prophecy is void. 💗");
      setTimeout(onDefused, 1400);
    } else {
      const next = Math.min(strikes, HINTS.length - 1);
      setStatus(HINTS[next]!);
      setStrikes((s) => s + 1);
    }
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="w-full">
      <div className="mb-5 flex items-center justify-between gap-3">
        <Kicker>Module 01 — Simple Wires</Kicker>
        <span
          className={`manual-type rounded-md px-3 py-1 text-sm tabular-nums ${
            done ? "bg-mint/25 text-foreground" : "bg-ink/85 text-paper"
          }`}
        >
          {done ? "SAFE" : `${mm}:${ss}`}
        </span>
      </div>

      <div className="rounded-xl border-2 border-dashed border-border bg-card/70 p-4 sm:p-5">
        <p className="manual-type mb-2 text-[10px] text-muted-foreground">The Manual — Sec. 1</p>
        <p className="font-mono text-sm leading-relaxed text-foreground sm:text-base">
          If there is exactly <span className="text-wire-red">one red wire</span>, cut the{" "}
          <strong>last</strong> wire.
          <br />
          Otherwise, cut the second wire. (There is exactly one red wire. Just saying.)
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {wires.map((w, i) => (
          <button
            key={w.id}
            type="button"
            onClick={() => cut(w)}
            disabled={w.cut || done}
            className="group flex w-full items-center gap-3 rounded-lg px-1 py-2 text-left disabled:cursor-default"
          >
            <span className="manual-type w-6 shrink-0 text-xs text-muted-foreground">{i + 1}</span>
            <span className="relative h-4 flex-1 overflow-hidden rounded-full bg-muted">
              <motion.span
                className={`absolute inset-y-0 left-0 rounded-full ${COLOR_CLASS[w.color]} shadow-inner`}
                animate={{ width: w.cut ? "38%" : "100%" }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              />
              {w.cut && (
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "38%" }}
                  className={`absolute inset-y-0 right-0 rounded-full ${COLOR_CLASS[w.color]}`}
                />
              )}
              {!w.cut && (
                <span className="absolute inset-0 rounded-full opacity-0 transition-opacity group-hover:opacity-100 ring-2 ring-ring" />
              )}
            </span>
            <span className="manual-type w-14 shrink-0 text-right text-[10px] text-muted-foreground">
              {w.cut ? "cut" : "snip"}
            </span>
          </button>
        ))}
      </div>

      {status && (
        <motion.p
          key={status}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 rounded-lg px-4 py-3 text-center font-mono text-sm ${
            done ? "bg-mint/20 text-foreground" : "bg-destructive/12 text-destructive"
          }`}
        >
          {status}
        </motion.p>
      )}

      {strikes > 0 && !done && (
        <p className="manual-type mt-3 text-center text-[10px] text-muted-foreground">
          Strikes: {strikes} · consequences: none
        </p>
      )}
    </div>
  );
}
