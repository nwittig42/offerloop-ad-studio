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

| # | Card | Copy | |
|---|------|------|---|
| 1 | hook | Networking is a Pain in the A** | motion |
| 2 | intro | SO WE BUILT / [lockup] / a dating app for professional connections. / swipe, and it emails them. introducing you. | motion |
| 3 | apply | or swipe, and it applies to the job. / it even writes a custom cover letter | motion |
| 4 | search | search and find anyone. | motion |
| 5 | scale | ANYONE. / 1.5 billion contacts. (red) | motion |
| 6 | personal | No two emails are the same, (red) we find what you have in common and personalize every email (red) | |
| 7 | outro | [lockup, gleam crossing it] / A New Way To Job Search / [apple] Download on the App Store | motion |

Every card comes from `ig-launch-v2.cards.ts`, whose first entry is deck
position 1 (`IG_LAUNCH_CARD_OFFSET`). The lifted-type cover that used to be
card 1 was cut; `tools/carousel/cover.py` still builds it and the
`carousel:cover` task still runs, but the render script no longer calls it.

Cards marked motion render as real compositions rather than stills, and the
deck folder carries an mp4 beside the png for each: the mp4 is what gets
posted, the png is only what the preview server can display. Lengths differ by
what the footage needs: slides 1 to 3 are 5.00s, slide 4 is 4.00s, slide 5 is
7.00s because the LA-to-globe zoom needs the room to read as one move.

The bookend is gone. The deck used to repeat the hook near the end and then
resolve it with "now it's not."; both cards were cut, so it now runs hook,
product, proof, mark, ending on the spinning icon rather than on a payoff
line.

## Open items

- **Card 3 is doing double duty** (naming the product and teaching the first
  gesture). Splitting it would make an eleventh card; Nick's call was to keep
  the deck short, so it stays merged. If it reads crowded on a phone, split it.
- **Cards 1 and 3 both carry the lockup**, one asking what Offerloop is and the
  other answering. Deliberate, but worth a look on a phone.
- **1.5 billion contacts** is the most screenshot-able and most challengeable
  line in the deck. Verify the number before posting.
- **Cards 4, 5 and 7 hold an empty 600x600 media slot** for the recordings:
  the apply flow, a search being typed, and a real drafted email with the
  shared detail visible in it. The size is off the reference card Nick sent
  (55% of frame width, square), which is also the shape the carousel clips are
  already cut to. Drop a file under `public/` and set `media.src` on the card
  to fill one.
- **Cards 3 and 6 have no slot, on purpose.** Card 3 is already carrying the
  name, the metaphor and the first gesture, and card 6 is the big-type
  escalation beat that works because it is empty. Both are one line in the
  cards file if that call turns out wrong; card 3 would want splitting in two
  rather than compressing.
- **Card 10 renders twice**: a still for the preview tool, and an mp4 of the
  spin, which is what actually gets posted as the last slide.
