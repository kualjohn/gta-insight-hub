import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { CTABlock } from '@/components/sections/CTABlock';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How does the GTA selling process work?',
    answer: 'The selling process typically takes 2-4 months from listing to closing. We start with a consultation to understand your goals, then prepare your home with staging and professional photography. Once listed, we actively market your property, handle showings and offers, negotiate on your behalf, and guide you through closing. I\'ll be with you every step of the way.',
  },
  {
    question: 'How long does it take to sell a home in the GTA?',
    answer: 'It varies by area and market conditions, but properly priced and staged homes typically sell within 2-4 weeks in the GTA. Some sell in days with multiple offers, while others may take longer. During our consultation, I\'ll give you realistic expectations based on current market data for your specific neighborhood.',
  },
  {
    question: 'What are your fees and commission structure?',
    answer: 'I offer flexible commission options based on the services you need. Unlike many agents, I include full staging, 4K video, drone photography, and paid advertising at no extra cost. During our consultation, I\'ll explain all options transparently so you can choose what works best for your situation.',
  },
  {
    question: 'Can I cancel the listing if my home doesn\'t sell?',
    answer: 'Yes, absolutely. I believe in earning your business every day. If at any point you\'re unhappy or decide not to sell, you can cancel. No penalties, no hard feelings. My goal is to help you succeed, not to lock you into a contract.',
  },
  {
    question: 'What if my home doesn\'t sell?',
    answer: 'If your home doesn\'t sell, we\'ll analyze why and adjust our strategy. This might mean a price adjustment, additional marketing, or timing considerations. I\'ll be honest with you about what\'s working and what isn\'t. Remember, you can cancel anytime—but most of my listings sell successfully with the right approach.',
  },
  {
    question: 'Do I really need staging?',
    answer: 'Data shows staged homes sell 73% faster and for up to 20% more. But beyond statistics, staging helps buyers emotionally connect with your home. That\'s why I include full professional staging at no additional cost. It\'s one of the best investments in a successful sale.',
  },
  {
    question: 'Should I make repairs before selling?',
    answer: 'It depends on the repairs. Some improvements offer great ROI, while others don\'t. During our consultation, I\'ll walk through your home and recommend which repairs make sense and which ones you can skip. The goal is to maximize your return, not spend unnecessarily.',
  },
  {
    question: 'How do you determine the right listing price?',
    answer: 'I use a data-driven approach: analyzing recent comparable sales, current market conditions, your home\'s unique features, and buyer demand in your area. Pricing right from the start is crucial—overpricing leads to longer days on market and ultimately lower offers. I\'ll explain my reasoning and we\'ll decide together.',
  },
];

export default function FAQ() {
  return (
    <Layout>
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
            Answers to the most common questions from GTA home sellers. Can't find 
            what you're looking for? Book a call and I'll be happy to help.
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
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper variant="muted">
        <CTABlock
          variant="dark"
          title="Still Have Questions?"
          subtitle="I'm here to help. Book a free consultation and let's discuss your situation."
          primaryCta={{ text: "Book a Call", href: "/contact" }}
          secondaryCta={{ text: "Watch My Videos", href: "/youtube" }}
        />
      </SectionWrapper>
    </Layout>
  );
}
