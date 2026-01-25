import { Link } from 'react-router-dom';
import { Check, X, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { SellerUSPBlock } from '@/components/sections/SellerUSPBlock';
import { CTABlock } from '@/components/sections/CTABlock';
import { Button } from '@/components/ui/button';

const comparisonData = [
  { feature: 'Professional Photography', typical: true, us: true },
  { feature: 'MLS Listing', typical: true, us: true },
  { feature: 'Open Houses', typical: true, us: true },
  { feature: 'Full Home Staging', typical: false, us: true },
  { feature: '4K Video Tour', typical: false, us: true },
  { feature: 'Drone Photography', typical: false, us: true },
  { feature: 'Daily Paid Advertising', typical: false, us: true },
  { feature: 'Dedicated Property Website', typical: false, us: true },
  { feature: 'Cancel Anytime', typical: false, us: true },
  { feature: 'Flexible Commission', typical: false, us: true },
];

export default function SellerServices() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-warm section-padding py-16">
        <div className="container-wide mx-auto">
          <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wide uppercase">
            Seller Services
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Our GTA Home Selling System
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            A comprehensive approach to selling your home that combines strategic pricing, 
            professional marketing, and white-glove service.
          </p>
          <Button variant="gold" size="lg" asChild>
            <Link to="/contact">
              Book a Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* What's Included */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
            Everything You Need to Sell
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From staging to marketing to closing, we handle every detail so you can focus on 
            what matters most.
          </p>
        </div>
        <SellerUSPBlock />
      </SectionWrapper>

      {/* Comparison Chart */}
      <SectionWrapper variant="muted">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
            Typical Agent vs. What We Do
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See how our comprehensive approach goes beyond what you'd typically get.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-charcoal text-primary-foreground">
              <div className="p-4 font-medium">Feature</div>
              <div className="p-4 font-medium text-center">Typical Agent</div>
              <div className="p-4 font-medium text-center bg-primary">What We Do</div>
            </div>

            {/* Rows */}
            {comparisonData.map((row, index) => (
              <div 
                key={index} 
                className="grid grid-cols-3 border-t border-border"
              >
                <div className="p-4 text-sm font-medium">{row.feature}</div>
                <div className="p-4 flex justify-center">
                  {row.typical ? (
                    <Check className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <X className="w-5 h-5 text-muted-foreground/40" />
                  )}
                </div>
                <div className="p-4 flex justify-center bg-primary/5">
                  <Check className="w-5 h-5 text-primary" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Process */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A simple, transparent process from consultation to closing.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Consultation', desc: 'We discuss your goals, timeline, and unique situation.' },
            { step: '02', title: 'Preparation', desc: 'Staging, photography, video, and marketing materials are created.' },
            { step: '03', title: 'Launch', desc: 'Your home goes live with maximum exposure across all channels.' },
            { step: '04', title: 'Closing', desc: 'We handle negotiations and guide you through to a successful sale.' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 font-serif text-xl font-bold">
                {item.step}
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper variant="muted">
        <CTABlock
          variant="dark"
          title="Ready to Get Started?"
          subtitle="Let's discuss your home and create a customized selling strategy."
          primaryCta={{ text: "Book a Call", href: "/contact" }}
          secondaryCta={{ text: "Get Home Evaluation", href: "/home-evaluation" }}
        />
      </SectionWrapper>
    </Layout>
  );
}
