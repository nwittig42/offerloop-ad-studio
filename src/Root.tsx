import {Composition, Still} from 'remotion';
import {PlanPlayer} from './compositions/PlanPlayer';
import {appStorePanels, appStorePanelsV2, PANEL_H, PANEL_W} from './appstore';
import {SwipeHandDemo} from './components/SwipeHand';
import {
  CarouselProof,
  CarouselProofBeat,
  carouselProofBeatFrames,
  carouselProofDurationInFrames,
  carouselProofFps,
} from './compositions/CarouselProof';
import {
  CarouselProofEmail,
  carouselProofEmailDurationInFrames,
  carouselProofEmailFps,
} from './compositions/CarouselProofEmail';
import {IgLaunchCard} from './compositions/IgLaunchCard';
import {IgLaunchHookCard} from './compositions/IgLaunchHookCard';
import {IgLaunchPhonesCard} from './compositions/IgLaunchPhonesCard';
import {IgLaunchPhoneCard} from './compositions/IgLaunchPhoneCard';
import {IgLaunchPanelCard} from './compositions/IgLaunchPanelCard';
import {IgLaunchGlobeCard} from './compositions/IgLaunchGlobeCard';
import {IgLaunchImageCard} from './compositions/IgLaunchImageCard';
import {GlobeScale, GLOBE_FPS, GLOBE_DURATION} from './components/GlobeScale';
import {
  IgLaunchOutro,
  igLaunchOutroDurationInFrames,
  igLaunchOutroFps,
} from './compositions/IgLaunchOutro';
import {igLaunchV2Cards, IG_LAUNCH_CARD_OFFSET} from '../plans/ig-launch-v2.cards';
import {CARD_W, CARD_H} from './components/CarouselCardFrame';
import {Brochure, PAGE_W, PAGE_H} from './compositions/Brochure';
import {glassBadgeStills, EXPORT_SIZE} from './compositions/GlassBadgeExport';

/** Motion carousel cards run at 24, matching the clips cut for them. */
const CARD_FPS = 24;

/**
 * Which component renders a card, by its `layout`. Split by whether the card
 * moves: a card carrying `video` is a Composition and looks itself up in
 * MOTION, everything else is a Still and looks itself up in STILL. A layout
 * belongs to exactly one of the two maps, so asking for a motion layout on a
 * still card (or the reverse) fails to typecheck rather than rendering the
 * wrong component.
 */
const MOTION_CARD = {
  /** No layout means the hook: full-bleed clip behind kinetic type. */
  hook: IgLaunchHookCard,
  phones: IgLaunchPhonesCard,
  phone: IgLaunchPhoneCard,
  panel: IgLaunchPanelCard,
  globe: IgLaunchGlobeCard,
} as const;

const STILL_CARD = {
  /** No layout means the plain typeset card. */
  plain: IgLaunchCard,
  image: IgLaunchImageCard,
} as const;

type MotionLayout = keyof typeof MOTION_CARD;
type StillLayout = keyof typeof STILL_CARD;
import {makePlanMetadata} from './plan/validate';
import {planDurationInFrames, planFps} from './plan/timing';
import type {EditPlan} from './plan/types';
import {yetiUsingScoutPlan} from '../plans/yeti-using-scout.plan';
import {trueViewPlan} from '../plans/trueview.plan';
import {productHuntPlan} from '../plans/product-hunt.plan';
import {atsNewsHookPlan} from '../plans/ats-news-hook.plan';
import {yetiRaveDancePlan} from '../plans/yeti-rave-dance.plan';
import {yetiDrumPlan} from '../plans/yeti-drum.plan';
import {deskFlashPlan} from '../plans/desk-flash.plan';
import {deskTimelapsePlan} from '../plans/desk-timelapse.plan';

// Every composition is the generic PlanPlayer pointed at a plan file.
// To ship a new video: add plans/<name>.plan.ts and point a slot at it here.
const slots: Array<{id: string; width: number; height: number; plan: EditPlan}> = [
  {id: 'ProductHuntLaunch', width: 1920, height: 1080, plan: productHuntPlan},
  {id: 'TrueViewAd', width: 1920, height: 1080, plan: trueViewPlan},
  {id: 'YetiUsingScout', width: 1920, height: 1080, plan: yetiUsingScoutPlan},
  {id: 'AtsNewsHook', width: 1080, height: 1920, plan: atsNewsHookPlan},
  {id: 'YetiRaveDance', width: 1080, height: 1920, plan: yetiRaveDancePlan},
  {id: 'YetiDrum', width: 1080, height: 1920, plan: yetiDrumPlan},
  {id: 'DeskFlash', width: 1920, height: 1080, plan: deskFlashPlan},
  // Same plan cropped to the carousel card shape (see CARD_W/CARD_H).
  {id: 'DeskFlashCarousel', width: 1080, height: 1350, plan: deskFlashPlan},
  // The same background with no app pop-ups, for quieter cards.
  {id: 'DeskTimelapse', width: 1920, height: 1080, plan: deskTimelapsePlan},
  {id: 'DeskTimelapseCarousel', width: 1080, height: 1350, plan: deskTimelapsePlan},
];

