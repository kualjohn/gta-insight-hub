import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { CTABlock } from '@/components/sections/CTABlock';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/seo/SEOHead';
import { Heart, ArrowRight } from 'lucide-react';

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
      <SEOHead
        title="Free Home Staging | Professional Staging Included"
        description="Professional staging is included FREE when you list with us. See before and after transformations that helped our clients sell faster and for more money."
        canonicalUrl="https://gta-insight-hub.lovable.app/staging"
      />

      {/* Header */}
      <section className="bg-gradient-warm section-padding py-16">
        <div className="container-wide mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary tracking-wide uppercase">
              Free When You List With Us
            </span>
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Professional Staging That Sells
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            My wife runs a professional staging company, and we include full home staging 
            at no additional cost for all our sellers. It's one of the many ways we go above and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="gold" size="lg" asChild>
              <Link to="/contact">
                Book a Staging Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/seller-services">
                View All Seller Services
              </Link>
            </Button>
          </div>
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
                empty rooms — they see possibilities. They imagine family dinners, quiet 
                Sunday mornings, and memories waiting to be made.
              </p>
              <p className="font-medium text-foreground">
                That emotional connection translates to faster sales and better offers.
              </p>
            </div>
          </div>
          <div className="bg-muted rounded-2xl p-8">
            <h3 className="font-serif text-2xl font-bold mb-6 text-center">Staging by the Numbers</h3>
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

      {/* Free Staging Highlight */}
      <SectionWrapper variant="muted">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Heart className="w-4 h-4" />
            <span className="font-medium">A Family Business</span>
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
            Free Full Staging Is Included<br />When You List With Us
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            My wife is a professional stager with years of experience transforming homes. 
            When you list with me, her full staging services are included at absolutely 
            no extra cost. It's our way of ensuring every home we sell looks its absolute best.
          </p>
          <Button variant="gold" size="lg" asChild>
            <Link to="/contact">
              Book a Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </SectionWrapper>

      {/* Before/After Gallery */}
      <SectionWrapper>
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
                      alt={`${example.title} - Before staging`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">After</p>
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={example.after}
                      alt={`${example.title} - After staging`}
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
      <SectionWrapper variant="muted">
        <CTABlock
          variant="dark"
          title="Ready to Transform Your Home?"
          subtitle="Free professional staging is included when you list with me. Let's talk about how we can showcase your home at its best."
          primaryCta={{ text: "Book a Staging Consultation", href: "/contact" }}
          secondaryCta={{ text: "View Seller Services", href: "/seller-services" }}
        />
      </SectionWrapper>
    </Layout>
  );
}
