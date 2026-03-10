import { test, expect } from '@playwright/test';

test.describe('Announcement Bar', () => {
  test.beforeEach(async ({ page }) => {
    // Clear any previous dismissal state
    await page.goto('/');
    await page.evaluate(() => {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('modern-announce')) localStorage.removeItem(key);
      });
    });
    await page.goto('/');
  });

  test('bar is visible on page load with correct text', async ({ page }) => {
    const bar = page.locator('#modern-announce');
    await expect(bar).toBeVisible();
    await expect(bar).toContainText('MkDocs Modern Theme is now available');
  });

  test('bar has accent background color', async ({ page }) => {
    const bar = page.locator('#modern-announce');
    await expect(bar).toBeVisible();
    const bg = await bar.evaluate((el) => getComputedStyle(el).backgroundColor);
    // Should not be transparent or white — should be the accent color
    expect(bg).not.toBe('rgba(0, 0, 0, 0)');
    expect(bg).not.toBe('rgb(255, 255, 255)');
  });

  test('dismiss button hides bar and sets localStorage', async ({ page }) => {
    const bar = page.locator('#modern-announce');
    await expect(bar).toBeVisible();

    await page.locator('.modern-announce-dismiss').click();
    await expect(bar).not.toBeVisible();

    const stored = await page.evaluate(() => localStorage.getItem('modern-announce-dismissed'));
    expect(stored).toBeTruthy();
  });

  test('dismissed bar stays hidden after reload', async ({ page }) => {
    await page.locator('.modern-announce-dismiss').click();
    const bar = page.locator('#modern-announce');
    await expect(bar).not.toBeVisible();

    await page.reload();
    await expect(bar).not.toBeVisible();
  });

  test('header is offset below the bar', async ({ page }) => {
    const bar = page.locator('#modern-announce');
    await expect(bar).toBeVisible();

    const header = page.locator('header');
    const headerTop = await header.evaluate((el) => parseFloat(getComputedStyle(el).top));
    // Header top should be > 0 when announcement bar is visible
    expect(headerTop).toBeGreaterThan(0);
  });

  test('links in announcement are clickable', async ({ page }) => {
    const link = page.locator('#modern-announce a');
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/getting-started/installation/');
  });
});
