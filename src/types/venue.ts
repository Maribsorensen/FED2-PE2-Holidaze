import type { TBookings } from './bookings';

export type TVenue = {
  id: string;
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  price: number;
  created: string;
  updated: string;
  maxGuests: number;
  rating: number;
  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  location: {
    address: string;
    city: string;
    zip: string;
    country: string;
    continent: string;
    lat: number;
    lng: number;
  };
  owner: {
    name: string;
    email: string;
    bio: string;
    avatar: { url: string; alt: string };
  };
  bookings?: TBookings[];
};

export type TPaginationMeta = {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
  totalCount: number;
};

export type TPaginatedVenues = {
  data: TVenue[];
  meta: TPaginationMeta;
};

export type VenueWithBookings = TVenue & {
  bookings: TBookings[];
};
