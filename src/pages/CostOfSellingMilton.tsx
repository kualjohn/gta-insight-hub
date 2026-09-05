import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo/SEOHead';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MILTON_PRICES_BY_TYPE } from '@/data/miltonMarket';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does it cost to sell a house in Milton in 2026?",
      "acceptedAnswer": { "@type": "Answer", "text": "Total selling costs in Milton typically range from 3% to 5.5% of the sale price. On a $1,160,000 detached home, that's roughly $35,000–$64,000. This includes real estate commission, legal fees, and any pre-list repairs. With Fawad Nissari's 1% listing option, staging, photography, and drone video are all included at no extra cost." }
    },
    {
      "@type": "Question",
      "name": "Do I have to pay the buyer's agent commission when selling in Milton?",
      "acceptedAnswer": { "@type": "Answer", "text": "Buyer agent co-op commission in Canada is now negotiable following 2024 regulatory changes. Most sellers in Milton are still offering 2–2.5% to attract buyer agents and maximize exposure." }
    },
    {
      "@type": "Question",
      "name": "How long does it take to sell a house in Milton?",
      "acceptedAnswer": { "@type": "Answer", "text": "As of June 2026, average days on market in Milton is 16 days for townhouses, 25–26 days for detached and semi-detached homes, and 37–39 days for condos." }
    },
    {
      "@type": "Question",
      "name": "Is staging worth it when selling in Milton?",
      "acceptedAnswer": { "@type": "Answer", "text": "Staged homes sell faster and for more money. The ROI on staging typically exceeds 5:1. Fawad Nissari includes full professional home staging at no cost with every listing." }
    }
  ]
};

const marketCards = MILTON_PRICES_BY_TYPE;

const includes = [
  'Full professional home staging — furniture, decor, the works. Not a consultation. Actual staging.',
  'Professional photography — HDR, edited, MLS-ready',
  'Drone aerial photography and video',
  '4K video walkthrough for social and YouTube',
  'Paid advertising across Facebook, Instagram, Google, and YouTube',
  'MLS and all major platform listings (realtor.ca, HouseSigma, etc.)',
  'Offer strategy and negotiation with over 10 years of GTA experience',
  'Cancel anytime — no holdover clause, no pressure',
  '1% listing commission (vs. the standard 2–2.5%)',
];

const dom = MILTON_PRICES_BY_TYPE.map((p) => ({ t: p.type, d: p.dom, r: p.ratio, m: p.note }));

const faqs = [
  { q: 'Do I pay HST on real estate commission in Milton?', a: "Yes. Real estate commission in Ontario is subject to HST (13%). So if the total commission is 3.5% on a $1,160,000 home ($40,600), you'll pay an additional $5,278 in HST on the commission portion. Your lawyer accounts for this at closing." },
  { q: "What happens to my commission if the home doesn't sell?", a: "With Fawad's cancel-anytime policy, if your home doesn't sell you owe nothing. There's no holdover clause that ties you to a commission if you cancel. This is not standard in the industry — most agents include a 30–90 day holdover period. Ask any agent you're interviewing about this directly." },
  { q: "Do I have to pay the buyer's agent commission?", a: "Since 2024 regulatory changes in Canada, buyer agent co-op commission is negotiable. Most Milton sellers are still offering 2–2.5% to attract buyers and their agents, which maximizes your pool of potential buyers. If you offer 0%, many buyer agents won't show your home. We'll discuss the right strategy for your specific situation." },
  { q: 'Can I sell my Milton home without a realtor?', a: "Yes, you can list privately (FSBO). You'd pay a flat fee for MLS access (typically $500–$1,500) and handle everything yourself — showings, offers, negotiations, paperwork. Most FSBO sellers still pay buyer agent commission. Studies show FSBO homes sell for 5–13% less than agent-listed homes." },
  { q: "What's my Milton home worth right now?", a: 'Median prices give you a benchmark, but your actual value depends on your street, your finishes, your lot, and comparable sales in your immediate neighbourhood. The only accurate answer comes from a proper Comparative Market Analysis (CMA). Book a free call below — I\'ll pull your comps and give you a real number, no obligation.' },
];

