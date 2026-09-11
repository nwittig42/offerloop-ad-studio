import React, {useMemo} from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {geoOrthographic, geoPath, geoContains, geoDistance} from 'd3-geo';
import {feature} from 'topojson-client';
import land110 from 'world-atlas/land-110m.json';
import land50 from 'world-atlas/land-50m.json';
import {fonts} from '../../brand/theme';

/**
 * The scale beat: hovering over LA, blue dots and faces appearing, then a
 * continuous zoom out through the US to the whole world until the land is
 * solid blue, the globe spins hard, and everything dissipates.
 *
 * Built procedurally rather than generated. The beats here are choreographed
 * to the frame against real coastlines, and no video model will hit "zoom from
 * LA to the globe, dots filling land as you go" on request. It also costs
 * nothing to re-render, so the timing is tunable.
 *
 * One projection does the whole thing: geoOrthographic, zoomed so far in that
 * LA looks flat, pulling back until the hemisphere fits the frame. That is
 * what makes the globe *become* a globe instead of cutting to one, and it is
 * why there is no Mercator anywhere here.
 */

type Pt = [number, number];

const LA: Pt = [-118.25, 34.05];
/** Where the pan heads next, so each beat frames its own subject. */
const US: Pt = [-98.5, 39.5];
const WORLD: Pt = [-40, 15];

/**
 * The brand ramp is deliberately muted, which is right for type on the light
 * canvas and wrong here: on a near-black ocean, primaryScale[400] read as
 * dirty white and land sat at almost the same value as sea, so the map did
 * not read as a map at any zoom. These are pushed brighter and further apart
 * on purpose. Data viz needs separation more than it needs the house tint.
 */
const C = {
  ocean: '#070E20',
  landFrom: [27, 46, 87] as const,
  landTo: [79, 111, 201] as const,
  coast: '#5C79C4',
  dot: '#8FB8FF',
  label: '#BBCDF2',
};

// Two levels of the same coastline, for two different jobs. 50m is what gets
// drawn, because 110m is visibly blocky once you are zoomed to city scale.
const landDraw = feature(land50 as never, (land50 as never as {objects: {land: never}}).objects.land);
// Hit testing splits by volume. The LA cluster is tested against 50m, because
// at that zoom 110m's simplified coast is off by kilometres. The US and world
// waves are thousands of rejection samples, so they use 110m, where each
// geoContains is far cheaper.
const hitFine = landDraw;
const hitCoarse = feature(land110 as never, (land110 as never as {objects: {land: never}}).objects.land);

/** Deterministic PRNG, so every render and every parallel frame agrees. */
const mulberry32 = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/** Rejection-sample points on land, uniform by area over a lon/lat box. */
const sampleLand = (count: number, seed: number, box: [number, number, number, number]) => {
  const rnd = mulberry32(seed);
  const [lon0, lat0, lon1, lat1] = box;
  const s0 = Math.sin((lat0 * Math.PI) / 180);
  const s1 = Math.sin((lat1 * Math.PI) / 180);
  const out: Pt[] = [];
  // Capped so a bad box degrades to fewer dots instead of hanging.
  for (let i = 0; i < count * 60 && out.length < count; i++) {
    const lon = lon0 + rnd() * (lon1 - lon0);
    // Uniform by area, not by latitude: sampling lat linearly would crowd the
    // poles and leave the tropics sparse.
    const lat = (Math.asin(s0 + rnd() * (s1 - s0)) * 180) / Math.PI;
    const p: Pt = [lon, lat];
    if (geoContains(hitCoarse, p)) out.push(p);
  }
  return out;
};

/** Tight cluster around a centre, in degrees, land only. */
const sampleAround = (count: number, seed: number, at: Pt, spreadDeg: number) => {
  const rnd = mulberry32(seed);
  const out: Pt[] = [];
  for (let i = 0; i < count * 80 && out.length < count; i++) {
    const a = rnd() * Math.PI * 2;
    const r = Math.sqrt(rnd()) * spreadDeg;
    const p: Pt = [
      at[0] + (r * Math.cos(a)) / Math.cos((at[1] * Math.PI) / 180),
      at[1] + r * Math.sin(a),
    ];
    if (geoContains(hitFine, p)) out.push(p);
  }
  return out;
};

// Frame marks at 24fps over 7s (168 frames).
const T = {laHold: 30, usZoom: 78, worldZoom: 112, spinEnd: 140, end: 168};

