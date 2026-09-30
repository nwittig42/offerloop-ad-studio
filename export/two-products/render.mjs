import { chromium } from 'playwright-chromium';
import path from 'node:path';
const here = path.dirname(new URL(import.meta.url).pathname);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
for (const [hash, out, omit] of [['', 'two-products.png', false], ['#transparent', 'two-products-transparent.png', true]]) {
  await page.goto('file://' + path.join(here, 'slide.html') + hash);
  await page.reload();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(here, out), omitBackground: omit });
}
await browser.close();
