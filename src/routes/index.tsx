import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { format } from "date-fns";
import { CalendarIcon, HeartCrack, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrapCard, Kicker } from "@/components/scrap/ScrapCard";
import { RunawayNo } from "@/components/scrap/RunawayNo";
import { WireModule } from "@/components/scrap/WireModule";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Question for My Vero" },
      {
        name: "description",
        content:
          "A pink little scrapbook with one bomb, one prophecy, and one very important date question.",
      },
      { property: "og:title", content: "A Question for My Vero" },
      {
        property: "og:description",
        content: "There's a prophecy, a bomb, and a date to pick. No pressure.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Index,
});

const NOT_SURE_LINES = [
  "INDECISION DETECTED. The bomb is patient. I'm... slightly less patient 💗",
  "Scanned your answer. Result: 'maybe'. Not a valid wire color.",
  "The manual has no page for 'not sure'. It does have a page for 'Yes'.",
  "Module reset. Weirdly, the only button that works is still 'Yes' 🙂",
  "404 — 'maybe' not found. Try the pink one.",
  "Hmm. My hands are shaking and it's not the bomb 😅",
  "Recalculating... you're still cute. Recalculation complete.",
  "The prophecy consulted itself and said 'she'll say yes eventually'.",
  "Uncertainty levels: adorable. Threat levels: zero.",
  "I asked the timer for advice. It said 'ask her again' ⏱️",
  "Warning: excessive charm detected in the vicinity of this button.",
  "Defusal delayed. Butterflies rerouted to my stomach 🦋",
  "The wires are fine. It's my heartbeat that's flatlining, love 💘",
  "Still not sure? Okay. I'll wait. I'm very good at waiting.",
  "Manual, Sec. 7: 'If the subject hesitates, be endearing.' Doing my best.",
  "Bomb squad on hold. They're rooting for us, by the way.",
  "Your indecision has been logged, laminated, and put in a scrapbook 📔",
  "System note: this button does nothing. It just likes your attention.",
  "I ran the numbers. The numbers blushed.",
  "Beep. Boop. Please press the button that makes me smile 😊",
  "The bomb asked if we're official yet. I said 'working on it'.",
  "Countdown paused for emotional reasons.",
  "If you press this one more time I'm adding a heart doodle. Fair warning 💗",
  "That's a lot of 'not sure'. Good thing I'm a lot of 'very sure'.",
  "Final excuse used. The button is retiring. Yes is right there, cutie 💞",
];

const slideVariants = {
  enter: { opacity: 0, y: 26, rotate: 1.5 },
  center: { opacity: 1, y: 0, rotate: 0 },
  exit: { opacity: 0, y: -26, rotate: -1.5 },
};

