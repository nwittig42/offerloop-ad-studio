import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {colors, fonts} from '../../brand/theme';
import {WhiteLockup} from '../components/CarouselCardFrame';

/**
 * The one page handout: "What is Offerloop?" on letter paper, 8.5x11 at
 * 300dpi. Print piece rather than a slide, so it is a Still.
 *
 * It sits on the same blue mesh the ig-launch carousels do, regenerated at
 * page ratio (cover-scaled from mesh-1080x1350, so no stretch) rather than
 * squashed to fit. That matters for the badge top left: its backdrop-filter
 * samples the mesh behind it, which is the only reason the glass reads as
 * glass. The badge is a page-scale copy of the carousel's rather than a
 * shared component because every dimension in CarouselCardFrame is tuned to
 * a 1080x1350 card and none of them survive the move to 2550x3300.
 *
 * Copy rule: no em dashes anywhere a reader can see. See .claude/skills/
 * no-em-dashes.
 */

export const PAGE_W = 2550;
export const PAGE_H = 3300;

/** 300 dots to the inch, so layout can be written in inches and stay legible. */
const DPI = 300;
const inch = (n: number) => n * DPI;

const MARGIN = inch(0.55);

/**
 * Where the two how-to columns send the reader. offerloop.ai is the domain
 * every other asset in this repo uses, so the app link is real. The extension
 * link is a stand-in: no Chrome Web Store URL exists anywhere in the repo yet.
 * Nick is sending both, so they live here rather than inline, and swapping
 * them is a one line change each.
 */
const LINKS = {
  app: 'offerloop.ai',
  extension: 'offerloop.ai/extension',
};

/**
 * Screenshots Nick drops in later. Give a path under public/ and the slot
 * renders the real image; leave it undefined and it renders a labelled dashed
 * box at the same size, so the page can be laid out and printed for review
 * before the captures exist. Same idea as CardCopy.media on the carousels.
 */
const SHOTS: {app?: string; extension?: string} = {
  app: undefined,
  extension: undefined,
};

/**
 * Type and spacing are sized to fit the whole story on one page with the
 * lockup still on it. They were tuned against the render, not guessed: early
 * passes ran off the bottom of the page. Change one and check the foot again.
 */
const TYPE = {
  title: 122,
  standfirst: 47,
  eyebrow: 32,
  body: 44,
  colHead: 40,
  step: 42,
  statNumber: 148,
  statLabel: 36,
  link: 38,
};
const GAP = inch(0.14);

const BADGE = {size: 268, icon: 0.58};

const PANEL_RADIUS = 36;
const PANEL_PAD = inch(0.28);

/** Height of both screenshot slots. Equal, so the two how-to columns align. */
const SHOT_H = inch(1.4);

const Badge: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      left: MARGIN,
      top: MARGIN,
      width: BADGE.size,
      height: BADGE.size,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.36)',
      backdropFilter: 'blur(28px) saturate(140%)',
      WebkitBackdropFilter: 'blur(28px) saturate(140%)',
      border: '6px solid rgba(255,255,255,0.6)',
      boxShadow: '0 26px 58px -16px rgba(34,48,92,0.34)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Img
      src={staticFile('assets/figma/offerloop-icon-trim.png')}
      style={{width: BADGE.size * BADGE.icon, height: 'auto'}}
    />
  </div>
);

/** A white card. Every section below the masthead lives in one of these. */
const Panel: React.FC<{eyebrow: string; children: React.ReactNode}> = ({
  eyebrow,
  children,
}) => (
  <div
    style={{
      background: 'rgba(255,255,255,0.92)',
      borderRadius: PANEL_RADIUS,
      padding: PANEL_PAD,
      boxShadow: '0 22px 46px -20px rgba(34,48,92,0.28)',
    }}
  >
    <div
      style={{
        fontFamily: fonts.body,
        fontWeight: 700,
        fontSize: TYPE.eyebrow,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: colors.primary,
        marginBottom: inch(0.16),
      }}
    >
      {eyebrow}
    </div>
    {children}
  </div>
);

