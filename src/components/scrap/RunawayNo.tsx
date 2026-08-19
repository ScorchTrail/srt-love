import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";

const TAUNTS = [
  "No",
  "nope",
  "too slow",
  "missed me",
  "try again 🙃",
  "not today",
  "catch me",
  "still no?",
];

/**
 * Looks like a perfectly normal button (hover works), but it teleports the
 * instant a press is attempted — pointer, touch or keyboard.
 */
export function RunawayNo({ className }: { className?: string }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [taunt, setTaunt] = useState(0);
  const ref = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (el && !size) {
      const r = el.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
    }
  }, [size]);

  // after the taunt text changes the button can grow — re-clamp so it's never clipped
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !pos) return;
    const r = el.getBoundingClientRect();
    const pad = 24;
    const maxX = Math.max(pad, window.innerWidth - r.width - pad);
    const maxY = Math.max(pad, window.innerHeight - r.height - pad);
    const x = Math.min(Math.max(pos.x, pad), maxX);
    const y = Math.min(Math.max(pos.y, pad), maxY);
    if (Math.abs(x - pos.x) > 0.5 || Math.abs(y - pos.y) > 0.5) setPos({ x, y });
  }, [pos, taunt]);

  const flee = useCallback((e?: { preventDefault: () => void }) => {
    e?.preventDefault();
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pad = 24;
    const w = rect.width || 96;
    const h = rect.height || 48;
    const maxX = Math.max(pad, window.innerWidth - w - pad);
    const maxY = Math.max(pad, window.innerHeight - h - pad);
    const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

    let x = pad;
    let y = pad;
    for (let i = 0; i < 12; i++) {
      x = clamp(pad + Math.random() * (maxX - pad), pad, maxX);
      y = clamp(pad + Math.random() * (maxY - pad), pad, maxY);
      const dx = x - rect.left;
      const dy = y - rect.top;
      if (Math.hypot(dx, dy) > Math.min(220, window.innerWidth * 0.4)) break;
    }
    setSize({ w, h });
    setPos({ x, y });
    setTaunt((t) => (t + 1) % TAUNTS.length);
  }, []);

  const fixed = pos !== null;

  const button = (
    <motion.button
      ref={ref}
      type="button"
      aria-label="No"
      onPointerDown={flee}
      onTouchStart={flee}
      onMouseDown={flee}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") flee(e);
      }}
      onClick={(e) => e.preventDefault()}
      animate={fixed ? { left: pos.x, top: pos.y } : {}}
      transition={{ type: "spring", stiffness: 340, damping: 30, mass: 0.7 }}
      whileHover={{ scale: 1.04, rotate: -1 }}
      className={
        (fixed ? "fixed z-[60] " : "relative ") +
        "inline-flex items-center justify-center rounded-full border-2 border-border bg-card px-6 py-3 font-semibold text-foreground shadow-md transition-shadow hover:shadow-lg " +
        (className ?? "")
      }
      style={fixed ? { left: pos.x, top: pos.y, margin: 0 } : {}}
    >
      {TAUNTS[taunt]}
    </motion.button>
  );

  if (!fixed || typeof document === "undefined") return button;

  return (
    <>
      {/* keeps the layout from collapsing once the button goes loose */}
      <span
        aria-hidden
        className="inline-block"
        style={{ width: size?.w ?? 96, height: size?.h ?? 48 }}
      />
      {/* portal to body so animated/transformed ancestors can't offset `fixed` */}
      {createPortal(button, document.body)}
    </>
  );
}
