---
name: no-em-dashes
description: "Bans em dashes from every marketing asset produced in the Offerloop ad studio and prescribes replacements. Use whenever writing or editing copy that a viewer could see or hear: deck slides, video scripts, plan captions/hookText/lowerThirds/end cards, VO lines, mock-UI strings, storyboard VO/description fields, and any Higgsfield prompt that specifies on-screen text. Also use when reviewing generated stills/clips whose rendered text might contain one."
---

# No Em Dashes

No marketing asset leaving this repo contains an em dash (—). Rewrite around it; never swap in a lookalike.

## When to use

- Writing or editing `decks/*/slides.md`, `plans/*.script.md`, `plans/*.plan.ts` copy fields, `plans/storyboards/*.json` vo/description fields, or on-screen strings in `src/components/`
- Composing any Higgsfield prompt that quotes text the model will render on screen
- Writing VO lines for `generate_audio` or captions/hook text for a plan
- Reviewing a generated image or clip before saving it into `public/assets/`

## Replacement guide

Pick by what the em dash was doing; read the sentence aloud and keep the rhythm:

| Em dash was doing | Replace with | Example |
|---|---|---|
| Joining two independent clauses | Period or semicolon | "No reply. Back to square one." |
| Adding a trailing beat or afterthought | Comma | "On it, applying to 15 matched roles now" |
| Introducing a list or payoff | Colon | "The grind: real screen recordings" |
| Labeling (titles, tabs, lower thirds) | Colon or middle dot | "Job Board: 1,240 results" · "MEET SCOUT · YOUR COPILOT" |
| Parenthetical aside | Parentheses or restructure | "(anywhere; I'll move it)" |

Banned as substitutes: en dash (–) used dash-style, double hyphen (--), spaced hyphen ( - ). Hyphens inside compound words are fine.

## Workflow

1. Write the copy without em dashes, using the guide above.
2. For Higgsfield prompts that render text: spell out the exact on-screen string with its punctuation already em-dash-free, and add "no em dashes in any rendered text" when the model is inventing filler copy (image models add them on their own).
3. When a generation comes back, zoom the rendered text. If the model baked an em dash into visible text, re-roll before saving to `public/assets/` or the manifest.
4. Before committing copy changes, verify:

```bash
grep -rn "—" decks/ plans/ src/components/ --include="*.md" --include="*.ts" --include="*.tsx" --include="*.vue" --include="*.json" | grep -vE ":\s*(//|\*|/\*|\{/\*)"
```

Zero hits outside code comments = clean. Code comments are exempt (never rendered), but don't add new ones there either.

## Anti-patterns

- Swapping — for – or "--" and calling it fixed; the ban is on the dash pattern, not the glyph
- Mechanically replacing every em dash with a comma; joining two full sentences with a comma reads worse than the dash did
- Forgetting the invisible surfaces: storyboard VO fields, manifest-recorded prompts you plan to reuse, and quoted UI text inside Higgsfield prompts
- Accepting a generated still whose on-screen text contains an em dash because "it's small"; it ends up full-screen in the edit
