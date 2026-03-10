import { test } from '@playwright/test';

test('pymdownx page screenshot', async ({ page }) => {
  await page.goto('/guide/pymdownx/');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: '/tmp/pymdownx-full.png', fullPage: true });
});
