import type { TVenue } from './venue';

export type TBookings = {
  venueId: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: TVenue;
};
