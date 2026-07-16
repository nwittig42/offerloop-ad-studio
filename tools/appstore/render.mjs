// Renders the App Store screenshot set: every AppStore-* still at 1320x2868,
// then strips the PNG alpha channel (Apple rejects screenshots with alpha).
// Usage: npm run appstore [-- 01 04]   (optional filters by panel number)
import {execSync} from 'node:child_process';
import {mkdirSync, renameSync, statSync} from 'node:fs';

const PANELS = [
  ['AppStore-01-Hook', '01-hook'],
  ['AppStore-02-Apply', '02-apply'],
  ['AppStore-03-Reach', '03-reach'],
  ['AppStore-04-Ask', '04-ask'],
  ['AppStore-05-Research', '05-research'],
  ['AppStore-06-Prepare', '06-prepare'],
  ['AppStore-07-Track', '07-track'],
];

const filters = process.argv.slice(2);
const selected = filters.length ? PANELS.filter(([, f]) => filters.some((x) => f.startsWith(x))) : PANELS;

mkdirSync('out/appstore', {recursive: true});

for (const [id, file] of selected) {
  const out = `out/appstore/${file}.png`;
  execSync(`npx remotion still ${id} ${out} --image-format=png`, {stdio: 'inherit'});
  // Flatten alpha: Apple requires RGB with no alpha channel.
  execSync(`ffmpeg -y -loglevel error -i ${out} -pix_fmt rgb24 ${out}.flat.png`);
  renameSync(`${out}.flat.png`, out);
  const kb = Math.round(statSync(out).size / 1024);
  console.log(`✓ ${out} (${kb} KB)`);
}
