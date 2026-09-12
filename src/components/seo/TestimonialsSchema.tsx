import { Helmet } from 'react-helmet-async';
import { useGoogleReviews } from '@/hooks/useGoogleReviews';

export function TestimonialsSchema() {
  const { data } = useGoogleReviews();

  if (!data) return null;

  const ratingValue = data.rating?.toFixed(1) ?? '5.0';
  const reviewCount = data.totalReviews ?? 0;
  // Google rejects a review snippet with reviewCount of 0 or less.
  const hasReviews = Number.isFinite(reviewCount) && reviewCount > 0;

  const individualReviews = data.reviews.map((review) => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author,
      ...(review.authorUrl ? { url: review.authorUrl } : {}),
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: review.text,
    datePublished: review.publishTime ?? undefined,
    itemReviewed: {
      '@type': ['RealEstateAgent', 'LocalBusiness'],
      name: 'Fawad Nissari',
      url: 'https://fawadnissari.ca',
      telephone: '+1-416-878-1085',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '420 Main St E Unit 556',
        addressLocality: 'Milton',
        addressRegion: 'ON',
        postalCode: 'L9T 5G3',
        addressCountry: 'CA',
      },
    },
  }));

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
        address: {
          '@type': 'PostalAddress',
          streetAddress: '420 Main St E Unit 556',
          addressLocality: 'Milton',
          addressRegion: 'ON',
          postalCode: 'L9T 5G3',
          addressCountry: 'CA',
        },
        ...(hasReviews
          ? {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue,
                reviewCount,
                bestRating: '5',
                worstRating: '1',
              },
            }
          : {}),
      },
      ...individualReviews,
    ],
  };

  return (
    <Helmet defer={false}>
      <script id="testimonials-schema" key="testimonials-schema" type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
