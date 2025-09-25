import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pagesMeta, type PageMeta } from '../config/pages';

/**
 * Custom hook to manage page metadata (title, description, favicon) based on the current route.
 *
 * Updates the document's:
 *  - Title
 *  - Meta description
 *  - Favicon
 *
 * Metadata is taken from the `pagesMeta` config, and can be optionally overridden via `metaOverrides`.
 *
 * @param {Partial<PageMeta>} [metaOverrides] Optional overrides for the page metadata.
 * Properties include `title`, `description`, and `favicon`.
 */

export function usePageMeta(metaOverrides?: Partial<PageMeta>) {
  const location = useLocation();

  useEffect(() => {
    const config = pagesMeta[location.pathname] || {};
    const title = metaOverrides?.title || config.title || 'Holidaze';
    const description = metaOverrides?.description || config.description;
    const faviconUrl = metaOverrides?.favicon || config.favicon;

    document.title = title;

    if (description) {
      let metaDesc = document.querySelector<HTMLMetaElement>(
        'meta[name="description"]'
      );
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = description;
    }

    if (faviconUrl) {
      const favicon = document.getElementById('favicon') as HTMLLinkElement;
      if (favicon) favicon.href = faviconUrl;
    }
  }, [location.pathname, metaOverrides]);
}
