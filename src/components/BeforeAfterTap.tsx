import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../../brand/theme';

/** A rect in source-screenshot pixels. */
export type SourceRect = {x: number; y: number; w: number; h: number};

export type BeforeAfterBeat = {
  id: string;
  /** Screenshot before the tap. */
  beforeSrc: string;
  /** Screenshot after the tap, same framing. */
  afterSrc: string;
  /** Natural size of both screenshots, in px. */
  sourceW: number;
  sourceH: number;
  /** Point in source px held at the centre of the card. */
  focusX: number;
  focusY: number;
  /** The control being tapped, in source px — drives the ripple and the press. */
  tap: SourceRect;
  /**
   * A second thing that changes on the swap (the follower count), ringed so the
   * eye catches it. Omit when the tapped control is the only change.
   */
  accent?: SourceRect;
  /** Zoom at the top of the beat and at the end, 1 = screenshot width fills the card. */
  zoomFrom?: number;
  zoomTo?: number;
  /** Seconds into the beat: finger lands, then the state flips. */
  tapAtSec: number;
  swapAtSec: number;
  durationSec: number;
};

const CARD_INSET = 40;
const CARD_RADIUS = 30;
/** Cross-dissolve length for the state flip. Two near-identical UIs, so it
 * morphs rather than double-exposing. */
const SWAP_FRAMES = 5;

/**
 * One before/after beat: hold on the control, a tap, a held pause, then the UI
 * flips underneath. Framed as a floating card on the brand canvas so it drops
 * into a square carousel slot.
 */
export const BeforeAfterTap: React.FC<{beat: BeforeAfterBeat}> = ({beat}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const t = frame / fps;

  const cardW = width - CARD_INSET * 2;
  const cardH = height - CARD_INSET * 2;

  const zoomFrom = beat.zoomFrom ?? 1;
  const zoomTo = beat.zoomTo ?? 1.12;
  const zoom = interpolate(t, [0, beat.durationSec], [zoomFrom, zoomTo], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Scale that makes the screenshot exactly fill the card's width at zoom 1.
  const s = (cardW / beat.sourceW) * zoom;
  const toCardX = (sx: number) => cardW / 2 + (sx - beat.focusX) * s;
  const toCardY = (sy: number) => cardH / 2 + (sy - beat.focusY) * s;

  // The tap itself: the card dips a hair, the way a real press feels.
  const press = interpolate(
    t,
    [beat.tapAtSec - 0.05, beat.tapAtSec + 0.08, beat.tapAtSec + 0.26],
    [1, 0.994, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const afterOpacity = interpolate(
    frame,
    [beat.swapAtSec * fps, beat.swapAtSec * fps + SWAP_FRAMES],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const imgStyle: React.CSSProperties = {
    position: 'absolute',
    width: beat.sourceW * s,
    height: beat.sourceH * s,
    left: cardW / 2 - beat.focusX * s,
    top: cardH / 2 - beat.focusY * s,
  };

  return (
    <AbsoluteFill style={{backgroundColor: colors.background}}>
      {/* Brand glow behind the card so the white screenshot has something to sit on. */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(60% 55% at 50% 42%, ${colors.secondaryLight}66 0%, transparent 70%)`,
        }}
      />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div
          style={{
            width: cardW,
            height: cardH,
            borderRadius: CARD_RADIUS,
            overflow: 'hidden',
            position: 'relative',
            transform: `scale(${press})`,
            backgroundColor: colors.white,
            boxShadow: `0 24px 60px ${colors.secondaryDark}26, 0 2px 8px ${colors.secondaryDark}14`,
          }}
        >
          <Img src={staticFile(beat.beforeSrc)} style={imgStyle} />
          <Img src={staticFile(beat.afterSrc)} style={{...imgStyle, opacity: afterOpacity}} />

          <TapRipple
            cx={toCardX(beat.tap.x + beat.tap.w / 2)}
            cy={toCardY(beat.tap.y + beat.tap.h / 2)}
            // A fingertip, not the whole control — sized off the control's height.
            radius={beat.tap.h * s * 0.85}
            controlW={beat.tap.w * s}
            controlH={beat.tap.h * s}
            controlX={toCardX(beat.tap.x)}
            controlY={toCardY(beat.tap.y)}
            t={t}
            at={beat.tapAtSec}
          />

          {beat.accent ? (
            <AccentRing
              x={toCardX(beat.accent.x)}
              y={toCardY(beat.accent.y)}
              w={beat.accent.w * s}
              h={beat.accent.h * s}
              t={t}
              at={beat.swapAtSec}
            />
          ) : null}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Expanding fingertip ring, plus the brief dim the control itself gets on press. */
const TapRipple: React.FC<{
  cx: number;
  cy: number;
  radius: number;
  controlX: number;
  controlY: number;
  controlW: number;
  controlH: number;
  t: number;
  at: number;
}> = ({cx, cy, radius, controlX, controlY, controlW, controlH, t, at}) => {
  const p = interpolate(t, [at, at + 0.45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const dim = interpolate(t, [at - 0.04, at + 0.06, at + 0.3], [0, 0.1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  if (p <= 0) return null;
  const r = radius * (0.55 + p * 0.75);
  return (
    <>
      {dim > 0 ? (
        <div
          style={{
            position: 'absolute',
            left: controlX,
            top: controlY,
            width: controlW,
            height: controlH,
            borderRadius: controlH / 2,
            backgroundColor: colors.secondaryDark,
            opacity: dim,
          }}
        />
      ) : null}
      {p < 1 ? (
        <div
          style={{
            position: 'absolute',
            left: cx - r,
            top: cy - r,
            width: r * 2,
            height: r * 2,
            borderRadius: '50%',
            border: `${Math.max(2, radius * 0.09)}px solid ${colors.primary}`,
            opacity: (1 - p) * 0.55,
          }}
        />
      ) : null}
    </>
  );
};

/** Soft brand ring that blooms around the second thing that changed. */
const AccentRing: React.FC<{x: number; y: number; w: number; h: number; t: number; at: number}> = ({
  x,
  y,
  w,
  h,
  t,
  at,
}) => {
  const p = interpolate(t, [at, at + 0.22, at + 1.1, at + 1.5], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  if (p <= 0) return null;
  const pad = h * 0.35;
  return (
    <div
      style={{
        position: 'absolute',
        left: x - pad,
        top: y - pad,
        width: w + pad * 2,
        height: h + pad * 2,
        borderRadius: (h + pad * 2) / 2,
        border: `${Math.max(2, h * 0.06)}px solid ${colors.primary}`,
        backgroundColor: `${colors.primary}12`,
        opacity: p,
      }}
    />
  );
};
