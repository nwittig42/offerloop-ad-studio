# Depop onboarding background video: frame-by-frame teardown

Source: `ScreenRecording_08-25-2026 09-56-39_1.mp4` (440x960, 30fps, 300 frames, 10.0s).
Screen recording of the Depop app sign-in screen. The background video runs full bleed
behind a dark bottom scrim, the wordmark, the tagline "Buy, sell, and discover preloved
fashion", three auth buttons and a legal line. Clean video band is roughly y 55 to 455.

## Cut map (measured by frame differencing, threshold 16)

| # | In | Out | Dur | Frames | Content |
|---|------|------|------|--------|---------|
| 1 | 0.00 | 1.17 | 1.17s | 0-34    | Interior hallway, woman in red, profile |
| 2 | 1.17 | 2.03 | 0.87s | 35-60   | Phone screen filling frame, shoe shelf |
| 3 | 2.03 | 3.50 | 1.47s | 61-104  | Cash raining in the cream room |
| 4 | 3.50 | 4.17 | 0.67s | 105-124 | Striped tee on a hanger, window, red curtain |
| 5 | 4.17 | 4.70 | 0.53s | 125-140 | Cash falling down a stone facade, low angle |
| 6 | 4.70 | 6.90 | 2.20s | 141-206 | Street, woman walking to camera, fans cash |
| 7 | 6.90 | end  | 3.10s | 207-299 | Solid red #DE001D, hard cut, held |

All transitions are hard cuts. No dissolves, no fades, no speed ramps.
Cut rhythm: 1.17, 0.87, 1.47, 0.67, 0.53, 2.20. Irregular, tightening through the
middle (0.67 then 0.53 back to back) then one long closing beat, then the red card.

## Shot detail

**1. Hallway (1.17s)** Warm beige and cream interior, panelled door filling most of frame.
Woman, long blonde hair, red top, in profile at frame right, moving through. By the last
third she lifts a phone in a red case into the lower right. Handheld, small drift.

**2. Phone screen (0.87s)** Hard push to a phone in a red case held at a tilt, its screen
filling the frame. On screen: a shelf of shoes (tan pointed flats front, red trainers with
white stripes, a lime sneaker, black shoes) under a black band carrying the red wordmark.
Darkest shot in the film. This is the "listing it" beat, shown as screen-in-screen.

**3. Cash indoors (1.47s)** Same cream room and palette as shot 1. Dollar bills thrown up
and tumbling down through the whole frame. A dark picture frame on the wall for depth. Red
sleeve at the edge, red phone raised bottom right. Energetic handheld.

**4. Striped tee (0.67s)** Low angle looking up. Black and white striped tee on a wooden
hanger held into a window with red curtains. Daylight blows out behind it. A hand with the
red phone enters right at the very end to shoot it.

**5. Cash outdoors (0.53s)** Low angle up a pale stone facade with balconies. A torrent of
bills falls down the frame. Sepia, warm, fast. Shortest shot in the film.

**6. Street (2.20s)** Shallow focus. Woman with a fringe walks toward camera through blurred
pedestrians, teal awning and green trees behind. She looks down and smiles, cash flies past
her hair, she fans a stack of bills into the lower right. Handheld follow. Longest shot,
and the only one that holds long enough to read a face.

**7. Red card (3.10s+)** Hard cut to flat #DE001D. No motion. Runs to the end of the capture,
so the film is effectively 6.9s of footage plus a red hold that the UI sits on.

## The look

- Warm filmic grade throughout. Milky lifted blacks, low contrast, visible grain.
- Desaturated except red, which is left hot. Red recurs in every single shot: the top, the
  phone case, the trainers, the curtain, the end card. That is the whole colour strategy.
- Everything is shallow, soft, and handheld. Nothing is locked off. Heavy motion blur.
- Reads as shot on and about phones. Half the shots contain a phone in frame.
- Three motifs on rotation: the seller, the item, the money. Item beats are the short ones.

## Recreation notes

Structure, timing and grade are reproducible. The wordmark and the on-screen app UI are
Depop's and are left out of the recreation: shot 2 keeps the framing and the shoe shelf but
no logo band, and shot 7 is a flat red card with an empty brand slot.

## Recreation as built

Six Higgsfield beats (seedance_2_5, 9:16, 1080p, silent) plus a generated red card, cut at the
measured timings in `public/assets/generated/depop-recreate/`. Assembly is ffmpeg concat with a
light unifying grade and grain. Output `recreation-v1.mp4`, 9.97s.

Note: the first pass at beat 2 rendered a real Nike swoosh on the trainers from the phrase
"red trainers with white side stripes". Re-rolled with plain scarlet canvas sneakers and an
explicit no-swoosh list. The rejected take is kept as `shot2-phone-shoes-REJECTED-nike.mp4`.

## Extended cut (recreation-v2)

Two beats added so the film earns its money instead of just showing it, and to run longer:

| # | Beat | Dur |
|---|------|-----|
| 1 | Hallway | 1.17s |
| 2 | Phone / shoe shelf | 0.87s |
| 3 | Cash indoors | 1.47s |
| 4 | Striped tee | 0.67s |
| 5 | **Sale reaction (new)** | 0.80s |
| 6 | Cash facade | 0.53s |
| 7 | **Counting cash (new)** | 1.20s |
| 8 | Street | 2.20s |
| 9 | Red card | 3.10s |

Total 11.97s, up from 9.97s. The two new beats sit either side of the facade cash so the
arc reads list it, it sells, she gets paid, she walks off with it. The reaction beat is the
only close-up on a face before the street beat, which gives the ending something to pay off.

Second prompt trap found: over-constraining the banknotes ("no readable writing or numbers")
made the model render blank white paper. Describing them positively as engraved green
currency with soft illegible detail fixed it.
