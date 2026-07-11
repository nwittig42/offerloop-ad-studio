import {AbsoluteFill, useVideoConfig} from 'remotion';

export const STAGE_W = 1920;
export const STAGE_H = 1080;

/**
 * Fixed 1920x1080 design stage scaled to cover the composition, so mock-UI
 * scenes hold their layout across master and cutdown aspect ratios.
 */
export const MockStage: React.FC<{
  backgroundColor: string;
  children: React.ReactNode;
}> = ({backgroundColor, children}) => {
  const {width, height} = useVideoConfig();
  const scale = Math.max(width / STAGE_W, height / STAGE_H);
  return (
    <AbsoluteFill style={{backgroundColor, justifyContent: 'center', alignItems: 'center'}}>
      <div style={{width: STAGE_W, height: STAGE_H, transform: `scale(${scale})`, position: 'relative', flexShrink: 0}}>
        {children}
      </div>
    </AbsoluteFill>
  );
};
