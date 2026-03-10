import { test, expect } from '@playwright/test';

test.describe('Mermaid Diagrams', () => {
  test('renders mermaid diagrams as SVGs', async ({ page }) => {
    await page.goto('/guide/mermaid/');
    // Wait for mermaid to process at least one diagram
    await page.waitForSelector('pre.mermaid svg', { timeout: 10000 });
    // All four diagram types should render as SVGs
    const svgs = page.locator('pre.mermaid svg');
    await expect(svgs).toHaveCount(4);
  });

  test('no raw mermaid source is visible', async ({ page }) => {
    await page.goto('/guide/mermaid/');
    await page.waitForSelector('pre.mermaid svg', { timeout: 10000 });
    // After processing, "graph TD" source text should not be visible
    const rawSource = page.locator('pre.mermaid').filter({ hasText: 'graph TD' });
    await expect(rawSource).toHaveCount(0);
  });

  test('diagrams re-render on dark mode toggle', async ({ page }) => {
    await page.goto('/guide/mermaid/');
    await page.waitForSelector('pre.mermaid svg', { timeout: 10000 });

    // Switch to dark mode via Alpine store
    await page.evaluate(() => {
      // @ts-ignore
      Alpine.store('theme').mode = 'dark';
      // @ts-ignore
      Alpine.store('theme')._apply();
    });
    await page.waitForTimeout(500);

    // Verify diagrams are still rendered (SVGs exist)
    const svgs = page.locator('pre.mermaid svg');
    await expect(svgs).toHaveCount(4);
  });

  test('mermaid.js is NOT loaded on pages without diagrams', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    // mermaid should not be defined on pages without diagrams
    const hasMermaid = await page.evaluate(() => typeof window.mermaid !== 'undefined');
    expect(hasMermaid).toBe(false);
  });
});
