import {AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../../brand/theme';
import type {CaptionCue} from '../plan/types';

const Cue: React.FC<{text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const isVertical = height > width;
  const pop = interpolate(frame, [0, 4], [0.9, 1], {extrapolateRight: 'clamp'});
  const opacity = interpolate(frame, [0, 3], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        // Vertical formats keep captions above platform UI (progress bars,
        // action rails); 16:9 sits closer to the bottom.
        paddingBottom: isVertical ? height * 0.22 : height * 0.08,
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${pop})`,
          backgroundColor: 'rgba(30, 45, 77, 0.88)',
          color: colors.white,
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: width * (isVertical ? 0.045 : 0.026),
          lineHeight: 1.3,
          padding: `${width * 0.008}px ${width * 0.018}px`,
          borderRadius: width * 0.01,
          maxWidth: width * (isVertical ? 0.86 : 0.6),
          textAlign: 'center',
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

/** Renders a scene's caption cues; cue times are relative to the scene. */
export const Captions: React.FC<{cues: CaptionCue[]}> = ({cues}) => {
  const {fps} = useVideoConfig();
  return (
    <>
      {cues.map((cue, i) => (
        <Sequence
          key={i}
          from={Math.round(cue.startSec * fps)}
          durationInFrames={Math.max(1, Math.round((cue.endSec - cue.startSec) * fps))}
        >
          <Cue text={cue.text} />
        </Sequence>
      ))}
    </>
  );
};
