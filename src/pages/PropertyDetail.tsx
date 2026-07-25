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

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEOHead
        title={`${property.title}${property.city ? ` in ${property.city}` : ''}`}
        description={`${property.title}${property.city ? ` — ${property.city}` : ''}. Explore photos, features, and marketing results from this listing sold by Fawad Nissari.`}
        ogImage={property.hero_image || undefined}
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
