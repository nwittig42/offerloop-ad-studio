import React from 'react';
import {Img, OffthreadVideo, staticFile} from 'remotion';

/**
 * A phone the app sits inside: dark bezel, rounded screen, soft drop shadow.
 *
 * No notch or Dynamic Island is drawn, because the captures already contain
 * the real iOS status bar and island. Drawing one would double it up.
 *
 * Screen aspect is fixed rather than read off each source, so a row of these
 * lines up even when one holds a video and the others hold stills.
 */

/** The iPhone captures in this project are all 1206x2622. */
export const PHONE_ASPECT = 1206 / 2622;

export const phoneHeight = (width: number) => Math.round(width / PHONE_ASPECT);

export const PhoneFrame: React.FC<{
  src: string;
  width: number;
  /** Videos autoplay muted and loop with the composition. */
  video?: boolean;
}> = ({src, width, video = false}) => {
  const height = phoneHeight(width);
  const bezel = Math.max(4, Math.round(width * 0.032));
  const screen = <>{video ? (
    <OffthreadVideo
      src={staticFile(src)}
      muted
      style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}
    />
  ) : (
    <Img
      src={staticFile(src)}
      style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}
    />
  )}</>;
  return (
    <div
      style={{
        width,
        height,
        borderRadius: Math.round(width * 0.145),
        background: '#0A0D16',
        padding: bezel,
        boxSizing: 'border-box',
        // Lifts the row off the mesh; the middle phone gets more of this from
        // its own wrapper so it reads as the one in front.
        boxShadow: '0 26px 48px -18px rgba(8,14,32,0.62)',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: Math.round(width * 0.115),
          overflow: 'hidden',
          background: '#FFFFFF',
        }}
      >
        {screen}
      </div>
    </div>
  );
};
