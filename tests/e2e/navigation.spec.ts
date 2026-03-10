import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('sidebar shows nav items on desktop', async ({ page }) => {
    await page.goto('/');
    const sidebar = page.locator('aside nav[aria-label="Navigation"]');
    await expect(sidebar).toBeVisible();
    await expect(sidebar.locator('a', { hasText: 'Home' })).toBeVisible();
  });

  test('active page is highlighted in sidebar', async ({ page }) => {
    await page.goto('/');
    const activeLink = page.locator('aside nav a.font-medium', { hasText: 'Home' });
    await expect(activeLink).toBeVisible();
  });

  test('collapsible sections expand on click', async ({ page }) => {
    await page.goto('/');
    // "Getting Started" section should be collapsed initially on home page
    const section = page.locator('aside nav button', { hasText: 'Getting Started' });
    await expect(section).toBeVisible();

    // Click to expand
    await section.click();

    // Child links should now be visible
    const installLink = page.locator('aside nav a', { hasText: 'Installation' });
    await expect(installLink).toBeVisible();
  });

  test('breadcrumbs show current path', async ({ page }) => {
    await page.goto('/getting-started/installation/');
    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb.locator('text=Getting Started')).toBeVisible();
    await expect(breadcrumb.locator('text=Installation')).toBeVisible();
  });

  test('prev/next links navigate between pages', async ({ page }) => {
    await page.goto('/');
    const nextLink = page.locator('nav[aria-label="Page navigation"] a', { hasText: 'Installation' });
    await expect(nextLink).toBeVisible();
    await nextLink.click();
    await expect(page).toHaveURL(/installation/);
  });

  test('clicking sidebar link navigates to page', async ({ page }) => {
    await page.goto('/');
    // Expand Getting Started section
    await page.locator('aside nav button', { hasText: 'Getting Started' }).click();
    await page.locator('aside nav a', { hasText: 'Configuration' }).click();
    await expect(page).toHaveURL(/configuration/);
  });
});
