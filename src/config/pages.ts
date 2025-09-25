/**
 * Represents metadata for a page, including title, optional description, and favicon.
 *
 * @interface PageMeta
 * @property {string} title - The title of the page, displayed in the browser tab.
 * @property {string} [description] - Optional meta description for SEO purposes.
 * @property {string} [favicon] - Optional URL to the favicon for the page.
 */

export interface PageMeta {
  title: string;
  description?: string;
  favicon?: string;
}

/**
 * Maps each route path to its corresponding page metadata.
 *
 * This configuration is used by the `usePageMeta` hook to set the document title, meta description, and favicon dynamically based on the current route.
 *
 * @type {Record<string, PageMeta>}
 */

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
