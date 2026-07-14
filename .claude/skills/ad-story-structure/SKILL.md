---
name: ad-story-structure
description: "Narrative arcs and beat structures for 60-90s product videos, modeled on Google's three launch-film formats. Use when starting a new video, writing a plans/*.script.md, choosing what beats go in what order, when the user asks what should come next in a video, or when a cut feels like a feature list instead of a story."
---

# Ad Story Structure

The three formats Google uses for 60–90s product films (reference: `public/assets/references/google/`), and their beat arcs. Pick the format first; it determines pacing grammar ([ad-pacing](../ad-pacing/SKILL.md)), canvas ([ad-lighting](../ad-lighting/SKILL.md)), and sound ([ad-sound](../ad-sound/SKILL.md)).

## Format 1 — Product film ("Introducing X", 90s, continuous morph)

The AI Mode arc. Best fit for an "Introducing Offerloop" master.

1. **Name it** (0–8s): "Introducing X" in a circle-ring title on the dark canvas
2. **One real task, end to end** (8–50s): a single believable query travels the whole product — typed, thinking, answered, sources, follow-up. Not a feature tour; ONE task done impressively.
3. **Canvas flip** (~50%): dark→light (or reverse) with a second, shorter task — proves range
4. **Capability run** (70–85s): quick kinetic-verb beats ("learn / brainstorm / answer") — breadth without new demos
5. **Close** (last 10s): tagline with tinted keyword → logo → quiet hold

## Format 2 — Brand anthem (60s, montage)

The Gemini-era arc. Best fit for TrueView masters and hype cuts.

1. **Iconic asset, silent** (0–3s): the thing everyone recognizes, untouched (Google used its homepage; Offerloop's analog is the Scout "What should we work on today?" dashboard)
2. **Transformation** (3–6s): the icon morphs — new chips/powers pop around it, music slams in
3. **Micro-story montage** (6–50s): 1.5–5s shots, each a complete prompt→thinking→result loop on a different capability, interleaved every 2–3 beats with candid human joy (real users reacting, not actors posing)
4. **Era claim** (50–57s): dark end card, "Welcome to the X era" with gradient keyword
5. **Logo + silence** (57–60s)

## Format 3 — Presenter demo (60–90s, chaptered)

The Nano Banana arc. Best fit for the Explainer once Nick records himself (or a VO-only variant with the PiP slot left empty).

1. **Output montage** (0–2s): fastest cuts of the coolest results — earn the next 80s
2. **Presenter intro** (2–10s): who + what in one sentence, lower-third
3. **Chapters** (10–85%): one product surface per chapter, real screen recording full-frame, presenter shrunk to a rounded PiP bubble bottom-right; each chapter ends on a visible artifact (the storybook, the drafted email)
4. **Sign-off** (presenter full-frame, one sentence of where to get it)
5. **Logo hold** with audio fade

## Rules that hold across all three

- **Receipts, not claims.** Every capability is proven by a real artifact on screen — an actual answer with citations, a real Gmail draft. If the artifact isn't plausible enough to screenshot, the beat isn't ready.
- **The demo content is itself charming.** Google's example prompts are delightful ("draw kersploooooosh", a kid's storybook about the family dog). Offerloop beats should use real, specific student stories ("Find me recruiters at Deloitte who went to USC"), never lorem-ipsum tasks.
- **Name the product early, claim the category late.** Product name by 0:08; the big "era"/tagline claim is the LAST text on screen.
- **Humans between proofs** (anthem only): joy reactions are the emotional glue; UI alone reads cold.

## Anti-patterns

- Feature-list sequencing ("it also does…" ×6) — pick one task end-to-end, or full montage of micro-stories; nothing in between
- Explaining before showing (setup narration over b-roll)
- Ending on a CTA wall of text instead of logo + silence
- Mixing formats mid-video
