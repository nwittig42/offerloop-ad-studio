# App Store screenshot set — design

Date: 2026-07-15. Approved by Nick in chat.

## Goal

Seven 1320x2868 portrait App Store screenshots (the 6.9" slot, the only size Apple
requires; App Store Connect auto-scales the rest) that pitch Offerloop as **the job
search assistant that handles everything**: it finds roles, applies, does outreach,
preps meetings, and tracks it all. Panels 1-3 must work as a standalone pitch since
only they show in App Store search results.

## Style

Sorce's layout grammar (references in `public/assets/references/appstore/`) wearing
Offerloop's brand:

- Canvas `#F5F6F8` with soft radial glows in `#B6C3E8`/primary at low alpha.
- Lora Bold headline in ink `#112F54`, one keyword tinted primary `#4A60A8`,
  7 words max, small-caps Inter kicker above (deck language: APPLY / REACH / ASK /
  RESEARCH / PREPARE / TRACK).
- Tilted iPhone frame cropped off-panel; UI cards and chips floating out of the screen.
- Panel 4 is the dark Scout panel (navy gradient + orb glow) to break scroll rhythm.
- Scout mascot appears exactly twice: waving on panel 1, orb on panel 4.
- No em dashes, no invented stats or ratings (Apple 2.3.3).

## Panels

| # | Kicker | Caption | Visual |
|---|--------|---------|--------|
| 1 | (none) | Your job search, **handled.** | Feed job card mid-swipe on tilted phone, floating salary + Remote chips, paper-plane trail, Scout waving |
| 2 | APPLY | Applications **finish themselves.** | Company role page with Auto-apply button; floating toast "Saved, finishing your application in the background" |
| 3 | REACH | Real outreach, sent from **your Gmail.** | Floating draft email card with Send + View in Gmail; inbox phone behind |
| 4 | ASK | Just **say** what you're looking for. | Dark Scout orb screen, "Draft 1 engineers at Stripe", suggestion pills |
| 5 | RESEARCH | It finds the **right person** first. | Inbox with live agent status cards (researching / writing your outreach) |
| 6 | PREPARE | Walk in already **prepped.** | Meeting-prep coffee library card over phone showing a prep doc |
| 7 | TRACK | Everything, **tracked** in one place. | Applications status list + companies grid card |

UI content is recreated in HTML/React from the real app (source: Nick's 07-15 screen
recording, `public/assets/references/appstore/sorce-app-screen-recording.mp4` in the
manifest) so text renders crisp at full resolution. Names/companies mirror the
recording's demo session; nothing invented beyond that session's content.

## Build

- `src/appstore/` — shared primitives (`ui.tsx`: GlowCanvas, Kicker, Headline,
  PhoneFrame, chips/cards, ScoutOrb) + one file per panel in `src/appstore/panels/`.
- Registered as Remotion `<Still>` compositions `AppStore-01-Hook` ...
  `AppStore-07-Track` (1320x2868) so the set is previewable in Studio.
- `npm run appstore` renders all seven via `remotion still` into `out/appstore/`
  and strips the PNG alpha channel with ffmpeg (Apple rejects alpha).

## Next (separate task)

App preview video: up to 3 per localization, 886x1920 portrait, 15-30s, H.264.
Compositions will reuse these panel components.
