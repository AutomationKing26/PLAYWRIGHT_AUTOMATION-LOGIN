// @ts-check
import { test, expect } from '@playwright/test';

const baseURL = 'https://rahulshettyacademy.com/loginpagePractise/';
const VALID_USER = process.env.RS_USER;
const VALID_PASS = process.env.RS_PASS;

test.describe('Login page - rahulshettyacademy', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test('successful login with valid credentials', async ({ page }) => {
    test.skip(!VALID_USER || !VALID_PASS, 'Set RS_USER & RS_PASS env vars for a real login');
    await page.fill('input[name="username"]', VALID_USER);
    await page.fill('input[type="password"]', VALID_PASS);
    await page.click('button[type="submit"], #signInBtn, text=Sign In');
    try {
      await page.waitForNavigation({ timeout: 5000 });
    } catch (e) {
      // navigation may not occur for SPA; fall through to URL check
    }
    expect(page.url()).not.toContain('loginpagePractise');
  });

  test('shows error for invalid password', async ({ page }) => {
    const user = VALID_USER || 'someuser';
    await page.fill('input[name="username"]', user);
    await page.fill('input[type="password"]', 'wrong-password-123');
    await page.click('button[type="submit"], #signInBtn, text=Sign In');
    const err = page.locator('text=/incorrect|invalid|wrong|failed/i');
    await expect(err).toBeVisible({ timeout: 5000 });
  });

  test('shows error for invalid username', async ({ page }) => {
    const pass = VALID_PASS || 'somepass';
    await page.fill('input[name="username"]', 'nonexistent_user');
    await page.fill('input[type="password"]', pass);
    await page.click('button[type="submit"], #signInBtn, text=Sign In');
    const err = page.locator('text=/incorrect|invalid|wrong|failed/i');
    await expect(err).toBeVisible({ timeout: 5000 });
  });

  test('shows validation when fields are empty', async ({ page }) => {
    await page.click('button[type="submit"], #signInBtn, text=Sign In');
    const validation = page.locator('text=/please|required|cannot be empty|empty/i');
    await expect(validation).toBeVisible({ timeout: 5000 });
  });

  test('remember me retains username after reload', async ({ page }) => {
    test.skip(!VALID_USER || !VALID_PASS, 'Set RS_USER & RS_PASS env vars for a real login');
    await page.fill('input[name="username"]', VALID_USER);
    await page.fill('input[type="password"]', VALID_PASS);
    // try common checkbox selectors/labels
    const remember = page.locator('input[type="checkbox"], text=/remember/i');
    await remember.check().catch(() => {});
    await page.click('button[type="submit"], #signInBtn, text=Sign In');
    try {
      await page.waitForNavigation({ timeout: 5000 });
    } catch {}
    await page.goto(baseURL);
    const usernameField = page.locator('input[name="username"], input#username, input[placeholder="Username"]');
    await expect(usernameField).toHaveValue(VALID_USER, { timeout: 5000 });
  });
});
