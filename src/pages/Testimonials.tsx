import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { CTABlock } from '@/components/sections/CTABlock';
import { SEOHead } from '@/components/seo/SEOHead';
import { Star, TrendingUp, Home, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGoogleReviews } from '@/hooks/useGoogleReviews';

const testimonials = [
  {
    name: 'Sarah & Mike Thompson',
    location: 'Mississauga',
    quote: 'Fawad helped us sell our first home and buy our forever home all in the same month. His market knowledge and staging advice made all the difference. We got 12% over asking!',
    rating: 5,
    outcome: 'Sold 12% over asking',
  },
  {
    name: 'David Chen',
    location: 'Milton',
    quote: 'I followed Fawad\'s YouTube channel for a year before selling. When it was time, I already trusted him completely. He got us 15% over asking in just 5 days.',
    rating: 5,
    outcome: 'Sold in 5 days',
  },
  {
    name: 'Priya Patel',
    location: 'Oakville',
    quote: 'The staging was incredible—our home looked like a magazine spread. We had 47 showings in the first weekend and sold in 5 days with multiple offers. Couldn\'t be happier.',
    rating: 5,
    outcome: '47 showings, multiple offers',
  },
  {
    name: 'Robert & Lisa Wilson',
    location: 'Burlington',
    quote: 'After a bad experience with another agent, Fawad restored our faith in real estate professionals. Honest, hardworking, and truly cares about his clients.',
    rating: 5,
    outcome: 'Sold at asking price',
  },
  {
    name: 'Ahmed & Fatima Hassan',
    location: 'Brampton',
    quote: 'First-time sellers and we had no idea what to expect. Fawad walked us through everything patiently and made it stress-free. The staging and video marketing were incredible.',
    rating: 5,
    outcome: 'Stress-free experience',
  },
  {
    name: 'Jennifer Moore',
    location: 'Hamilton',
    quote: 'The video marketing was next level. We had buyers calling from across the GTA asking about our home. Fawad\'s approach is truly different from traditional agents.',
    rating: 5,
    outcome: 'Buyers from across GTA',
  },
];

const successStats = [
  { key: 'sold', icon: TrendingUp, stat: '103%', label: 'Average sale vs. asking price' },
  { key: 'satisfaction', icon: Home, stat: '100%', label: 'Customer satisfaction' },
  { key: 'rating', icon: Star, stat: '5.0', label: 'Google rating' },
  { key: 'count', icon: Home, stat: '0', label: 'Google reviews' },
];

export default function Testimonials() {
  const { data, loading, error } = useGoogleReviews();

  return (
    <Layout>
      <SEOHead
        title="Client Testimonials | Success Stories"
        description="Real stories from GTA families who trusted Fawad Nissari with their real estate journey. See how our clients achieved their home selling goals."
        canonicalUrl="https://gta-insight-hub.lovable.app/testimonials"
      />

      {/* Header */}
      <section className="bg-gradient-warm section-padding py-16">
        <div className="container-wide mx-auto">
          <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wide uppercase">
            Success Stories
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            What Our Clients Say
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Real stories from GTA families who trusted me with their real estate journey. 
            Their success is my greatest achievement.
          </p>
        </div>
      </section>

      {/* Success Stats */}
      <SectionWrapper>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
          {successStats.map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-1">
                {item.key === 'rating' && data?.rating
                  ? data.rating.toFixed(1)
                  : item.key === 'count' && data?.totalReviews
                    ? `${data.totalReviews}+`
                    : item.stat}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Google Reviews */}
      <SectionWrapper>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-card border border-border">
            <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
            </svg>
            <span className="text-sm font-medium">Verified Google Reviews</span>
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-2">
            What Clients Say on Google
          </h2>
          {data && (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      data.rating && i < Math.round(data.rating)
                        ? 'fill-primary text-primary'
                        : 'text-muted-foreground/40'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm">
                {data.rating?.toFixed(1)} · {data.totalReviews} reviews
              </span>
            </div>
          )}
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Reviews are temporarily unavailable.</p>
            <a
              href={`https://search.google.com/local/reviews?placeid=ChIJnUQ_IwJ8BE4RjYxwrqc6azw`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1 mt-2"
            >
              View on Google <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {!loading && !error && data && data.reviews.length > 0 && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.reviews.map((review, index) => (
                <div key={index} className="bg-card p-6 rounded-xl border border-border flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-primary text-primary'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic flex-1">"{review.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    {review.authorPhoto ? (
                      <img
                        src={review.authorPhoto}
                        alt={review.author}
                        className="w-10 h-10 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {review.author.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{review.author}</p>
                      <p className="text-xs text-muted-foreground">{review.relativeTime}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button asChild variant="outline">
                <a href={data.mapsUrl} target="_blank" rel="noopener noreferrer">
                  Read all reviews on Google
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </>
        )}
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper variant="muted">
        <CTABlock
          variant="dark"
          title="Ready to Be Our Next Success Story?"
          subtitle="Let's discuss your real estate goals and create a plan that works for you — no pressure, just honest advice."
          primaryCta={{ text: "Book a Call", href: "https://calendly.com/fawadnissari" }}
          secondaryCta={{ text: "View Seller Services", href: "/seller-services" }}
        />
      </SectionWrapper>
    </Layout>
  );
}
