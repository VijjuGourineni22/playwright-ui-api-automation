import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { checkoutInfo, products, users } from '../../utils/testData';

test('complete end-to-end checkout', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(users.valid.username, users.valid.password);

  const inventory = new InventoryPage(page);
  await inventory.expectLoaded();
  await inventory.addToCart(products.backpack);
  await inventory.openCart();

  const cart = new CartPage(page);
  await cart.expectContains(products.backpack);
  await cart.startCheckout();

  const checkout = new CheckoutPage(page);
  await checkout.fillInfo(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.postalCode);
  await checkout.finish();
  await checkout.expectOrderComplete();
});
