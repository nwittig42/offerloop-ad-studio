import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';

// Real typing, real pixels: the crisp nano-banana chat still with the baked-in
// input text masked by a white patch, and a Remotion typewriter re-typing the
// same sentence in place. (AI-generated typing kept overrunning into junk.)
const SENTENCE =
  'Can you apply to 15 entry-level product management roles at tech companies in San Francisco?';
const TYPE_FRAMES = 48; // sentence fully typed by ~1.6s
const FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export const ScoutTypingIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const chars = Math.min(
    SENTENCE.length,
    Math.floor((frame / TYPE_FRAMES) * SENTENCE.length),
  );
  const caretOn = Math.floor(frame / 8) % 2 === 0;

  return (
    <AbsoluteFill style={{backgroundColor: '#F5F6F8'}}>
      <Img
        src={staticFile('assets/generated/scout-demo-0b-typing.png')}
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
      />
      {/* mask the baked-in input text */}
      <div
        style={{
          position: 'absolute',
          left: 400,
          top: 990,
          width: 1430,
          height: 60,
          background: '#FFFFFF',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 420,
          top: 1004,
          fontFamily: FONT_STACK,
          fontSize: 26,
          color: '#1F2937',
          whiteSpace: 'nowrap',
        }}
      >
        {SENTENCE.slice(0, chars)}
        <span style={{opacity: caretOn ? 1 : 0, fontWeight: 300}}>|</span>
      </div>
    </AbsoluteFill>
  );
};
