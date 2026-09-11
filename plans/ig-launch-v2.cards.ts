/**
 * ig-launch-v2 carousel cards. Script and rationale: ig-launch-v2.script.md.
 *
 * One entry per slide, rendered by the IgLaunchCard still (src/compositions).
 * `slug` becomes the filename the preview server sorts on, so the numbering
 * here is the deck order.
 *
 * Cards 1 and 7 are deliberately identical: the deck's whole structure is that
 * bookend. Keep them in sync.
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
  /** Draw the lockup as the headline instead of type (card 2). */
  mark?: boolean;
};

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
  },
  {
    slug: 'search',
    headline: ['search and', 'find anyone.'],
    size: 104,
  },
  {
    slug: 'scale',
    headline: ['ANYONE.'],
    size: 168,
    support: ['1.5 billion contacts.'],
  },
  {
    slug: 'personal',
    headline: ['it finds what you', 'actually have in common.'],
    size: 76,
    support: ['so every email is different.'],
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
  // Card 9 is the spinning mark, rendered by IgLaunchOutro rather than from
  // this list; it carries no type at all.
];
