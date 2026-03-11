import { chromium } from '@playwright/test';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const THEMES = ['default', 'ocean', 'purple', 'rose', 'emerald', 'amber', 'slate', 'ruby'];
const OUTPUT_DIR = path.resolve(__dirname, '../docs/assets/themes');

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: 2,
});

for (const theme of THEMES) {
  for (const mode of ['light', 'dark']) {
    const page = await context.newPage();
    await page.goto('http://localhost:8001/');

    await page.evaluate(({ theme, mode }) => {
      const html = document.documentElement;
      html.className = html.className.replace(/theme-\w+/g, '').trim();
      if (theme !== 'default') {
        html.classList.add(`theme-${theme}`);
      }
      if (mode === 'dark') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
      localStorage.setItem('modern-theme-mode', mode);
    }, { theme, mode });

    await page.waitForTimeout(500);

    const filename = `${theme}-${mode}.png`;
    await page.screenshot({
      path: path.join(OUTPUT_DIR, filename),
      clip: { x: 0, y: 0, width: 1280, height: 720 },
    });

    console.log(`Captured ${filename}`);
    await page.close();
  }
}

await browser.close();
