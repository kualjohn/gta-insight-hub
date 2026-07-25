import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { CTABlock } from '@/components/sections/CTABlock';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/seo/SEOHead';
import { Helmet } from 'react-helmet-async';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowRight, Phone, Download } from 'lucide-react';

const faqs = [
  {
    question: 'How does the selling process work?',
    answer: 'The selling process typically takes 2-4 months from listing to closing. We start with a consultation to understand your goals, then prepare your home with staging and professional photography. Once listed, we actively market your property, handle showings and offers, negotiate on your behalf, and guide you through closing. I\'ll be with you every step of the way — no surprises.',
    cta: { text: 'Book a Consultation', href: '/contact' },
  },
  {
    question: 'Do you work with first-time sellers?',
    answer: 'Absolutely! First-time sellers are actually my specialty. I know how overwhelming it can feel to sell your first home. That\'s why I created a free First-Time Seller Guide and why I take extra time to explain every step of the process. No question is too basic.',
    cta: { text: 'Download First-Time Seller Guide', href: '/seller-guide' },
  },
  {
    question: 'What happens on a call?',
    answer: 'Our initial call is all about understanding your situation and goals. We\'ll discuss your timeline, what your home means to you, and what success looks like for your sale. I\'ll answer any questions you have about the market or the selling process. There\'s no pressure and no obligation — just honest conversation.',
    cta: { text: 'Book Your Call', href: '/contact' },
  },
  {
    question: 'What if I\'m not ready to sell yet?',
    answer: 'That\'s completely fine! Many of my clients follow my content for months or even years before they\'re ready to sell. I\'m happy to provide a free home evaluation and market analysis whenever you\'re curious about your home\'s value. When you\'re ready, I\'ll be here.',
    cta: { text: 'Get a Home Evaluation', href: '/home-evaluation' },
  },
  {
    question: 'What makes your marketing different?',
    answer: 'Unlike traditional agents, I include comprehensive marketing at no extra cost: 4K video tours, drone photography, professional staging, dedicated property websites, and daily paid advertising across Facebook, Instagram, YouTube, and Google. Your home gets maximum exposure to qualified buyers.',
    cta: { text: 'View Seller Services', href: '/seller-services' },
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, absolutely. I believe in earning your business every day. If at any point you\'re unhappy with my service or decide not to sell, you can cancel with no penalties or hard feelings. My goal is to help you succeed, not to lock you into a contract.',
    cta: { text: 'Learn More About My Services', href: '/seller-services' },
  },
  {
    question: 'Is staging really included for free?',
    answer: 'Yes! We invest heavily in staging — on average $4,500 per home — and provide it completely free of charge to our sellers. We do this because we believe in our service and we\'re confident we can sell your home. Studies show staged homes sell 73% faster and for up to 20% more.',
    cta: { text: 'Learn About Staging', href: '/staging' },
  },
  {
    question: 'How do you determine the right listing price?',
    answer: 'I use a data-driven approach: analyzing recent comparable sales, current market conditions, your home\'s unique features, and buyer demand in your area. Pricing right from the start is crucial — overpricing leads to longer days on market and ultimately lower offers. I\'ll explain my reasoning and we\'ll decide together.',
    cta: { text: 'Request a Home Evaluation', href: '/home-evaluation' },
  },
];

export default function FAQ() {
  return (
    <Layout>
      <SEOHead
        title="Frequently Asked Questions | GTA Real Estate"
        description="Answers to common questions about selling your home in the GTA. Learn about the process, pricing, staging, and what makes our approach different."
        canonicalUrl="https://gta-insight-hub.lovable.app/faq"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          })}
        </script>
      </Helmet>

      {/* Header */}
      <section className="bg-gradient-warm section-padding py-16">
        <div className="container-wide mx-auto">
          <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wide uppercase">
            Common Questions
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Answers to the questions I hear most from GTA homeowners. Can't find 
            what you're looking for? Book a call and let's chat.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <SectionWrapper>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6"
              >
                <AccordionTrigger className="text-left font-serif text-lg font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-muted-foreground mb-4">{faq.answer}</p>
                  <Link 
                    to={faq.cta.href}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    {faq.cta.text}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionWrapper>

      {/* Quick Actions */}
      <SectionWrapper variant="muted">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl font-bold mb-2">Ready to Take the Next Step?</h2>
            <p className="text-muted-foreground">Choose what's right for you:</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://calendly.com/fawadnissari"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Book a Call</h3>
                <p className="text-sm text-muted-foreground">Free, no-pressure consultation</p>
              </div>
            </a>
            
            <Link 
              to="/seller-guide"
              className="flex items-center gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Download className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Download Seller Guide</h3>
                <p className="text-sm text-muted-foreground">Free guide for first-time sellers</p>
              </div>
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <CTABlock
          variant="dark"
          title="Still Have Questions?"
          subtitle="I'm here to help. Book a free consultation and let's discuss your situation — no pressure, just honest advice."
          primaryCta={{ text: "Book a Call", href: "https://calendly.com/fawadnissari" }}
          secondaryCta={{ text: "Watch My Videos", href: "/youtube" }}
        />
      </SectionWrapper>
    </Layout>
  );
}
