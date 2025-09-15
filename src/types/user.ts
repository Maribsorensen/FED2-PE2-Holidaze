export type TUser = {
  name: string;
  email: string;
  bio?: string;
  banner: { url: string; alt: string };
  avatar: { url: string; alt: string };
  venueManager: boolean;
  _count?: {
    venues: number;
    bookings: number;
  };
};
export type AuthCredentials = {
  data: TUser & { accessToken: string };
};

export type ProfileCredentials = {
  data: TUser;
};

export type RegisterCredentials = {
  data: TUser;
};
