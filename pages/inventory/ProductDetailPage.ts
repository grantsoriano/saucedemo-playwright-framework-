import { Page, Locator } from '@playwright/test';
import { Header } from '../../components/Header';
import { BurgerMenu } from '../../components/BurgerMenu';
import { InventoryPage } from './InventoryPage';

/**
 * Page object for the single-product detail view, reached by clicking a
 * product's name or image from the Inventory page.
 */
export class ProductDetailPage {
  private readonly page: Page;
  readonly header: Header;
  readonly burgerMenu: BurgerMenu;
  readonly backButton: Locator;
  readonly itemName: Locator;
  readonly itemPrice: Locator;
  readonly itemDescription: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.burgerMenu = new BurgerMenu(page);
    this.backButton = page.getByTestId('back-to-products');
    this.itemName = page.getByTestId('inventory-item-name');
    this.itemPrice = page.getByTestId('inventory-item-price');
    this.itemDescription = page.getByTestId('inventory-item-desc');
  }

  // Per-product test-id, so role-based locators are used as the documented
  // fallback, same convention as ProductCard.
  private get addToCartButton(): Locator {
    return this.page.getByRole('button', { name: 'Add to cart' });
  }

  private get removeButton(): Locator {
    return this.page.getByRole('button', { name: 'Remove' });
  }

  async getName(): Promise<string> {
    return (await this.itemName.textContent())?.trim() ?? '';
  }

  async getPrice(): Promise<string> {
    return (await this.itemPrice.textContent())?.trim() ?? '';
  }

  async getDescription(): Promise<string> {
    return (await this.itemDescription.textContent())?.trim() ?? '';
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async removeFromCart(): Promise<void> {
    await this.removeButton.click();
  }

  async isInCart(): Promise<boolean> {
    return this.removeButton.isVisible();
  }

  async goBackToProducts(): Promise<InventoryPage> {
    await this.backButton.click();
    return new InventoryPage(this.page);
  }
}
