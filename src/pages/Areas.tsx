import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { CTABlock } from '@/components/sections/CTABlock';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/seo/SEOHead';

const areas = [
  {
    name: 'Mississauga',
    slug: 'mississauga',
    description: 'A vibrant city with diverse neighborhoods, excellent transit, and strong demand for both condos and detached homes.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop',
    highlights: ['Strong condo market', 'Great for commuters', 'Diverse communities'],
  },
  {
    name: 'Milton',
    slug: 'milton',
    description: 'One of the fastest-growing communities in Canada, popular with young families seeking affordable detached homes.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop',
    highlights: ['Family-friendly', 'New developments', 'Growing amenities'],
  },
  {
    name: 'Oakville',
    slug: 'oakville',
    description: 'An upscale lakeside community known for excellent schools, beautiful neighborhoods, and strong property values.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop',
    highlights: ['Top-rated schools', 'Lakefront living', 'Premium properties'],
  },
  {
    name: 'Burlington',
    slug: 'burlington',
    description: 'A balanced mix of urban amenities and natural beauty, with steady demand across all property types.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=500&fit=crop',
    highlights: ['Waterfront access', 'Downtown core', 'Nature trails'],
  },
  {
    name: 'Hamilton',
    slug: 'hamilton',
    description: 'An affordable alternative with revitalizing neighborhoods and strong interest from first-time buyers.',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=500&fit=crop',
    highlights: ['Affordable entry point', 'Arts & culture', 'Investment potential'],
  },
  {
    name: 'Brampton',
    slug: 'brampton',
    description: 'A diverse, growing city with excellent value for families and strong community infrastructure.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop',
    highlights: ['Multi-cultural community', 'Family homes', 'Growing transit'],
  },
];

export default function Areas() {
  return (
    <Layout>
      <SEOHead
        title="GTA Areas We Serve"
        description="Explore the GTA communities Fawad Nissari serves — Milton, Mississauga, Oakville, and Burlington. Local market insights, neighbourhood expertise, and free home evaluations."
      />
      {/* Header */}
      <section className="bg-gradient-warm section-padding py-16">
        <div className="container-wide mx-auto">
          <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wide uppercase">
            Areas Served
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Communities Across the GTA
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            I help families buy and sell homes across the Greater Toronto Area. Each community 
            has its own character, market dynamics, and opportunities.
          </p>
        </div>
      </section>

      {/* Areas Grid */}
      <SectionWrapper>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area) => (
            <article key={area.slug} className="group hover-lift">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-muted">
                <img
                  src={area.image}
                  alt={area.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-primary-foreground">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">GTA West</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold">{area.name}</h3>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">{area.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {area.highlights.map((highlight, index) => (
                  <span key={index} className="text-xs bg-muted px-3 py-1 rounded-full">
                    {highlight}
                  </span>
                ))}
              </div>
              <Button variant="outline-gold" size="sm" asChild>
                <Link to={`/areas/${area.slug}`}>
                  Explore {area.name} real estate
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper variant="muted">
        <CTABlock
          variant="dark"
          title="Thinking About Your Next Move?"
          subtitle="Let's discuss which GTA community is the best fit for your lifestyle and budget."
          primaryCta={{ text: "Book a Call", href: "https://calendly.com/fawadnissari" }}
          secondaryCta={{ text: "Get Home Evaluation", href: "/home-evaluation" }}
        />
      </SectionWrapper>
    </Layout>
  );
}
