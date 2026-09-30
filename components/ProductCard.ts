import { Locator } from '@playwright/test';
import { ProductDetailPage } from '../pages/inventory/ProductDetailPage';

/**
 * Component object representing a single product tile on the Inventory page,
 * or a single line item on the Cart / Checkout Overview page.
 *
 * Scoped to a single container Locator (via .filter()) rather than the whole
 * page, so the same class represents any one of SauceDemo's repeated
 * product-tile structures without duplicating locators per product.
 */
export class ProductCard {
  private readonly root: Locator;

  constructor(root: Locator) {
    this.root = root;
  }

  private get nameLocator(): Locator {
    return this.root.getByTestId('inventory-item-name');
  }

  private get priceLocator(): Locator {
    return this.root.getByTestId('inventory-item-price');
  }

  private get descriptionLocator(): Locator {
    return this.root.getByTestId('inventory-item-desc');
  }

  // "Add to cart" / "Remove" test-ids are per-product (e.g. add-to-cart-sauce-labs-backpack),
  // so role-based locators are used here as the documented fallback for elements
  // without a generic data-test attribute.
  private get addToCartButton(): Locator {
    return this.root.getByRole('button', { name: 'Add to cart' });
  }

  private get removeButton(): Locator {
    return this.root.getByRole('button', { name: 'Remove' });
  }

  async getName(): Promise<string> {
    return (await this.nameLocator.textContent())?.trim() ?? '';
  }

  async getPrice(): Promise<string> {
    return (await this.priceLocator.textContent())?.trim() ?? '';
  }

  async getDescription(): Promise<string> {
    return (await this.descriptionLocator.textContent())?.trim() ?? '';
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

  /**
   * Clicks the product name to navigate to its detail page.
   * Only valid when this card represents an Inventory tile, not a Cart line item.
   */
  async openDetails(): Promise<ProductDetailPage> {
    const page = this.root.page();
    await this.nameLocator.click();
    return new ProductDetailPage(page);
  }

  /** Exposes the raw locator for tests that need a direct assertion (e.g. toBeVisible()). */
  get locator(): Locator {
    return this.root;
  }
}
