import { Page, Locator } from '@playwright/test';
import { ProductCard } from '../../components/ProductCard';
import { InventoryPage } from '../inventory/InventoryPage';
import { CheckoutCompletePage } from './CheckoutCompletePage';

/**
 * Page object for Checkout Step Two — order review/overview screen
 * (line items, payment/shipping info, price totals).
 */
export class CheckoutStepTwoPage {
  private readonly page: Page;
  readonly summaryItems: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.summaryItems = page.getByTestId('cart-item');
    this.subtotalLabel = page.getByTestId('subtotal-label');
    this.taxLabel = page.getByTestId('tax-label');
    this.totalLabel = page.getByTestId('total-label');
    this.finishButton = page.getByTestId('finish');
    this.cancelButton = page.getByTestId('cancel');
  }

  getSummaryItem(productName: string): ProductCard {
    const root = this.summaryItems.filter({ hasText: productName });
    return new ProductCard(root);
  }

  async getSummaryItemCount(): Promise<number> {
    return this.summaryItems.count();
  }

  async getSubtotal(): Promise<string> {
    return (await this.subtotalLabel.textContent())?.trim() ?? '';
  }

  async getTax(): Promise<string> {
    return (await this.taxLabel.textContent())?.trim() ?? '';
  }

  async getTotal(): Promise<string> {
    return (await this.totalLabel.textContent())?.trim() ?? '';
  }

  async finish(): Promise<CheckoutCompletePage> {
    await this.finishButton.click();
    return new CheckoutCompletePage(this.page);
  }

  async cancel(): Promise<InventoryPage> {
    await this.cancelButton.click();
    return new InventoryPage(this.page);
  }
}
