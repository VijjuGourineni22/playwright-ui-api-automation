import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { users } from '../../utils/testData';

test.describe('Login', () => {
  test('valid user can log in', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.valid.username, users.valid.password);
    await new InventoryPage(page).expectLoaded();
    await expect(page).toHaveURL(/inventory/);
  });

  test('invalid credentials show an error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.invalid.username, users.invalid.password);
    await login.expectError('Username and password do not match');
  });

  test('locked out user is blocked', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.locked.username, users.locked.password);
    await login.expectError('locked out');
  });

  test('empty username shows a required message', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('', users.valid.password);
    await login.expectError('Username is required');
  });
});
