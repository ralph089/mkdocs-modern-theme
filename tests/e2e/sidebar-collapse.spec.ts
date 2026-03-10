import { test, expect } from '@playwright/test';

test.describe('Sidebar Collapse', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test('sidebar is expanded by default', async ({ page }) => {
    await page.goto('/');
    const sidebar = page.locator('aside nav[aria-label="Navigation"]');
    await expect(sidebar).toBeVisible();
    // Expand button should not be visible when sidebar is open
    const expandBtn = page.locator('button[aria-label="Expand sidebar"]');
    await expect(expandBtn).not.toBeVisible();
  });

  test('collapse button hides the sidebar', async ({ page }) => {
    await page.goto('/');
    const collapseBtn = page.locator('aside button', { hasText: 'Collapse' });
    await expect(collapseBtn).toBeVisible();
    await collapseBtn.click();

    // Wait for transition
    await page.waitForTimeout(400);

    // Expand button should now appear
    const expandBtn = page.locator('button[aria-label="Expand sidebar"]');
    await expect(expandBtn).toBeVisible();

    // Aside (sidebar, not TOC) should have zero width
    const aside = page.locator('aside').first();
    const width = await aside.evaluate(el => el.getBoundingClientRect().width);
    expect(width).toBe(0);
  });

  test('expand button restores the sidebar', async ({ page }) => {
    await page.goto('/');
    const collapseBtn = page.locator('aside button', { hasText: 'Collapse' });
    await collapseBtn.click();
    await page.waitForTimeout(400);

    const expandBtn = page.locator('button[aria-label="Expand sidebar"]');
    await expect(expandBtn).toBeVisible();

    await expandBtn.click();
    await page.waitForTimeout(400);

    // Sidebar nav should be visible again
    const nav = page.locator('aside nav[aria-label="Navigation"]');
    await expect(nav).toBeVisible();

    // Expand button should be hidden
    await expect(expandBtn).not.toBeVisible();
  });

  test('collapsed state persists across page loads', async ({ page }) => {
    await page.goto('/');
    const collapseBtn = page.locator('aside button', { hasText: 'Collapse' });
    await collapseBtn.click();
    await page.waitForTimeout(400);

    // Navigate to another page
    await page.goto('/getting-started/installation/');

    // Expand button should be visible (sidebar still collapsed)
    const expandBtn = page.locator('button[aria-label="Expand sidebar"]');
    await expect(expandBtn).toBeVisible();
  });

  test('main content expands when sidebar is collapsed', async ({ page }) => {
    await page.goto('/');
    const main = page.locator('main');
    const widthBefore = await main.evaluate(el => el.getBoundingClientRect().width);

    const collapseBtn = page.locator('aside button', { hasText: 'Collapse' });
    await collapseBtn.click();
    await page.waitForTimeout(400);

    const widthAfter = await main.evaluate(el => el.getBoundingClientRect().width);
    expect(widthAfter).toBeGreaterThan(widthBefore);
  });
});
