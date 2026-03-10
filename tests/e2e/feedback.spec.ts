import { test, expect } from '@playwright/test';

test.describe('Page Feedback', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('modern-feedback:'))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
  });

  test('widget is visible with prompt text', async ({ page }) => {
    await page.goto('/');
    const widget = page.locator('.modern-feedback');
    await expect(widget).toBeVisible();
    await expect(widget.locator('.modern-feedback-label')).toHaveText(
      'How is this guide?',
    );
  });

  test('thumbs up shows thanks and sets localStorage', async ({ page }) => {
    await page.goto('/');
    const widget = page.locator('.modern-feedback');
    await widget.locator('button[aria-label="Good"]').click();

    // Button should have active class
    await expect(widget.locator('button[aria-label="Good"]')).toHaveClass(/active/);

    // Thanks card should appear
    await expect(widget.locator('.modern-feedback-thanks')).toBeVisible();

    const stored = await page.evaluate(() => {
      const key = Object.keys(localStorage).find((k) =>
        k.startsWith('modern-feedback:'),
      );
      return key ? localStorage.getItem(key) : null;
    });
    expect(stored).toBe('yes');
  });

  test('thumbs down shows comment textarea, submit sends feedback', async ({
    page,
  }) => {
    await page.goto('/');
    const widget = page.locator('.modern-feedback');
    await widget.locator('button[aria-label="Bad"]').click();

    // Bad button should be active
    await expect(widget.locator('button[aria-label="Bad"]')).toHaveClass(/active/);

    // Comment area with textarea should appear
    const commentSection = widget.locator('.modern-feedback-comment');
    await expect(commentSection).toBeVisible();

    // Type a comment and submit
    await commentSection.locator('.modern-feedback-textarea').fill('Needs more examples');
    await commentSection.locator('.modern-feedback-submit').click();

    // Should show thanks
    await expect(widget.locator('.modern-feedback-thanks')).toBeVisible();

    const stored = await page.evaluate(() => {
      const key = Object.keys(localStorage).find((k) =>
        k.startsWith('modern-feedback:'),
      );
      return key ? localStorage.getItem(key) : null;
    });
    expect(stored).toBe('no');
  });

  test('thumbs down then submit without comment works', async ({ page }) => {
    await page.goto('/');
    const widget = page.locator('.modern-feedback');
    await widget.locator('button[aria-label="Bad"]').click();

    await expect(widget.locator('.modern-feedback-comment')).toBeVisible();
    await widget.locator('.modern-feedback-submit').click();

    await expect(widget.locator('.modern-feedback-thanks')).toBeVisible();
  });

  test('dispatches custom event with correct detail', async ({ page }) => {
    await page.goto('/');

    const eventDetail = page.evaluate(() => {
      return new Promise<{ page: string; rating: string; comment: string | null }>(
        (resolve) => {
          window.addEventListener('modern-feedback', ((e: CustomEvent) => {
            resolve(e.detail);
          }) as EventListener);
        },
      );
    });

    const widget = page.locator('.modern-feedback');
    await widget.locator('button[aria-label="Good"]').click();

    const detail = await eventDetail;
    expect(detail.rating).toBe('yes');
    expect(detail.page).toBeTruthy();
    expect(detail.comment).toBeNull();
  });

  test('thanks state persists across page reload', async ({ page }) => {
    await page.goto('/');
    const widget = page.locator('.modern-feedback');

    await widget.locator('button[aria-label="Good"]').click();
    await expect(widget.locator('.modern-feedback-thanks')).toBeVisible();

    await page.reload();

    // Thanks still visible, Good button still active
    await expect(
      page.locator('.modern-feedback .modern-feedback-thanks'),
    ).toBeVisible();
    await expect(
      page.locator('.modern-feedback button[aria-label="Good"]'),
    ).toHaveClass(/active/);
  });
});
