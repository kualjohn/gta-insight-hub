import { Helmet } from 'react-helmet-async';
import { useGoogleReviews } from '@/hooks/useGoogleReviews';

const DEFAULT_RATING = '5.0';

export function BusinessSchema() {
  const { data: googleData } = useGoogleReviews();

  const rating = googleData?.rating?.toFixed(1) ?? DEFAULT_RATING;
  // Google requires reviewCount to be a positive integer. Emitting 0 (or the
  // schema at all before reviews load) produces "reviewCount must be positive"
  // errors in Search Console, so the block is omitted until we have real data.
  const reviewCount = googleData?.totalReviews ?? 0;
  const hasReviews = Number.isFinite(reviewCount) && reviewCount > 0;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['RealEstateAgent', 'LocalBusiness'],
        '@id': 'https://fawadnissari.ca/#business',
        name: 'Fawad Nissari',
        url: 'https://fawadnissari.ca',
        telephone: '+1-416-878-1085',
        email: 'fawad.nissari@housesigma.com',
        image: 'https://fawadnissari.ca/favicon.ico',
        priceRange: '$$',
        areaServed: [
          { '@type': 'City', name: 'Milton' },
          { '@type': 'City', name: 'Mississauga' },
          { '@type': 'City', name: 'Oakville' },
          { '@type': 'City', name: 'Burlington' },
          { '@type': 'City', name: 'Brampton' },
          { '@type': 'City', name: 'Hamilton' },
        ],
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'ON',
          addressCountry: 'CA',
        },
        ...(hasReviews
          ? {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: rating,
                reviewCount: reviewCount,
                bestRating: '5',
                worstRating: '1',
              },
            }
          : {}),
        sameAs: [
          'https://www.instagram.com/fawadnissari.realestate',
          'https://www.facebook.com/fawadnissarirealestate',
          'https://www.tiktok.com/@fawadnissari.realtor',
          'https://www.linkedin.com/in/fawadnissari',
          'https://www.youtube.com/@fawadnissari',
        ],
      },
    ],
  };

  return (
    <Helmet defer={false}>
      <script id="business-schema" key="business-schema" type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
