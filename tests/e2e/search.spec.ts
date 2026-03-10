import { test, expect } from '@playwright/test';

test.describe('Search', () => {
  test('Ctrl+K opens search modal', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Control+k');
    const modal = page.locator('input[placeholder="Search documentation..."]');
    await expect(modal).toBeVisible();
  });

  test('Cmd+K opens search modal on Mac', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Meta+k');
    const modal = page.locator('input[placeholder="Search documentation..."]');
    await expect(modal).toBeVisible();
  });

  test('clicking search button opens modal', async ({ page }) => {
    await page.goto('/');
    await page.locator('header button', { hasText: 'Search' }).click();
    const modal = page.locator('input[placeholder="Search documentation..."]');
    await expect(modal).toBeVisible();
  });

  test('search returns results', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Control+k');
    const input = page.locator('input[placeholder="Search documentation..."]');
    // Wait for index to load
    await page.waitForTimeout(1000);
    await input.fill('installation');
    // Wait for results — lunr search + Alpine reactivity
    await page.waitForFunction(() => {
      const store = (window as any).Alpine?.store('search');
      return store && store.results && store.results.length > 0;
    }, null, { timeout: 10000 });
    // Verify result count
    const count = await page.evaluate(() => (window as any).Alpine.store('search').results.length);
    expect(count).toBeGreaterThan(0);
  });

  test('Escape closes search modal', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Control+k');
    await expect(page.locator('input[placeholder="Search documentation..."]')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('input[placeholder="Search documentation..."]')).not.toBeVisible();
  });

  test('shows "No results" for unmatched query', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Control+k');
    const input = page.locator('input[placeholder="Search documentation..."]');
    await input.fill('xyznonexistent123');
    await expect(page.locator('text=No results found')).toBeVisible({ timeout: 5000 });
  });
});
