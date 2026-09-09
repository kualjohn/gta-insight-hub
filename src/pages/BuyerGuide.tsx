import { Link } from 'react-router-dom';
import { Download, Check, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { CTABlock } from '@/components/sections/CTABlock';
import { SEOHead } from '@/components/seo/SEOHead';

const guidePoints = [
  'Learn how to get pre-approved and what it means for your offer',
  'Understand the true costs of buying (beyond the down payment)',
  'Discover what to look for during home viewings',
  'Know your rights and protections as a buyer',
  'Avoid the mistakes that cost first-time buyers thousands',
];

const BuyerGuide = () => {
  return (
    <Layout>
      <SEOHead
        title="First-Time Buyer Guide | Free Download"
        description="Everything you need to know before buying your first home in the GTA. Download our free guide with tips, checklists, and expert advice."
        canonicalUrl="https://fawadnissari.ca/buyer-guide"
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent/10 via-background to-background py-16 lg:py-20">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-sm font-medium text-accent mb-4 tracking-wide uppercase">
                Free Download
              </span>
              <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-6">
                First-Time Buyer Guide
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Buying your first home is one of the biggest decisions you'll make. 
                This guide walks you through every step—from getting pre-approved to 
                closing day—with no pressure and no jargon.
              </p>

              <ul className="space-y-3 mb-8">
                {guidePoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gold" size="lg">
                  <Download className="w-5 h-5" />
                  Download Free Guide
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://calendly.com/fawadnissari" target="_blank" rel="noopener noreferrer">
                    <Phone className="w-5 h-5" />
                    Book a Call
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/10 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
                  alt="Happy first-time home buyers"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-6 py-3 rounded-lg shadow-lg">
                <p className="font-semibold text-sm">100% Free</p>
                <p className="text-xs opacity-80">No obligations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <SectionWrapper className="py-12 lg:py-16">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
            What's Inside the Guide
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A step-by-step roadmap designed specifically for first-time buyers in the GTA.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Pre-Approval Process', desc: 'How to get mortgage pre-approval and what lenders look for.' },
            { title: 'House Hunting Tips', desc: 'What to prioritize and red flags to avoid during viewings.' },
            { title: 'Making an Offer', desc: 'How to structure a competitive offer that protects you.' },
            { title: 'Home Inspection', desc: 'What inspectors look for and how to interpret results.' },
            { title: 'Closing Costs', desc: 'All the fees you need to budget for beyond the purchase price.' },
            { title: 'Moving Day', desc: 'Checklists and tips for a smooth transition to your new home.' },
          ].map((item, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper variant="muted" className="py-12 lg:py-16">
        <CTABlock
          variant="dark"
          title="Ready to Start Your Home Search?"
          subtitle="Get personalized guidance from a local expert who knows the GTA market inside and out."
          primaryCta={{ text: "Book a Call", href: "https://calendly.com/fawadnissari" }}
          secondaryCta={{ text: "View Buyer Tips", href: "/buyer-tips" }}
        />
      </SectionWrapper>
    </Layout>
  );
};

export default BuyerGuide;
