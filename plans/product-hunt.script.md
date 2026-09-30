# Product Hunt launch film: script v1

**Status:** Approved structure (Nick, 2026-07-20). Ready to map footage.

> **Build reconciliation (2026-07-20, evening).** Shot the 7 real recordings and
> built `plans/product-hunt.plan.ts` + composition `ProductHuntLaunch`. Nick's
> locked calls after seeing the footage:
> - **Decoupled data spine.** The recordings each demo a different real company
>   (Roblox / Kevin Jiang, Cresta / joshua levin, Goldman / dave han, mixed job
>   board), not one Stripe/PM hero. Film stays silent + benefit-framed, so
>   on-screen lines are company-agnostic and each clip carries its own receipt.
>   No re-record. (Original Stripe data spine below is superseded.)
> - **Capability run is 6 beats**, not 8: Apply, Find people, Reach hiring
>   manager, Cover letter, Prep, Track. **Research-the-company cut** (Nick: skip
>   it). **Tailor-resume cut** (feature not working). The 3 numbers ride in
>   Apply (500,000) / Find (2.2 billion) / Reach (3 million).
> - **Privacy: mask emails only.** Real third-party emails are frosted in the
>   panel (find/reach/track); names + companies stay visible.
> - **Cover-letter clip (2.75s)** slowed to 0.5x in Remotion, no re-record.
> - Look: recordings float as tilted browser panels (-8 / +6) over a drifting
>   brand-canvas glow; framing beats share the same light canvas. Runtime ~44s.
>
> **Open for Nick before final export:** confirm the 3 numbers (500k / 2.2B /
> 3M); the pain beat currently reuses a ChatGPT-tab grab as "the old way."
**Format:** "Introducing X" product film (see ad-story-structure Format 1), compressed for Product Hunt.
**Length:** ~50s. **Audio:** none. All words appear on screen (silent, kinetic text).
**Visual bed:** hybrid. Real product screen recordings under the capability run, brand-canvas kinetic type for the framing beats. Cinematic tilt / zoom / push-in / glow added in Remotion (record footage flat and crisp; motion is added in post).

## The idea

The first AI agent that job hunts for you. Name the product early, show the eight
things it does as one fast capability run, claim the category ("the entire job
search") as the last words on screen. The three scale numbers ride inside the
capability lines as user benefit ("apply to any of 500,000 jobs"), never as a stat wall.

## Data spine (identical across every clip)

The film should feel like one continuous job hunt, not ten unrelated screens.

| Field | Use |
|---|---|
| Seeker | Nick's real resume, real USC profile |
| Request typed | `Apply to Product Manager roles in San Francisco` |
| Hero company | Stripe (recognizable, SF, hires PMs) |
| Hero role | Product Manager, Stripe, San Francisco |
| Hero person | The real contact the product returns for that search. Reuse the same person in Find People, Reach, Cover Letter, and Prep. Do not invent one. |
| Emails | Real verified emails the product returns (that is the receipt). Mask domain only if privacy requires. |

## Numbers (confirm accuracy before final render)

- 500,000 open jobs
- 2.2 billion professionals (our database)
- 3 million recruiters

Legend: **BOLD** = words on screen. *italic* = visual bed under them.

---

### 0:00-0:07 Name it (the hook)
*Brand canvas, faint glow, Scout orb pulses in. Kinetic type.*
> **The first AI agent**
> **that job hunts for you.**

*Beat. Wordmark resolves:*
> **Offerloop**

### 0:07-0:12 The old way (pain)
*Fast, slightly desaturated real footage: tab-switching, a job board, an application form, an empty inbox.*
> **The old way: hours of tabs.**
> **Then silence.**

### 0:12-0:18 The turn
*Real Scout dashboard, "What should we work on today?". Cursor into the prompt box, typing the request.*
> **Now you just say what you want.**
> **Scout does the rest.**

### 0:18-0:38 The capability run (the eight, ~2.2s each)
*Real product footage under each line where it exists, SaaS kinetic cards where it does not. One card lights up at a time.*

Shipped 6-beat run (see reconciliation note above). On-screen text is
company-agnostic; the real receipt runs underneath each line.

| # | On screen (as shipped) | Real clip + receipt |
|---|-----------|-----------|
| 1 | **Apply to any of 500,000 jobs.** | apply-to-jobs: applications Running then Submitted |
| 2 | **Find anyone. 2.2 billion professionals.** | find-people: Kevin Jiang / Roblox card (email masked) |
| 3 | **Reach 3 million recruiters.** | reach-hiring-manager: joshua levin / Cresta card (email masked) |
| 4 | **A cover letter that reads like you.** | write-cover-letter: generated letter + PDF (0.5x slow) |
| 5 | **Walk into every coffee chat prepped.** | prep-coffee-chat: branded Meeting Prep + "Prep Ready" |
| 6 | **Track every contact and conversation.** | track-everything: inbox pipeline CRM (email masked) |

*Cut: "Know the company before you reach out" (Research, no footage, Nick cut) and "Tailor your resume" (feature not working).*

Original 8-line plan (superseded, kept for reference):

| # | On screen | Visual bed |
|---|-----------|-----------|
| 1 | **Apply to any of 500,000 jobs.** | swipe then apply |
| 2 | **Find their contact info in our database of 2.2 billion professionals.** | contacts list with real emails |
| 3 | **Email any of 3 million recruiters.** | draft then send |
| 4 | **Know the company before you reach out.** | company intel view |
| 5 | **Get a cover letter, personalized.** | cover letter generate |
| 6 | **Tailor your resume to any job.** | resume match |
| 7 | **Walk into every coffee chat prepped.** | prep doc ("why you two connect") |
| 8 | **Track every contact and conversation.** | tracker grid with status pills |

### 0:38-0:44 The instant payoff
*All eight cards pull back into one grid, indigo glow sweeps across, collapses to one line.*
> **Eight capabilities. One agent.**
> **All of it, instantly.**

### 0:44-0:50 Close (category claim, last words)
*Brand canvas, mountain ridge, wordmark.*
> **One assistant. The entire job search.**
> **offerloop.ai**

---

## Footage to record (10 clips, flat and crisp, 1920x1080+, 5-7s each)

Record flat and steady. Cinematic motion is added in Remotion. Each clip ends on the finished result (the receipt).

**Batch A (setup + research half)**
1. The turn: dashboard, type `Apply to Product Manager roles in San Francisco`.
2. Apply to jobs: select 2-3 real PM roles, apply. Ends on "Applied".
3. Find people at Stripe: run people search. Ends on contacts + real emails.
4. Reach the hiring manager: open the Stripe PM role, surface who owns it.
5. Research the company: open Stripe intel. Ends on overview filled in.

**Batch B (outreach + close half)**
6. Cover letter: generate for the Stripe PM role. Ends on finished letter, Stripe + person named.
7. Tailor resume: tailor to the Stripe PM JD. Ends on match state.
8. Prep for coffee chat: open prep doc for the hero person. Ends on "Why you two connect".
9. Track everything: scroll the tracker. Ends on grid with status pills.
10. Outreach draft/send: open the drafted email, send. Ends on sent/queued state.

**Framing clips (lower stakes)**
- The grind: real tab-switching (may reuse `Google Chrome.mp4`).
- The empty inbox: Gmail with no replies. Short.

The hook, the instant-payoff grid, and the closing tagline need no footage. Built in Remotion on the brand canvas.
