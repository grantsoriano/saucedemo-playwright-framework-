import { Page, Locator } from '@playwright/test';
import { InventoryPage } from '../inventory/InventoryPage';

/**
 * Page object for the final "Thank you for your order" confirmation screen.
 */
export class CheckoutCompletePage {
  private readonly page: Page;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.getByTestId('complete-header');
    this.completeText = page.getByTestId('complete-text');
    this.backToProductsButton = page.getByTestId('back-to-products');
  }

  async getConfirmationHeader(): Promise<string> {
    return (await this.completeHeader.textContent())?.trim() ?? '';
  }

  async getConfirmationText(): Promise<string> {
    return (await this.completeText.textContent())?.trim() ?? '';
  }

  async backToProducts(): Promise<InventoryPage> {
    await this.backToProductsButton.click();
    return new InventoryPage(this.page);
  }
}
