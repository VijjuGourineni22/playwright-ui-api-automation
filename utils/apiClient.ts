import { APIRequestContext, APIResponse } from '@playwright/test';
import { bookingAuth, bookingPayload } from './testData';

export type Booking = typeof bookingPayload;

export class BookingApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async createToken(): Promise<string> {
    const res = await this.request.post('/auth', { data: bookingAuth });
    const body = await res.json();
    return body.token as string;
  }

  createBooking(data: Booking = bookingPayload): Promise<APIResponse> {
    return this.request.post('/booking', { data });
  }

  getBooking(id: number): Promise<APIResponse> {
    return this.request.get(`/booking/${id}`, { headers: { Accept: 'application/json' } });
  }

  updateBooking(id: number, token: string, data: Booking): Promise<APIResponse> {
    return this.request.put(`/booking/${id}`, {
      data,
      headers: { Cookie: `token=${token}`, Accept: 'application/json' },
    });
  }

  patchBooking(id: number, token: string, data: Partial<Booking>): Promise<APIResponse> {
    return this.request.patch(`/booking/${id}`, {
      data,
      headers: { Cookie: `token=${token}`, Accept: 'application/json' },
    });
  }

  deleteBooking(id: number, token: string): Promise<APIResponse> {
    return this.request.delete(`/booking/${id}`, { headers: { Cookie: `token=${token}` } });
  }
}
