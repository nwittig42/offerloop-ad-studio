---
theme: default
title: Offerloop Classroom Demo
info: "Offerloop classroom demo deck: web-native rebuild of the original .pptx"
colorSchema: dark
transition: fade
fonts:
  serif: Lora
  sans: Inter
defaults:
  layout: none
mdc: true
---

<!-- Slide 1 · Title -->

<div class="slide" :style="{backgroundImage: 'url(/assets/decks/classroom-demo/s07-00-2d509e53.png)', backgroundSize: 'cover'}">
  <div class="content grid grid-cols-[3fr_2fr] items-center gap-12">
    <div>
      <h1 class="serif text-6xl leading-tight text-warm">The fully autonomous job-search assistant.</h1>
      <p class="mt-8 text-xl text-muted max-w-130">Offerloop finds the roles, finds the people, writes the outreach in your voice, and tracks every conversation, so you land better offers, faster.</p>
      <p class="mt-16 text-sm text-muted" style="text-shadow: 0 1px 14px #0D1424, 0 0 6px #0D1424">Presented by <span class="text-warm">[Your name]</span> · Offerloop Campus Ambassador</p>
    </div>
    <div class="flex justify-center">
      <img src="/assets/decks/classroom-demo/s01-02-1eac6328.png" class="w-72 drop-shadow-2xl" />
    </div>
  </div>
</div>

---

<!-- Slide 2 · The job search today -->

<div class="slide">
  <div class="content">
    <p class="eyebrow">THE JOB SEARCH TODAY</p>
    <h1 class="serif text-5xl text-warm mt-2">Apply. Wait. Get ghosted. <em class="accent">Repeat.</em></h1>
    <div class="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-4 mt-14">
      <div class="card"><p class="num">01</p><p class="card-title">Find a posting</p><p class="card-sub">Scroll job boards for hours looking for a fit.</p></div>
      <div class="arrow">→</div>
      <div class="card"><p class="num">02</p><p class="card-title">Submit &amp; hope</p><p class="card-sub">You're application #4,000 in a stack of 12,000.</p></div>
      <div class="arrow">→</div>
      <div class="card"><p class="num">03</p><p class="card-title">Wait weeks</p><p class="card-sub">An algorithm screens you before a person ever does.</p></div>
      <div class="arrow">→</div>
      <div class="card"><p class="num">04</p><p class="card-title">Silence</p><p class="card-sub">No reply. Back to square one.</p></div>
    </div>
    <p class="serif text-2xl text-warm mt-14 text-center">Applying harder doesn't fix this.</p>
  </div>
</div>

---

<!-- Slide 3 · 12,000 applicants -->

<div class="slide">
  <div class="content grid grid-cols-2 items-center gap-10">
    <div>
      <p class="eyebrow">THE REALITY OF THE JOB MARKET</p>
      <h1 class="serif text-8xl text-warm mt-4">12,000</h1>
      <p class="text-xl text-muted mt-4 max-w-100">applicants for the average entry-level role, at the 50 biggest companies in the world.</p>
      <p class="serif text-2xl accent mt-12">So how do you stand out?</p>
    </div>
    <Crowd />
  </div>
</div>

---

<!-- Slide 4 · Stand out through people -->

<div class="slide">
  <div class="content">
    <h1 class="serif text-5xl text-warm max-w-190">You don't stand out on paper.<br/>You stand out <em class="accent">through people.</em></h1>
    <p class="text-xl text-muted mt-6 max-w-160">Referrals and warm intros are the real front door. The people who land the offer aren't the best applicants. They're the ones who built a connection first.</p>
    <div class="grid grid-cols-2 gap-8 mt-14 max-w-180">
      <div class="card text-center py-10"><p class="serif text-7xl accent">52×</p><p class="card-sub mt-3">more likely to get hired through a referral or personal connection</p></div>
      <div class="card text-center py-10"><p class="serif text-7xl accent">&lt;1%</p><p class="card-sub mt-3">of job seekers actually get a referral before they apply</p></div>
    </div>
  </div>
</div>

---

<!-- Slide 5 · 200 hours -->

