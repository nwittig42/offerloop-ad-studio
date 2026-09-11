# ig-launch-v2: Instagram carousel script

Ten cards, 1080x1350 (4:5). Nick's script, 2026-09-10, opened by the cover
carried over from the original deck, with the fixes agreed in review: the em
dash is gone, "now its not" takes its apostrophe, the personalisation card
trades its spec sentence for the thing it is claiming, and the last card is
the mark alone instead of a CTA that steps on the payoff.

The spine is the bookend. Card 1 asks what Offerloop is, card 2 states the
problem flat, cards 3 to 7 are the product, card 8 repeats card 2 **pixel for
pixel**, and card 9 answers it. The repeat is the reason anyone swipes to the
end, so cards 2 and 8 must render identical; do not "improve" one of them.

Voice: lowercase conversational, matching the deck's caption. Headlines in
Lora 700 at `#1E2D4D`, support lines in Inter at `#4A60A8`, both centred, on
the blue mesh ground with the frosted badge top left and the white lockup plus
swipe arrow along the bottom. No em dashes anywhere (see the no-em-dashes
skill).

| # | Card | Copy |
|---|------|------|
| 1 | cover | so... what is / [lockup] |
| 2 | hook | networking is a pain in the ass. |
| 3 | intro | INTRODUCING / [lockup] / a dating app for professional connections. / swipe, and it emails them. introducing you. |
| 4 | apply | or swipe, and it applies to the job. |
| 5 | search | search and find anyone. |
| 6 | scale | ANYONE. / 1.5 billion contacts. |
| 7 | personal | it finds what you actually have in common. / so every email is different. |
| 8 | hook again | networking is a pain in the ass. |
| 9 | payoff | now it's not. |
| 10 | outro | [icon mark, spinning about its vertical axis] |

Card 1 is the only one not typeset in Remotion. Its lead-in is type lifted off
the original ig-launch cover, so it keeps that deck's serif rather than being
re-set in Lora; `tools/carousel/cover.py` builds it and the render script runs
it first. Everything from card 2 on comes from `ig-launch-v2.cards.ts`, whose
first entry is deck position 2 (`IG_LAUNCH_CARD_OFFSET`).

## Open items

- **Card 3 is doing double duty** (naming the product and teaching the first
  gesture). Splitting it would make an eleventh card; Nick's call was to keep
  the deck short, so it stays merged. If it reads crowded on a phone, split it.
- **Cards 1 and 3 both carry the lockup**, one asking what Offerloop is and the
  other answering. Deliberate, but worth a look on a phone.
- **1.5 billion contacts** is the most screenshot-able and most challengeable
  line in the deck. Verify the number before posting.
- **Cards 4 to 7 are type only.** Each one is claiming something the product
  actually does on screen, and the `ad-story-structure` rule is receipts, not
  claims. Card 4 wants the apply confirmation, card 5 or 6 wants the search
  result count, card 7 wants a real drafted email with the shared detail in it.
  Drop those screenshots into `public/assets/recordings/` and they can be
  placed under the type.
- **Card 10 renders twice**: a still for the preview tool, and an mp4 of the
  spin, which is what actually gets posted as the last slide.
