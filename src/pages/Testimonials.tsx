import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { CTABlock } from '@/components/sections/CTABlock';
import { SEOHead } from '@/components/seo/SEOHead';
import { Play, Star, TrendingUp, Home } from 'lucide-react';

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

const videoTestimonials = [
  {
    name: 'The Martinez Family',
    location: 'Mississauga',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=450&fit=crop',
    outcome: 'Sold $50K over asking',
  },
  {
    name: 'John & Karen Roberts',
    location: 'Milton',
    thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=450&fit=crop',
    outcome: 'Sold in 3 days',
  },
];

const successStats = [
  { icon: TrendingUp, stat: '98%', label: 'Sold at or above asking' },
  { icon: Star, stat: '5.0', label: 'Average client rating' },
  { icon: Home, stat: '12', label: 'Average days on market' },
];

export default function Testimonials() {
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
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
          {successStats.map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-1">{item.stat}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Video Testimonials */}
      <SectionWrapper variant="muted">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
            Video Testimonials
          </h2>
          <p className="text-muted-foreground text-lg">
            Hear directly from families who have worked with me.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {videoTestimonials.map((video, index) => (
            <div key={index} className="group cursor-pointer bg-card rounded-xl overflow-hidden border border-border">
              <div className="relative aspect-video bg-muted">
                <img
                  src={video.thumbnail}
                  alt={video.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 text-primary-foreground fill-current ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg font-semibold">{video.name}</h3>
                <p className="text-sm text-muted-foreground">{video.location}</p>
                <p className="text-sm text-primary font-medium mt-2">{video.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Written Testimonials */}
      <SectionWrapper>
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
            Client Reviews
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card p-6 rounded-xl border border-border">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
                {testimonial.outcome && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                    {testimonial.outcome}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper variant="muted">
        <CTABlock
          variant="dark"
          title="Ready to Be Our Next Success Story?"
          subtitle="Let's discuss your real estate goals and create a plan that works for you — no pressure, just honest advice."
          primaryCta={{ text: "Book a Call", href: "/contact" }}
          secondaryCta={{ text: "View Seller Services", href: "/seller-services" }}
        />
      </SectionWrapper>
    </Layout>
  );
}
