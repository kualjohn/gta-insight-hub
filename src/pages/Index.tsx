import { Link } from 'react-router-dom';
import { ArrowRight, Download, Phone, Play, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VideoCard } from '@/components/cards/VideoCard';
import { BlogCard } from '@/components/cards/BlogCard';
import { MarketUpdateCard } from '@/components/cards/MarketUpdateCard';
import { SectionHeader, SectionWrapper } from '@/components/sections/SectionHeader';
import { TrustIndicators } from '@/components/sections/TrustIndicators';
import { SellerUSPBlock } from '@/components/sections/SellerUSPBlock';
import { CTABlock } from '@/components/sections/CTABlock';
import { Layout } from '@/components/layout/Layout';

// Mock data
const latestVideos = [
  {
    id: 1,
    title: 'GTA Market Update January 2024: What Sellers Need to Know',
    thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop',
    duration: '12:45',
    category: 'Market Update',
    date: 'Jan 15, 2024',
  },
  {
    id: 2,
    title: 'Should You Sell in Winter? GTA Real Estate Analysis',
    thumbnail: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=450&fit=crop',
    duration: '8:32',
    category: 'Selling Advice',
    date: 'Jan 10, 2024',
  },
  {
    id: 3,
    title: 'First-Time Seller Mistakes to Avoid in 2024',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=450&fit=crop',
    duration: '15:20',
    category: 'Tips',
    date: 'Jan 5, 2024',
  },
];

const latestMarketUpdates = [
  {
    id: 1,
    title: 'Mississauga Condo Market Shows Signs of Recovery',
    area: 'Mississauga',
    date: 'Jan 18, 2024',
    excerpt: 'After months of slow activity, Mississauga condos are seeing renewed interest from first-time buyers looking to enter the market.',
    trend: 'up' as const,
    priceChange: '+2.3%',
    slug: 'mississauga-condo-recovery',
  },
  {
    id: 2,
    title: 'Milton Single Family Homes Remain Stable',
    area: 'Milton',
    date: 'Jan 16, 2024',
    excerpt: 'Milton continues to attract young families with stable pricing and strong community amenities.',
    trend: 'stable' as const,
    priceChange: '0%',
    slug: 'milton-single-family-stable',
  },
  {
    id: 3,
    title: 'Burlington Luxury Market Sees Price Adjustment',
    area: 'Burlington',
    date: 'Jan 14, 2024',
    excerpt: 'High-end properties in Burlington are adjusting to new market conditions with competitive pricing.',
    trend: 'down' as const,
    priceChange: '-1.8%',
    slug: 'burlington-luxury-adjustment',
  },
];

const latestBlogs = [
  {
    id: 1,
    title: 'The Complete Guide to Selling Your First Home in the GTA',
    excerpt: 'Everything first-time sellers need to know about the GTA real estate market, from pricing to closing.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop',
    category: 'Seller Tips',
    date: 'Jan 12, 2024',
    slug: 'guide-selling-first-home-gta',
  },
  {
    id: 2,
    title: 'Why Staging Matters: Before and After Transformations',
    excerpt: 'Real examples of how professional staging helped our clients sell faster and for more money.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=500&fit=crop',
    category: 'Staging',
    date: 'Jan 8, 2024',
    slug: 'why-staging-matters',
  },
  {
    id: 3,
    title: 'Understanding the 2024 GTA Real Estate Forecast',
    excerpt: 'A data-driven look at what sellers and buyers can expect in the Greater Toronto Area this year.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop',
    category: 'Market Analysis',
    date: 'Jan 3, 2024',
    slug: '2024-gta-forecast',
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-warm overflow-hidden">
        <div className="container-wide mx-auto section-padding py-20 lg:py-32">
          <div className="max-w-3xl">
            <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wide uppercase">
              GTA Real Estate Authority
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Real Insights for<br />
              <span className="text-gradient-gold">GTA Homeowners.</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl">
              Honest market updates, data-driven analysis, and practical real estate 
              advice for families across the Greater Toronto Area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="gold" size="xl" asChild>
                <Link to="/contact">
                  <Phone className="w-5 h-5" />
                  Book a Call
                </Link>
              </Button>
              <Button variant="outline-dark" size="xl" asChild>
                <Link to="/seller-guide">
                  <Download className="w-5 h-5" />
                  First-Time Seller Guide
                </Link>
              </Button>
              <Button variant="ghost" size="xl" asChild>
                <Link to="/youtube" className="text-foreground">
                  <Youtube className="w-5 h-5" />
                  Watch My Videos
                </Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      </section>

      {/* Latest Videos Section */}
      <SectionWrapper>
        <SectionHeader
          title="Latest GTA Market Updates & Advice"
          subtitle="Weekly videos covering market trends, selling strategies, and practical real estate advice."
          ctaText="Watch More Videos"
          ctaHref="/youtube"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestVideos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </SectionWrapper>

      {/* Market Updates Section */}
      <SectionWrapper variant="muted">
        <SectionHeader
          title="GTA Real Estate Market Updates"
          subtitle="Stay informed with the latest trends and data from communities across the GTA."
          ctaText="View All Updates"
          ctaHref="/market-updates"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestMarketUpdates.map((update) => (
            <MarketUpdateCard key={update.id} {...update} />
          ))}
        </div>
      </SectionWrapper>

      {/* Blog Section */}
      <SectionWrapper>
        <SectionHeader
          title="Recent Articles & Deep Dives"
          subtitle="In-depth guides and analysis to help you make informed real estate decisions."
          ctaText="Read All Blogs"
          ctaHref="/blog"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      </SectionWrapper>

      {/* Trust Indicators */}
      <SectionWrapper variant="muted">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
            Why GTA Families Trust Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A decade of experience, hundreds of educational videos, and a commitment to honest, 
            data-driven advice.
          </p>
        </div>
        <TrustIndicators />
      </SectionWrapper>

      {/* Seller Value Section */}
      <SectionWrapper>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wide uppercase">
              When You're Ready
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-6">
              Here's How We Help<br />You Sell Your Home
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              When the time comes to sell, we bring everything you need for a successful sale—staging, 
              marketing, photography, and strategic pricing—all included.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="gold" size="lg" asChild>
                <Link to="/seller-services">
                  Learn About Our Services
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/home-evaluation">
                  Get a Home Evaluation
                </Link>
              </Button>
            </div>
          </div>
          <SellerUSPBlock />
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper variant="muted">
        <CTABlock
          variant="dark"
          title="Ready to Have a Conversation?"
          subtitle="No pressure, no obligations. Just honest advice about your real estate goals."
          primaryCta={{ text: "Book a Call", href: "/contact" }}
          secondaryCta={{ text: "Download Seller Guide", href: "/seller-guide" }}
        />
      </SectionWrapper>
    </Layout>
  );
};

export default Index;
