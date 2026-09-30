import { Page, Locator } from '@playwright/test';
import { Header } from '../../components/Header';
import { BurgerMenu } from '../../components/BurgerMenu';
import { ProductCard } from '../../components/ProductCard';
import { CartPage } from '../cart/CartPage';

export type SortOption =
  | 'az' // Name (A to Z)
  | 'za' // Name (Z to A)
  | 'lohi' // Price (low to high)
  | 'hilo'; // Price (high to low)

/**
 * Page object for the Inventory (product listing) page — the landing page
 * after a successful login.
 */
export class InventoryPage {
  private readonly page: Page;
  readonly header: Header;
  readonly burgerMenu: BurgerMenu;
  readonly sortDropdown: Locator;
  readonly productTiles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.burgerMenu = new BurgerMenu(page);
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productTiles = page.locator('[data-test="inventory-item"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/inventory.html');
  }

  /** Returns a ProductCard scoped to the tile matching the given product name. */
  getProductCard(productName: string): ProductCard {
    const root = this.productTiles.filter({ hasText: productName });
    return new ProductCard(root);
  }

  async getProductCount(): Promise<number> {
    return this.productTiles.count();
  }

  async getAllProductNames(): Promise<string[]> {
    return this.page.getByTestId('inventory-item-name').allTextContents();
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async goToCart(): Promise<CartPage> {
    return this.header.goToCart();
  }
}
