import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/LoginPage';

test.describe('Login Tests', () => {
  test('@smoke Login Page validation - login page loads', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await expect(page).toHaveTitle('Swag Labs');
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('@smoke Login validation - valid login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    const inventoryPage = await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.sortDropdown).toBeVisible();
  });

  test('@negative Login validation - locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.attemptLogin('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorMessage).toBeVisible();
  });
});
