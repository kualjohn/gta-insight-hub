import { useParams } from 'react-router-dom';
import { useProperty } from '@/hooks/useProperties';
import PropertyHeader from '@/components/property/PropertyHeader';
import PropertyHero from '@/components/property/PropertyHero';
import PropertyOverview from '@/components/property/PropertyOverview';
import PropertyGallery from '@/components/property/PropertyGallery';
import PropertyExplore from '@/components/property/PropertyExplore';
import PropertyMap from '@/components/property/PropertyMap';
import PropertyContact from '@/components/property/PropertyContact';
import { SEOHead } from '@/components/seo/SEOHead';

export default function PropertyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: property, isLoading } = useProperty(slug || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">Property Not Found</h1>
          <p className="font-body text-muted-foreground">This listing doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const canonicalUrl = `https://fawadnissari.ca/portfolio/${property.slug}`;
  const locationSuffix = property.city ? ` in ${property.city}` : '';
  const metaTitle = `${property.title}${locationSuffix} | Sold by Fawad Nissari`.slice(0, 60);
  const specs = [
    property.beds ? `${property.beds} bed` : null,
    property.baths ? `${property.baths} bath` : null,
    property.sqft ? `${property.sqft} sq ft` : null,
  ]
    .filter(Boolean)
    .join(', ');
  const metaDescription = `${property.title}${property.city ? `, ${property.city}` : ''}${
    specs ? ` — ${specs}` : ''
  }. See photos, features, sold results, and the full marketing campaign behind this listing.`.slice(0, 158);
  const listingSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: `${property.title}${locationSuffix}`,
    description: metaDescription,
    url: canonicalUrl,
    ...(property.hero_image ? { image: [property.hero_image] } : {}),
    ...(property.city
      ? { address: { '@type': 'PostalAddress', streetAddress: property.title, addressLocality: property.city, addressRegion: 'ON', addressCountry: 'CA' } }
      : {}),
    ...(property.price
      ? { offers: { '@type': 'Offer', price: property.price, priceCurrency: 'CAD', availability: 'https://schema.org/SoldOut' } }
      : {}),
    ...(property.beds ? { numberOfBedrooms: property.beds } : {}),
    ...(property.baths ? { numberOfBathroomsTotal: property.baths } : {}),
    ...(property.sqft
      ? { floorSize: { '@type': 'QuantitativeValue', value: property.sqft, unitCode: 'FTK' } }
      : {}),
    broker: { '@type': 'RealEstateAgent', name: 'Fawad Nissari', url: 'https://fawadnissari.ca' },
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEOHead
        title={metaTitle}
        description={metaDescription}
        canonicalUrl={canonicalUrl}
        ogImage={property.hero_image || undefined}
        jsonLd={listingSchema}
      />
      <PropertyHeader />
      <PropertyHero property={property} />
      <PropertyOverview property={property} />
      <PropertyGallery images={property.gallery_images || []} />
      <PropertyExplore property={property} />
      {property.brochure_url && (
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-16 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-3xl text-foreground mb-8">Documents</h2>
            <a href={property.brochure_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-3 font-body text-xs tracking-[0.2em] uppercase hover:bg-accent/90 transition-colors">
              Download Brochure
            </a>
          </div>
        </section>
      )}
      <PropertyMap address={property.title} city={property.city} />
      <PropertyContact property={property} />
    </div>
  );
}
