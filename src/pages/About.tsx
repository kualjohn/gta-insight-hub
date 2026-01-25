import { Link } from 'react-router-dom';
import { Play, Youtube } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { CTABlock } from '@/components/sections/CTABlock';
import { Button } from '@/components/ui/button';
import fawadPortrait from '@/assets/fawad-portrait.jpg';

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-warm section-padding py-16 lg:py-24">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wide uppercase">
                About Fawad
              </span>
              <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-6">
                Real Estate Through<br />
                <span className="text-gradient-gold">Education & Trust</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                I believe the best real estate decisions come from understanding the market—not 
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
                <Button variant="outline-dark" size="lg" asChild>
                  <Link to="/contact">
                    Book a Call
                  </Link>
                </Button>
              </div>
            </div>

            {/* Photo/Video placeholder */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
              <img
                  src={fawadPortrait}
                  alt="Fawad - GTA Real Estate Broker"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Video overlay button */}
              <button className="absolute bottom-6 left-6 flex items-center gap-3 bg-background/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:bg-background transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Play className="w-4 h-4 text-primary-foreground fill-current ml-0.5" />
                </div>
                <span className="font-medium">Watch Intro Video</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <SectionWrapper>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-6">
            Why I Make Content
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            When I started in real estate, I noticed something: most homeowners didn't have 
            access to honest, unbiased market information. Everything was filtered through 
            agents with something to sell.
          </p>
          <p className="text-lg text-muted-foreground mb-6">
            So I started creating videos—weekly market updates, educational content, honest 
            analysis. No sales pitches, just real information that helps people understand 
            what's happening in their community.
          </p>
          <p className="text-lg text-muted-foreground">
            Today, hundreds of GTA families follow my content. And when they're ready to buy 
            or sell, they already trust me—because I've been helping them for free all along.
          </p>
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper variant="muted">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
            What I Stand For
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: 'Education First',
              description: 'I believe informed homeowners make better decisions. That\'s why I create free content every week.',
            },
            {
              title: 'Data Over Hype',
              description: 'No sensational predictions or fear tactics. Just real numbers and honest analysis.',
            },
            {
              title: 'Client Success',
              description: 'When you work with me, your success is my success. Full staging, marketing, and flexibility—included.',
            },
          ].map((value, index) => (
            <div key={index} className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="font-serif text-xl font-bold text-primary">{index + 1}</span>
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <CTABlock
          variant="dark"
          title="Let's Connect"
          subtitle="Whether you have questions about the market or are thinking about selling, I'm here to help."
          primaryCta={{ text: "Book a Call", href: "/contact" }}
          secondaryCta={{ text: "Watch My Videos", href: "/youtube" }}
        />
      </SectionWrapper>
    </Layout>
  );
}