const Body: React.FC<{children: React.ReactNode; muted?: boolean}> = ({
  children,
  muted = false,
}) => (
  <p
    style={{
      margin: 0,
      fontFamily: fonts.body,
      fontSize: TYPE.body,
      lineHeight: 1.4,
      color: muted ? '#5A6684' : colors.secondaryDark,
    }}
  >
    {children}
  </p>
);

/** Two columns inside a panel. */
const Cols: React.FC<{children: React.ReactNode; gap?: number}> = ({
  children,
  gap = inch(0.32),
}) => (
  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: gap}}>
    {children}
  </div>
);

const ColHead: React.FC<{children: React.ReactNode; muted?: boolean}> = ({
  children,
  muted = false,
}) => (
  <div
    style={{
      fontFamily: fonts.heading,
      fontWeight: 700,
      fontSize: TYPE.colHead,
      color: muted ? '#8792AC' : colors.primary,
      marginBottom: inch(0.11),
    }}
  >
    {children}
  </div>
);

/** The 62x and 8,000 callouts. The number carries the panel, not the prose. */
const Stat: React.FC<{value: string; label: string}> = ({value, label}) => (
  <div style={{display: 'flex', alignItems: 'baseline', gap: inch(0.16)}}>
    <div
      style={{
        fontFamily: fonts.heading,
        fontWeight: 700,
        fontSize: TYPE.statNumber,
        lineHeight: 1,
        letterSpacing: '-0.03em',
        color: colors.primary,
      }}
    >
      {value}
    </div>
    <div
      style={{
        fontFamily: fonts.body,
        fontSize: TYPE.statLabel,
        lineHeight: 1.25,
        color: colors.secondaryDark,
      }}
    >
      {label}
    </div>
  </div>
);

