# Meta Ad — Script v4 (silent, type-driven, PostSyncer-style)

**Status:** v4 per Nick 2026-07-13: VO removed entirely; opening line changed to "Getting a job is a full-time job in itself." VO lines below are kept as the source for on-screen type only.
**Format:** Master at 16:9 (~60s), cut down to 4:5 / 9:16 / 1:1 for Meta.
**Sound:** No narration. Kinetic on-screen type carries the story (music bed optional, added later as a plan audio track).
**Storyboard:** `plans/storyboards/meta-ad.json` (view with `npm run storyboard`).
**Product footage:** `assets/generated/Offerloop Pricing Student Plans for College Networking 13 July 2026.mp4` (content-area crop; see manifest for shot map).
**Still needed from Nick:** VO recording of all lines; desk timelapse (B3); founder piece to camera (B9a); laptop close + golden-hour walk-out (B9b).

---

## Act 1: The busywork (0:00 to 0:16)

**B1 (0:00 to 0:06)**
Type (cold open, nothing else on screen): **Getting a job** / **is a *full-time job* in itself.** — "full-time job" in primary blue.
Visual: the line holds alone on brand background for ~2s, then glides to the top as the browser window slams in from below and tabs spawn fast: LinkedIn Jobs, Google Sheets "Job Tracker", ChatGPT cover letter, Gmail. The chaos is the proof of the claim.
Source: Remotion mock browser component (`browserTabsPain`).

**B2 (0:06 to 0:11) — busywork tab montage**
Rapid-fire montage inside one browser window, PostSyncer tab feel: the active tab jumps on every HARD cut (no fades), ~1.25s per tab, ~5s total. The feeling is overwhelm.
1. **Job board** — fast doomscroll down a listings page, roles flying by (Higgsfield-generated page capture, Remotion scroll).
2. **Networking tracker — Google Sheets** — endless downward scroll: names, companies, status, last contacted; it never ends (Remotion-built sheet).
3. **LinkedIn profile** — fully populated profile, quick hunt-for-a-contact scan (Higgsfield-generated capture, Remotion pan).
4. **ChatGPT** — the same cold email re-prompted over and over, "Draft 8 · still not right", Regenerate flashing (Remotion typing loop).

**B2b (0:11 to 0:13) — land the joke** *(Nick films)*
Live action: Nick at the desk, head hitting the table while the ChatGPT rewrite grinds on screen. Placeholder title in the plan until footage lands in `assets/recordings/`.

**B3 (0:10 to 0:16)**
VO: "Hundreds of hours wasted on boring, repetitive work to get that offer."
Type: **Hundreds of hours.** big kinetic stamp.
Visual: timelapse of Nick at his desk, day to night, coffee cups accumulating. Insert card: iOS-style screen time report, "LinkedIn 11h · Sheets 6h · ChatGPT 9h".
Source: Nick films timelapse; screen time card is Remotion.

## Act 2: The turn (0:16 to 0:24)

**B4 (0:16 to 0:20)**
VO: "Instead, let Scout take care of it."
Visual: every tab, sheet and doc sweeps off screen, leaving one clean Offerloop window on brand background `#F5F6F8`. Beat of calm.
Source: Remotion.

**B5 (0:20 to 0:24)**
VO: none (music swell).
Visual: Offerloop wordmark assembles letter by letter, hero card: **Search. Reach out. Get hired.**
Source: Remotion, existing wordmark SVG.

## Act 3: Three "done" beats (0:24 to 0:44)

**B6 (0:24 to 0:31)**
VO: "Need to apply to something? On it."
Visual: tilted 3D product UI, job card swipes right, green stamp **ON IT ✓**.
Source: walkthrough footage (Job Board / Applications section) or Remotion mock.

**B7 (0:31 to 0:38)**
VO: "Find and email people at a company? Done."
Visual: "Who do you want to meet?" search types itself ("Auditor at EY in Portland" beat exists in footage), contact cards fan out with school badges, drafts write themselves, "Placing drafts in your Gmail..." moment, stamp **DONE ✓** (bigger).
Source: walkthrough footage ~120s to 185s.

**B8 (0:38 to 0:44)**
VO: "It'll even find the exact hiring manager for the position. Done."
Visual: My Network "Hiring Managers 23" tab, one contact card zooms in, "Hiring Manager" badge glints, Gmail draft fires off, stamp **DONE ✓** (biggest, screen-filling).
Source: walkthrough footage ~32s + ~60s (Inbox hiring managers tab) or Remotion mock.

## Act 4: Founders and close (0:44 to 1:00)

**B9 (0:44 to 0:52)**
VO: "As college students, we built this for ourselves, to save time on the job search. Now anyone can land their dream job in a fraction of the time."
Visual: first half, Nick on camera, casual, talking to the lens, lower-third "Nick · cofounder". On "Now anyone can", cut to Nick closing the laptop and walking out into golden hour.
Source: Nick films both shots.

**B10 (0:52 to 0:56)**
VO: "Get your time back."
Type: **Get your time back.**
Visual: the Act 1 screen time card returns with tiny numbers: "Job hunt: 40 min this week." Optional: the desk timelapse running in reverse behind it.
Source: Remotion.

**B11 (0:56 to 1:00)**
VO: "Use Offerloop."
Visual: end card, Offerloop wordmark, summit scout peeking, **offerloop.ai**.
Source: Remotion, existing Figma assets.

---

## Cutdown notes (Meta)

- 9:16 / 4:5: B1+B3 hook, one done-beat, B10+B11 close makes the 15s cut. Type scales up, UI shots re-crop device-tall.
- Keep every beat ≤ 6s; B1 must work as a self-contained hook.

## Claims to verify before paid spend

- "Hundreds of hours" — find citable source or soften to "hours every week".

## Archive: Nick's draft v1 (verbatim)

There's a lot of busy work when it comes to getting a job. Finding the job, writing the cover letter, resume, emailing and networking, and even applying to the job. Experts say the average person in the job hunt spends 8 hours a week minimum to land a competitive role and this can last for months.

Instead let scout take care of it. Need to apply to something, Scout does it instantly. Find and email people in companies, done. Even emailing the hiring manager.

Get your time back while outcompeting your peers and landing your dream job.

Use offerloop.
