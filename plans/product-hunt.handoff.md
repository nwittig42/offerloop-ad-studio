# Handoff: Product Hunt launch film, cinematic build

Paste this into a fresh Claude Code chat opened in `/Users/nicholaswittig/Desktop/offerloop-ad-studio`.

---

You are picking up the **Offerloop Product Hunt launch film**. Read `CLAUDE.md` first for the studio pipeline (Remotion + manifest + plan system), then read the approved script at `plans/product-hunt.script.md`. That script is the source of truth for beats, timing, on-screen text, and the data spine. Do not rewrite it without asking Nick.

**Invoke these project skills before you start:** `ad-story-structure`, `ad-lighting`, `ad-pacing`, `ad-typography`, `no-em-dashes`. They govern the look, cut rhythm, and copy.

## The goal

A ~50s silent, text-driven launch film. Nick has recorded live product footage for the capability run. **Your job is to make these recordings cinematic and cut them into the film.** Nick's words: he wants the tilt / zoom / push-in / glow treatment (like the existing `offerloop-ui-*-cinematic-*.mp4` clips and the App Store panels' -8/+6 degree tilt), but with these crisp real recordings underneath instead of Higgsfield remakes. Record footage was captured flat on purpose; **all cinematic motion is added in Remotion** (3D tilt, slow push-in, parallax, drop shadow, brand-canvas glow, kinetic type over/beside the panel). Keep the UI razor sharp and the text real.

## The footage (on Nick's Desktop, all 1736x1080 @ 60fps)

Move these into `public/assets/recordings/`, then ffprobe, pull frames to find the strongest moment + timestamps, and add a manifest entry each (source: dropped).

| File | Dur | Script beat | Notes |
|---|---|---|---|
| `~/Desktop/Theturn.mp4` | 8.9s | 0:12 The turn | dashboard + typing the request |
| `~/Desktop/Applytojobs.mp4` | 11.6s | run #1 Apply to jobs | ends on applied state |
| `~/Desktop/Findpeopleatcompanies.mp4` | 18.5s | run #2 Find people | **outreach/draft is shown inside this clip too**, so it also covers the "email recruiters" receipt |
| `~/Desktop/Reachthehiringmanager.mp4` | 21.7s | run #3 Reach hiring manager | longest, pick the tightest window |
| `~/Desktop/Writethecoverletter.mp4` | 2.75s | run #5 Cover letter | **very short, may need a hold/slow-mo or a re-record** |
| `~/Desktop/Prepforcoffeechat.mp4` | 5.5s | run #7 Prep for meeting | ends on "why you two connect" |
| `~/Desktop/Trackeverything.mp4` | 5.2s | run #8 Track everything | tracker grid |

## Gaps to resolve with Nick before locking the run

The script had 8 capabilities. Reality of the footage:
- **Research the company (run #4): NO footage.** Pull from the 243s Loom (`Offerloop Pricing Student Plans... 13 July 2026.mp4`), rebuild as a Remotion mock, or cut it.
- **Tailor resume (run #6): dropped.** Nick: the feature was not working and is not important. Cut it from the run.
- **Outreach draft/send:** folded into `Findpeopleatcompanies.mp4`, no separate clip needed.

Net: the capability run is likely **6 beats** (Apply, Find people + outreach, Reach hiring manager, Cover letter, Prep, Track), optionally 7 if Research is recovered. Confirm the final count and order with Nick, then update `plans/product-hunt.script.md` to match before building the plan.

## Build steps

1. Move + probe + frame-scan + manifest all 7 clips (per `CLAUDE.md` intake workflow).
2. Resolve the run count with Nick (above).
3. Build `plans/product-hunt.plan.ts` against the plan schema in `src/plan/` (see `types.ts`, the duration helpers, and the asset validator wired into `calculateMetadata`). Reuse existing components (`Captions`, `HookText`, `LowerThird`, `EndCard`) and the brand canvas.
4. Author the cinematic treatment: each recording sits in a floating browser/device frame, tilted (-8 / +6 alternating), slow push-in, soft drop shadow, brand-canvas glow behind it, kinetic on-screen line per the script. 60fps sources give smooth motion. Because clips are 1736x1080 (not full 16:9), float them as panels, do not full-bleed.
5. Build the framing beats in Remotion on the brand canvas (hook, the reach-free capability run, instant payoff, close). The grind/empty-inbox pain beats can reuse `Google Chrome.mp4`.
6. Register/point a composition at the plan, iterate in Remotion Studio (`npm run studio`), then `npx remotion render`.

## Brand tokens (from brand/theme.ts)

Canvas `#F5F6F8`, ink `#112F54`, primary `#4A60A8`, secondaryLight `#B6C3E8`, secondaryDark `#1E2D4D`, product-UI blue `#3E63F2`, live-agent green `#1F9D55`. Headlines Lora Bold, body Google Sans Flex (Inter fallback), wordmark Libre Baskerville. Mountain ridge + Scout orb assets are in `public/assets/figma/`. Fonts load via `src/fonts.ts`.

## Open items for Nick (carry these)

- Confirm the three numbers are accurate before final render: 500,000 jobs, 2.2 billion professionals (our database), 3 million recruiters.
- Confirm **Stripe** as the hero company (must be consistent across clips).
- Decide Research-company: recover or cut.
- The cover-letter clip is 2.75s: hold/slow-mo or re-record?

## Rules

- No em dashes in any viewer-facing copy (invoke `no-em-dashes`, grep before committing).
- Real artifacts only, no invented metrics. Receipts, not claims.
- Renders are local and free. Iterate in Remotion; do not spend Higgsfield credits on edits.
- Commit plans/code/manifest after meaningful steps; never commit media.
