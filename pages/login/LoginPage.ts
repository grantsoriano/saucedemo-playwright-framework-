import { Page, Locator } from '@playwright/test';
import { InventoryPage } from '../inventory/InventoryPage';

/**
 * Page object for the SauceDemo login screen (the app's entry point).
 *
 * Exposes two entry methods on purpose:
 *  - login(): the happy-path convenience method, assumes success and
 *    returns the next page object (InventoryPage).
 *  - attemptLogin(): the neutral method for negative-path tests
 *    (locked_out_user, wrong password, etc.) where navigation does not
 *    occur and the test asserts on the error message instead.
 */
export class LoginPage {
  private readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async attemptLogin(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<InventoryPage> {
    await this.attemptLogin(username, password);
    return new InventoryPage(this.page);
  }
}