export default function CostOfSellingMilton() {
  return (
    <Layout>
      <SEOHead
        title="Cost of Selling a House in Milton (2026 Breakdown)"
        description="Exact costs to sell your Milton home in 2026: commission, legal fees, staging, and more. Real TRREB data, no fluff. Book a free call with Fawad Nissari."
        canonicalUrl="https://fawadnissari.ca/cost-of-selling-a-house-in-milton"
        ogType="article"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-charcoal text-primary-foreground py-20 lg:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-primary mb-5">
            Milton · TRREB Data · June 2026
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            The Real Cost of Selling a House in <span className="text-primary">Milton</span>
          </h1>
          <p className="text-primary-foreground/70 max-w-xl mx-auto mb-9 text-base lg:text-lg">
            No guesswork. Exact numbers for commission, legal fees, staging, and every other cost — so you know exactly what you'll net before you list.
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-wider">
            <Link to="/home-evaluation">Get Your Free Home Valuation</Link>
          </Button>

          <div className="flex justify-center gap-8 md:gap-12 flex-wrap mt-10 pt-9 border-t border-charcoal-light">
            {[
              { n: '$1,160,000', l: 'Median Detached Price' },
              { n: '26 days', l: 'Avg. Days on Market' },
              { n: '98%', l: 'Sale-to-List Ratio' },
              { n: '259', l: 'Detached Sales (June 2026)' },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <span className="block font-serif text-2xl lg:text-3xl text-primary">{s.n}</span>
                <span className="text-xs uppercase tracking-wider text-primary-foreground/60">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 lg:px-6">
        {/* Short answer + cost table */}
        <section className="py-16 border-b border-border">
          <h2 className="font-serif text-3xl lg:text-4xl mb-6 gold-underline inline-block pb-2">
            The Short Answer: What Does It Cost to Sell in Milton?
          </h2>
          <p className="mb-4 text-foreground/90">
            Total selling costs in Milton for a typical detached home priced at $1,160,000 run between $34,000 and $65,000 — or roughly 3% to 5.5% of the sale price. The biggest variable is real estate commission. Everything else is fairly predictable.
          </p>
          <p className="mb-6 text-foreground/90">Here's the full breakdown, line by line.</p>

          <div className="overflow-x-auto -mx-4 lg:mx-0">
            <table className="w-full text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-charcoal text-primary-foreground">
                  <th className="text-left p-3 uppercase text-xs tracking-wider">Cost Item</th>
                  <th className="text-left p-3 uppercase text-xs tracking-wider">Typical Range</th>
                  <th className="text-left p-3 uppercase text-xs tracking-wider">With Fawad's 1% Listing</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Listing Agent Commission', "Your agent's side of the deal", '2% – 2.5% ($23,200 – $29,000)', '1% ($11,600)'],
                  ['Buyer Agent Co-op Commission', "What you offer to attract the buyer's agent", '2% – 2.5% ($23,200 – $29,000)', '2% – 2.5% ($23,200 – $29,000)'],
                  ['Home Staging', 'Full furniture + decor staging', '$3,000 – $6,000', 'FREE — Included'],
                  ['Professional Photography', 'HDR photos, edited and delivered', '$400 – $800', 'FREE — Included'],
                  ['Drone + 4K Video Walkthrough', '', '$500 – $1,000', 'FREE — Included'],
                  ['Paid Advertising', 'Facebook, Instagram, Google, YouTube campaigns', '$500 – $2,000 (if offered)', 'FREE — Included'],
                  ['Legal Fees (Real Estate Lawyer)', 'Title transfer, statement of adjustments', '$1,500 – $2,500', '$1,500 – $2,500'],
                  ['Mortgage Discharge / Penalty', 'Varies by lender and remaining term', '$0 – $10,000+', '$0 – $10,000+'],
                  ['Pre-List Repairs / Touch-Ups', 'Paint, fixtures, landscaping', '$500 – $5,000', '$500 – $5,000'],
                  ['Moving Costs', '', '$1,500 – $4,000', '$1,500 – $4,000'],
                ].map(([label, note, typical, fawad], i) => (
                  <tr key={i} className={i % 2 === 1 ? 'bg-muted' : ''}>
                    <td className="p-3 border-b border-border align-top">
                      <div className="font-semibold">{label}</div>
                      {note && <div className="text-xs text-muted-foreground mt-1">{note}</div>}
                    </td>
                    <td className="p-3 border-b border-border align-top">{typical}</td>
                    <td className={`p-3 border-b border-border align-top ${String(fawad).startsWith('FREE') ? 'text-primary font-semibold' : ''}`}>{fawad}</td>
                  </tr>
                ))}
                <tr className="bg-charcoal text-primary-foreground font-bold">
                  <td className="p-4">Estimated Total (Traditional Agent)</td>
                  <td className="p-4">$53,700 – $69,300</td>
                  <td className="p-4"></td>
                </tr>
                <tr className="bg-charcoal text-primary-foreground font-bold border-t border-charcoal-light">
                  <td className="p-4">Estimated Total (With Fawad's 1% Listing)</td>
                  <td className="p-4"></td>
                  <td className="p-4 text-primary">$38,800 – $54,100</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Based on a Milton detached median sale price of $1,160,000 (June 2026, TRREB). Buyer agent co-op set at 2.5%. Mortgage penalty not included — contact your lender for your exact figure. All amounts in CAD.
          </p>

          <div className="bg-primary/10 border-l-4 border-primary p-6 mt-8">
            <p className="text-sm">
              <strong>The real saving with a 1% listing:</strong> On a $1,160,000 sale, dropping from 2.5% to 1% listing commission saves you <strong>$17,400</strong> — with more included, not less. Full staging, pro photography, drone, video, and multi-platform paid ads come standard.
            </p>
          </div>
        </section>

        {/* Market data */}
        <section className="py-16 border-b border-border">
          <h2 className="font-serif text-3xl lg:text-4xl mb-6 gold-underline inline-block pb-2">
            What's Actually Selling in Milton Right Now
          </h2>
          <p className="mb-8 text-foreground/90">
            This is June 2026 TRREB data — not estimates, not trends from 2 years ago. This is what closed in the last 30 days.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {marketCards.map((c) => (
              <div key={c.type} className="bg-card border border-border p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{c.type}</p>
                <p className="font-serif text-2xl mb-1">{c.price}</p>
                <p className="text-sm text-destructive">{c.yoy}</p>
                <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">{c.meta}</p>
              </div>
            ))}
          </div>

          <p className="mb-4 text-foreground/90">
            Townhouses are moving fastest at 16 days on market and selling right at asking. Condos are the slowest segment — 37 to 39 days and coming in 4% under list. If you own a condo in Milton, pricing strategy matters more than any other property type right now.
          </p>
          <p className="text-foreground/90">
            Year-over-year, every property type is down. That's the honest picture. The sellers who net the most in this market are the ones who price accurately, present exceptionally, and launch with maximum exposure.
          </p>
        </section>

        {/* Days on market */}
        <section className="py-16 border-b border-border">
          <h2 className="font-serif text-3xl lg:text-4xl mb-6 gold-underline inline-block pb-2">
            How Long Does It Take to Sell a House in Milton?
          </h2>
          <p className="mb-6 text-foreground/90">Average days on market by property type in Milton, June 2026:</p>

          <div className="overflow-x-auto -mx-4 lg:mx-0">
            <table className="w-full text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-charcoal text-primary-foreground">
                  <th className="text-left p-3 uppercase text-xs tracking-wider">Property Type</th>
                  <th className="text-left p-3 uppercase text-xs tracking-wider">Avg. DOM</th>
                  <th className="text-left p-3 uppercase text-xs tracking-wider">SP/LP</th>
                  <th className="text-left p-3 uppercase text-xs tracking-wider">What It Means</th>
                </tr>
              </thead>
              <tbody>
                {dom.map((r, i) => (
                  <tr key={r.t} className={i % 2 === 1 ? 'bg-muted' : ''}>
                    <td className="p-3 border-b border-border font-semibold">{r.t}</td>
                    <td className="p-3 border-b border-border">{r.d}</td>
                    <td className="p-3 border-b border-border">{r.r}</td>
                    <td className="p-3 border-b border-border">{r.m}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-foreground/90">
            These are averages. A well-staged, properly priced townhouse in Hawthorne Village or Beaty can still sell in under a week. An overpriced detached with dated photos can sit for 60+ days and require price reductions that cost more than good marketing would have.
          </p>

          <div className="bg-primary/10 border-l-4 border-primary p-6 mt-6">
            <p className="text-sm">
              <strong>The add-list period before closing:</strong> Once you accept an offer, closing in Milton typically takes 30–90 days depending on what you negotiate. Factor that into your plans if you're buying simultaneously.
            </p>
          </div>
        </section>

        {/* Includes */}
        <section className="py-16 border-b border-border">
          <h2 className="font-serif text-3xl lg:text-4xl mb-6 gold-underline inline-block pb-2">
            What Every Milton Seller Gets With Fawad
          </h2>
          <p className="mb-6 text-foreground/90">
            The 1% listing option is not a discounted service. It's a full-service listing where the savings come from business efficiency, not from cutting corners. Here's exactly what's included:
          </p>

          <ul className="my-6">
            {includes.map((item) => (
              <li key={item} className="py-3 border-b border-border flex items-start gap-3 text-sm">
                <span className="text-primary font-bold text-lg leading-none flex-shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="bg-charcoal text-primary-foreground p-8 lg:p-10 mt-10 text-center">
            <h3 className="font-serif text-2xl text-primary mb-3">
              What does the 1% actually save you on your Milton home?
            </h3>
            <p className="text-primary-foreground/80">
              On a $1,160,000 detached: switching from 2.5% to 1% listing commission saves you <strong className="text-primary-foreground">$17,400</strong>. On an $810,000 townhouse, that's <strong className="text-primary-foreground">$12,150</strong> back in your pocket — with more marketing, not less.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 border-b border-border">
          <h2 className="font-serif text-3xl lg:text-4xl mb-8 gold-underline inline-block pb-2">
            Frequently Asked Questions
          </h2>
          {faqs.map((f) => (
            <div key={f.q} className="mb-8 pb-8 border-b border-border last:border-b-0">
              <h3 className="font-serif text-xl mb-3">{f.q}</h3>
              <p className="text-foreground/90">{f.a}</p>
            </div>
          ))}
        </section>

        {/* Calendly */}
        <section className="py-16">
          <h2 className="font-serif text-3xl lg:text-4xl mb-4 gold-underline inline-block pb-2">
            Get Your Free Milton Home Valuation
          </h2>
          <p className="mb-8 text-foreground/90">
            Takes 20 minutes. You'll leave knowing exactly what your home is worth, what it will cost to sell, and what your net proceeds look like. No pressure, no obligation.
          </p>
          <div className="border border-border" style={{ minHeight: 650 }}>
            <iframe
              src="https://calendly.com/fawadnissari"
              width="100%"
              height="650"
              frameBorder="0"
              title="Book a call with Fawad Nissari"
            />
          </div>
        </section>
      </div>

      {/* Final CTA */}
      <section className="bg-charcoal text-primary-foreground py-20 px-4 text-center">
        <h2 className="font-serif text-3xl lg:text-4xl mb-4">Ready to Sell Your Milton Home?</h2>
        <p className="text-primary-foreground/70 max-w-lg mx-auto mb-8">
          Over a decade of GTA experience. Full staging, professional media, and multi-platform marketing — all included. 1% listing option. Cancel anytime.
        </p>
        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-wider">
          <a href="https://calendly.com/fawadnissari" target="_blank" rel="noopener noreferrer">
            Book Your Free Valuation Call
          </a>
        </Button>
      </section>
    </Layout>
  );
}