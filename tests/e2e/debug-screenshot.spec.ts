import { test } from '@playwright/test';

test('line numbers closeup', async ({ page }) => {
  await page.goto('/guide/pymdownx/');
  await page.waitForLoadState('networkidle');
  const lineNumSection = page.locator('.highlighttable').first();
  await lineNumSection.screenshot({ path: '/tmp/linenums-closeup.png' });
});

test('line highlight closeup', async ({ page }) => {
  await page.goto('/guide/pymdownx/');
  await page.waitForLoadState('networkidle');
  // The line highlighting section is the 4th .highlight div
  const hlSection = page.locator('#line-highlighting').locator('~ .highlight').first();
  await hlSection.screenshot({ path: '/tmp/highlight-closeup.png' });
});