<div class="slide">
  <div class="content">
    <p class="eyebrow">BUT CONNECTING TAKES TIME</p>
    <h1 class="serif text-5xl text-warm mt-2">A recruiting cycle eats <em class="accent">200 hours</em> of your life.</h1>
    <p class="text-lg text-muted mt-4 max-w-160">180 of those 200 hours is busywork a computer could do. Offerloop does it in minutes.</p>
    <div class="mt-8 flex items-end gap-5">
      <div class="bar" style="--h: 150px"><span>80h</span><label>Outreach</label></div>
      <div class="bar" style="--h: 94px"><span>50h</span><label>Research</label></div>
      <div class="bar" style="--h: 75px"><span>40h</span><label>Applications</label></div>
      <div class="bar" style="--h: 38px"><span>20h</span><label>Tracking</label></div>
      <div class="bar bar-keep" style="--h: 19px"><span>10h</span><label>Interviews</label></div>
      <div class="ml-10 self-center">
        <p class="serif text-3xl text-warm">180h of busywork,<br/><em class="accent">automated.</em></p>
        <p class="text-sm text-dim mt-4">15 min to write one personalized email<br/>2 hrs of work for a single reply</p>
      </div>
    </div>
  </div>
</div>

<style>
.bar { width: 110px; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; }
.bar span { color: var(--warm); font-family: Lora, serif; font-size: 1.3rem; margin-bottom: .4rem; }
.bar::before { content: ''; display: block; width: 100%; height: var(--h); border-radius: 10px 10px 4px 4px;
  background: linear-gradient(180deg, #4A60A8, #2A3A6E); box-shadow: 0 0 30px #4A60A855; order: 1; }
.bar label { color: var(--dim); font-size: .85rem; margin-top: .6rem; order: 2; }
.bar-keep::before { background: linear-gradient(180deg, #B6C3E8, #8FA3D8); box-shadow: 0 0 30px #B6C3E877; }
</style>

---

<!-- Slide 6 · Scout reveal -->

<div class="slide" :style="{backgroundImage: 'url(/assets/generated/scout-voice-campus/scout-orb-hero-dark-notagline-v1.png)', backgroundSize: 'cover', backgroundPosition: 'center'}">
  <div class="content flex flex-col items-center justify-end h-full pb-14">
    <p class="text-xl text-muted">Your fully autonomous copilot.</p>
  </div>
</div>

---

<!-- Slide 7 · Meet Scout · chat -->

<div class="slide" :style="{backgroundImage: 'url(/assets/decks/classroom-demo/s07-00-2d509e53.png)', backgroundSize: 'cover'}">
  <div class="content grid grid-cols-[5fr_4fr] items-center gap-10">
    <div>
      <p class="eyebrow">MEET SCOUT · YOUR COPILOT</p>
      <h1 class="serif text-5xl text-warm mt-2">Just describe what you're <em class="accent">after.</em></h1>
      <p class="text-lg text-muted mt-5 max-w-120">Tell Scout what you want in plain English: a role, a company, a person. It does the busywork of finding the people, writing the outreach, and tracking every conversation.</p>
      <div class="flex gap-3 mt-8">
        <span class="pill">Jobs</span><span class="pill">Hiring managers</span><span class="pill">People</span><span class="pill">Companies</span>
      </div>
      <div class="databar mt-10">
        <span class="eyebrow mr-5">THE DATA ENGINE</span>
        <span class="stat">2.2B <label>contacts</label></span>
        <span class="stat">3M+ <label>recruiters</label></span>
        <span class="stat">300K <label>live jobs</label></span>
      </div>
    </div>
    <div class="relative pl-6">
      <img src="/assets/decks/classroom-demo/s01-02-1eac6328.png" class="absolute -left-14 -bottom-6 w-26 z-10" />
      <div class="chat">
        <p class="serif text-lg text-slate-800 mb-3">Ask Scout</p>
        <div class="bubble-user">Hey, go ahead and apply to all 15.</div>
        <div class="bubble-scout">On it, applying to 15 matched roles now…</div>
        <div class="job"><span class="mono">MW</span><div><b>Technology Intern</b><i>Marshall Wace</i></div><em>✓ Applied</em></div>
        <div class="job"><span class="mono">1X</span><div><b>AI Residency Intern</b><i>1X</i></div><em>✓ Applied</em></div>
        <div class="job"><span class="mono">Ai</span><div><b>Growth Account Executive</b><i>Airbyte</i></div><em>✓ Applied</em></div>
        <p class="text-xs text-slate-400 mt-2 ml-1">+ 12 more in queue…</p>
        <div class="input">Ask Scout anything…<span>➤</span></div>
      </div>
    </div>
  </div>
</div>

<style>
.chat { background: #fff; border-radius: 16px; padding: 18px 20px; box-shadow: 0 20px 80px #B6C3E833, 0 2px 8px #0008; }
.bubble-user { background: #4A60A8; color: #fff; border-radius: 12px 12px 2px 12px; padding: 8px 14px; font-size: .85rem; margin-left: 3rem; }
.bubble-scout { background: #EEF1FA; color: #1E2D4D; border-radius: 12px 12px 12px 2px; padding: 8px 14px; font-size: .85rem; margin: 10px 3rem 12px 0; }
.job { display: flex; align-items: center; gap: 10px; border: 1px solid #E5E9F4; border-radius: 10px; padding: 8px 12px; margin-top: 8px; }
.job .mono { width: 30px; height: 30px; border-radius: 50%; background: #EEF1FA; color: #4A60A8; display: flex; align-items: center; justify-content: center; font-size: .7rem; font-weight: 700; }
.job b { display: block; color: #1E2D4D; font-size: .82rem; }
.job i { color: #7A87A8; font-size: .72rem; font-style: normal; }
.job em { margin-left: auto; background: #E4F5E9; color: #1E7C3C; font-size: .68rem; font-style: normal; padding: 3px 10px; border-radius: 99px; }
.job div { line-height: 1.2; }
.input { display: flex; align-items: center; justify-content: space-between; border: 1px solid #E5E9F4; border-radius: 10px; padding: 8px 12px; margin-top: 12px; color: #9AA5C0; font-size: .8rem; }
.input span { background: #4A60A8; color: #fff; border-radius: 8px; padding: 2px 10px; }
.databar { display: inline-flex; align-items: center; width: fit-content; background: #0D1424cc; backdrop-filter: blur(6px); border: 1px solid #ffffff20; border-radius: 12px; padding: 10px 16px; }
.stat { color: var(--warm); font-family: Lora, serif; font-size: 1rem; margin-right: 1.1rem; white-space: nowrap; }
.stat:last-child { margin-right: 0; }
.stat label { color: var(--dim); font-family: Inter, sans-serif; font-size: .72rem; margin-left: .3rem; }
</style>

---

<!-- Slide 8 · Scout can · feature grid -->

<div class="slide">
  <div class="content">
    <p class="eyebrow">SCOUT CAN</p>
    <h1 class="serif text-5xl text-warm mt-2">One assistant. <em class="accent">The entire job search.</em></h1>
    <div class="grid grid-cols-4 gap-5 mt-12">
      <div class="card hero"><p class="ico">💼</p><p class="card-title">Apply to jobs</p><p class="card-sub">Find roles that fit &amp; apply</p></div>
      <div class="card"><p class="ico">🔍</p><p class="card-title">Find people at companies</p><p class="card-sub">Names + verified emails</p></div>
      <div class="card"><p class="ico">🎯</p><p class="card-title">Reach the hiring manager</p><p class="card-sub">Find who owns the role</p></div>
      <div class="card"><p class="ico">🏢</p><p class="card-title">Research companies</p><p class="card-sub">Know them before you reach out</p></div>
      <div class="card"><p class="ico">☕</p><p class="card-title">Prep for meetings</p><p class="card-sub">Walk in confident</p></div>
      <div class="card"><p class="ico">✍️</p><p class="card-title">Write a cover letter</p><p class="card-sub">Personalized in seconds</p></div>
      <div class="card"><p class="ico">📄</p><p class="card-title">Tailor your resume</p><p class="card-sub">Match any job description</p></div>
      <div class="card"><p class="ico">👥</p><p class="card-title">Track everything</p><p class="card-sub">Contacts &amp; conversations</p></div>
    </div>
  </div>
</div>

---

<!-- Slide 9 · Testimonials -->

<div class="slide">
  <div class="content">
    <p class="eyebrow">IN THEIR WORDS</p>
    <h1 class="serif text-5xl text-warm mt-2">From zero to a FedEx offer <em class="accent">in one month.</em></h1>
    <div class="grid grid-cols-[3fr_2fr] gap-8 mt-12">
      <div class="card">
        <div class="flex items-center gap-4">
          <div class="avatar">DJ</div>
          <div><p class="card-title">David Ji</p><p class="card-sub">Junior · International Relations · USC</p></div>
        </div>
        <div class="grid grid-cols-2 gap-6 mt-6">
          <div><p class="serif text-4xl accent">1 month</p><p class="card-sub">from first use to offer</p></div>
          <div><p class="serif text-4xl accent">Tons</p><p class="card-sub">of coffee chats secured</p></div>
        </div>
      </div>
      <div class="flex flex-col gap-5">
        <div class="card"><p class="text-sm text-warm italic">“Probably sent 500 emails with this thing. Couldn't imagine doing that myself.”</p><p class="card-sub mt-2">Luke Brooks</p></div>
        <div class="card"><p class="text-sm text-warm italic">“It made me much more confident and productive. Started landing interviews weeks after using it.”</p><p class="card-sub mt-2">Dylan Roby</p></div>
      </div>
    </div>
  </div>
</div>

---

<!-- Slide 10 · Do it with me -->

<div class="slide">
  <div class="content text-center flex flex-col items-center justify-center h-full">
    <p class="eyebrow">DO IT WITH ME</p>
    <h1 class="serif text-6xl text-warm mt-3">Grab your laptop. <em class="accent">Let's set up Scout.</em></h1>
    <p class="text-xl text-muted mt-5">Two steps, about sixty seconds. Open Chrome and follow along.</p>
    <div class="flex gap-8 mt-14">
      <div class="card w-70 py-8"><p class="serif text-5xl accent">1</p><p class="card-title mt-2">Add the extension</p></div>
      <div class="card w-70 py-8"><p class="serif text-5xl accent">2</p><p class="card-title mt-2">Create your account</p></div>
    </div>
  </div>
</div>

---

<!-- Slide 11 · Step one -->

<div class="slide">
  <div class="content grid grid-cols-[3fr_2fr] items-center gap-12">
    <div>
      <p class="eyebrow">01 · STEP ONE</p>
      <h1 class="serif text-5xl text-warm mt-2">Add the <em class="accent">extension</em></h1>
      <div class="flex flex-col gap-5 mt-10">
        <div class="step"><span>1</span>Open the Chrome Web Store</div>
        <div class="step"><span>2</span>Search “Offerloop”, look for the loop mark</div>
        <div class="step"><span>3</span>Click <b>&nbsp;Add to Chrome → Add extension&nbsp;</b>, then pin it</div>
      </div>
    </div>
    <div class="qr">
      <div class="qr-box">QR<br/>CODE</div>
      <p class="card-sub mt-4 text-center">Scan to open the Web Store</p>
    </div>
  </div>
</div>

---

<!-- Slide 12 · Step two -->

<div class="slide">
  <div class="content grid grid-cols-[3fr_2fr] items-center gap-12">
    <div>
      <p class="eyebrow">02 · STEP TWO</p>
      <h1 class="serif text-5xl text-warm mt-2">Create your <em class="accent">account</em></h1>
      <div class="flex flex-col gap-5 mt-10">
        <div class="step"><span>1</span>Go to <b>&nbsp;offerloop.ai&nbsp;</b> and click Sign up</div>
        <div class="step"><span>2</span>Use your school email and connect Gmail</div>
        <div class="step"><span>3</span>You're in, free to start. Say hi to Scout</div>
      </div>
    </div>
    <div class="qr">
      <div class="qr-box">QR<br/>CODE</div>
      <p class="card-sub mt-4 text-center">Scan to sign up at offerloop.ai</p>
    </div>
  </div>
</div>

---

<!-- Slide 13 · Watch it work -->

<div class="slide">
  <div class="content grid grid-cols-[3fr_2fr] items-center gap-12">
    <div>
      <p class="eyebrow">WATCH IT WORK</p>
      <h1 class="serif text-5xl text-warm mt-2">Now the fun part, <em class="accent">do it with me.</em></h1>
      <div class="flex flex-col gap-5 mt-10">
        <div class="step"><span>1</span>Capture a contact from a profile, one click</div>
        <div class="step"><span>2</span>Draft a personalized email in your voice</div>
        <div class="step"><span>3</span>Send it via Gmail, then try it yourself</div>
      </div>
    </div>
    <div class="flex justify-center">
      <img src="/assets/decks/classroom-demo/s13-11-f05082a1.png" class="h-100 rounded-xl shadow-2xl" />
    </div>
  </div>
</div>
