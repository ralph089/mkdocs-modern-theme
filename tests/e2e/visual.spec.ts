import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
  test('home page - desktop light', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/');
    // Ensure light mode
    await page.evaluate(() => {
      localStorage.setItem('modern-theme-mode', 'light');
      document.documentElement.classList.remove('dark');
    });
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot('home-desktop-light.png', { fullPage: true });
  });

  test('home page - desktop dark', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('modern-theme-mode', 'dark');
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot('home-desktop-dark.png', { fullPage: true });
  });

  test('home page - mobile light', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('modern-theme-mode', 'light');
      document.documentElement.classList.remove('dark');
    });
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot('home-mobile-light.png', { fullPage: true });
  });

  test('admonitions page - light', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/guide/admonitions/');
    await page.evaluate(() => {
      localStorage.setItem('modern-theme-mode', 'light');
      document.documentElement.classList.remove('dark');
    });
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot('admonitions-light.png', { fullPage: true });
  });

  test('admonitions page - dark', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/guide/admonitions/');
    await page.evaluate(() => {
      localStorage.setItem('modern-theme-mode', 'dark');
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot('admonitions-dark.png', { fullPage: true });
  });

  test('code blocks page - light', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto('/guide/code-blocks/');
    await page.evaluate(() => {
      localStorage.setItem('modern-theme-mode', 'light');
      document.documentElement.classList.remove('dark');
    });
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot('code-blocks-light.png', { fullPage: true });
  });
});
