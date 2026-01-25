import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { CTABlock } from '@/components/sections/CTABlock';
import { Button } from '@/components/ui/button';

const stagingExamples = [
  {
    title: 'Mississauga Condo Transformation',
    before: 'https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=800&h=500&fit=crop',
    after: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=500&fit=crop',
    result: 'Sold in 4 days, 8% over asking',
  },
  {
    title: 'Milton Family Home',
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
    after: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop',
    result: 'Sold in 7 days, multiple offers',
  },
  {
    title: 'Burlington Executive Home',
    before: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=500&fit=crop',
    after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop',
    result: 'Sold at asking, 10 days',
  },
];

export default function Staging() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-warm section-padding py-16">
        <div className="container-wide mx-auto">
          <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wide uppercase">
            Professional Staging
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Staging That Sells
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Professional staging isn't just about furniture—it's about helping buyers 
            envision their future home. And it's included free when you list with me.
          </p>
        </div>
      </section>

      {/* Why Staging */}
      <SectionWrapper>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-6">
              Why Staging Matters
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Studies show that staged homes sell 73% faster and for up to 20% more than 
                non-staged homes. But beyond the statistics, staging creates an emotional 
                connection with buyers.
              </p>
              <p>
                When buyers walk into a professionally staged home, they don't just see 
                empty rooms—they see possibilities. They imagine family dinners, quiet 
                Sunday mornings, and memories waiting to be made.
              </p>
              <p>
                My wife runs a professional staging company, and we include full home 
                staging at no additional cost for all our sellers. It's one of the many 
                ways we go above and beyond.
              </p>
            </div>
          </div>
          <div className="bg-muted rounded-2xl p-8">
            <h3 className="font-serif text-2xl font-bold mb-6 text-center">Staging Statistics</h3>
            <div className="grid grid-cols-2 gap-6">
              {[
                { stat: '73%', label: 'Faster Sales' },
                { stat: '20%', label: 'Higher Price' },
                { stat: '94%', label: 'Buyer Impact' },
                { stat: '100%', label: 'Included Free' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <p className="text-4xl font-serif font-bold text-primary mb-1">{item.stat}</p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Before/After Gallery */}
      <SectionWrapper variant="muted">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
            Before & After Transformations
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See how professional staging transforms spaces and drives results.
          </p>
        </div>

        <div className="space-y-12">
          {stagingExamples.map((example, index) => (
            <div key={index} className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="font-serif text-xl font-semibold mb-4">{example.title}</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Before</p>
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={example.before}
                      alt={`${example.title} - Before`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">After</p>
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={example.after}
                      alt={`${example.title} - After`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <p className="inline-block bg-primary/10 text-primary font-medium px-4 py-2 rounded-full text-sm">
                Result: {example.result}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <CTABlock
          variant="dark"
          title="Ready to Transform Your Home?"
          subtitle="Free professional staging is included when you list with me. Let's talk."
          primaryCta={{ text: "Book a Call", href: "/contact" }}
          secondaryCta={{ text: "View Seller Services", href: "/seller-services" }}
        />
      </SectionWrapper>
    </Layout>
  );
}
