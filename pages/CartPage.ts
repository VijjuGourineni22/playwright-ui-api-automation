import { Locator, Page, expect } from '@playwright/test';

export class CartPage {
  readonly items: Locator;
  readonly checkoutButton: Locator;

  constructor(private readonly page: Page) {
    this.items = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectItemCount(count: number) {
    await expect(this.items).toHaveCount(count);
  }

  async expectContains(productName: string) {
    await expect(this.page.locator('[data-test="inventory-item-name"]', { hasText: productName })).toBeVisible();
  }

  async startCheckout() {
    await this.checkoutButton.click();
  }
}
