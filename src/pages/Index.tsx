import { Link } from 'react-router-dom';
import { ArrowRight, Download, Phone, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VideoCard } from '@/components/cards/VideoCard';
import { BlogCard } from '@/components/cards/BlogCard';
import { MarketUpdateCard } from '@/components/cards/MarketUpdateCard';
import { SectionHeader, SectionWrapper } from '@/components/sections/SectionHeader';
import { TrustIndicators } from '@/components/sections/TrustIndicators';
import { SellerUSPBlock } from '@/components/sections/SellerUSPBlock';
import { CTABlock } from '@/components/sections/CTABlock';
import { Layout } from '@/components/layout/Layout';
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';
import { Skeleton } from '@/components/ui/skeleton';
import { VideoLightbox } from '@/components/VideoLightbox';

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

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function VideoSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-video rounded-lg" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-4 w-32" />
    </div>
  );
}

const FEATURED_VIDEO_ID = 'Mh6UJ08iSkA';
const FEATURED_VIDEO_THUMBNAIL = `https://i.ytimg.com/vi/${FEATURED_VIDEO_ID}/maxresdefault.jpg`;
const CHANNEL_URL = 'https://www.youtube.com/channel/UCNiL5jVJ7uM89e2S69FrUxQ';

const Index = () => {
  const { videos, isLoading, error, channelUrl } = useYouTubeVideos(6);

  return (
    <Layout>
      {/* Hero Section - Cinematic Background */}
      <section className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${FEATURED_VIDEO_THUMBNAIL})` }}
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        
        {/* Content */}
        <div className="relative z-10 container-wide mx-auto section-padding h-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[600px] lg:min-h-[700px] py-16 lg:py-24">
            {/* Left: Text Content */}
            <div>
              <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wide uppercase">
                GTA Real Estate Authority
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-white">
                Real Insights for<br />
                <span className="text-primary">GTA Homeowners.</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/80 mb-8 max-w-xl">
                Honest market updates, data-driven analysis, and practical real estate 
                advice for families across the Greater Toronto Area.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gold" size="lg" asChild>
                  <Link to="/contact">
                    <Phone className="w-5 h-5" />
                    Book a Call
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  asChild
                >
                  <Link to="/seller-guide">
                    <Download className="w-5 h-5" />
                    Seller Guide
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right: Play Button */}
            <div className="flex items-center justify-center lg:justify-end">
              <VideoLightbox
                videoId={FEATURED_VIDEO_ID}
                thumbnailUrl={FEATURED_VIDEO_THUMBNAIL}
                channelUrl={CHANNEL_URL}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Videos Section */}
      <SectionWrapper>
        <SectionHeader
          title="Latest Videos"
          subtitle="Automatically updated from my YouTube channel."
          ctaText="Watch More Videos"
          ctaHref="/youtube"
        />
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <VideoSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-muted/50 rounded-lg">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Unable to load videos</h3>
            <p className="text-muted-foreground mb-4">
              We couldn't fetch the latest videos. Please try again later.
            </p>
            <Button variant="outline" asChild>
              <a href={channelUrl} target="_blank" rel="noopener noreferrer">
                Visit YouTube Channel
              </a>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.slice(0, 6).map((video) => (
              <VideoCard
                key={video.videoId}
                title={video.title}
                thumbnail={video.thumbnail}
                videoUrl={video.link}
                date={formatDate(video.published)}
              />
            ))}
          </div>
        )}
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
