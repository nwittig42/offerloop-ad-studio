import {Composition} from 'remotion';
import {Welcome} from './compositions/Welcome';

const FPS = 30;

export const Root: React.FC = () => {
  return (
    <>
      {/* Masters (16:9) */}
      <Composition
        id="TrueViewAd"
        component={Welcome}
        durationInFrames={75 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Explainer"
        component={Welcome}
        durationInFrames={180 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      {/* Cutdown formats */}
      <Composition
        id="CutdownVertical"
        component={Welcome}
        durationInFrames={20 * FPS}
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="CutdownFeed"
        component={Welcome}
        durationInFrames={20 * FPS}
        fps={FPS}
        width={1080}
        height={1350}
      />
      <Composition
        id="CutdownSquare"
        component={Welcome}
        durationInFrames={20 * FPS}
        fps={FPS}
        width={1080}
        height={1080}
      />
    </>
  );
};
