import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://fawadnissari.ca';

export function CanonicalTag() {
  const { pathname } = useLocation();
  // Normalize: strip trailing slash except for root
  const normalized = pathname.length > 1 && pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname;
  const url = `${SITE_URL}${normalized}`;

  return (
    <Helmet>
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
    </Helmet>
  );
}