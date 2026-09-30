import { Page, Locator } from '@playwright/test';
import { CartPage } from '../cart/CartPage';
import { CheckoutStepTwoPage } from './CheckoutStepTwoPage';

/**
 * Page object for Checkout Step One — customer information form
 * (first name, last name, postal code).
 */
export class CheckoutStepOnePage {
  private readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.cancelButton = page.getByTestId('cancel');
    this.errorMessage = page.getByTestId('error');
  }

  async fillCustomerInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /** Fills the form and continues, returning the next step. Happy-path convenience method. */
  async continueToOverview(): Promise<CheckoutStepTwoPage> {
    await this.continueButton.click();
    return new CheckoutStepTwoPage(this.page);
  }

  /** Attempts to continue without asserting success — for negative-path tests (e.g. blank fields). */
  async attemptContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async cancel(): Promise<CartPage> {
    await this.cancelButton.click();
    return new CartPage(this.page);
  }

  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent())?.trim() ?? '';
  }
}
