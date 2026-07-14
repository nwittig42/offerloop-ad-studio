---
name: ad-sound
description: "Music arcs, loudness shaping, and silence placement for Offerloop ad videos, measured (LUFS curves) from Google's launch films. Use when choosing or timing music for a video, generating VO or a soundtrack via Higgsfield, when audio feels flat or relentless, or when deciding how a video should open and end sonically."
---

# Ad Sound Design

Loudness arcs measured with ffmpeg ebur128 from `public/assets/references/google/`. Core move: **silence is punctuation** — Google buys attention with quiet, not volume.

## The three arcs (match to format, see ad-story-structure)

- **One long crescendo** (product film / continuous morph): hushed open around **-30 LUFS**, continuous build across the whole film, peak (~-14) at **85–90% of runtime**, soft landing. No drops mid-film — the build mirrors the single unbroken shot.
- **Instant energy with a silent porch** (anthem/montage): first 2–3s near-silent (**-37 LUFS**) over the iconic asset, then the track slams to ~**-14** within a second — the jump IS the transformation beat. Holds hot the whole montage, then hard drop at the end card.
- **VO bed** (presenter demo): steady **-18 to -22 LUFS**, VO on top, music felt not heard. No dynamics stunts.

## The ending ritual (all formats)

Audio exits BEFORE video. The demo starts its fade ~10s out; the anthem hard-drops 3s out. The final logo frames sit in near-silence. Never let music run to the last frame and stop with the picture.

## Sync points

- The loudest moment must coincide with a visual reveal, never a transition.
- Music slam ↔ icon transformation (anthem, second ~5).
- "Thinking" beats ride a dip or held note; the result lands on the resolve.
- On the crescendo arc, word-by-word text reveals sit on the rhythmic grid of the track.

## Voiceover style (from the Nano Banana demo)

- Plain first-person-plural product speak: "Let me show you", "Here's what happens when…" — zero hype adjectives; the artifact does the bragging.
- Every VO sentence points at something currently on screen. If the VO describes what's NOT visible, fix the edit, not the copy.
- ElevenLabs/Higgsfield: brief, warm, conversational read; avoid "epic trailer" delivery even on anthem cuts — energy comes from the music, not the voice.

## Practical targets

- Dialogue/VO around -18 LUFS integrated; music bed 6–10 LU under VO when both are present.
- Mix the quiet porch/close deliberately: don't normalize the whole track to one level — the -37→-14 jump is the design.
- In Remotion, drive music `volume` with interpolations per scene rather than baking one fixed gain.

## Anti-patterns

- Music at one loudness for the whole video (relentless = numbing)
- Opening at full energy on frame 1 (no porch, no contrast)
- Ending audio and video on the same frame
- Epic-movie-trailer VO reads
- A drop or riser at every scene change (save sync moments for reveals)
