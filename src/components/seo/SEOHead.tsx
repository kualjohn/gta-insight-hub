import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  articlePublishedTime?: string;
  noindex?: boolean;
}

/**
 * Legacy per-page SEO component. Title / description / canonical / og / twitter
 * are now emitted from a single persistent source: <RouteHead /> in App.tsx,
 * keyed on the current route. That eliminates a race where this component
 * unmounted between route transitions and briefly let the static index.html
 * defaults win.
 *
 * This component is kept as a no-op wrapper (with `noindex` and
 * `articlePublishedTime` still respected) so existing per-page imports keep
 * compiling without editing every page. To change a page's title or
 * description, edit the ROUTE_META map in src/components/seo/RouteHead.tsx.
 */
export function SEOHead({
  articlePublishedTime,
  ogType,
  noindex = false,
}: SEOHeadProps) {
  const emitArticleTime = ogType === 'article' && articlePublishedTime;
  if (!noindex && !emitArticleTime) return null;
  return (
    <Helmet>
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {emitArticleTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
    </Helmet>
  );
}
