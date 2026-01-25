import { Link } from 'react-router-dom';
import { ArrowRight, Download, Phone, AlertCircle, Check, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VideoCard } from '@/components/cards/VideoCard';
import { SectionHeader, SectionWrapper } from '@/components/sections/SectionHeader';
import { TrustIndicators } from '@/components/sections/TrustIndicators';
import { SellerUSPBlock } from '@/components/sections/SellerUSPBlock';
import { CTABlock } from '@/components/sections/CTABlock';
import { Layout } from '@/components/layout/Layout';
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';
import { Skeleton } from '@/components/ui/skeleton';
import { VideoLightbox } from '@/components/VideoLightbox';
import { SEOHead } from '@/components/seo/SEOHead';
import { NewsletterSignup } from '@/components/forms/NewsletterSignup';

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

const firstTimeSellerPoints = [
  'Understand the true value of your home in today\'s market',
  'Avoid the 5 most common mistakes first-time sellers make',
  'Learn what staging and marketing can do for your sale',
  'Get honest answers without any sales pressure',
];

const Index = () => {
  const { videos, isLoading, error, channelUrl } = useYouTubeVideos(6);

  return (
    <Layout>
      <SEOHead
        title="Real Estate Market Expert & Advisor | GTA"
        description="Weekly videos, data-backed insights, and proven strategies to help you sell, buy, or invest with confidence in the Greater Toronto Area."
        canonicalUrl="https://gta-insight-hub.lovable.app"
      />
      
      {/* Hero Section - Cinematic Background */}
      <section className="relative min-h-[650px] lg:min-h-[750px] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${FEATURED_VIDEO_THUMBNAIL})` }}
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
        
        {/* Content */}
        <div className="relative z-10 container-wide mx-auto section-padding h-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[650px] lg:min-h-[750px] py-16 lg:py-24">
            {/* Left: Text Content */}
            <div className="animate-fade-in">
              <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wide uppercase">
                GTA Real Estate Authority
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-white">
                Real Estate Market<br />
                <span className="text-primary">Expert & Advisor</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/80 mb-8 max-w-xl">
                Weekly videos, data-backed insights, and proven strategies to help you sell, 
                buy, or invest with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
                    Download Seller Guide
                  </Link>
                </Button>
              </div>
              <Link 
                to="/youtube"
                className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors text-sm font-medium"
              >
                <Play className="w-4 h-4" />
                Watch More Videos
                <ArrowRight className="w-4 h-4" />
              </Link>
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
          title="Latest Videos — Weekly Insights & Advice"
          subtitle="Automatically updated from my YouTube channel. Includes market updates, seller tips, and buyer tips."
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

        {/* Newsletter after videos */}
        <div className="mt-12">
          <NewsletterSignup variant="inline" />
        </div>
      </SectionWrapper>

      {/* First-Time Seller Section */}
      <SectionWrapper variant="muted">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wide uppercase">
              New to Selling?
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
              Are You a First-Time Seller?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Here's what you must know before you list — simple, honest, and pressure-free.
            </p>
            
            <ul className="space-y-3 mb-8">
              {firstTimeSellerPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>

            <Button variant="gold" size="lg" asChild>
              <Link to="/seller-guide">
                <Download className="w-5 h-5" />
                Download Your First-Time Seller Guide
              </Link>
            </Button>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
                alt="Beautiful staged home"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg">
              <p className="font-semibold text-sm">Free Guide</p>
              <p className="text-xs opacity-80">No pressure, just value</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Trust Indicators */}
      <SectionWrapper>
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
      <SectionWrapper variant="muted">
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
      <SectionWrapper>
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