/**
 * Orthographic scale in px: the radius of the whole globe at that zoom. These
 * are calibrated for a 1080px canvas and multiplied by `k` below, because they
 * are absolute pixel values: dropped unscaled into the 760px panel on the
 * scale card, the globe overflowed the panel and its limb never came into
 * frame. Scaling them keeps the geography identical at any canvas size.
 *
 * LA opens at 28000, not the 70000 tried first. At 70000 the frame covered
 * under a degree, so there was no coastline in it beyond one corner and the
 * beat read as an abstract blue field rather than a map of anywhere. 28000
 * covers about 2.5 degrees: the basin, the bay and the coast curving south,
 * which is recognisably somewhere.
 */
const BASE = 1080;
const SCALE = {la: 28000, us: 1500, world: 497};

/**
 * The LA cluster has to stay inside the frame: at SCALE.la a degree is about
 * 490px, so much more than this throws dots and faces off-canvas. An earlier
 * 1.1 degree spread at a tighter zoom lost four of the five faces entirely.
 */
const LA_SPREAD = 0.78;

const DOTS = {
  la: sampleAround(45, 11, LA, LA_SPREAD),
  us: sampleLand(430, 22, [-124.5, 25.5, -67, 48.5]),
  world: sampleLand(1900, 33, [-180, -56, 180, 72]),
};

const AVATAR_COUNT = 5;

/**
 * Zoom progress 0 to 1 in log space, which is what the pan is driven by.
 * Takes unscaled values: it is a ratio of logs, so `k` cancels and this stays
 * correct at any canvas size.
 */
const zoomProgress = (scale: number) =>
  (Math.log(SCALE.la) - Math.log(scale)) / (Math.log(SCALE.la) - Math.log(SCALE.world));
/** Where the US is framed, in that same progress space. */
const Z_US = zoomProgress(SCALE.us);

export const GLOBE_FPS = 24;
export const GLOBE_DURATION = T.end;

/**
 * `width`/`height` override the composition size. Needed when this is drawn
 * inside a panel on a card rather than filling its own composition: reading
 * useVideoConfig() there sizes the projection to the whole 1080x1350 card, so
 * the globe rendered oversized and off-centre inside a 760px square. The
 * panel must also be position:relative, or the AbsoluteFill here escapes it.
 */
