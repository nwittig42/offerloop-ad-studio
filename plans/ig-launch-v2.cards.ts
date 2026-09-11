/**
 * ig-launch-v2 carousel cards. Script and rationale: ig-launch-v2.script.md.
 *
 * One entry per slide, rendered by the IgLaunchCard still (src/compositions).
 * `slug` becomes the filename the preview server sorts on, so the order here
 * is the deck order - starting at deck position 2, because card 1 is the
 * lifted-type cover that tools/carousel/cover.py builds.
 *
 * The hook and hook-again cards are deliberately identical: the deck's whole
 * structure is that bookend. Keep them in sync.
 */
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
};

/** Deck position of the first entry below; card 1 is the cover from cover.py. */
export const IG_LAUNCH_CARD_OFFSET = 2;

export const igLaunchV2Cards: CardCopy[] = [
  {
    slug: 'hook',
    headline: ['networking is', 'a pain in the ass.'],
    size: 104,
  },
  {
    slug: 'intro',
    eyebrow: 'introducing',
    mark: true,
    headline: ['a dating app for', 'professional connections.'],
    size: 64,
    support: ['swipe, and it emails them.', 'introducing you.'],
  },
  {
    slug: 'apply',
    headline: ['or swipe, and it', 'applies to the job.'],
    size: 96,
    media: {label: 'the apply flow'},
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
