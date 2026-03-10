import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
  test('clicking toggle cycles theme mode', async ({ page }) => {
    await page.goto('/');
    const toggle = page.locator('header button[\\:aria-label]');

    // Initial state: system mode → click to switch to light
    await toggle.click();
    const mode1 = await page.evaluate(() => localStorage.getItem('modern-theme-mode'));
    expect(mode1).toBe('light');

    // Click again → dark
    await toggle.click();
    const mode2 = await page.evaluate(() => localStorage.getItem('modern-theme-mode'));
    expect(mode2).toBe('dark');

    // Click again → system
    await toggle.click();
    const mode3 = await page.evaluate(() => localStorage.getItem('modern-theme-mode'));
    expect(mode3).toBe('system');
  });

  test('dark mode adds dark class to html', async ({ page }) => {
    await page.goto('/');
    const toggle = page.locator('header button[\\:aria-label]');

    // Switch to light first, then dark
    await toggle.click(); // → light
    await toggle.click(); // → dark

    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('theme preference persists across page loads', async ({ page }) => {
    await page.goto('/');
    const toggle = page.locator('header button[\\:aria-label]');

    // Set to dark
    await toggle.click(); // → light
    await toggle.click(); // → dark

    // Reload page
    await page.reload();

    // Should still be dark
    await expect(page.locator('html')).toHaveClass(/dark/);
  });
});
