import { test, expect } from '@playwright/test';
import { BookingApiClient } from '../../utils/apiClient';
import { bookingPayload } from '../../utils/testData';

test.describe('Booking API', () => {
  let api: BookingApiClient;

  test.beforeEach(({ request }) => {
    api = new BookingApiClient(request);
  });

  test('POST creates a booking and returns an id', async () => {
    const res = await api.createBooking();
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.bookingid).toBeGreaterThan(0);
    expect(body.booking).toMatchObject({
      firstname: bookingPayload.firstname,
      lastname: bookingPayload.lastname,
      totalprice: bookingPayload.totalprice,
    });
  });

  test('GET returns the created booking', async () => {
    const created = await (await api.createBooking()).json();
    const res = await api.getBooking(created.bookingid);
    expect(res.ok()).toBeTruthy();
    expect(res.headers()['content-type']).toContain('application/json');
    const body = await res.json();
    expect(body.firstname).toBe(bookingPayload.firstname);
    expect(body.bookingdates.checkin).toBe(bookingPayload.bookingdates.checkin);
  });

  test('PUT updates a booking when authenticated', async () => {
    const token = await api.createToken();
    const created = await (await api.createBooking()).json();
    const res = await api.updateBooking(created.bookingid, token, {
      ...bookingPayload,
      firstname: 'Updated',
      totalprice: 300,
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.firstname).toBe('Updated');
    expect(body.totalprice).toBe(300);
  });

  test('PATCH partially updates a booking', async () => {
    const token = await api.createToken();
    const created = await (await api.createBooking()).json();
    const res = await api.patchBooking(created.bookingid, token, { lastname: 'Patched' });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.lastname).toBe('Patched');
    expect(body.firstname).toBe(bookingPayload.firstname);
  });

  test('DELETE removes the booking', async () => {
    const token = await api.createToken();
    const created = await (await api.createBooking()).json();
    const del = await api.deleteBooking(created.bookingid, token);
    expect(del.status()).toBe(201);
    const after = await api.getBooking(created.bookingid);
    expect(after.status()).toBe(404);
  });

  test('PUT without a token is forbidden', async () => {
    const created = await (await api.createBooking()).json();
    const res = await api.updateBooking(created.bookingid, 'invalid-token', bookingPayload);
    expect(res.status()).toBe(403);
  });

  test('GET for a non-existent id returns 404', async () => {
    const res = await api.getBooking(999999999);
    expect(res.status()).toBe(404);
  });

  test('POST with invalid credentials does not return a token', async ({ request }) => {
    const res = await request.post('/auth', { data: { username: 'bad', password: 'bad' } });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.token).toBeUndefined();
    expect(body.reason).toBe('Bad credentials');
  });
});
