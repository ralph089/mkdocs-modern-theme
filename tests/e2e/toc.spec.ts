import { test, expect } from '@playwright/test';

test.describe('Table of Contents', () => {
  test('TOC is visible on wide screens', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/');
    const toc = page.locator('aside nav[aria-label="Table of contents"]');
    await expect(toc).toBeVisible();
    await expect(toc.locator('text=On this page')).toBeVisible();
  });

  test('TOC is hidden on narrow screens', async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 900 });
    await page.goto('/');
    const toc = page.locator('aside nav[aria-label="Table of contents"]');
    await expect(toc).not.toBeVisible();
  });

  test('TOC contains page headings', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/');
    const toc = page.locator('aside nav[aria-label="Table of contents"]');
    await expect(toc.locator('a[href="#features"]')).toBeVisible();
    await expect(toc.locator('a[href="#quick-start"]')).toBeVisible();
  });

  test('clicking TOC link scrolls to heading', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/guide/writing-docs/');
    const tocLink = page.locator('aside nav[aria-label="Table of contents"] a[href="#lists"]');
    await tocLink.click();
    // Wait for scroll
    await page.waitForTimeout(500);
    // The heading should be near the top of the viewport
    const heading = page.locator('h2#lists');
    await expect(heading).toBeInViewport();
  });
});
