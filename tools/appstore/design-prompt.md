# Offerloop App Store screenshot set: master design prompt

Paste everything below into a design tool (Figma Make, Claude, etc.) or hand it to a
designer. It encodes the fix for both failure modes we hit: the collage draft had
character but wasn't clean; the Sorce-style set was clean but had no character.

---

You are a senior brand designer creating the iOS App Store screenshot set for
Offerloop, a job search assistant app for college students. The pitch: one assistant
that handles the entire job search. It finds roles you swipe on, auto-applies in the
background, researches the right person at each company, drafts real outreach into
your Gmail, preps you for coffee chats, and tracks everything in one place.

## Deliverable

Seven portrait panels, 1320 x 2868 px each (Apple's 6.9 inch slot). PNG, RGB, no
alpha channel, each under 3 MB. Panels 1 to 3 must work alone as a complete pitch,
because only they appear in App Store search results.

## Two references, and what to take from each

- Reference A, Sorce's live App Store set: clean layout grammar, but generic. No
  mascot, no brand world, interchangeable with any job app. Steal its discipline,
  not its blandness.
- Reference B, our exaggerated collage draft: full of character (mascot, hand-drawn
  arrows, oversized UI blocks) but messy. Too many focal points, fuzzy screen-grab
  UI, inconsistent angles and spacing. Steal its personality, not its chaos.

Your job is to be clean like A and characterful like B. Both sets of rules below are
hard requirements, not suggestions.

## CLEAN rules

1. One focal object per panel: a single tilted iPhone, or a single oversized UI
   card. Everything else supports it.
2. Maximum 3 floating elements per panel (chips, buttons, mascot). Every floater
   must overlap either the phone or a panel edge; nothing floats in empty space.
3. One angle vocabulary: phones tilt exactly -8 or +6 degrees, alternating across
   the set. Floaters tilt between -5 and +5 degrees.
4. 100 px minimum side margins. The headline block starts 180 px from the top on
   every panel except 7, where the caption sits at the bottom. At least 25 percent
   of every panel stays empty canvas.
5. All UI is redrawn crisp at native resolution, never blurry screen captures. Text
   inside the phone must survive 25 percent zoom.
6. At most two accent colors per panel beyond ink and canvas.

## CHARACTER rules

1. Headlines in Lora Bold serif, ink #112F54, exactly one keyword tinted #4A60A8,
   7 words or fewer. Above each headline (except panel 1), a small-caps kicker in
   Inter 800, wide letterspacing, #4A60A8: APPLY, REACH, ASK, RESEARCH, PREPARE,
   TRACK.
2. Scout, the hand-drawn yeti mascot, appears in exactly two panels: peeking over
   the phone's top edge in panel 1, and as the glowing orb in panel 4. Never more.
3. A soft watercolor mountain ridge runs along the bottom of light panels at low
   opacity. It is the brand world, not decoration; keep it faint.
4. Repeating motif: blue paper planes for sent outreach. A rising trail of three in
   panel 1; at most one small echo elsewhere. This is our version of Sorce's green
   hearts.
5. Panel 4 is dark: navy gradient built on #1E2D4D with the Scout orb glow. It is
   the rhythm-breaker in the scroll.
6. Live-agent moments use glowing green status dots (#1F9D55): the "it is working
   right now" signal.

## Brand tokens

Canvas #F5F6F8 with faint radial glows of #B6C3E8 and #4A60A8 at low alpha. Ink
#112F54. Brand primary #4A60A8. Product UI blue #3E63F2. Serif: Lora Bold. UI and
body: Inter (stand-in for Google Sans Flex). Wordmark: "Offerloop" set in Libre
Baskerville.

## The seven panels, in order

1. No kicker. "Your job search, handled." Feed job card mid-swipe on a tilted
   phone; floating X and blue paper-plane send buttons; salary chip $120-180k;
   three rising paper planes; Scout peeking over the phone's top edge.
2. APPLY. "Applications finish themselves." Company page with the Auto-apply button
   on the phone; floating dark navy toast with a pulsing green dot: "Saved,
   finishing your application in the background".
3. REACH. "Real outreach, sent from your Gmail." Oversized draft-email card
   (recipient martha janicki, product manager at langchain; subject "From Pinecone
   to LangChain, curious about the move"; blue Send button; green View in Gmail
   button; footnote "Sends from your connected Gmail, no need to leave the app.")
   over an inbox phone behind it.
4. ASK, dark panel. "Just say what you're looking for." Scout orb glowing at
   center; glassy card reading 'Ready to search: "Draft 1 engineers at Stripe"'
   with four suggestion pills and a Run it as-is button; "Tap and ask Scout for
   anything" below; faint dark mountain silhouettes at the bottom.
5. RESEARCH. "It finds the right person first." Inbox phone with three floating
   status cards, each with a glowing green dot: "Researching their background...",
   "Writing your outreach...", "In line, drafting starts in a moment...".
6. PREPARE. "Walk in already prepped." Coffee library card (three people with green
   Prepped pills and a gold New prep chip) above a phone showing a prep doc with
   "Why you two connect" and icebreaker topics.
7. TRACK. "Everything, tracked in one place." Applications card with status pills
   (Applied, Needs your input, Outreach sent) over a companies-grid phone; caption
   at the BOTTOM of this panel only.

## Honesty rules

Real product surfaces only, mirroring an actual demo session. No invented metrics,
ratings, or awards. No recognizable famous people. No em dashes anywhere in copy;
use commas, colons, or periods instead.

## Self-check before delivering each panel

- Squint test: exactly one focal object plus one readable headline.
- Thumbnail test: at 150 px wide the caption is still legible and the panel still
  recognizable.
- Set test: all seven side by side read as one system: same margins, same caption
  block, alternating phone tilts, one dark panel at position 4.
