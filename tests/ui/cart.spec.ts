import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { products, users } from '../../utils/testData';

test.describe('Cart', () => {
  let inventory: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.valid.username, users.valid.password);
    inventory = new InventoryPage(page);
    await inventory.expectLoaded();
  });

  test('add a product to the cart', async ({ page }) => {
    await inventory.addToCart(products.backpack);
    await expect(inventory.cartBadge).toHaveText('1');
    await inventory.openCart();
    const cart = new CartPage(page);
    await cart.expectItemCount(1);
    await cart.expectContains(products.backpack);
  });

  test('add two products, then remove one', async ({ page }) => {
    await inventory.addToCart(products.backpack);
    await inventory.addToCart(products.bikeLight);
    await expect(inventory.cartBadge).toHaveText('2');
    await inventory.removeFromCart(products.backpack);
    await expect(inventory.cartBadge).toHaveText('1');
    await inventory.openCart();
    const cart = new CartPage(page);
    await cart.expectItemCount(1);
    await cart.expectContains(products.bikeLight);
  });
});
