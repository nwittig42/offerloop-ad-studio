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
import {
  IgLaunchOutro,
  igLaunchOutroDurationInFrames,
  igLaunchOutroFps,
} from './compositions/IgLaunchOutro';
import {igLaunchV2Cards, IG_LAUNCH_CARD_OFFSET} from '../plans/ig-launch-v2.cards';
import {CARD_W, CARD_H} from './components/CarouselCardFrame';
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
      {/* ig-launch-v2 carousel: one still per card, copy from the cards file.
          Numbering starts at 2 - card 1 is the lifted-type cover, built by
          tools/carousel/cover.py rather than here. */}
      {igLaunchV2Cards.map((card, index) => (
        <Still
          key={card.slug}
          id={`IgLaunch-${String(index + IG_LAUNCH_CARD_OFFSET).padStart(2, '0')}-${card.slug}`}
          component={IgLaunchCard}
          width={CARD_W}
          height={CARD_H}
          defaultProps={{index}}
        />
      ))}
      {/* Last card: the mark turning about its vertical axis, one seamless loop. */}
      <Composition
        id="IgLaunch-10-outro"
        component={IgLaunchOutro}
        durationInFrames={igLaunchOutroDurationInFrames}
        fps={igLaunchOutroFps}
        width={CARD_W}
        height={CARD_H}
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
      {[...appStorePanels, ...appStorePanelsV2].map(({id, component}) => (
        <Still key={id} id={id} component={component} width={PANEL_W} height={PANEL_H} />
      ))}
    </>
  );
};
