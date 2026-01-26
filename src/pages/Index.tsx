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
      
      {/* Hero Section - Full-Width Video Background */}
      <section className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden">
        {/* Background Video - YouTube Embed with Autoplay */}
        <div className="absolute inset-0">
          {/* YouTube iframe as background - autoplay, muted, loop */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${FEATURED_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${FEATURED_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${window.location.origin}`}
              title="Background Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full"
              style={{ border: 'none' }}
            />
          </div>
          {/* Fallback poster image while video loads */}
          <img 
            src={FEATURED_VIDEO_THUMBNAIL}
            alt="Real Estate Market Expert"
            className="absolute inset-0 w-full h-full object-cover -z-10"
          />
        </div>
        
        {/* Dark Overlay (35-40%) */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Content */}
        <div className="relative z-10 container-wide mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[600px] lg:min-h-[700px] py-12 lg:py-16">
            {/* Left: Text Content */}
            <div className="animate-fade-in">
              <span className="inline-block text-sm font-medium text-primary mb-3 tracking-wide uppercase">
                GTA Real Estate Authority
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold mb-5 leading-tight text-white">
                Real Estate Market<br />
                <span className="text-primary">Expert & Advisor</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/85 mb-6 max-w-xl">
                Weekly videos, data-backed insights, and proven strategies to help you sell, 
                buy, or invest with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
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
          </div>
        </div>
      </section>

      {/* Latest Videos Section */}
      <SectionWrapper className="py-12 lg:py-16">
        <SectionHeader
          title="Latest Videos"
          subtitle="Automatically updated from my YouTube channel."
        />
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <VideoSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10 bg-muted/50 rounded-lg">
            <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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

        {/* Watch More Videos Button */}
        <div className="text-center mt-8">
          <Button variant="gold" size="lg" asChild>
            <Link to="/youtube">
              <Play className="w-5 h-5" />
              Watch More Videos
            </Link>
          </Button>
        </div>

        {/* Newsletter after videos */}
        <div className="mt-10">
          <NewsletterSignup variant="inline" />
        </div>
      </SectionWrapper>

      {/* First-Time Seller Section */}
      <SectionWrapper variant="muted" className="py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block text-sm font-medium text-primary mb-3 tracking-wide uppercase">
              New to Selling?
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
              Are You a First-Time Seller?
            </h2>
            <p className="text-lg text-muted-foreground mb-5">
              Here's what you must know before you list — simple, honest, and pressure-free.
            </p>
            
            <ul className="space-y-2.5 mb-6">
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
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
                alt="Beautiful staged home"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg shadow-lg">
              <p className="font-semibold text-sm">Free Guide</p>
              <p className="text-xs opacity-80">No pressure, just value</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Trust Indicators */}
      <SectionWrapper className="py-12 lg:py-16">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-3">
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
      <SectionWrapper variant="muted" className="py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block text-sm font-medium text-primary mb-3 tracking-wide uppercase">
              When You're Ready
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-5">
              Here's How We Help<br />You Sell Your Home
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              When the time comes to sell, we bring everything you need for a successful sale—staging, 
              marketing, photography, and strategic pricing—all included.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
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
      <SectionWrapper className="py-12 lg:py-16">
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
