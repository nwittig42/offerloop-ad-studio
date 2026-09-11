// Renders the ig-launch-v2 carousel: the lifted-type cover from cover.py,
// the typeset cards as stills, then the last card twice - a still so the
// preview server has something to show, and the mp4 of the spin, which is what
// actually gets posted as the tenth slide.
//
// A card carrying `video` in the cards file is a motion card and gets the same
// two-file treatment as the outro: the mp4 is the slide that gets posted, and
// the png is only there because the preview server renders images and nothing
// else. Its poster comes from the card's own `posterFrame`, NOT frame 0, which
// on a card whose headline pops in word by word would be blank.
//
// Slugs are read out of plans/ig-launch-v2.cards.ts rather than repeated here,
// so re-ordering the deck is a one-file change.
//
// Usage:
//   npm run carousel:cards          -> the whole deck, cover included
//   npm run carousel:cards -- hook  -> only cards whose slug starts with that
import {execSync} from 'node:child_process';
import {mkdirSync, readFileSync, statSync} from 'node:fs';

const OUT = 'public/assets/carousels/ig-launch-v2';
const CARDS = 'plans/ig-launch-v2.cards.ts';
const OUTRO = {id: 'IgLaunch-10-outro', file: '10-outro'};
// Card 1 is the lifted-type cover; cover.py owns it, so the typeset cards
// start at deck position 2.
const OFFSET = 2;

const cardsSrc = readFileSync(CARDS, 'utf8');
const slugs = [...cardsSrc.matchAll(/^\s*slug: '([a-z0-9-]+)'/gm)].map((m) => m[1]);
if (!slugs.length) throw new Error(`no slugs found in ${CARDS}`);

// Which cards are motion cards, and where their poster frame is. Read off the
// same file as the slugs rather than restated here, so a card becoming (or
// ceasing to be) a video is still a one-file change. Each slug's own block is
// the text from its `slug:` line to the next one.
const blockAfter = (i) => {
  const start = cardsSrc.indexOf(`slug: '${slugs[i]}'`);
  const end = i + 1 < slugs.length ? cardsSrc.indexOf(`slug: '${slugs[i + 1]}'`) : cardsSrc.length;
  return cardsSrc.slice(start, end);
};

const cards = slugs.map((slug, i) => {
  const block = blockAfter(i);
  const poster = block.match(/posterFrame:\s*(\d+)/);
  return {
    id: `IgLaunch-${String(i + OFFSET).padStart(2, '0')}-${slug}`,
    file: `${i + OFFSET}-${slug}`,
    // A card with `video:` but no `posterFrame:` would silently poster at 0.
    motion: /\bvideo:\s*\{/.test(block),
    posterFrame: poster ? Number(poster[1]) : null,
  };
});
for (const c of cards) {
  if (c.motion && c.posterFrame === null) {
    throw new Error(`${c.file} has video but no posterFrame in ${CARDS}`);
  }
}

const filters = process.argv.slice(2);
const wanted = ({file}) =>
  !filters.length || filters.some((f) => file.replace(/^\d+-/, '').startsWith(f));

mkdirSync(OUT, {recursive: true});

// Card 1 is not typeset: it is the original deck's cover with its type lifted,
// rescaled and re-centred, so it comes from the python side.
if (!filters.length || filters.some((f) => 'cover'.startsWith(f))) {
  execSync('.venv-key/bin/python tools/carousel/cover.py', {stdio: 'inherit'});
}

const report = (out) => console.log(`✓ ${out} (${Math.round(statSync(out).size / 1024)} KB)`);

for (const {id, file, motion, posterFrame} of cards.filter(wanted)) {
  const out = `${OUT}/${file}.png`;
  const at = motion ? ` --frame=${posterFrame}` : '';
  execSync(`npx remotion still ${id} ${out}${at} --image-format=png`, {stdio: 'inherit'});
  report(out);
  if (motion) {
    // The mp4 is the real slide; the png above is just what 3131 can show.
    execSync(`npx remotion render ${id} ${OUT}/${file}.mp4`, {stdio: 'inherit'});
    report(`${OUT}/${file}.mp4`);
  }
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
