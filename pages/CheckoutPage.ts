import { Locator, Page, expect } from '@playwright/test';

export class CheckoutPage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly confirmation: Locator;

  constructor(private readonly page: Page) {
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.confirmation = page.locator('[data-test="complete-header"]');
  }

  async fillInfo(first: string, last: string, zip: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  async expectOrderComplete() {
    await expect(this.confirmation).toHaveText('Thank you for your order!');
  }
}