export const GlobeScale: React.FC<{width?: number; height?: number}> = (props) => {
  const frame = useCurrentFrame();
  const cfg = useVideoConfig();
  const width = props.width ?? cfg.width;
  const height = props.height ?? cfg.height;
  /** Everything in px scales with the canvas, against the 1080 calibration. */
  const k = Math.min(width, height) / BASE;

  // Log-space zoom. Interpolating scale linearly would sit at city zoom for
  // most of the shot and then snap out at the end; zoom reads as even only
  // when it is exponential.
  const logScale = interpolate(
    frame,
    [0, T.laHold, T.usZoom, T.worldZoom],
    [Math.log(SCALE.la), Math.log(SCALE.la), Math.log(SCALE.us), Math.log(SCALE.world)],
    {extrapolateRight: 'clamp'},
  );
  const z = zoomProgress(Math.exp(logScale));
  const scale = Math.exp(logScale) * k;

  // Pan is driven by zoom progress, not by time. Tied to time it moved 19
  // degrees while still at city zoom, which is thousands of pixels a frame:
  // the map tore sideways before it pulled back at all.
  const lon =
    interpolate(z, [0, Z_US, 1], [LA[0], US[0], WORLD[0]], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  const lat = interpolate(z, [0, Z_US, 1], [LA[1], US[1], WORLD[1]], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Spin hard once the globe is whole.
  const spin = interpolate(frame, [T.worldZoom, T.spinEnd, T.end], [0, 900, 1500], {
    extrapolateLeft: 'clamp',
  });
  /** The dissipate: everything flies outward and fades over the last beat. */
  const gone = interpolate(frame, [T.spinEnd, T.end], [0, 1], {extrapolateLeft: 'clamp'});

  const center: Pt = [lon + spin, lat];

  const projection = useMemo(
    () =>
      geoOrthographic()
        .scale(scale)
        .translate([width / 2, height / 2])
        .rotate([-center[0], -center[1], 0]),
    [scale, width, height, center],
  );
  const path = useMemo(() => geoPath(projection), [projection]);

  const landPath = path(landDraw as never) ?? '';
  const spherePath = path({type: 'Sphere'} as never) ?? '';

  /** Dot radius shrinks with the zoom, so density reads rather than blobs. */
  const dotR =
    interpolate(frame, [0, T.usZoom, T.worldZoom], [9, 4.2, 2.6], {
      extrapolateRight: 'clamp',
    }) * k;

  // Land brightens to solid blue as the dots saturate, which is what actually
  // sells "until everything is blue"; dot density alone never quite gets there.
  const landBlue = interpolate(frame, [T.worldZoom - 20, T.spinEnd - 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const landFill = `rgb(${C.landFrom.map((v, i) => Math.round(v + (C.landTo[i] - v) * landBlue)).join(',')})`;

  const renderDots = (pts: Pt[], from: number, to: number, seed: number) => {
    const rnd = mulberry32(seed);
    return pts.map((p, i) => {
      // Each dot has its own reveal frame inside the wave's window, so the
      // wave washes in instead of switching on.
      const at = from + rnd() * (to - from);
      const on = interpolate(frame, [at, at + 7], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      if (on <= 0.001) return null;
      // Far side of the globe. Without this, dots on the back bleed through
      // and the globe stops reading as a sphere.
      if (geoDistance(p, center) > Math.PI / 2 - 0.015) return null;
      const xy = projection(p);
      if (!xy) return null;
      const [x, y] = xy;
      if (x < -40 || y < -40 || x > width + 40 || y > height + 40) return null;
      const dx = gone > 0 ? (x - width / 2) * gone * 0.55 : 0;
      const dy = gone > 0 ? (y - height / 2) * gone * 0.55 : 0;
      return (
        <circle
          key={`${seed}-${i}`}
          cx={x + dx}
          cy={y + dy}
          r={dotR * (0.5 + 0.5 * on)}
          fill={C.dot}
          opacity={on * (1 - gone) * 0.95}
        />
      );
    });
  };

  // Faces sit beside the first few LA dots and are gone before the US wave.
  const avatars = DOTS.la.slice(0, AVATAR_COUNT).map((p, i) => {
    const at = 8 + i * 4;
    const on = interpolate(frame, [at, at + 8], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const off = interpolate(frame, [T.laHold + 4, T.laHold + 20], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const vis = on * off;
    if (vis <= 0.001) return null;
    const xy = projection(p);
    if (!xy) return null;
    const size = 116 * k;
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: xy[0] + 14 * k,
          top: xy[1] - size - 14 * k,
          width: size,
          height: size,
          borderRadius: '50%',
          overflow: 'hidden',
          border: `${Math.max(2, 4 * k)}px solid #FFFFFF`,
          boxShadow: '0 14px 30px -8px rgba(4,8,20,0.7)',
          opacity: vis,
          transform: `scale(${0.7 + 0.3 * on})`,
          transformOrigin: '50% 100%',
        }}
      >
        <Img
          src={staticFile(`assets/generated/pro-avatar-${i + 1}.png`)}
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
      </div>
    );
  });

  // Names the opening location, because a coastline with no streets on it does
  // not say Los Angeles on its own.
  const labelOn = interpolate(frame, [6, 16, T.laHold, T.laHold + 12], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: C.ocean, overflow: 'hidden'}}>
      <AbsoluteFill style={{opacity: 1 - gone * 0.9, transform: `scale(${1 + gone * 0.18})`}}>
        <svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
          {/* Ocean. At city zoom this disc is far larger than the frame, so it
              simply reads as the map's ground. */}
          <path d={spherePath} fill={C.ocean} />
          <path
            d={landPath}
            fill={landFill}
            stroke={C.coast}
            strokeOpacity={0.55}
            strokeWidth={1}
          />
          {renderDots(DOTS.world, T.usZoom - 4, T.worldZoom + 14, 303)}
          {renderDots(DOTS.us, T.laHold + 4, T.usZoom + 6, 202)}
          {renderDots(DOTS.la, 6, T.laHold, 101)}
        </svg>
        {avatars}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 64 * k,
            textAlign: 'center',
            fontFamily: fonts.body,
            fontWeight: 600,
            fontSize: 42 * k,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: C.label,
            opacity: labelOn,
          }}
        >
          Los Angeles
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
