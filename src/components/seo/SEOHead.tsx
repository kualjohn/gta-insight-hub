import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}

/**
 * Per-page head override. <RouteHead /> in App.tsx emits the persistent
 * per-route defaults (title, description, canonical, og/twitter). This
 * component mounts *below* RouteHead, so react-helmet-async dedupes its
 * <title> and its name/property meta tags on top of the route defaults —
 * giving dynamic pages (blog posts, listings) unique metadata.
 *
 * Static pages should keep editing ROUTE_META in RouteHead.tsx instead.
 */
export function SEOHead({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  articlePublishedTime,
  articleModifiedTime,
  noindex = false,
  jsonLd,
}: SEOHeadProps) {
  const trimmedTitle = title?.trim();
  const trimmedDescription = description?.trim();

  return (
    <Helmet defer={false}>
      {trimmedTitle && <title>{trimmedTitle}</title>}
      {trimmedTitle && <meta name="title" content={trimmedTitle} />}
      {trimmedDescription && <meta name="description" content={trimmedDescription} />}
      {trimmedTitle && <meta property="og:title" content={trimmedTitle} />}
      {trimmedDescription && <meta property="og:description" content={trimmedDescription} />}
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {trimmedTitle && <meta name="twitter:title" content={trimmedTitle} />}
      {trimmedDescription && <meta name="twitter:description" content={trimmedDescription} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      {ogType === 'article' && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {ogType === 'article' && articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
