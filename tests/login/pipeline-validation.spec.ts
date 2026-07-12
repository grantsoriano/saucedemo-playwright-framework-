import { test, expect } from '@playwright/test';

/**
 * Temporary pipeline validation test.
 * Purpose: confirm CI/CD wiring (test execution, HTML report, Allure report,
 * GitHub Pages deploy) works end-to-end before the full test suite is written.
 * Safe to delete once real login tests are added in tests/login/.
 */
test('@smoke pipeline validation - login page loads', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Swag Labs');
  await expect(page.locator('.login_logo')).toBeVisible();
  await expect(page.locator('#user-name')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();
  await expect(page.locator('#login-button')).toBeVisible();
});
