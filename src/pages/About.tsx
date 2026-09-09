import { Link } from 'react-router-dom';
import { Play, Youtube, Phone, Video } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { CTABlock } from '@/components/sections/CTABlock';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/seo/SEOHead';
import fawadPortrait from '@/assets/fawad-portrait.jpg';

const missionPoints = [
  {
    title: 'Why I Create Weekly Insights',
    description: 'When I started in real estate, I noticed most homeowners didn\'t have access to honest, unbiased market information. Everything was filtered through agents with something to sell. So I started creating videos — weekly market updates, educational content, honest analysis. No sales pitches, just real information.',
  },
  {
    title: 'How I Help Homeowners Make Smarter Decisions',
    description: 'Whether you\'re selling your first home or your fifth, my goal is to give you the information you need to make confident decisions. Through my videos, guides, and personalized consultations, I help you understand the market and your options — with zero pressure.',
  },
  {
    title: 'Data Over Hype',
    description: 'No sensational predictions or fear tactics. Just real numbers, honest analysis, and practical advice. I believe informed homeowners make better decisions, and that\'s why I create free content every week.',
  },
];

export default function About() {
  return (
    <Layout>
      <SEOHead
        title="About Fawad Nissari | Real Estate Market Expert"
        description="Learn about Fawad Nissari, a GTA real estate expert with over a decade of experience. Weekly insights, data-backed advice, and a commitment to helping homeowners make smarter decisions."
        canonicalUrl="https://fawadnissari.ca/about"
      />
      
      {/* Hero */}
      <section className="bg-gradient-warm section-padding py-16 lg:py-24">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-sm font-medium text-accent mb-4 tracking-wide uppercase">
                About Fawad Nissari
              </span>
              <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-6">
                Real Estate Market<br />
                <span className="text-accent">Expert & Advisor</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                I believe the best real estate decisions come from understanding the market — not 
                from sales pressure. That's why I create weekly content to help GTA homeowners 
                make informed choices.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                For over a decade, I've helped families across Mississauga, Milton, Oakville, 
                Burlington, Hamilton, and Brampton navigate one of life's biggest financial decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gold" size="lg" asChild>
                  <Link to="/youtube">
                    <Youtube className="w-4 h-4" />
                    Watch My Videos
                  </Link>
                </Button>
                <Button variant="accent" size="lg" asChild>
                  <a href="https://calendly.com/fawadnissari" target="_blank" rel="noopener noreferrer">
                    <Phone className="w-4 h-4" />
                    Book a Call
                  </a>
                </Button>
              </div>
            </div>

            {/* Photo/Video */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted shadow-xl">
                <img
                  src={fawadPortrait}
                  alt="Fawad Nissari - GTA Real Estate Expert"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Video overlay button */}
              <button className="absolute bottom-6 left-6 flex items-center gap-3 bg-background/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:bg-background transition-colors group">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 text-primary-foreground fill-current ml-0.5" />
                </div>
                <span className="font-medium">Watch Intro Video</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Philosophy */}
      <SectionWrapper>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
              My Approach to Real Estate
            </h2>
            <p className="text-lg text-muted-foreground">
              Education first. Data-driven insights. Zero pressure.
            </p>
          </div>

          <div className="space-y-8">
            {missionPoints.map((point, index) => (
              <div key={index} className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <span className="font-serif text-xl font-bold text-accent">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-2">{point.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Stats */}
      <SectionWrapper variant="muted">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          {[
            { stat: '10+', label: 'Years Experience' },
            { stat: '500+', label: 'Videos Published' },
            { stat: '1000+', label: 'Families Helped' },
            { stat: '100%', label: 'Cancel Anytime' },
          ].map((item, index) => (
            <div key={index}>
              <p className="text-4xl lg:text-5xl font-serif font-bold text-accent mb-2">{item.stat}</p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Content Preview */}
      <SectionWrapper>
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
            Weekly Content
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every week I publish new videos covering market updates, seller tips, buyer advice, 
            and honest analysis of the GTA real estate market.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Video, title: 'Market Updates', desc: 'Weekly analysis of what\'s happening in GTA communities' },
            { icon: Youtube, title: 'Seller Tips', desc: 'Strategies to maximize your home\'s value and sell faster' },
            { icon: Play, title: 'Buyer Advice', desc: 'Guidance for navigating the buying process confidently' },
          ].map((item, index) => (
            <div key={index} className="text-center p-6 bg-card rounded-xl border border-border">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="gold" size="lg" asChild>
            <Link to="/youtube">
              <Youtube className="w-4 h-4" />
              Visit My YouTube Channel
            </Link>
          </Button>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper variant="muted">
        <CTABlock
          variant="dark"
          title="Let's Connect"
          subtitle="Whether you have questions about the market or are thinking about selling, I'm here to help — no pressure, just honest advice."
          primaryCta={{ text: "Book a Call", href: "https://calendly.com/fawadnissari" }}
          secondaryCta={{ text: "Download Seller Guide", href: "/seller-guide" }}
        />
      </SectionWrapper>
    </Layout>
  );
}
