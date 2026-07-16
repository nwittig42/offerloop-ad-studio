// Renders the App Store screenshot sets at 1320x2868, then strips the PNG
// alpha channel (Apple rejects screenshots with alpha).
// Usage:
//   npm run appstore              -> v1 set into out/appstore/
//   npm run appstore -- v2        -> v2 (Scout-led) set into out/appstore-v2/
//   npm run appstore -- v2 01 03  -> only those v2 panels
import {execSync} from 'node:child_process';
import {mkdirSync, renameSync, statSync} from 'node:fs';

const SETS = {
  v1: {
    dir: 'out/appstore',
    panels: [
      ['AppStore-01-Hook', '01-hook'],
      ['AppStore-02-Apply', '02-apply'],
      ['AppStore-03-Reach', '03-reach'],
      ['AppStore-04-Ask', '04-ask'],
      ['AppStore-05-Research', '05-research'],
      ['AppStore-06-Prepare', '06-prepare'],
      ['AppStore-07-Track', '07-track'],
    ],
  },
  v2: {
    dir: 'out/appstore-v2',
    panels: [
      ['AppStoreV2-01-Assistant', '01-assistant'],
      ['AppStoreV2-02-ScoutCan', '02-scout-can'],
      ['AppStoreV2-03-SwipeApply', '03-swipe-apply'],
      ['AppStoreV2-04-Reach', '04-reach'],
      ['AppStoreV2-05-Research', '05-research'],
      ['AppStoreV2-06-Prepare', '06-prepare'],
      ['AppStoreV2-07-Track', '07-track'],
    ],
  },
};

const args = process.argv.slice(2);
const setName = args[0] in SETS ? args[0] : 'v1';
const filters = args[0] in SETS ? args.slice(1) : args;
const {dir, panels} = SETS[setName];
const selected = filters.length ? panels.filter(([, f]) => filters.some((x) => f.startsWith(x))) : panels;

mkdirSync(dir, {recursive: true});

for (const [id, file] of selected) {
  const out = `${dir}/${file}.png`;
  execSync(`npx remotion still ${id} ${out} --image-format=png`, {stdio: 'inherit'});
  // Flatten alpha: Apple requires RGB with no alpha channel.
  execSync(`ffmpeg -y -loglevel error -i ${out} -pix_fmt rgb24 ${out}.flat.png`);
  renameSync(`${out}.flat.png`, out);
  const kb = Math.round(statSync(out).size / 1024);
  console.log(`✓ ${out} (${kb} KB)`);
}
