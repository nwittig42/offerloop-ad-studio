# ATS news supercut: script v1

**Status:** Draft. Needs Nick's approval before generating anchor clips or building the plan.

**Format:** Vertical phone ad (1080x1920, 9:16) for Reels / TikTok / Shorts. News-supercut hook (the "everyone is talking about it" trope), then the Offerloop turn.
**Length:** ~25s. **Audio:** ON. The anchors speak; this is the rare Offerloop cut with sound. Music slams in at the turn (see ad-sound: silence under the hook makes the news audio feel found, not produced).
**Visual bed:** Higgsfield-generated broadcast news clips for the hook (no real footage, fictional stations), real screen recordings from `public/assets/recordings/` for the proof, brand canvas for the close.

## The idea

News anchors keep saying one word: ATS. First an anchor explains it in one sentence, then four different anchors say the word back-to-back, rapid-fire. The repetition makes the enemy feel huge and everywhere. Then the turn: the ATS filters resumes, so stop feeding it paper and reach the human instead. Offerloop's receipt is the reach-hiring-manager recording, a real verified contact and a drafted email. Close on the wordmark.

Named enemy: the applicant tracking system. Offerloop is the way around it.

Legend: **BOLD** = words on screen. *italic* = visual bed. "Quotes" = spoken audio.

---

### 0:00-0:04 The setup (one anchor, one sentence)

*Anchor 1 full frame, center-crop from a 16:9 broadcast look. Desk, studio bokeh, lower-third chyron. Caption words pop on as she speaks (word-by-word kinetic captions, phone style).*

Anchor 1 (spoken): "If you applied online this year, odds are a human never read your resume. It was screened out by the ATS."

**Chyron: RESUMES REJECTED BY SOFTWARE**

### 0:04-0:07 The supercut (4 in a row)

*Four different anchors, four different studios, hard cuts roughly every 0.7s. Each clip is trimmed to just the phrase. Audio butts together with no gaps so the word stacks: ATS. ATS. ATS. ATS.*

Anchor 2 (spoken): "...the ATS."
Anchor 3 (spoken): "...the ATS."
Anchor 4 (spoken): "...applicant tracking systems."
Anchor 5 (spoken): "...the ATS."

*On the fourth cut the frame freezes and desaturates for a beat.*

**THE ATS.** (big center type stamps over the frozen frame)

### 0:07-0:11 The pain, named

*Frozen news frame falls away to dark brand canvas. Kinetic type, one line at a time.*

**It reads your resume before any human does.**
**Most applications never get past it.**

(Claim check for Nick: if we want a hard number here, the commonly cited stats are "over 90% of large companies use an ATS" and "75% of resumes are filtered out." Confirm one before render or keep the soft line above.)

### 0:11-0:15 The turn

*Music kicks in. Canvas flips dark to light. Scout orb pulses in.*

**So stop applying into a black hole.**
**Reach the human on the other side.**

### 0:15-0:21 The receipt

*`reach-hiring-manager.mp4` as a tilted floating panel (PanelStage treatment, emails frosted per the privacy rule). Push-in on the verified contact and the drafted email.*

**Offerloop finds the hiring manager.**
**Verified email. Drafted outreach. Done.**

### 0:21-0:25 Close

*Light canvas, wordmark, quiet outro. Music resolves and cuts.*

**Skip the pile. Reach the person.**
**offerloop.ai**

---

## Production notes

**Anchor clips (5 Higgsfield generations, audio-native model):**

- Use an audio-capable video model (veo-3 class; run `models_explore` action:'recommend' for "photoreal news anchor speaking to camera with native audio" before spending credits).
- Generate 16:9 broadcast framing, anchor dead center, so the vertical center-crop in Remotion keeps the desk and chyron readable. Remotion does all cropping and trimming; no re-generation for edits.
- Five distinct anchors: vary gender, age, ethnicity, studio color temperature (one cool blue network set, one warm morning-show set, one field reporter, etc.) so the supercut reads as "every channel."
- Exact spoken lines as scripted above. For anchors 2 to 5, prompt a short lead-in sentence that lands on the phrase (example: "Recruiters call it the ATS.") so we can trim to just the final words with natural intonation.
- Fictional stations only. Chyron text and bugs must not use or resemble real network names or logos (no CNN, Fox, MSNBC, ABC lookalikes). Use invented bugs like "KJB 7" or "HIRELINE NEWS." No real anchor likenesses.
- No em dashes in any chyron or rendered text; state that in every prompt and zoom-check the chyrons before saving.

**Existing assets used:** `reach-hiring-manager.mp4` (email-mask rule applies, per product-hunt decisions). Optional swap: `apply-to-jobs.mp4` if Nick prefers the apply receipt over the outreach receipt.

**Captions:** word-by-word kinetic captions over all spoken audio (phone viewers watch muted; the hook must work silent too, which is why the supercut also stamps THE ATS as type).

**Open for Nick:**
1. Approve the arc (news hook, 4-in-a-row supercut, reach-the-human turn).
2. Hard stat or soft line at 0:07?
3. Receipt beat: reach-hiring-manager or apply-to-jobs?
4. OK to spend ~5 Higgsfield video generations on the anchor clips?
