---
name: ad-pacing
description: "Sets cut rhythm, hold lengths, and beat timing for Offerloop ad videos using patterns measured from Google's launch films. Use when building or revising any plans/*.plan.ts scene list, when the user says pacing feels off, too slow, too fast, or drags, when choosing scene durationSec values, or when deciding between cutting and morphing between beats."
---

# Ad Pacing

Cut rhythm and timing rules measured (via ffmpeg scene-detect) from Google's launch films in `public/assets/references/google/`.

## The three pacing grammars

Pick ONE grammar per video and commit. Google never mixes them mid-film — mixing reads as indecision.

### 1. Continuous morph (google-ai-mode-film.mp4, 97s)
- **Zero hard cuts in 97 seconds.** Beats change by gliding the camera across oversized UI, morphing one element into the next, or flipping the whole canvas (their single "cut" is a dark→light mode flip at 51s).
- Wall-clock beat length still ~4-8s; the *content* changes on rhythm even though the shot never ends.
- Use for: single-product story films, "Introducing X" reveals, premium feel.
- Remotion: one long scene (or crossfaded scenes with matched backgrounds) driving pan/scale interpolations over a large UI canvas; avoid `transitionIn` cuts entirely.

### 2. Anthem montage (google-gemini-era-anthem.mp4, 60s)
- Cut every **1.5–5s**, steady, for the whole film.
- Cold open is the exception: **2–3s near-silent hold** on one iconic asset, then a rapid transformation cluster (**8 cuts in ~1.1s**) as the music slams in.
- Every shot is a complete micro-story (see beat anatomy below) — no shot exists just as filler.
- Use for: brand-level ads, TrueView-style masters, energy.

### 3. Chaptered demo (google-nano-banana-demo.mp4, 81s)
- Cold open: **~2s output montage, 8 cuts in 2s** — the coolest results first, before a word is spoken.
- Then holds of **4–13s**, cutting only at chapter boundaries (one product surface per chapter).
- Within a chapter the screen recording runs continuous — the VO carries pace, not the edit.
- Use for: explainers, walkthroughs, presenter-led videos.

## Beat anatomy (all grammars)

Each product beat plays the full loop, compressed to fit the slot:

1. **Prompt** — query typed with cursor, or spoken (0.5–2s)
2. **Thinking** — "Searching…" / "Thinking about this…" held as a real dramatic beat (~1s). Do not skip it; the pause makes the result land.
3. **Result** — the artifact appears and holds long enough to read its headline
4. **Label** — an overlay line names what just happened

## Openers and closers

- Open on magic, not setup: output montage, silent iconic asset, or an oversized question. Name the product inside the first 8s ("Introducing AI Mode" appears by 0:08).
- The last 8–12% of runtime is the close: message/tagline → logo → **quiet hold**. Nano Banana holds the logo ~8s; Gemini era gives it 3s of near-silence. Never end on a busy frame.

## Music coupling

- Continuous morph → one long crescendo (hushed open, peak at ~85–90% of runtime).
- Anthem → music at full energy by second 5, hard drop before the end card.
- Demo → steady VO bed; music fades ~10s before video ends.
- Details in [ad-sound](../ad-sound/SKILL.md).

## Anti-patterns

- Even 3s-per-scene metronome pacing — vary holds; give reveals more air than transitions.
- Cutting during a "thinking" beat — the pause IS the beat.
- Ending the moment the last scene finishes — always leave the quiet logo hold.
- Crossfading two bright full-screen UIs (double-exposes to mush — hard cut or match the backgrounds and morph).
