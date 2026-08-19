import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tape({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute h-7 w-28 rotate-[-6deg] bg-tape/70 opacity-80 shadow-sm",
        className,
      )}
      style={{
        maskImage:
          "repeating-linear-gradient(90deg, black 0 6px, transparent 6px 7px), linear-gradient(black, black)",
        maskComposite: "intersect",
      }}
    />
  );
}

export function ScrapCard({
  children,
  className,
  tilt = -1.2,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
}) {
  return (
    <div
      className={cn(
        "relative w-full max-w-2xl paper-grain torn-edge px-6 py-10 shadow-[0_18px_40px_-18px_color-mix(in_oklab,var(--ink)_45%,transparent)] sm:px-10 sm:py-12",
        className,
      )}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <Tape className="-top-2 left-6 sm:left-10" />
      <Tape className="-top-3 right-8 rotate-[7deg]" />
      <div className="relative">{children}</div>
    </div>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="manual-type text-[11px] text-muted-foreground sm:text-xs">{children}</p>;
}
