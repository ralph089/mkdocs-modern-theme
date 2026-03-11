import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('sidebar shows nav items on desktop', async ({ page, isMobile }) => {
    await page.goto('/');
    if (isMobile) {
      await page.locator('button[aria-label="Toggle navigation"]').click();
      const nav = page.locator('nav[aria-label="Mobile navigation"]');
      await expect(nav).toBeVisible();
      await expect(nav.locator('a', { hasText: 'Home' })).toBeVisible();
    } else {
      const sidebar = page.locator('aside nav[aria-label="Navigation"]');
      await expect(sidebar).toBeVisible();
      await expect(sidebar.locator('a', { hasText: 'Home' })).toBeVisible();
    }
  });

  test('active page is highlighted in sidebar', async ({ page, isMobile }) => {
    await page.goto('/');
    if (isMobile) {
      await page.locator('button[aria-label="Toggle navigation"]').click();
      const activeLink = page.locator('nav[aria-label="Mobile navigation"] a.font-medium', { hasText: 'Home' });
      await expect(activeLink).toBeVisible();
    } else {
      const activeLink = page.locator('aside nav a.font-medium', { hasText: 'Home' });
      await expect(activeLink).toBeVisible();
    }
  });

  test('collapsible sections expand on click', async ({ page, isMobile }) => {
    await page.goto('/');
    let nav;
    if (isMobile) {
      await page.locator('button[aria-label="Toggle navigation"]').click();
      nav = page.locator('nav[aria-label="Mobile navigation"]');
    } else {
      nav = page.locator('aside nav[aria-label="Navigation"]');
    }

    // "Getting Started" section should be collapsed initially on home page
    const section = nav.locator('button', { hasText: 'Getting Started' });
    await expect(section).toBeVisible();

    // Click to expand
    await section.click();

    // Child links should now be visible
    const installLink = nav.locator('a', { hasText: 'Installation' });
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

  test('clicking sidebar link navigates to page', async ({ page, isMobile }) => {
    await page.goto('/');
    let nav;
    if (isMobile) {
      await page.locator('button[aria-label="Toggle navigation"]').click();
      nav = page.locator('nav[aria-label="Mobile navigation"]');
    } else {
      nav = page.locator('aside nav[aria-label="Navigation"]');
    }

    // Expand Getting Started section
    await nav.locator('button', { hasText: 'Getting Started' }).click();
    await nav.locator('a', { hasText: 'Configuration' }).click();
    await expect(page).toHaveURL(/configuration/);
  });
});
