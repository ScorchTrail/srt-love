# For My Vero — A Bomb of a Date Proposal

A pink, whimsical, scrapbook-style single-page experience with light *Keep Talking and Nobody Explodes* nods. Fully responsive, slide-by-slide, ending in a mini defusal puzzle and a celebratory date reveal.

## The slides

**1 — The Confession**
Torn-paper card, washi tape, polaroid corners.
"Hey, I have something to tell you… I have a crush on you. Do you?"
- Yes
- Yes, but I'm shy so I'm not telling you
- No — permanently grayed out, `disabled`, cursor not-allowed, with a tooltip stamp: "MODULE DISARMED"

**2 — The Prophecy**
"I found a prophecy: on our next date, a bomb drops from the sky. To survive it, we each have to defuse at least one. Please select the date of our doom."
- Calendar picker (past dates blocked), styled as a scrapbook page from the manual
- Confirm button unlocks only once a date is chosen

**3 — Point of No Return**
"There's no going back. Are you sure about this date? Are you ready?"
- Yes → continue
- I'm not sure → red terminal-style error toast: "ERROR: INDECISION DETECTED — STRIKE 1/3" (strike counter increments, gets funnier each time)
- No → runaway button. On hover it looks perfectly normal (scale + shadow), but the instant a click/tap/pointer-down is attempted it teleports to a random spot on screen with a squishy spring animation and a cheeky caption swap ("nope", "too slow", "try again 🙃"). Works for touch too, so it can never actually be pressed.

**4 — Defuse the Bomb (mini-game)**
A simple KTANE-style wire module: four colored wires and a two-line "manual" rule card in monospace ("If there is exactly one red wire, cut the last wire…"). A countdown timer runs, but it's rigged — it never actually loses. Wrong cut = a strike + a playful hint; right cut = wires snap, sparks, module goes green.

**5 — The Reveal**
Confetti + hearts. "DEFUSED. 💗 It's a date." Shows the chosen date formatted nicely, plus a scrapbook ticket stub with the plan (online date, snacks, and the actual game as a joke option). Small "replay" link.

## Design direction

- Pink scrapbook: blush/rose paper backgrounds, subtle paper grain, torn edges, tape strips, slight rotations on cards, doodle hearts and hand-drawn arrows.
- Light manual nods: a monospace stamp typeface for captions and error text, a small bomb-timer chip in the corner, serial-number footer.
- Type pairing: a warm display/handwritten feel for headers, clean sans for body, monospace only for the "manual" bits.
- Motion: cards slide in with a paper flutter, buttons squish on press, runaway button uses a spring.
- Responsive: single-column stacked cards on mobile with large tap targets; the runaway button stays inside the viewport bounds on small screens.

## Technical notes

- Single route at `/` (`src/routes/index.tsx`) driving slide state; no backend needed — everything is client state.
- All colors added as semantic tokens in `src/styles.css` (paper, tape, ink, rose, danger) — no hardcoded color classes.
- Slide transitions and the runaway button with Motion for React; shadcn Calendar for the date picker (with `pointer-events-auto`), sonner for the error toasts.
- The "No" button uses pointer-down/touch-start interception, not just click, so mobile can't beat it.
- Route `head()` gets a private-ish title/description ("A question for My Vero") with og tags.
