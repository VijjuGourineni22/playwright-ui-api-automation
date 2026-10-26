import { test, expect, request as pwRequest } from '@playwright/test';
import { BookingApiClient } from '../../utils/apiClient';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { users } from '../../utils/testData';

/**
 * Hybrid example: use the API to create and verify data (fast, no UI),
 * then confirm the UI flow works independently. Shows how API calls can be
 * used for test setup and cleanup alongside UI checks.
 */
test('create booking via API, verify it, clean up, then check the UI', async ({ page }) => {
  const apiContext = await pwRequest.newContext({ baseURL: 'https://restful-booker.herokuapp.com' });
  const api = new BookingApiClient(apiContext);

  // Arrange via API
  const token = await api.createToken();
  const created = await (await api.createBooking()).json();
  const fetched = await (await api.getBooking(created.bookingid)).json();
  expect(fetched.firstname).toBe('Test');

  // UI check
  const login = new LoginPage(page);
  await login.goto();
  await login.login(users.valid.username, users.valid.password);
  await new InventoryPage(page).expectLoaded();

  // Cleanup via API
  const del = await api.deleteBooking(created.bookingid, token);
  expect(del.status()).toBe(201);
  await apiContext.dispose();
});
