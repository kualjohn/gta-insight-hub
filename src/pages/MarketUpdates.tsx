import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader, SectionWrapper } from '@/components/sections/SectionHeader';
import { MarketUpdateCard } from '@/components/cards/MarketUpdateCard';
import { CTABlock } from '@/components/sections/CTABlock';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const areas = ['All', 'Mississauga', 'Milton', 'Oakville', 'Burlington', 'Hamilton', 'Brampton'];

const marketUpdates = [
  {
    id: 1,
    title: 'Mississauga Condo Market Shows Signs of Recovery',
    area: 'Mississauga',
    date: 'Jan 18, 2024',
    excerpt: 'After months of slow activity, Mississauga condos are seeing renewed interest from first-time buyers looking to enter the market at lower price points.',
    trend: 'up' as const,
    priceChange: '+2.3%',
    slug: 'mississauga-condo-recovery',
  },
  {
    id: 2,
    title: 'Milton Single Family Homes Remain Stable',
    area: 'Milton',
    date: 'Jan 16, 2024',
    excerpt: 'Milton continues to attract young families with stable pricing and strong community amenities. Schools and parks drive demand.',
    trend: 'stable' as const,
    priceChange: '0%',
    slug: 'milton-single-family-stable',
  },
  {
    id: 3,
    title: 'Burlington Luxury Market Sees Price Adjustment',
    area: 'Burlington',
    date: 'Jan 14, 2024',
    excerpt: 'High-end properties in Burlington are adjusting to new market conditions with competitive pricing strategies.',
    trend: 'down' as const,
    priceChange: '-1.8%',
    slug: 'burlington-luxury-adjustment',
  },
  {
    id: 4,
    title: 'Oakville Detached Homes See Strong Buyer Interest',
    area: 'Oakville',
    date: 'Jan 12, 2024',
    excerpt: 'Oakville remains one of the most desirable locations in the GTA with steady demand for detached family homes.',
    trend: 'up' as const,
    priceChange: '+1.5%',
    slug: 'oakville-detached-interest',
  },
  {
    id: 5,
    title: 'Hamilton Mountain Area Attracts First-Time Buyers',
    area: 'Hamilton',
    date: 'Jan 10, 2024',
    excerpt: 'Affordability continues to drive interest in Hamilton, particularly the Mountain area with its improving amenities.',
    trend: 'up' as const,
    priceChange: '+3.1%',
    slug: 'hamilton-mountain-buyers',
  },
  {
    id: 6,
    title: 'Brampton Market Update: Balanced Conditions',
    area: 'Brampton',
    date: 'Jan 8, 2024',
    excerpt: 'Brampton is experiencing balanced market conditions with reasonable inventory levels and stable pricing.',
    trend: 'stable' as const,
    priceChange: '+0.5%',
    slug: 'brampton-balanced-conditions',
  },
];

export default function MarketUpdates() {
  const [selectedArea, setSelectedArea] = useState('All');

  const filteredUpdates = selectedArea === 'All'
    ? marketUpdates
    : marketUpdates.filter(update => update.area === selectedArea);

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-warm section-padding py-16">
        <div className="container-wide mx-auto">
          <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wide uppercase">
            Stay Informed
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            GTA Real Estate Market Updates
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Weekly insights and analysis for communities across the Greater Toronto Area. 
            Real data, honest assessments, and practical advice for homeowners.
          </p>
        </div>
      </section>

      {/* Filter */}
      <SectionWrapper>
        <div className="flex flex-wrap gap-2 mb-10">
          {areas.map((area) => (
            <Button
              key={area}
              variant={selectedArea === area ? 'gold' : 'outline'}
              size="sm"
              onClick={() => setSelectedArea(area)}
            >
              {area}
            </Button>
          ))}
        </div>

        {/* Updates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUpdates.map((update, index) => (
            <>
              <MarketUpdateCard key={update.id} {...update} />
              {/* CTA after every 3 updates */}
              {(index + 1) % 3 === 0 && index !== filteredUpdates.length - 1 && (
                <div className="md:col-span-2 lg:col-span-3" key={`cta-${index}`}>
                  <CTABlock
                    variant="secondary"
                    title="Want to discuss these market trends?"
                    subtitle="Book a free consultation to understand what this means for your home."
                    primaryCta={{ text: "Book a Call", href: "/contact" }}
                    secondaryCta={{ text: "Watch My Videos", href: "/youtube" }}
                  />
                </div>
              )}
            </>
          ))}
        </div>
      </SectionWrapper>

      {/* Bottom CTA */}
      <SectionWrapper variant="muted">
        <CTABlock
          variant="dark"
          title="Get Personalized Market Insights"
          subtitle="Wondering what your home is worth in today's market? Let's talk."
          primaryCta={{ text: "Book a Call", href: "/contact" }}
          secondaryCta={{ text: "Get Home Evaluation", href: "/home-evaluation" }}
        />
      </SectionWrapper>
    </Layout>
  );
}
