// Renders the ig-launch-v2 carousel: eight type cards as stills, plus card 9
// twice - a still so the preview server has something to show, and the mp4 of
// the spin, which is what actually gets posted as the last slide.
//
// Slugs are read out of plans/ig-launch-v2.cards.ts rather than repeated here,
// so re-ordering the deck is a one-file change.
//
// Usage:
//   npm run carousel:cards          -> the whole deck
//   npm run carousel:cards -- hook  -> only cards whose slug starts with that
import {execSync} from 'node:child_process';
import {mkdirSync, readFileSync, statSync} from 'node:fs';

const OUT = 'public/assets/carousels/ig-launch-v2';
const CARDS = 'plans/ig-launch-v2.cards.ts';
const OUTRO = {id: 'IgLaunch-09-outro', file: '9-outro'};

const slugs = [...readFileSync(CARDS, 'utf8').matchAll(/^\s*slug: '([a-z0-9-]+)'/gm)].map(
  (m) => m[1],
);
if (!slugs.length) throw new Error(`no slugs found in ${CARDS}`);

const cards = slugs.map((slug, i) => ({
  id: `IgLaunch-${String(i + 1).padStart(2, '0')}-${slug}`,
  file: `${i + 1}-${slug}`,
}));

const filters = process.argv.slice(2);
const wanted = ({file}) =>
  !filters.length || filters.some((f) => file.replace(/^\d+-/, '').startsWith(f));

mkdirSync(OUT, {recursive: true});

const report = (out) => console.log(`✓ ${out} (${Math.round(statSync(out).size / 1024)} KB)`);

for (const {id, file} of cards.filter(wanted)) {
  const out = `${OUT}/${file}.png`;
  execSync(`npx remotion still ${id} ${out} --image-format=png`, {stdio: 'inherit'});
  report(out);
}

if (wanted(OUTRO)) {
  // Frame 0 is the mark face-on, which is the right one to freeze.
  execSync(`npx remotion still ${OUTRO.id} ${OUT}/${OUTRO.file}.png --frame=0 --image-format=png`, {
    stdio: 'inherit',
  });
  report(`${OUT}/${OUTRO.file}.png`);
  execSync(`npx remotion render ${OUTRO.id} ${OUT}/${OUTRO.file}.mp4`, {stdio: 'inherit'});
  report(`${OUT}/${OUTRO.file}.mp4`);
}

execSync(`.venv-key/bin/python tools/carousel/restyle.py --sheet ${OUT}`, {stdio: 'inherit'});
