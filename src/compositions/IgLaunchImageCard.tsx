import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {CarouselCardFrame, CAROUSEL_RED} from '../components/CarouselCardFrame';
import {colors, fonts} from '../../brand/theme';
import {igLaunchV2Cards, type CardCopy} from '../../plans/ig-launch-v2.cards';

/**
 * A still card with copy above and one image below. Deck position 6
 * (personal) uses it, whose image is the annotated draft.
 *
 * Phrases named in the card's `redParts` are tinted inside the line rather
 * than needing their own line, which is what lets 'No two emails are the
 * same' and 'every email' be red while the words between them are not.
 */

// Vertical budget on a 1350-tall card; the footer lockup reaches ~1210.
/** Top of the copy. Three lines at 54px on 1.2 leading end at ~365. */
const TOP = 172;
/** Top of the image, leaving a gap under the copy. */
const IMAGE_TOP = 402;
/**
 * Image width. The asset is 1275x1234, so nearly square: 810 wide makes it
 * 784 tall, which is the most that fits between IMAGE_TOP and the footer.
 */
const IMAGE_W = 810;
const IMAGE_ASPECT = 1275 / 1234;

type Seg = {text: string; red: boolean};

/**
 * Split a line into plain and red runs.
 *
 * Longest phrase first, and overlapping matches are dropped rather than
 * nested, so a phrase that contains another ('No two emails are the same'
 * against a bare 'emails', say) tints once instead of tinting twice and
 * duplicating the text.
 */
const tint = (line: string, reds: string[]): Seg[] => {
  const hits: {start: number; end: number}[] = [];
  for (const r of [...reds].sort((a, b) => b.length - a.length)) {
    let i = line.indexOf(r);
    while (i !== -1) {
      hits.push({start: i, end: i + r.length});
      i = line.indexOf(r, i + r.length);
    }
  }
  hits.sort((a, b) => a.start - b.start);
  const kept: typeof hits = [];
  for (const h of hits) {
    if (!kept.length || h.start >= kept[kept.length - 1].end) kept.push(h);
  }
  const segs: Seg[] = [];
  let pos = 0;
  for (const h of kept) {
    if (h.start > pos) segs.push({text: line.slice(pos, h.start), red: false});
    segs.push({text: line.slice(h.start, h.end), red: true});
    pos = h.end;
  }
  if (pos < line.length) segs.push({text: line.slice(pos), red: false});
  return segs;
};

export const IgLaunchImageCard: React.FC<{index?: number}> = ({index = 0}) => {
  const card: CardCopy = igLaunchV2Cards[index] ?? igLaunchV2Cards[0];
  const reds = card.redParts ?? [];
  return (
    <CarouselCardFrame>
      <AbsoluteFill
        style={{
          top: TOP,
          height: 'auto',
          paddingLeft: 76,
          paddingRight: 76,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {card.headline ? (
          <div
            style={{
              fontFamily: fonts.heading,
              fontWeight: 700,
              fontSize: card.size ?? 54,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: colors.secondaryDark,
              textAlign: 'center',
            }}
          >
            {card.headline.map((line) => (
              <div key={line}>
                {tint(line, reds).map((seg, i) => (
                  <span key={i} style={seg.red ? {color: CAROUSEL_RED} : undefined}>
                    {seg.text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        ) : null}
      </AbsoluteFill>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: IMAGE_TOP,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {card.image ? (
          <Img
            src={staticFile(card.image.src)}
            style={{
              width: IMAGE_W,
              height: IMAGE_W / IMAGE_ASPECT,
              borderRadius: 22,
              boxShadow:
                '0 40px 100px rgba(17,32,64,0.28), 0 8px 24px rgba(17,32,64,0.16)',
              display: 'block',
            }}
          />
        ) : null}
      </div>
    </CarouselCardFrame>
  );
};
