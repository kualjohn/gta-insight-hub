import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { CTABlock } from '@/components/sections/CTABlock';
import { Play } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah & Mike Thompson',
    location: 'Mississauga',
    quote: 'Fawad helped us sell our first home and buy our forever home all in the same month. His market knowledge and staging advice made all the difference.',
    rating: 5,
  },
  {
    name: 'David Chen',
    location: 'Milton',
    quote: 'I followed Fawad\'s YouTube channel for a year before selling. When it was time, I already trusted him completely. He got us 15% over asking.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    location: 'Oakville',
    quote: 'The staging was incredible—our home looked like a magazine spread. Sold in 5 days with multiple offers. Couldn\'t be happier.',
    rating: 5,
  },
  {
    name: 'Robert & Lisa Wilson',
    location: 'Burlington',
    quote: 'After a bad experience with another agent, Fawad restored our faith in real estate professionals. Honest, hardworking, and truly cares.',
    rating: 5,
  },
  {
    name: 'Ahmed & Fatima Hassan',
    location: 'Brampton',
    quote: 'First-time sellers and we had no idea what to expect. Fawad walked us through everything and made it stress-free.',
    rating: 5,
  },
  {
    name: 'Jennifer Moore',
    location: 'Hamilton',
    quote: 'The video marketing was next level. We had buyers calling from across the GTA. Fawad\'s approach is truly different.',
    rating: 5,
  },
];

const videoTestimonials = [
  {
    name: 'The Martinez Family',
    location: 'Mississauga',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=450&fit=crop',
  },
  {
    name: 'John & Karen Roberts',
    location: 'Milton',
    thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=450&fit=crop',
  },
];

export default function Testimonials() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-warm section-padding py-16">
        <div className="container-wide mx-auto">
          <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wide uppercase">
            Client Stories
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            What Clients Say
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Real stories from GTA families who trusted me with their real estate journey. 
            Their success is my greatest achievement.
          </p>
        </div>
      </section>

      {/* Video Testimonials */}
      <SectionWrapper>
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
            <div key={index} className="group cursor-pointer">
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-muted">
                <img
                  src={video.thumbnail}
                  alt={video.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <Play className="w-7 h-7 text-primary-foreground fill-current ml-1" />
                  </div>
                </div>
              </div>
              <h3 className="font-serif text-lg font-semibold">{video.name}</h3>
              <p className="text-muted-foreground text-sm">{video.location}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Written Testimonials */}
      <SectionWrapper variant="muted">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
            Client Reviews
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <CTABlock
          variant="dark"
          title="Ready to Be Our Next Success Story?"
          subtitle="Let's discuss your real estate goals and create a plan that works for you."
          primaryCta={{ text: "Book a Call", href: "/contact" }}
          secondaryCta={{ text: "View Seller Services", href: "/seller-services" }}
        />
      </SectionWrapper>
    </Layout>
  );
}
