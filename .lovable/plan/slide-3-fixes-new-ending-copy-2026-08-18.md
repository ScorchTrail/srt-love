# Slide 3 fixes + new ending copy

## 1. Keep the runaway "No" button on screen

- Clamp the teleport target to the actual viewport using the button's measured size, so it can never land partly off-screen (currently it can drift past the right/bottom edge on some presses).
- Add a safety inset (about 16px plus mobile safe-area) so it always stays fully visible.
- Keep it above everything with a high z-index while it's fleeing.
- Reserve its original space in the layout (an invisible placeholder of the same size) so the card doesn't reflow or jump when the button goes loose.

## 2. "I'm not sure" — 25 rotating replies

- Replace the 4 canned errors with 25 unique, flirty-but-never-mean lines, some with emoji.
- Keep the terminal-error styling and keep the strike numbering visible: `STRIKE 1/3`, `2/3`, `3/3`, then it keeps counting past three (e.g. `STRIKE 4/3 — the counter gave up, I didn't`) all the way to 25.
- Lines are shuffled once per session so repeats don't feel scripted, and none repeat until all 25 are used.
- After the 25th press, the "I'm not sure" button disappears entirely, leaving only "Yes, I'm ready" and the uncatchable "No", with a small stamped caption noting the module ran out of excuses.

## 3. Slide 5 — new final message

Rewrite the reveal copy to:

- Congratulate her on being ready for the prophecy — ready to save the world and defuse the bomb.
- State the date happens **regardless of the picked date, at 6:30 PM**.
- Ticket stub becomes: no movie — we're just playing the game, us talking too much, and nobody dies.

Chosen date still shown on the stub, with the 6:30 PM time called out.

## Technical notes

- `src/components/scrap/RunawayNo.tsx`: clamp math against `window.innerWidth/innerHeight` minus measured rect, add `z-[60]`, render a same-size invisible spacer when fixed.
- `src/routes/index.tsx`: `NOT_SURE_LINES` array of 25 strings + shuffled index state; strike label derived from press count; conditional render of the button past 25; updated slide 5 copy and ticket list.
- No backend or design-token changes.
