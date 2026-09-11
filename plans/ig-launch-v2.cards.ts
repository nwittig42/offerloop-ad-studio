/**
 * ig-launch-v2 carousel cards. Script and rationale: ig-launch-v2.script.md.
 *
 * One entry per slide, rendered by the IgLaunchCard still (src/compositions).
 * `slug` becomes the filename the preview server sorts on, so the order here
 * is the deck order - starting at deck position 2, because card 1 is the
 * lifted-type cover that tools/carousel/cover.py builds.
 *
 * The hook and hook-again cards are the deck's bookend and were deliberately
 * identical. They still say the same sentence, but they no longer match:
 * hook is the motion card, set title case and censored ('Networking is a Pain
 * in the A**'), while hook-again is a still, lowercase and uncensored
 * ('networking is a pain in the ass.'). Nick asked for slide 2 only, so
 * whether hook-again follows it is his call.
 */
/** One phone in the slide-3 row: a still by default, a clip with `video`. */
export type PhoneSlot = {src: string; video?: boolean};

export type CardCopy = {
  slug: string;
  /** Small line above the headline, set in Inter, uppercase and tracked out. */
  eyebrow?: string;
  /** The Lora headline. Line breaks are authored, not wrapped. */
  headline?: string[];
  /** Headline size in px; defaults to 92. */
  size?: number;
  /** Inter lines under the headline. */
  support?: string[];
  /** Draw the lockup above the headline (the intro card). */
  mark?: boolean;
  /**
   * A square slot under the headline for a screen recording, sized off the
   * reference card Nick sent: 600x600, which is 55% of the frame width, the
   * same proportion that card gives its media block.
   *
   * With no `src` it renders as a labelled dashed placeholder, so the deck can
   * be laid out and reviewed before the footage exists. Give it a `src` under
   * public/ and it renders the real thing.
   */
  media?: {src?: string; label?: string};
  /**
   * Renders this card as a motion card instead of a still: the clip plays
   * full-bleed as the ground, headline reversed out in white over a navy
   * scrim, revealed word by word. See src/compositions/IgLaunchHookCard.tsx.
   */
  video?: {
    src: string;
    durationSec: number;
    /**
     * Frame the deck's `<n>-<slug>.png` poster is grabbed at. The preview
     * server only renders images, so this still is what 3131 shows for the
     * slide - it has to be a frame where the headline has finished popping in,
     * not frame 0.
     */
    posterFrame: number;
  };
  /**
   * 'phones' is the row of three with the `video` clip in the middle one,
   * headline group above and copy below, per the reference Nick sent
   * (IgLaunchPhonesCard). 'phone' is one hero phone with headline and support
   * stacked above it (IgLaunchPhoneCard).
   */
  layout?: 'phones' | 'phone';
  /**
   * The outer two phones. Either can hold a clip as well as a still, so set
   * `video: true` when `src` is an mp4. The middle phone always plays the
   * card's own `video.src`. Any clip here should be the same length as the
   * card, or it will loop out of step with it.
   */
  phones?: {left: PhoneSlot; right: PhoneSlot};
};

/** Deck position of the first entry below; card 1 is the cover from cover.py. */
export const IG_LAUNCH_CARD_OFFSET = 2;

export const igLaunchV2Cards: CardCopy[] = [
  {
    // Deck position 2, and the only motion card: the desk timelapse plays
    // behind the line rather than the mesh ground, with a spinning clock
    // watermarked between the two. Nick's casing and his asterisks, kept as he
    // wrote them - note the rest of the deck sets its headlines lowercase.
    slug: 'hook',
    headline: ['Networking is a', 'Pain in the A**'],
    size: 96,
    video: {
      src: 'assets/clips/desk-timelapse-carousel-5s.mp4',
      durationSec: 5,
      posterFrame: 100,
    },
  },
  {
    // Deck position 3. Nick's 'so we built' replaces 'introducing', and the
    // group moves to the top of the card to clear room for the phone row.
    // The Eyebrow component uppercases, so this reads as SO WE BUILT.
    //
    // The old headline and support copy are all still here, just moved below
    // the phones into one block, which is where the reference card puts its
    // copy. Nothing was cut.
    slug: 'intro',
    eyebrow: 'so we built',
    mark: true,
    headline: ['a dating app for', 'professional connections.'],
    size: 46,
    support: ['swipe, and it emails them.', 'introducing you.'],
    layout: 'phones',
    // Middle phone: the swipe itself, which is the motion worth putting in
    // the centre - cards flying off to Passed and to Drafting your email.
    video: {
      src: 'assets/recordings/app-swipe-draft.mp4',
      durationSec: 5,
      posterFrame: 64,
    },
    // Left is the Scout prompt being typed (it was the middle phone until the
    // swipe clip arrived), right is the inbox those drafts land in. Both
    // clips are cut to exactly 5s so all three phones loop in step.
    phones: {
      left: {src: 'assets/recordings/scout-prompt-typing.mp4', video: true},
      right: {src: 'assets/generated/offerloop-phone-inbox-still.png'},
    },
  },
  {
    // Deck position 4. Headline is unchanged - Nick named the slide by this
    // copy rather than rewriting it - and the cover-letter line is new below
    // it. The dashed media placeholder is gone: this is a motion card now,
    // with his Apply-tab capture in one hero phone.
    //
    // Note the clip shows the swipe-to-apply flow (APPLY stamp, 'Applying for
    // you'), not a cover letter being written; nowhere in the source recording
    // does a cover letter appear on screen.
    slug: 'apply',
    headline: ['or swipe, and it', 'applies to the job.'],
    size: 72,
    support: ['it even writes a custom cover letter'],
    layout: 'phone',
    video: {
      src: 'assets/recordings/app-apply-autoapply.mp4',
      durationSec: 5,
      posterFrame: 30,
    },
  },
  {
    slug: 'search',
    headline: ['search and', 'find anyone.'],
    size: 104,
    media: {label: 'a search, typed'},
  },
  {
    slug: 'scale',
    headline: ['ANYONE.'],
    size: 168,
    support: ['1.5 billion contacts.'],
  },
  {
    // The one card that most needs its receipt: a real drafted email with the
    // shared detail visible in it proves the claim the words only assert.
    slug: 'personal',
    headline: ['it finds what you', 'actually have in common.'],
    size: 76,
    media: {label: 'a drafted email'},
  },
  {
    slug: 'hook-again',
    headline: ['networking is', 'a pain in the ass.'],
    size: 104,
  },
  {
    slug: 'payoff',
    headline: ["now it's not."],
    size: 128,
  },
  // The last card is the spinning mark, rendered by IgLaunchOutro rather than
  // from this list; it carries no type at all.
];