function Index() {
  const [step, setStep] = useState(0);
  const [crushAnswer, setCrushAnswer] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [notSure, setNotSure] = useState(0);
  const [order, setOrder] = useState<number[]>(() => NOT_SURE_LINES.map((_, i) => i));

  // shuffle once on the client so repeats don't feel scripted (last line stays last)
  useEffect(() => {
    const head = NOT_SURE_LINES.map((_, i) => i).slice(0, -1);
    for (let i = head.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [head[i], head[j]] = [head[j]!, head[i]!];
    }
    setOrder([...head, NOT_SURE_LINES.length - 1]);
  }, []);

  const go = (n: number) => setStep(n);

  return (
    <TooltipProvider delayDuration={150}>
      <Toaster position="top-center" />
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden px-4 py-12">
        <p className="manual-type mb-6 text-[10px] text-muted-foreground sm:text-xs">
          Keep Talking · Nobody Explodes · Serial No. V3R0-1S-CUT3
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className="flex w-full justify-center"
          >
            {step === 0 && (
              <ScrapCard tilt={-1.4}>
                <Kicker>Slide 01 — The Confession</Kicker>
                <h1 className="handwriting mt-3 text-4xl leading-tight text-foreground sm:text-6xl">
                  Hey, I have something to tell you…
                </h1>
                <p className="mt-4 text-lg text-foreground/85 sm:text-xl">
                  I have a crush on you, My Vero. A big, embarrassing, doodle-hearts-in-the-margin
                  kind of crush.{" "}
                  <span className="handwriting text-2xl text-rose-deep">Do you?</span>
                </p>

                <div className="mt-8 flex flex-col gap-3">
                  <Button
                    size="lg"
                    className="rounded-full text-base"
                    onClick={() => {
                      setCrushAnswer("yes");
                      go(1);
                    }}
                  >
                    Yes 💗
                  </Button>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="rounded-full text-base whitespace-normal h-auto py-3"
                    onClick={() => {
                      setCrushAnswer("shy");
                      go(1);
                    }}
                  >
                    Yes, but I'm shy so I'm not telling you
                  </Button>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-block cursor-not-allowed">
                        <button
                          type="button"
                          disabled
                          aria-disabled
                          className="w-full cursor-not-allowed rounded-full border-2 border-dashed border-border bg-muted px-6 py-3 text-base font-semibold text-muted-foreground opacity-60"
                        >
                          No
                        </button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="manual-type text-[10px]">
                      Module disarmed
                    </TooltipContent>
                  </Tooltip>
                </div>
              </ScrapCard>
            )}

            {step === 1 && (
              <ScrapCard tilt={1.1}>
                <Kicker>Slide 02 — The Prophecy</Kicker>
                <h2 className="handwriting mt-3 text-4xl leading-tight text-foreground sm:text-5xl">
                  {crushAnswer === "shy" ? "Noted. Your secret is safe. Anyway—" : "Okay. Okay!"}
                </h2>
                <p className="mt-4 text-lg text-foreground/85">
                  I wanna take you out on a date, but there's an issue. I found a prophecy: on the
                  night of our next date, <strong>a bomb drops from the sky</strong>. The only way
                  through it is if we each defuse at least one.
                </p>
                <p className="handwriting mt-4 text-2xl text-rose-deep">
                  So… can you select the date of our doom?
                </p>

                <div className="mt-7">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="lg"
                        className={cn(
                          "w-full justify-start rounded-xl border-2 border-dashed text-left text-base",
                          !date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon />
                        {date ? format(date, "EEEE, MMMM d, yyyy") : "Pick the date of our doom"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={{ before: new Date() }}
                        autoFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>

                  <Button
                    size="lg"
                    disabled={!date}
                    className="mt-4 w-full rounded-full text-base"
                    onClick={() => go(2)}
                  >
                    {date ? "Lock in the doom date" : "Select a date first"}
                  </Button>
                </div>
              </ScrapCard>
            )}

            {step === 2 && (
              <ScrapCard tilt={-0.8}>
                <Kicker>Slide 03 — Point of No Return</Kicker>
                <h2 className="handwriting mt-3 text-4xl leading-tight text-foreground sm:text-5xl">
                  There's no going back.
                </h2>
                <p className="mt-4 text-lg text-foreground/85">
                  {date ? format(date, "MMMM d") : "That night"} is officially circled in red. Are
                  you sure about this date… and are you <em>ready</em>?
                </p>

                <div className="mt-8 flex flex-col gap-3">
                  <Button size="lg" className="rounded-full text-base" onClick={() => go(3)}>
                    Yes, I'm ready
                  </Button>
                  {notSure < NOT_SURE_LINES.length && (
                    <Button
                      size="lg"
                      variant="secondary"
                      className="rounded-full text-base"
                      onClick={() => {
                        const line = NOT_SURE_LINES[order[notSure]!]!;
                        const n = notSure + 1;
                        const label =
                          n <= 3
                            ? `STRIKE ${n}/3`
                            : `STRIKE ${n}/3 — the counter gave up, I didn't`;
                        setNotSure(n);
                        toast.error(`ERROR: ${label}`, {
                          description: line,
                          className: "font-mono",
                          icon: <HeartCrack className="size-4" />,
                        });
                      }}
                    >
                      I'm not sure
                    </Button>
                  )}
                  <div className="flex justify-center pt-1">
                    <RunawayNo />
                  </div>
                </div>
                <p className="manual-type mt-6 text-center text-[10px] text-muted-foreground">
                  {notSure >= NOT_SURE_LINES.length
                    ? "Module out of excuses · 25/25 strikes · still not mad 💗"
                    : "Warning: one of these buttons is not load-bearing"}
                </p>
              </ScrapCard>
            )}

            {step === 3 && (
              <ScrapCard tilt={0.9}>
                <Kicker>Slide 04 — Your Bomb</Kicker>
                <h2 className="handwriting mt-3 text-4xl leading-tight text-foreground sm:text-5xl">
                  Your turn. Defuse it.
                </h2>
                <p className="mt-3 mb-6 text-base text-foreground/80">
                  I'll read the manual, you cut the wire. That's the whole relationship, honestly.
                </p>
                <WireModule onDefused={() => go(4)} />
              </ScrapCard>
            )}

            {step === 4 && (
              <ScrapCard tilt={-1.6}>
                <div className="text-center">
                  <Kicker>Slide 05 — Defused</Kicker>
                  <Sparkles className="mx-auto mt-4 size-10 text-rose" />
                  <h2 className="handwriting mt-2 text-5xl leading-tight text-foreground sm:text-6xl">
                    You're ready for the prophecy. 💗
                  </h2>
                  <p className="mt-4 text-lg text-foreground/85">
                    Be ready to save the world and defuse the bomb — whatever date you picked, we're
                    doing this at <strong>6:30 PM</strong>. Crush confirmed
                    {crushAnswer === "shy" ? " (silently, but confirmed)" : ""}.
                  </p>

                  <div className="mx-auto mt-8 max-w-sm rounded-xl border-2 border-dashed border-border bg-card/80 p-5 text-left">
                    <p className="manual-type text-[10px] text-muted-foreground">
                      Admit one · Online date · 6:30 PM
                    </p>
                    <p className="handwriting mt-2 text-3xl text-rose-deep">
                      {date ? format(date, "EEEE, MMMM d") : "A night soon"} — 6:30 PM
                    </p>
                    <ul className="mt-3 space-y-1 text-sm text-foreground/80">
                      <li>· No movie. We're just playing the game.</li>
                      <li>· Snacks on both sides of the screen</li>
                      <li>· Me talking way too much. And nobody dies.</li>
                      <li>· You, explaining nothing. Me, panicking politely.</li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setStep(0);
                      setDate(undefined);
                      setCrushAnswer(null);
                      setNotSure(0);
                    }}
                    className="manual-type mt-8 text-[10px] text-muted-foreground underline underline-offset-4 hover:text-foreground"
                  >
                    Replay from the top
                  </button>
                </div>
              </ScrapCard>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex gap-1.5" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 w-6 rounded-full transition-colors",
                i <= step ? "bg-rose" : "bg-border",
              )}
            />
          ))}
        </div>
      </main>
    </TooltipProvider>
  );
}
