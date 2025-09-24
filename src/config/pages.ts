export interface PageMeta {
  title: string;
  description?: string;
  favicon?: string;
}

export const pagesMeta: Record<string, PageMeta> = {
  '/': {
    title: 'Holidaze - Home',
    description: 'Find and book amazing venues for your next holiday.',
    favicon: '/Holidaze-favicon.png',
  },
  '/venues': {
    title: 'Holidaze - Venues',
    description: 'Browse all Holidaze venues',
    favicon: '/Holidaze-favicon.png',
  },
  '/login': {
    title: 'Holidaze - Login',
    favicon: '/Holidaze-favicon.png',
  },
  '/register': {
    title: 'Holidaze - Register',
    favicon: '/Holidaze-favicon.png',
  },
  '/profile': {
    title: 'Holidaze - Profile',
    favicon: '/Holidaze-favicon.png',
  },
};
