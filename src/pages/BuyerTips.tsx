import { Link } from 'react-router-dom';
import { Play, Phone, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { SectionWrapper, SectionHeader } from '@/components/sections/SectionHeader';
import { CTABlock } from '@/components/sections/CTABlock';
import { SEOHead } from '@/components/seo/SEOHead';
import { VideoCard } from '@/components/cards/VideoCard';
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';
import { Skeleton } from '@/components/ui/skeleton';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const tips = [
  {
    title: 'Get Pre-Approved First',
    description: 'Know exactly how much you can afford before you start house hunting. Pre-approval shows sellers you\'re serious.',
  },
  {
    title: 'Don\'t Skip the Home Inspection',
    description: 'A few hundred dollars for an inspection can save you from tens of thousands in unexpected repairs.',
  },
  {
    title: 'Research the Neighborhood',
    description: 'Visit at different times of day. Check commute times, school ratings, and future development plans.',
  },
  {
    title: 'Budget for Closing Costs',
    description: 'Plan for land transfer tax, legal fees, title insurance, and moving expenses—typically 1.5-4% of purchase price.',
  },
  {
    title: 'Think Long-Term',
    description: 'Consider your needs 5-10 years from now. Buying and selling homes is expensive—try to stay put.',
  },
  {
    title: 'Work with a Local Expert',
    description: 'An agent who knows your target area can help you find opportunities and avoid overpaying.',
  },
];

const BuyerTips = () => {
  const { videos, isLoading } = useYouTubeVideos(6);

  return (
    <Layout>
      <SEOHead
        title="Buyer Tips | Smart Home Buying Strategies"
        description="Expert tips and strategies for buying a home in the GTA. Learn from weekly videos and proven advice to make smarter decisions."
        canonicalUrl="https://fawadnissari.ca/buyer-tips"
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-16 lg:py-20">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wide uppercase">
            Buyer Education
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-6">
            Smart Buyer Tips
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Making the right decisions when buying a home can save you thousands. 
            Here's what you need to know.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" size="lg" asChild>
              <Link to="/buyer-guide">
                <Download className="w-5 h-5" />
                Download Buyer Guide
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://calendly.com/fawadnissari" target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" />
                Book a Call
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Tips Grid */}
      <SectionWrapper className="py-12 lg:py-16">
        <SectionHeader
          title="Essential Buyer Tips"
          subtitle="Proven strategies to help you buy smarter and avoid costly mistakes."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-primary font-bold">{index + 1}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{tip.title}</h3>
              <p className="text-muted-foreground text-sm">{tip.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Related Videos */}
      <SectionWrapper variant="muted" className="py-12 lg:py-16">
        <SectionHeader
          title="Watch & Learn"
          subtitle="Video content to help you make informed buying decisions."
        />
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-video rounded-lg" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.slice(0, 3).map((video) => (
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

        <div className="text-center mt-8">
          <Button variant="gold" size="lg" asChild>
            <Link to="/youtube">
              <Play className="w-5 h-5" />
              Watch More Videos
            </Link>
          </Button>
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper className="py-12 lg:py-16">
        <CTABlock
          variant="dark"
          title="Ready to Find Your Home?"
          subtitle="Get personalized guidance from a local expert who knows the GTA market."
          primaryCta={{ text: "Book a Call", href: "https://calendly.com/fawadnissari" }}
          secondaryCta={{ text: "Download Buyer Guide", href: "/buyer-guide" }}
        />
      </SectionWrapper>
    </Layout>
  );
};

export default BuyerTips;
