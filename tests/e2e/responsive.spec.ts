import { test, expect } from '@playwright/test';

test.describe('Responsive Layout', () => {
  test('mobile menu button visible on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    const menuButton = page.locator('header button[aria-label="Toggle navigation"]');
    await expect(menuButton).toBeVisible();
  });

  test('mobile menu button hidden on large screens', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 });
    await page.goto('/');
    const menuButton = page.locator('header button[aria-label="Toggle navigation"]');
    await expect(menuButton).not.toBeVisible();
  });

  test('mobile menu opens and shows navigation', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.locator('header button[aria-label="Toggle navigation"]').click();
    const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');
    await expect(mobileNav).toBeVisible();
    await expect(mobileNav.locator('a', { hasText: 'Home' })).toBeVisible();
  });

  test('mobile menu closes on X button', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.locator('header button[aria-label="Toggle navigation"]').click();
    await expect(page.locator('nav[aria-label="Mobile navigation"]')).toBeVisible();
    await page.locator('button[aria-label="Close navigation"]').click();
    await expect(page.locator('nav[aria-label="Mobile navigation"]')).not.toBeVisible();
  });

  test('sidebar visible on desktop, hidden on mobile', async ({ page }) => {
    // Desktop
    await page.setViewportSize({ width: 1200, height: 900 });
    await page.goto('/');
    await expect(page.locator('aside nav[aria-label="Navigation"]')).toBeVisible();

    // Mobile
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('aside nav[aria-label="Navigation"]')).not.toBeVisible();
  });

  test('3-column layout at xl breakpoint', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/');
    // All three columns should be visible
    await expect(page.locator('aside nav[aria-label="Navigation"]')).toBeVisible();
    await expect(page.locator('main article')).toBeVisible();
    await expect(page.locator('aside nav[aria-label="Table of contents"]')).toBeVisible();
  });
});
