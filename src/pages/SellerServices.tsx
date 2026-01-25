import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, Camera, Home, Video, Target, Globe, Shield } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { CTABlock } from '@/components/sections/CTABlock';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/seo/SEOHead';

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

const services = [
  {
    icon: Home,
    title: 'Free Full Home Staging',
    description: 'Professional staging transforms your home and helps buyers emotionally connect. Included at no extra cost.',
  },
  {
    icon: Camera,
    title: 'Professional Photography',
    description: 'High-quality photos that showcase your home\'s best features and make it stand out online.',
  },
  {
    icon: Video,
    title: '4K Video & Drone',
    description: 'Cinematic video tours and aerial footage that give buyers a complete picture of your property.',
  },
  {
    icon: Target,
    title: 'Daily Paid Advertising',
    description: 'Your home promoted daily across Facebook, Instagram, YouTube, and Google to reach qualified buyers.',
  },
  {
    icon: Globe,
    title: 'Dedicated Property Website',
    description: 'A custom website just for your home, making it easy for buyers to learn everything about your property.',
  },
  {
    icon: Shield,
    title: 'Cancel Anytime',
    description: 'No lock-in contracts. If you\'re not happy with my service, you can cancel anytime — no penalties.',
  },
];

export default function SellerServices() {
  return (
    <Layout>
      <SEOHead
        title="Seller Services | Full-Service Home Selling"
        description="Everything you need to sell your GTA home: free staging, 4K video, drone photography, daily advertising, dedicated websites, and flexible commission. Cancel anytime."
        canonicalUrl="https://gta-insight-hub.lovable.app/seller-services"
      />

      {/* Header with CTA */}
      <section className="bg-gradient-warm section-padding py-16">
        <div className="container-wide mx-auto">
          <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wide uppercase">
            Seller Services
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Everything You Need to Sell
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            A comprehensive approach to selling your home that combines strategic pricing, 
            professional marketing, and white-glove service — with no lock-in contracts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="gold" size="lg" asChild>
              <Link to="/contact">
                Book a Consultation
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
      </section>

      {/* What's Included */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
            What's Included
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From staging to marketing to closing, we handle every detail so you can focus on 
            what matters most.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Mid-page CTA */}
      <SectionWrapper variant="muted">
        <CTABlock
          variant="primary"
          title="Ready to Learn More?"
          subtitle="Book a free consultation to discuss your home and create a customized selling strategy."
          primaryCta={{ text: "Book a Call", href: "/contact" }}
          secondaryCta={{ text: "Download Seller Guide", href: "/seller-guide" }}
        />
      </SectionWrapper>

      {/* Comparison Chart */}
      <SectionWrapper>
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
      <SectionWrapper variant="muted">
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
            { step: '01', title: 'Consultation', desc: 'We discuss your goals, timeline, and unique situation — no pressure.' },
            { step: '02', title: 'Preparation', desc: 'Staging, photography, video, and all marketing materials are created.' },
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

      {/* Bottom CTA */}
      <SectionWrapper>
        <CTABlock
          variant="dark"
          title="Ready to Get Started?"
          subtitle="Let's discuss your home and create a customized selling strategy — no pressure, no obligation."
          primaryCta={{ text: "Book a Call", href: "/contact" }}
          secondaryCta={{ text: "Get Home Evaluation", href: "/home-evaluation" }}
        />
      </SectionWrapper>
    </Layout>
  );
}
