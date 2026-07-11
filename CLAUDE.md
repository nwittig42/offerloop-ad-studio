# Offerloop Ad Studio

Prompt-driven ad-video pipeline. The user (Nick) prompts Claude in plain English; Claude orchestrates the Figma MCP (brand assets), the Higgsfield MCP (generated video/audio/images), local screen recordings, and Remotion (composition + rendering). Design spec: `docs/superpowers/specs/2026-07-10-offerloop-ad-pipeline-design.md`.

## What we're producing

1. **TrueViewAd** — 60–90s YouTube product ad, 1920×1080 (build first).
2. **Explainer** — 2–5 min product walkthrough, 1920×1080.
3. **Cutdowns** — 9:16 / 4:5 / 1:1 short ads derived from master scenes for Meta Reels/feed and Shorts.

Content mix: real Offerloop screen recordings as the core, Higgsfield-generated hooks/b-roll/voiceover, Figma-sourced brand styling.

## Layout

- `brand/theme.ts` — colors/fonts/logo synced from Figma. Source of truth: file `mzL5XPw3VFciHDs6RG7SAb`, design-system page node `1418:2135`. Palette: background `#F5F6F8`, primary `#4A60A8`, secondaryLight `#B6C3E8`, secondaryDark `#1E2D4D`. Accent is "TBD" in Figma → aliased to primary.
- `public/assets/recordings/` — Nick's screen recordings (he drops these in).
- `public/assets/references/` — style-reference mp4s (analyze frames with ffmpeg to study pacing/captions/hooks; never used as footage).
- `public/assets/generated/` — every Higgsfield output. Descriptive kebab-case filenames.
- `public/assets/figma/` — assets exported from Figma (logo, illustrations, end-card art).
- `public/assets/manifest.json` — one entry per asset: filename, kind, description, duration (ffprobe), source (dropped/higgsfield/figma), and for generations the prompt + model used. Keep it current; edit planning relies on it instead of rewatching footage.
- `plans/<video>.script.md` + `plans/<video>.plan.ts` — per-video script and typed scene list. Compositions in `src/compositions/` are generic players of plan files (placeholder `Welcome.tsx` until the plan system is built).
- `out/` — rendered mp4s (gitignored, as is `public/assets/` except the manifest).

## Workflows

**Preview:** `npm run studio` → Remotion Studio at http://localhost:3000. Assets panel shows `public/`. Nick usually keeps Studio open in the browser while prompting.

**Higgsfield generation loop:** on request (e.g. "make a 5s hook shot of ..."), call `generate_video`/`generate_audio`/`generate_image` (use `models_explore` action:'recommend' when unsure of model), poll `job_status`, download the result into `public/assets/generated/`, add a manifest entry with the prompt, and tell Nick it's visible in the Studio assets panel. Report failures with the job ID. Voiceover: `list_voices`/`create_voice` then `generate_audio`.

**Figma sync:** "re-sync brand from Figma" → re-read the design-system page, update `brand/theme.ts`, re-export logo/illustrations via `download_assets` into `public/assets/figma/` (URLs are short-lived — download immediately).

**New video:** write `plans/<name>.script.md` (hook, beats, VO lines, CTA) → get Nick's approval → build `plans/<name>.plan.ts` → register/point a composition at it → iterate in Studio → `npx remotion render <CompositionId>`.

**Cutdowns:** new plan file cherry-picking scenes from a master plan, rendered at the vertical/feed/square compositions. Higgsfield video-analysis may suggest the strongest moments; Remotion always does the final render (free re-renders, brand control).

## Conventions

- Renders are local and free — iterate in Remotion; spend Higgsfield credits only on new source material, not on edits.
- Validate that every asset a plan references exists before rendering.
- Commit plans/code/manifest after meaningful steps; never commit media.

## State (2026-07-10, evening)

Edit-plan system built: `src/plan/` (schema in `types.ts`, duration helpers, asset validator wired into `calculateMetadata` — missing assets fail at Studio load), generic `PlanPlayer` composition plays any plan, components `Captions`/`HookText`/`LowerThird`/`EndCard` adapt to aspect ratio. All five composition slots currently play `plans/demo.plan.ts`. Figma sync done: scout illustrations + mountain backgrounds + wordmark SVG in `public/assets/figma/`, recorded in the manifest; theme has real typography (Lora headings, Google Sans Flex body — proprietary, Inter fallback — Libre Baskerville wordmark) and the primary 50–800 ramp. **No standalone logo exists in the Figma file** (the badge frame says "feel free to add logo!") — `offerloop-wordmark.svg` is the "Offerloop" text vectorized from the Scout badge; swap when a real logo lands. Fonts load via `@remotion/google-fonts` in `src/fonts.ts`. Next: script + build the TrueView ad (needs Nick's screen recordings and approved script). Higgsfield account: Ultra plan, 3000 credits as of last check.
