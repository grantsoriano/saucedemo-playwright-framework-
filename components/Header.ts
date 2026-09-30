import { Page, Locator } from '@playwright/test';
import { CartPage } from '../pages/cart/CartPage';

/**
 * Component object for the persistent top header/nav bar present on the
 * Inventory, Product Detail, and Cart pages (SauceDemo logo, cart icon + badge).
 *
 * Injected into page objects via composition rather than shared through
 * inheritance, so each page object only depends on the header behavior it
 * actually needs.
 */
export class Header {
  private readonly page: Page;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async goToCart(): Promise<CartPage> {
    await this.cartLink.click();
    return new CartPage(this.page);
  }

  /** Returns 0 when the badge isn't rendered, i.e. the cart is empty. */
  async getCartItemCount(): Promise<number> {
    if (!(await this.cartBadge.isVisible())) {
      return 0;
    }
    const text = await this.cartBadge.textContent();
    return Number(text) || 0;
  }
}
