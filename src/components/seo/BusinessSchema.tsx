import { Helmet } from 'react-helmet-async';

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
      ],
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'ON',
        addressCountry: 'CA',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '64',
        bestRating: '5',
        worstRating: '1',
      },
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

export function BusinessSchema() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}