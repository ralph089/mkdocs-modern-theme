import { test, expect } from "@playwright/test";

test.describe("pymdownx Extensions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/guide/pymdownx/");
  });

  test("code blocks have copy button that appears on hover", async ({
    page,
  }) => {
    const codeBlock = page.locator(".highlight").first();
    const copyBtn = codeBlock.locator(".copy-code-btn");

    // Button exists but is not visible
    await expect(copyBtn).toBeAttached();
    await expect(copyBtn).toHaveCSS("opacity", "0");

    // Button becomes visible on hover
    await codeBlock.hover();
    await expect(copyBtn).toHaveCSS("opacity", "1");
  });

  test("copy button copies code to clipboard", async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    const codeBlock = page.locator(".highlight").first();
    await codeBlock.hover();

    const copyBtn = codeBlock.locator(".copy-code-btn");
    await copyBtn.click();

    // Button should show copied state
    await expect(copyBtn).toHaveClass(/copied/);

    // Copied state should revert after 2 seconds
    await expect(copyBtn).not.toHaveClass(/copied/, { timeout: 3000 });
  });

  test("copy button works on titled code blocks", async ({ page }) => {
    const titledBlock = page.locator(".highlight:has(> .filename)").first();
    const copyBtn = titledBlock.locator(".copy-code-btn");

    await expect(copyBtn).toBeAttached();

    // Button becomes visible on hover
    await titledBlock.hover();
    await expect(copyBtn).toHaveCSS("opacity", "1");
  });

  test("code block title renders filename", async ({ page }) => {
    // Look for a .filename element within a .highlight
    const filename = page.locator(".highlight > .filename");
    await expect(filename).toBeVisible();
    await expect(filename).toContainText("main.py");
  });

  test("line numbers render and are not selectable", async ({ page }) => {
    const linenos = page.locator("td.linenos");
    await expect(linenos).toBeVisible();

    // Line numbers should have user-select: none
    await expect(linenos).toHaveCSS("user-select", "none");
  });

  test("highlighted lines have accent background and left border", async ({
    page,
  }) => {
    const hll = page.locator(".highlight .hll").first();
    await expect(hll).toBeVisible();

    // Should have a left border (2px)
    const borderLeft = await hll.evaluate(
      (el) => getComputedStyle(el).borderLeftWidth
    );
    expect(parseFloat(borderLeft)).toBeGreaterThanOrEqual(2);
  });

  test("task list renders custom checkboxes", async ({ page }) => {
    const checkedBox = page.locator(
      '.task-list-control input[type="checkbox"][checked]'
    );
    const uncheckedBox = page.locator(
      '.task-list-control input[type="checkbox"]:not([checked])'
    );

    await expect(checkedBox.first()).toBeVisible();
    await expect(uncheckedBox.first()).toBeVisible();

    // Checked checkbox should have accent background
    const bg = await checkedBox.first().evaluate((el) => {
      return getComputedStyle(el).backgroundColor;
    });
    // Should not be transparent/default
    expect(bg).not.toBe("rgba(0, 0, 0, 0)");
  });

  test("critic markup elements are styled", async ({ page }) => {
    const ins = page.locator("ins.critic");
    const del = page.locator("del.critic");
    const mark = page.locator("mark.critic");
    const comment = page.locator("span.critic.comment");

    await expect(ins.first()).toBeVisible();
    await expect(del.first()).toBeVisible();
    await expect(mark.first()).toBeVisible();
    await expect(comment.first()).toBeVisible();
  });

  test("math containers have proper spacing", async ({ page }) => {
    const displayMath = page.locator("div.arithmatex");
    await expect(displayMath).toBeVisible();

    // Display math should be centered
    await expect(displayMath).toHaveCSS("text-align", "center");
  });

  test("copy-code.js is not loaded on pages without code blocks", async ({
    page,
  }) => {
    // Navigate to a page without code blocks
    await page.goto("/reference/changelog/");

    const scripts = await page.evaluate(() =>
      Array.from(document.querySelectorAll("script[src]")).map(
        (s) => (s as HTMLScriptElement).src
      )
    );

    const hasCopyCode = scripts.some((src) => src.includes("copy-code.js"));
    expect(hasCopyCode).toBe(false);
  });
});