const Step: React.FC<{n: number; children: React.ReactNode}> = ({n, children}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: inch(0.16),
      marginBottom: inch(0.13),
    }}
  >
    <div
      style={{
        flex: '0 0 auto',
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: colors.primary,
        color: colors.white,
        fontFamily: fonts.body,
        fontWeight: 700,
        fontSize: 34,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {n}
    </div>
    <div
      style={{
        fontFamily: fonts.body,
        fontSize: TYPE.step,
        lineHeight: 1.32,
        paddingTop: 8,
        color: colors.secondaryDark,
      }}
    >
      {children}
    </div>
  </div>
);

/**
 * A screenshot, or the space for one. `label` describes what belongs here and
 * is what prints on the placeholder, so a review copy of the page still tells
 * you what is missing.
 */
const Shot: React.FC<{src?: string; label: string}> = ({src, label}) =>
  src ? (
    <Img
      src={staticFile(src)}
      style={{
        width: '100%',
        height: SHOT_H,
        objectFit: 'contain',
        borderRadius: 24,
      }}
    />
  ) : (
    <div
      style={{
        width: '100%',
        height: SHOT_H,
        borderRadius: 24,
        border: `5px dashed ${colors.secondaryLight}`,
        background: 'rgba(182,195,232,0.16)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: inch(0.16),
        fontFamily: fonts.body,
        fontSize: 34,
        lineHeight: 1.3,
        color: '#8792AC',
      }}
    >
      {label}
    </div>
  );

/** The "go here" line that closes each how-to column. */
const LinkLine: React.FC<{prefix: string; href: string}> = ({prefix, href}) => (
  <div
    style={{
      marginTop: inch(0.04),
      fontFamily: fonts.body,
      fontSize: TYPE.link,
      lineHeight: 1.3,
      color: colors.secondaryDark,
    }}
  >
    {prefix}{' '}
    <span style={{fontWeight: 700, color: colors.primary}}>{href}</span>
  </div>
);

export const Brochure: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: colors.background}}>
    <Img
      src={staticFile('assets/carousels/_edits/mesh-2550x3300.png')}
      style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}}
    />

    <Badge />

    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: `${inch(0.52)}px ${MARGIN}px ${inch(0.36)}px`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Masthead. Centred on the page even though the badge hangs left, which
          is how Nick asked for it. */}
      <div style={{textAlign: 'center', marginBottom: inch(0.2)}}>
        <h1
          style={{
            margin: 0,
            fontFamily: fonts.heading,
            fontWeight: 700,
            fontSize: TYPE.title,
            letterSpacing: '-0.02em',
            color: colors.secondaryDark,
          }}
        >
          What is Offerloop?
        </h1>
        <p
          style={{
            margin: `${inch(0.1)}px auto 0`,
            maxWidth: inch(5.6),
            fontFamily: fonts.body,
            fontSize: TYPE.standfirst,
            lineHeight: 1.3,
            color: colors.primary,
          }}
        >
          The easiest way for college students to network with professionals.
        </p>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: GAP}}>
        <Panel eyebrow="What it is">
          <Cols>
            <div>
              <ColHead muted>The old way</ColHead>
              <Body muted>
                Scroll LinkedIn for hours. Find the companies. Find the right
                people. Hunt down their emails. Write every message from
                scratch. Then start over. It is slow and boring.
              </Body>
            </div>
            <div>
              <ColHead>With Offerloop</ColHead>
              <Body>
                It finds the professionals, finds their emails, and writes a
                personal email introducing you. If you both went to Tennessee
                and studied business, the whole email is about that.
              </Body>
            </div>
          </Cols>
        </Panel>

        <Panel eyebrow="Why college students use it">
          <Cols gap={inch(0.28)}>
            <Stat
              value="62x"
              label="more likely to land the job when you know someone inside before you apply"
            />
            <Stat
              value="8,000+"
              // Website users, not app signups: the app and the Chrome
              // extension are brand new, so nothing here dates the 8,000 to
              // them or to a launch window.
              label="college students already using Offerloop"
            />
          </Cols>
          <div style={{marginTop: inch(0.2)}}>
            <Body>
              Applying cold barely works. Your resume lands in a pile of a
              thousand and nobody is looking for it. Knowing one person changes
              that: you get a call, you make an impression, and your
              application gets flagged. Doing that by hand takes forever.
              Offerloop does it in minutes.
            </Body>
          </div>
        </Panel>

        <Panel eyebrow="How to use it">
          <Cols>
            <div>
              <ColHead>The app</ColHead>
              <Shot
                src={SHOTS.app}
                label="Screenshot of the app goes here"
              />
              <div style={{height: inch(0.16)}} />
              <Step n={1}>Sign up and download the app.</Step>
              <Step n={2}>Tell it the roles and companies you want.</Step>
              <Step n={3}>
                Swipe on people. Offerloop emails them for you, and replies come
                to your inbox.
              </Step>
              <LinkLine prefix="Get it at" href={LINKS.app} />
            </div>
            <div>
              <ColHead>The Chrome extension</ColHead>
              <Shot
                src={SHOTS.extension}
                label="Screenshot of the Chrome extension goes here"
              />
              <div style={{height: inch(0.16)}} />
              <Step n={1}>Add the Offerloop extension to Chrome.</Step>
              <Step n={2}>Open anyone's LinkedIn profile.</Step>
              <Step n={3}>
                Click the Offerloop icon. It pulls their email and writes the
                intro for you.
              </Step>
              <LinkLine prefix="Add it at" href={LINKS.extension} />
            </div>
          </Cols>
        </Panel>
      </div>

      <div
        style={{
          marginTop: 'auto',
          paddingTop: inch(0.22),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <WhiteLockup width={inch(1.85)} />
      </div>
    </div>
  </AbsoluteFill>
);
