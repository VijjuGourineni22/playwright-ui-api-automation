import { Locator, Page, expect } from '@playwright/test';

export class InventoryPage {
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('[data-test="title"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  private slug(productName: string): string {
    return productName.toLowerCase().replace(/\s+/g, '-');
  }

  async expectLoaded() {
    await expect(this.title).toHaveText('Products');
  }

  async addToCart(productName: string) {
    await this.page.locator(`[data-test="add-to-cart-${this.slug(productName)}"]`).click();
  }

  async removeFromCart(productName: string) {
    await this.page.locator(`[data-test="remove-${this.slug(productName)}"]`).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
