# ig-launch-v2: Instagram carousel script

Nine cards, 1080x1350 (4:5). Nick's script, 2026-09-10, with the fixes agreed
in review: the em dash on card 2 is gone, "now its not" takes its apostrophe,
card 6 trades the spec sentence for the thing it is claiming, and card 9 is
the mark alone instead of a CTA that steps on card 8's payoff.

The spine is the bookend. Card 1 states the problem flat, cards 2 to 6 are the
product, card 7 repeats card 1 **pixel for pixel**, and card 8 answers it. The
repeat is the reason anyone swipes to the end, so cards 1 and 7 must render
identical; do not "improve" one of them.

Voice: lowercase conversational, matching the deck's caption. Headlines in
Lora 700 at `#1E2D4D`, support lines in Inter at `#4A60A8`, both centred, on
the blue mesh ground with the frosted badge top left and the white lockup plus
swipe arrow along the bottom. No em dashes anywhere (see the no-em-dashes
skill).

| # | Card | Copy |
|---|------|------|
| 1 | hook | networking is a pain in the ass. |
| 2 | intro | INTRODUCING / [lockup] / a dating app for professional connections. / swipe, and it emails them. introducing you. |
| 3 | apply | or swipe, and it applies to the job. |
| 4 | search | search and find anyone. |
| 5 | scale | ANYONE. / 1.5 billion contacts. |
| 6 | personal | it finds what you actually have in common. / so every email is different. |
| 7 | hook again | networking is a pain in the ass. |
| 8 | payoff | now it's not. |
| 9 | outro | [lockup mark, spinning about its vertical axis] |

## Open items

- **Card 2 is doing double duty** (naming the product and teaching the first
  gesture). Splitting it into two cards would be a tenth card; Nick's call was
  to keep the deck short, so it stays merged. If it reads crowded on a phone,
  split it.
- **1.5 billion contacts** is the most screenshot-able and most challengeable
  line in the deck. Verify the number before posting.
- **Cards 3 to 6 are type only.** Each one is claiming something the product
  actually does on screen, and the `ad-story-structure` rule is receipts, not
  claims. Card 3 wants the apply confirmation, card 4 or 5 wants the search
  result count, card 6 wants a real drafted email with the shared detail in it.
  Drop those screenshots into `public/assets/recordings/` and they can be
  placed under the type.
- **Card 9 renders twice**: a still for the preview tool, and an mp4 of the
  spin, which is what actually gets posted as the last slide.
