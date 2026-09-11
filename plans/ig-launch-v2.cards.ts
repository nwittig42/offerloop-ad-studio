/**
 * ig-launch-v2 carousel cards. Script and rationale: ig-launch-v2.script.md.
 *
 * One entry per slide, rendered by the IgLaunchCard still (src/compositions)
 * unless the card sets `layout`. `slug` becomes the filename the preview
 * server sorts on, so the order here is the deck order, starting at deck
 * position 1: the lifted-type cover that used to hold that slot was cut at
 * Nick's request. tools/carousel/cover.py still exists and still works, it
 * just is not part of the deck any more.
 *
 * The deck used to bookend: a hook-again card repeating slide 1, then a
 * "now it's not." payoff. Both were cut at Nick's request, so the deck now
 * runs hook, product, proof, mark, with no restatement and no payoff line.
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
    /** Omitted by the 'globe' layout, which draws its animation in place. */
    src?: string;
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
   * Substrings of `headline` to tint red. Matched per line, longest first, so
   * overlapping phrases cannot double-tint. Same idea as the plan schema's
   * hookText `highlight`.
   */
  redParts?: string[];
  /** Still image for the 'image' layout. */
  image?: {src: string};
  /**
   * 'phones' is the row of three with the `video` clip in the middle one,
   * headline group above and copy below, per the reference Nick sent
   * (IgLaunchPhonesCard). 'phone' is one hero phone with headline and support
   * stacked above it (IgLaunchPhoneCard).
   */
  layout?: 'phones' | 'phone' | 'panel' | 'globe' | 'image';
  /**
   * The outer two phones. Either can hold a clip as well as a still, so set
   * `video: true` when `src` is an mp4. The middle phone always plays the
   * card's own `video.src`. Any clip here should be the same length as the
   * card, or it will loop out of step with it.
   */
  phones?: {left: PhoneSlot; right: PhoneSlot};
};

/**
 * Deck position of the first entry below. 1 since the cover was cut; the
 * outro that follows these cards is position 9.
 */
export const IG_LAUNCH_CARD_OFFSET = 1;

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
    // Deck position 4. Desktop capture, not a phone one: the Chrome extension
    // open on a LinkedIn profile, pulling people at the same firm. So it takes
    // the landscape panel layout rather than a phone frame, and the dashed
    // media placeholder is gone.
    //
    // 4s, where the other motion cards run 5s. Nick asked for a cut from 12s
    // at 3x; the source ends at 23.08s, leaving 11.08s, so 3x would have made
    // 3.69s. Speed is 2.77x instead to hit the 4s he asked for.
    slug: 'search',
    headline: ['search and', 'find anyone.'],
    size: 104,
    layout: 'panel',
    video: {
      src: 'assets/recordings/extension-find-lead.mp4',
      durationSec: 4,
      posterFrame: 24,
    },
  },
  {
    // Deck position 5. ANYONE. in white over the LA-to-globe animation, which
    // is the card's whole ground rather than a panel on it, with the count in
    // red near the foot. 7s, the longest card in the deck, because the zoom
    // needs the room to read as one continuous move.
    //
    // `video` has no src: the animation is the GlobeScale component drawn in
    // place rather than a file, so there is nothing to load. The field is
    // still what marks this a motion card, and posterFrame still picks the
    // deck still.
    slug: 'scale',
    headline: ['ANYONE.'],
    size: 190,
    support: ['1.5 billion contacts.'],
    layout: 'globe',
    video: {durationSec: 7, posterFrame: 126},
  },
  {
    // The one card that most needs its receipt, and now it has one: Nick's
    // annotated draft, with the borrowed details ringed and labelled, proves
    // the claim the words only assert. The dashed placeholder is gone.
    //
    // The recipient's address is blurred in the saved asset. It was a real
    // person's work email, and masking emails is the standing call.
    slug: 'personal',
    headline: [
      'No two emails are the same,',
      'we find what you have in common',
      'and personalize every email',
    ],
    size: 54,
    redParts: ['No two emails are the same', 'every email'],
    layout: 'image',
    image: {src: 'assets/generated/email-personalization-annotated.png'},
  },
  // The last card is the spinning mark, rendered by IgLaunchOutro rather than
  // from this list; it carries no type at all.
];
