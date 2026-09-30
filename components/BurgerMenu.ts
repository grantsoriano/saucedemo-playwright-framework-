import { Page, Locator } from '@playwright/test';
import { LoginPage } from '../pages/login/LoginPage';
import { InventoryPage } from '../pages/inventory/InventoryPage';

/**
 * Component object for the left-hand burger-menu sidebar (All Items, About,
 * Logout, Reset App State), present on every authenticated page.
 */
export class BurgerMenu {
  private readonly page: Page;
  readonly openMenuButton: Locator;
  readonly closeMenuButton: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openMenuButton = page.getByTestId('open-menu');
    this.closeMenuButton = page.getByTestId('close-menu');
    this.allItemsLink = page.getByTestId('inventory-sidebar-link');
    this.aboutLink = page.getByTestId('about-sidebar-link');
    this.logoutLink = page.getByTestId('logout-sidebar-link');
    this.resetAppStateLink = page.getByTestId('reset-sidebar-link');
  }

  async open(): Promise<void> {
    await this.openMenuButton.click();
    await this.logoutLink.waitFor({ state: 'visible' });
  }

  async close(): Promise<void> {
    await this.closeMenuButton.click();
  }

  async logout(): Promise<LoginPage> {
    await this.open();
    await this.logoutLink.click();
    return new LoginPage(this.page);
  }

  async resetAppState(): Promise<void> {
    await this.open();
    await this.resetAppStateLink.click();
    await this.close();
  }

  async goToAllItems(): Promise<InventoryPage> {
    await this.open();
    await this.allItemsLink.click();
    return new InventoryPage(this.page);
  }
}
