import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Phone, AlertCircle, Check, Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VideoCard } from '@/components/cards/VideoCard';
import { SectionHeader, SectionWrapper } from '@/components/sections/SectionHeader';
import { TrustIndicators } from '@/components/sections/TrustIndicators';
import { SellerUSPBlock } from '@/components/sections/SellerUSPBlock';
import { CTABlock } from '@/components/sections/CTABlock';
import { Layout } from '@/components/layout/Layout';
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';
import { useProperties } from '@/hooks/useProperties';
import { useGoogleReviews } from '@/hooks/useGoogleReviews';
import { useLatestMiltonPosts } from '@/hooks/useBlogPosts';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import { Skeleton } from '@/components/ui/skeleton';
import { SEOHead } from '@/components/seo/SEOHead';
import { MILTON_NEIGHBOURHOODS } from '@/pages/areas/milton/neighbourhoods';

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
const CHANNEL_URL = 'https://www.youtube.com/@Fawadnissari';

const firstTimeSellerPoints = [
  'Understand the true value of your home in today\'s market',
  'Avoid the 5 most common mistakes first-time sellers make',
  'Learn what staging and marketing can do for your sale',
  'Get honest answers without any sales pressure',
];

const sellerFaqs = [
  {
    question: 'How do I know when it is the right time to sell my Milton home?',
    answer: 'The right timing depends on your goals, next move, property condition, and the competition buyers will see beside your home. A useful first step is a local pricing review and a realistic preparation plan. That gives you the facts needed to choose a launch window without pressure.',
  },
  {
    question: 'What should I do before listing my home in Milton?',
    answer: 'Start with a walkthrough before making expensive changes. We identify repairs, editing, cleaning, and presentation work that will matter most to buyers. From there, professional staging, photography, video, pricing, and launch timing are coordinated so the home reaches the market looking complete rather than improvised.',
  },
  {
    question: 'How is the asking price for my Milton property determined?',
    answer: 'Pricing begins with comparable local sales, current competing listings, the home’s condition, lot, layout, upgrades, and neighbourhood position. We then consider how buyers are responding to similar homes. The goal is a defensible strategy that attracts attention while protecting your negotiating position.',
  },
  {
    question: 'Is professional staging included when I list?',
    answer: 'Yes. Professional staging is included as part of the listing service at no additional staging charge. The plan is tailored to the property and may involve furniture placement, accessories, room editing, and presentation guidance. The purpose is to help buyers understand each space quickly and remember the home.',
  },
  {
    question: 'Can I cancel the listing agreement if I am not satisfied?',
    answer: 'Yes. The listing approach includes the flexibility to cancel rather than remain tied to a long-term agreement when you are unhappy with the service. Expectations, responsibilities, and next steps are discussed before launch so you understand the process and retain control of your decision.',
  },
  {
    question: 'How will buyers find my Milton listing online?',
    answer: 'Your property is presented through professional photography, video, a dedicated property page, and paid promotion across major online and social platforms. This works alongside the standard real estate listing exposure. The campaign is designed to make the home easy to discover, understand, and share before buyers book a showing.',
  },
];

const homepageFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: sellerFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const Index = () => {
  const { videos, isLoading, error, channelUrl } = useYouTubeVideos(6);
  const { data: properties = [] } = useProperties();
  const featuredProperties = properties.slice(0, 3);
  const { data: googleData } = useGoogleReviews();
  const { data: latestMiltonPosts = [], isLoading: areMiltonPostsLoading } = useLatestMiltonPosts(3);

  // Defer the heavy background iframe so the hero poster/headline paints fast (LCP).
  const [showBgVideo, setShowBgVideo] = useState(false);
  useEffect(() => {
    const start = () => setShowBgVideo(true);
    const id = window.setTimeout(start, 1200);
    return () => window.clearTimeout(id);
  }, []);

  const realReviews = (googleData?.reviews ?? []).filter(r => r.text && r.text.length > 0).slice(0, 3);

  return (
    <Layout>
      <SEOHead
        title="Milton Real Estate Agent | Fawad Nissari — GTA Real Estate Broker"
        description="Milton real estate agent Fawad Nissari — weekly market data, free staging, and 1% listing commission for sellers in Milton and across the Greater Toronto Area."
        canonicalUrl="https://fawadnissari.ca"
        jsonLd={homepageFaqSchema}
      />
      
      {/* Hero Section - Full-Width Video Background */}
      <section className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden">
        {/* Background Video - YouTube Embed with Autoplay */}
        <div className="absolute inset-0">
          {/* YouTube iframe as background - autoplay, muted, loop */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {showBgVideo && (
            <iframe
              src={`https://www.youtube.com/embed/${FEATURED_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${FEATURED_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${window.location.origin}`}
              title="Background Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full"
              style={{ border: 'none' }}
            />
            )}
          </div>
          {/* Fallback poster image while video loads */}
          <img 
            src={FEATURED_VIDEO_THUMBNAIL}
            alt="Real Estate Market Expert"
            width={1280}
            height={720}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover -z-10"
          />
        </div>
        
        {/* Dark Overlay (35-40%) */}
        <div className="absolute inset-0 bg-background/55" />
        
        {/* Content */}
        <div className="relative z-10 container-wide mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[600px] lg:min-h-[700px] py-12 lg:py-16">
            {/* Left: Text Content */}
            <div className="animate-fade-in">
              <span className="inline-block brand-label text-accent mb-3">
                Milton Real Estate Agent
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold mb-5 leading-tight text-foreground">
                Milton Real Estate Agent
              </h1>
              <p className="text-lg lg:text-xl text-foreground/85 mb-6 max-w-xl">
                Serving Milton and the GTA. Real numbers, not 'it depends.'
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <Button variant="accent" size="lg" asChild>
                  <a href="https://calendly.com/fawadnissari" target="_blank" rel="noopener noreferrer">
                    <Phone className="w-5 h-5" />
                    Book a Call
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-foreground/30 bg-transparent text-foreground hover:bg-foreground/10 hover:text-foreground"
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
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors text-sm font-medium"
              >
                <Play className="w-4 h-4" />
                Watch More Videos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Selling in Milton */}
      <SectionWrapper className="py-12 lg:py-16">
        <div className="max-w-4xl">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-5 gold-underline inline-block pb-2">
            Selling a Home in Milton
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Selling a home in Milton starts well before the listing appears online. The first step is to understand
              your priorities: where you are moving, when you need to close, what work the property needs, and how much
              flexibility you have. We then review nearby comparable sales and active competition, walk through the
              home room by room, and build a preparation plan around the improvements that can make the strongest
              difference to a buyer. That may include repairs, decluttering, professional staging, photography, and
              video, all organized around a clear launch date.
            </p>
            <p>
              Once the property is ready, the pricing and marketing strategy are aligned so buyers receive one
              consistent story across the listing, property website, social media, and paid advertising. Showing
              feedback is monitored and explained, not simply forwarded. When offers arrive, we compare price,
              conditions, deposit, closing date, and the practical risk in each proposal. After acceptance, we stay
              involved through conditions, buyer visits, and closing so you always know what happens next. The aim is
              a calm, well-managed sale built around your move—not a rushed decision based on a generic formula.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Seller service difference */}
      <SectionWrapper variant="muted" className="py-12 lg:py-16">
        <div className="max-w-4xl">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-5 gold-underline inline-block pb-2">
            What Makes This Different
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              A strong listing should give a Milton homeowner more than a sign, photographs, and a place on the MLS.
              Our service includes professional home staging at no additional staging charge, allowing each room to
              be presented with a clear purpose and a consistent look. Professional photography and property video
              then carry that presentation online, where buyers often form their first impression before deciding
              whether to schedule a visit.
            </p>
            <p>
              Sellers can choose a listing commission option starting at 1%, with the services and cooperating
              brokerage terms explained clearly before any decision is made. The agreement is also designed around
              flexibility: if you are not satisfied, you can cancel instead of feeling locked into a long-term
              commitment. Every launch is supported by paid media coverage across major platforms, including Google,
              YouTube, Facebook, and Instagram, so the property is actively promoted beyond people who happen to find
              it in a search. Staging, creative production, distribution, feedback, and negotiation work together as
              one campaign, with one accountable team managing the process from preparation to closing.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Milton neighbourhood links */}
      <SectionWrapper className="py-12 lg:py-16">
        <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-5 gold-underline inline-block pb-2">
          Milton Neighbourhoods
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-4xl mb-8">
          Buyers do not evaluate every Milton home in the same way. Lot style, school access, commuting options,
          housing age, and nearby amenities can shape demand from one community to the next. Explore the local guides
          below to understand how each area is positioned, then use that context when preparing and pricing your home.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {MILTON_NEIGHBOURHOODS.map((neighbourhood) => (
            <Link
              key={neighbourhood.slug}
              to={`/areas/milton/${neighbourhood.slug}`}
              className="inline-flex items-center justify-between gap-3 border-b border-border py-3 text-foreground hover:text-accent transition-colors"
            >
              <span>Explore homes and local insights in {neighbourhood.name}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          ))}
        </div>
      </SectionWrapper>

      {/* Seller FAQ */}
      <SectionWrapper variant="muted" className="py-12 lg:py-16">
        <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-8 gold-underline inline-block pb-2">
          Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
          {sellerFaqs.map((faq) => (
            <article key={faq.question}>
              <h3 className="font-serif text-xl font-semibold mb-3">{faq.question}</h3>
              <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      {/* Latest Milton market posts */}
      <SectionWrapper className="py-12 lg:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold gold-underline inline-block pb-2">
              Latest Milton Market Updates
            </h2>
            <p className="text-muted-foreground mt-4 max-w-3xl">
              Read the newest Milton-focused analysis for current context before making a selling decision.
            </p>
          </div>
          <Button variant="outline-gold" asChild>
            <Link to="/market-updates">
              View all market updates
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {areMiltonPostsLoading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => <Skeleton key={item} className="h-40 rounded-lg" />)}
          </div>
        ) : latestMiltonPosts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {latestMiltonPosts.map((post) => (
              <article key={post.id} className="border-t border-border pt-5">
                <time className="text-xs text-muted-foreground" dateTime={post.published_at ?? undefined}>
                  {post.published_at ? formatDate(post.published_at) : ''}
                </time>
                <h3 className="font-serif text-xl font-semibold mt-2 mb-3">
                  <Link to={`/blog/${post.slug}`} className="hover:text-accent transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Read the update <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">New Milton market updates will appear here when published.</p>
        )}
      </SectionWrapper>

      {/* Google Reviews — only real, fetched live */}
      {realReviews.length > 0 && (
        <SectionWrapper variant="muted" className="py-12 lg:py-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-accent fill-current" />
              ))}
              <span className="font-serif text-xl font-bold ml-2">
                {googleData?.rating?.toFixed(1) ?? '5.0'}
              </span>
              <span className="text-sm text-muted-foreground">
                · {googleData?.totalReviews ?? 0} Google reviews
              </span>
            </div>
            <h2 className="font-serif text-2xl lg:text-3xl font-bold">What Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {realReviews.map((r, i) => (
              <div key={i} className="bg-background border border-border rounded-xl p-5 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  {r.authorPhoto ? (
                    <img src={r.authorPhoto} alt={r.author} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold">
                      {r.author.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold leading-tight">{r.author}</p>
                    <p className="text-xs text-muted-foreground">{r.relativeTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 mb-2">
                  {[...Array(r.rating)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-accent fill-current" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed line-clamp-5">{r.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/testimonials" className="text-sm font-semibold text-foreground underline underline-offset-4 hover:text-accent inline-flex items-center gap-1">
              Read all client reviews <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </SectionWrapper>
      )}

      {/* Latest Videos Section */}
      <SectionWrapper className="py-12 lg:py-16">
        <SectionHeader
          title="Latest Videos"
          subtitle="Automatically updated from my YouTube channel."
        />
        
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-5">
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
          <div className="grid md:grid-cols-3 gap-5">
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

        {/* Watch More Videos Button */}
        <div className="text-center mt-8">
          <Button variant="gold" size="lg" asChild>
            <Link to="/youtube">
              <Play className="w-5 h-5" />
              Watch More Videos
            </Link>
          </Button>
        </div>
      </SectionWrapper>

      {/* Unified Seller Section */}
      <SectionWrapper variant="muted" className="py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block brand-label text-accent mb-3">
              Thinking About Selling?
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
              Everything You Need<br />For a Successful Sale
            </h2>
            <p className="text-lg text-muted-foreground mb-5">
              Staging, marketing, photography, and strategic pricing — all included. Honest advice, no pressure.
            </p>
            
            <ul className="space-y-2.5 mb-6">
              {firstTimeSellerPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="gold" size="lg" asChild>
                <Link to="/seller-services">
                  Learn About Our Services
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/seller-guide">
                  <Download className="w-5 h-5" />
                  Free Seller Guide
                </Link>
              </Button>
            </div>
          </div>

          <SellerUSPBlock />
        </div>
      </SectionWrapper>

      {/* Featured Properties */}
      {featuredProperties.length > 0 && (
        <SectionWrapper className="py-12 lg:py-16">
          <SectionHeader
            title="Recent Sales & Listings"
            subtitle="A glimpse at the homes we've helped sell across the GTA."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property, idx) => (
              <PortfolioCard key={property.id} property={property} index={idx} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link to="/portfolio">
                View Full Portfolio
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </SectionWrapper>
      )}

      {/* Moving to Milton */}
      <SectionWrapper variant="muted" className="py-12 lg:py-16">
        <div className="grid md:grid-cols-[1.4fr,1fr] gap-8 items-center">
          <div>
            <p className="brand-label text-accent mb-3">New to the area</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
              Moving to Milton, Ontario?
            </h2>
            <p className="text-muted-foreground">
              Commute times to Toronto, GO train and highway access, cost of living, the best
              neighbourhoods for newcomers, school boards, and current home prices by type — all in
              one relocation guide.
            </p>
          </div>
          <div className="md:text-right">
            <Button variant="gold" size="lg" asChild>
              <Link to="/moving-to-milton">
                Read the Milton Relocation Guide
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA Section */}

      <SectionWrapper className="py-12 lg:py-16">
        <CTABlock
          variant="dark"
          headingLevel="h2"
          title="Ready to Have a Conversation?"
          subtitle="No pressure, no obligations. Just honest advice about your real estate goals."
          primaryCta={{ text: "Book a Call", href: "https://calendly.com/fawadnissari" }}
          secondaryCta={{ text: "Download Seller Guide", href: "/seller-guide" }}
        />
      </SectionWrapper>
    </Layout>
  );
};

export default Index;
