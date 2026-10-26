export const users = {
  valid: { username: 'standard_user', password: 'secret_sauce' },
  locked: { username: 'locked_out_user', password: 'secret_sauce' },
  invalid: { username: 'wrong_user', password: 'wrong_pass' },
};

export const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
};

export const checkoutInfo = {
  firstName: 'Test',
  lastName: 'User',
  postalCode: '500001',
};

export const bookingPayload = {
  firstname: 'Test',
  lastname: 'User',
  totalprice: 150,
  depositpaid: true,
  bookingdates: { checkin: '2026-11-01', checkout: '2026-11-05' },
  additionalneeds: 'Breakfast',
};

export const bookingAuth = { username: 'admin', password: 'password123' };
