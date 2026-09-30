import { Page, Locator } from '@playwright/test';
import { Header } from '../../components/Header';
import { BurgerMenu } from '../../components/BurgerMenu';
import { ProductCard } from '../../components/ProductCard';
import { InventoryPage } from '../inventory/InventoryPage';
import { CheckoutStepOnePage } from '../checkout/CheckoutStepOnePage';

/**
 * Page object for the Cart page. Cart line items share the same
 * name/price/remove-button structure as Inventory tiles, so ProductCard
 * is reused here rather than duplicated as a separate component.
 */
export class CartPage {
  private readonly page: Page;
  readonly header: Header;
  readonly burgerMenu: BurgerMenu;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.burgerMenu = new BurgerMenu(page);
    this.cartItems = page.getByTestId('cart-item');
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
  }

  getCartItem(productName: string): ProductCard {
    const root = this.cartItems.filter({ hasText: productName });
    return new ProductCard(root);
  }

  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async getAllCartItemNames(): Promise<string[]> {
    return this.page.getByTestId('inventory-item-name').allTextContents();
  }

  async continueShopping(): Promise<InventoryPage> {
    await this.continueShoppingButton.click();
    return new InventoryPage(this.page);
  }

  async checkout(): Promise<CheckoutStepOnePage> {
    await this.checkoutButton.click();
    return new CheckoutStepOnePage(this.page);
  }
}
