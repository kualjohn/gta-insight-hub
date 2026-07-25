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

export function SEOHead({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://i.ytimg.com/vi/Mh6UJ08iSkA/maxresdefault.jpg',
  ogType = 'website',
  articlePublishedTime,
  noindex = false,
}: SEOHeadProps) {
  const siteName = 'Fawad Nissari | GTA Real Estate';
  const fullTitle = title.includes('Fawad') ? title : `${title} | ${siteName}`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Canonical URL is emitted globally by <CanonicalTag /> based on the current route. */}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />
      {/* og:url is emitted globally by <CanonicalTag /> and will dedupe this route's URL. */}

      {/* Article specific */}
      {ogType === 'article' && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
