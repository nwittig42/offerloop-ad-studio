# Offerloop Ad Studio — Design Spec

**Date:** 2026-07-10
**Status:** Approved pending user review
**Goal:** A prompt-driven ad-video production pipeline in Claude Code that combines the Figma MCP (brand assets), the Higgsfield MCP (generated footage, voiceover, music), user-supplied screen recordings, and Remotion (composition + rendering) to produce Offerloop video ads.

## What we're building

A single Remotion project at `~/Desktop/offerloop-ad-studio/` that acts as a permanent "ad factory." The user opens Claude Code in this folder and prompts in plain English; Claude orchestrates MCP calls, asset management, edit planning, and rendering.

**First deliverables (in order):**
1. A 60–90 second TrueView-style product ad (1920×1080) — fastest full-pipeline proof.
2. A 2–5 minute explainer/demo video (1920×1080) — reuses all components from #1.
3. Short cutdowns (9:16, 4:5, 1:1) derived from the masters for Meta Reels/feed and Shorts.

## Architecture

Claude Code is the orchestrator; Remotion never calls external services. The flow:

```
User prompt (Claude Code, in repo)
  → Figma MCP: pull brand tokens + export assets   → brand/, assets/figma/
  → Higgsfield MCP: generate video/audio/images    → assets/generated/
  → User drag-and-drop: screen recordings          → assets/recordings/
  → Claude writes/edits: script + edit plan        → plans/
  → Remotion compositions read plans + assets      → src/
  → Remotion CLI renders                           → out/
```

A `CLAUDE.md` at the repo root documents this workflow (asset conventions, how to request generations, how to render) so any future Claude Code session in this folder works the same way.

## Project structure

```
offerloop-ad-studio/
├── CLAUDE.md              # workflow playbook for Claude sessions
├── brand/
│   └── theme.ts           # colors, fonts, logo paths synced from Figma
├── assets/
│   ├── recordings/        # user-dropped mp4/mov screen recordings
│   ├── generated/         # Higgsfield outputs (video, VO, music, images)
│   ├── figma/             # exported Figma assets (logo, illustrations, end-card art)
│   └── manifest.json      # description, source, duration of every asset
├── plans/                 # per-video: script.md + edit-plan .ts
├── src/
│   ├── Root.tsx           # composition registry
│   ├── compositions/      # Explainer, TrueViewAd, Cutdown (generic plan players)
│   └── components/        # Captions, HookText, EndCard, DeviceFrame, LowerThird, ProgressBar
├── out/                   # rendered mp4s (gitignored)
└── docs/superpowers/specs # this spec + future specs
```

Large media (`assets/`, `out/`) is gitignored; manifests, plans, and code are committed.

## Brand sync (Figma MCP)

- Source of truth: Figma file `mzL5XPw3VFciHDs6RG7SAb` ("Offerloop x PS Main File"), design-system page node `1418:2135`.
- Known palette from that page: Background `#F5F6F8`, Primary `#4A60A8`, Secondary Light `#B6C3E8`, Secondary Dark `#1E2D4D`. Accent is marked "TBD" in Figma — the theme will alias accent to Primary until the user picks one.
- Implementation extracts the full palette and typography from the design-system page into `brand/theme.ts`, and exports the logo plus selected illustrations (the page's two large Illustrations frames) into `assets/figma/`.
- "Re-sync brand from Figma" is a documented prompt in CLAUDE.md that repeats this extraction.

## Asset flow

- **Recordings:** user drops files into `assets/recordings/`, then tells Claude what each shows. Claude records a description + duration (via ffprobe) in `assets/manifest.json` so edit planning doesn't require rewatching footage.
- **Higgsfield generations:** Claude calls `generate_video` / `generate_audio` / `generate_image` (using `models_explore` to pick models when unsure), polls `job_status`, downloads results into `assets/generated/`, and logs them in the manifest with the prompt used.
- **Voiceover & music** go through the same Higgsfield path (voice tools for VO).

## Edit plans and compositions

Each video is defined by two files in `plans/`:
- `<name>.script.md` — hook, beats, VO lines, on-screen text, CTA.
- `<name>.plan.ts` — typed scene list: `{ asset, trimStart, trimEnd, overlays (text/captions), audio cues }`.

Remotion compositions are generic players of plan files — adding a video means adding a plan, not writing new composition code. Masters render at 1920×1080. Cutdowns are plan files that cherry-pick scenes from a master plan and render at 1080×1920, 1080×1350, or 1080×1080 with layout components that adapt to aspect ratio (e.g., captions reposition, device frames scale). Higgsfield's video-analysis tools may be used to suggest the strongest master moments to clip; final cutdowns are always rendered in Remotion for brand control.

## Preview and render

- `npm run studio` → Remotion Studio in the browser for live preview/scrubbing while iterating.
- `npx remotion render <CompositionId>` → mp4 into `out/` (ffmpeg already installed; renders are local and free).

## Error handling

- Higgsfield jobs are async and can fail or take minutes: Claude polls with backoff, reports failures with the job ID, and never leaves an undownloaded generation out of the manifest.
- Missing assets referenced by a plan fail loudly at Studio load (a plan validator checks that every referenced file exists before render).
- Figma export URLs are short-lived: assets are downloaded immediately at sync time.

## Testing / success criteria

- Success for v1: the 60–90s ad renders end-to-end from a plan file containing at least one user recording, one Higgsfield-generated element, Figma-derived brand styling, captions, and an end-card CTA.
- The plan validator is the main automated check; visual QA happens in Remotion Studio.

## Out of scope (v1)

- Auto-publishing to Meta/YouTube ad accounts.
- Automatic transcription/caption timing from audio (captions are authored in plans; can add Whisper later).
- Higgsfield shorts-studio/clipper as the render path (analysis only; Remotion renders everything).