export const Root: React.FC = () => {
  return (
    <>
      {slots.map(({id, width, height, plan}) => (
        <Composition
          key={id}
          id={id}
          component={PlanPlayer}
          durationInFrames={planDurationInFrames(plan)}
          fps={planFps(plan)}
          width={width}
          height={height}
          defaultProps={{plan}}
          calculateMetadata={makePlanMetadata(plan)}
        />
      ))}
      {/* Square before/after tile for the website carousel. */}
      <Composition
        id="CarouselProof"
        component={CarouselProof}
        durationInFrames={carouselProofDurationInFrames}
        fps={carouselProofFps}
        width={1080}
        height={1080}
      />
      {/* The same tile split at the beat boundary, one clip per beat. */}
      {[
        {id: 'CarouselProof-01-Follow', index: 0},
        {id: 'CarouselProof-02-Download', index: 1},
      ].map(({id, index}) => (
        <Composition
          key={id}
          id={id}
          component={CarouselProofBeat}
          durationInFrames={carouselProofBeatFrames[index]}
          fps={carouselProofFps}
          width={1080}
          height={1080}
          defaultProps={{index}}
        />
      ))}
      {/* Real screen recording, cropped square: one swipe-to-send + toast. */}
      <Composition
        id="CarouselProof-03-Email"
        component={CarouselProofEmail}
        durationInFrames={carouselProofEmailDurationInFrames}
        fps={carouselProofEmailFps}
        width={1080}
        height={1080}
      />
      {/* ig-launch-v2 carousel: one slot per card, copy from the cards file.
          Numbering starts at 1 since the lifted-type cover was cut.

          A card carrying `video` is a motion card and renders as a real
          Composition; everything else stays a Still. Either way the component
          comes from the card's `layout`, and either way the id is the same
          IgLaunch-NN-slug, so the preview server's ordering does not care
          which a card is. */}
      {igLaunchV2Cards.map((card, index) => {
        const id = `IgLaunch-${String(index + IG_LAUNCH_CARD_OFFSET).padStart(2, '0')}-${card.slug}`;
        return card.video ? (
          <Composition
            key={card.slug}
            id={id}
            component={MOTION_CARD[(card.layout ?? 'hook') as MotionLayout]}
            durationInFrames={Math.round(card.video.durationSec * CARD_FPS)}
            fps={CARD_FPS}
            width={CARD_W}
            height={CARD_H}
            defaultProps={{index}}
          />
        ) : (
          <Still
            key={card.slug}
            id={id}
            component={STILL_CARD[(card.layout ?? 'plain') as StillLayout]}
            width={CARD_W}
            height={CARD_H}
            defaultProps={{index}}
          />
        );
      })}
      {/* Last card: the mark turning about its vertical axis, one seamless loop. */}
      <Composition
        id="IgLaunch-07-outro"
        component={IgLaunchOutro}
        durationInFrames={igLaunchOutroDurationInFrames}
        fps={igLaunchOutroFps}
        width={CARD_W}
        height={CARD_H}
      />
      {/* The scale beat on its own: LA to the globe in 7s, square. Also
          embedded in the ig-launch-v2 scale card, which plays the component
          directly rather than this render, so there is no extra encode. */}
      <Composition
        id="GlobeScale"
        component={GlobeScale}
        durationInFrames={GLOBE_DURATION}
        fps={GLOBE_FPS}
        width={1080}
        height={1080}
      />
      {/* Gesture-timing bench for the ghost swipe hand (3 loops at 30fps). */}
      <Composition
        id="SwipeHandDemo"
        component={SwipeHandDemo}
        durationInFrames={144}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* Print piece, not a slide: letter paper at 300dpi. */}
      <Still id="Brochure" component={Brochure} width={PAGE_W} height={PAGE_H} />
      {/* Glass badge bakes. Square, all three at EXPORT_SIZE; the size ramp
          comes from tools/glass-badge/bake.py, not from more compositions. */}
      {glassBadgeStills.map(({id, component}) => (
        <Still key={id} id={id} component={component} width={EXPORT_SIZE} height={EXPORT_SIZE} />
      ))}
      {[...appStorePanels, ...appStorePanelsV2].map(({id, component}) => (
        <Still key={id} id={id} component={component} width={PANEL_W} height={PANEL_H} />
      ))}
    </>
  );
};
