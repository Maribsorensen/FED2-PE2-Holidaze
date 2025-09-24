import type { TVenue } from './venue';

export type TBookings = {
  id?: string; // booking UUID, only present after creation
  venueId: string; // venue being booked
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: TVenue;
};
