---
name: ad-typography
description: "Rules for on-screen text in Offerloop ad videos — kinetic type, size, keyword tinting, pills, lower thirds, disclaimers — learned from Google's launch films. Use when adding or editing hookText/caption/title overlays in a plan, when text feels small, static, or cluttered, when the user asks for kinetic typography or word-by-word reveals, or when designing an end card or title beat."
---

# Ad Typography & Kinetic Text

How Google sets type in product films (reference: `public/assets/references/google/`).

## Size

- Hero lines are display-sized: on their 640px-wide frames, hero text runs ~28–36px — scale that to 1080p and the floor is **~80–100px for hero text**. Phone-readability is the test.
- The same rule applies to UI text: crop into the interface until its query/answer text is at caption size or larger (see [ad-lighting](../ad-lighting/SKILL.md) on oversizing).
- One idea per line. Google never puts two sentences on screen outside UI content.

## One family, one accent

- A single sans family carries everything, with contrast from weight and size only. Offerloop: Google Sans Flex (Inter fallback) for kinetic/UI text; Lora stays for editorial headline moments (`src/fonts.ts`).
- **Tint the keyword:** exactly one or two words per line get color — "Introducing <accent>AI Mode</accent>", "Welcome to the <gradient>Gemini era</gradient>", query nouns tinted red/orange inside the search bar. Everything else stays white (dark canvas) or near-black (light canvas).
- Gradient fills are reserved for the single most important phrase in the film (usually the end card).

## Kinetic patterns (ranked by how often Google uses them)

1. **Word-by-word reveal** synced to VO/music (already supported: `wordByWord: true`).
2. **Words on a thread:** words placed as nodes along a curved path that draws itself across the screen ("whatever / is / on / your / mind"), trailing a thin colored line. Great for connecting UI beats on the continuous-morph grammar.
3. **Single-verb beats:** one verb alone on canvas ("learn", "brainstorm", "answer") holding ~1s each — a montage of capabilities without UI.
4. **Phrase + pill:** plain words then the product term inside a rounded pill ("A new experimental" + [search experience]).
5. **Split framing:** text flanking a device/UI card — "In whatever way" left, "is natural to you" right.
6. **Circle-ring title:** "Introducing X" set inside a thin animated ring that draws itself. This is the canonical product-name reveal.

## Chrome

- **Prompts are hero props:** show real prompt text in a rounded pill, typed live with a visible cursor, big ("draw kersploooooosh"). The prompt IS the marketing copy.
- **Lower thirds** (presenter format): name + role, small, bottom-left, no box.
- **Disclaimers:** every claim/prototype/end-card frame carries ~10px low-contrast microcopy bottom-center ("Results are for illustrative purposes…", "Screen recordings sped up"). It reads as honesty and polish; add equivalents ("Screens simulated", "Sped up for demo") to Offerloop mock-UI scenes.

## Anti-patterns

- Coloring whole sentences — tint only the keyword
- Two type families in one scene (Lora + sans together in a single frame)
- Static centered text holding >2s with no animation in/out
- Drop shadows or outlines on type — separation comes from canvas contrast
- ALL-CAPS hero lines (Google is sentence case everywhere)
