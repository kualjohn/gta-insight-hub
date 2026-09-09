import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo/SEOHead';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does it cost to sell a house in Mississauga in 2026?",
      "acceptedAnswer": { "@type": "Answer", "text": "Total selling costs in Mississauga typically range from 3% to 5.5% of the sale price. On a $1,160,000 detached home, that's roughly $35,000–$64,000. With Fawad Nissari's 1% listing option, staging, photography, drone, and video are all included at no extra cost, saving you up to $17,400 in commission alone." }
    },
    {
      "@type": "Question",
      "name": "How long does it take to sell a house in Mississauga?",
      "acceptedAnswer": { "@type": "Answer", "text": "As of May 2026, average days on market in Mississauga is 18 days for semi-detached, 27 days for detached homes, and 26 days for condo apartments. Condo townhouses averaged 42 days — the slowest segment." }
    },
    {
      "@type": "Question",
      "name": "Is staging worth it when selling in Mississauga?",
      "acceptedAnswer": { "@type": "Answer", "text": "Staged homes in Mississauga consistently sell faster and for more money. Fawad Nissari includes full professional home staging — not a consultation, actual furniture and decor staging — at no cost with every listing." }
    },
    {
      "@type": "Question",
      "name": "What is Mississauga real estate commission in 2026?",
      "acceptedAnswer": { "@type": "Answer", "text": "Standard listing agent commission in Mississauga runs 2–2.5%. Fawad Nissari offers a 1% listing commission with full service included — staging, professional photography, drone video, and paid advertising across Facebook, Instagram, Google, and YouTube." }
    }
  ]
};

const marketCards = [
  { type: 'Detached', price: '$1,160,000', yoy: '▼ $24,000 vs May 2025', meta: '235 sales · 27 days avg · 98% SP/LP' },
  { type: 'Semi-Detached', price: '$865,000', yoy: '▼ $102,500 vs May 2025', meta: '73 sales · 18 days avg · 99% SP/LP' },
  { type: 'Townhouse', price: '$810,000', yoy: '▼ $60,000 vs May 2025', meta: '20 sales · 30 days avg · 98% SP/LP' },
  { type: 'Condo Townhouse', price: '$651,500', yoy: '▼ $78,500 vs May 2025', meta: '4 sales · 42 days avg · 97% SP/LP' },
  { type: 'Condo Apartment', price: '$465,000', yoy: '▼ $108,500 vs May 2025', meta: '151 sales · 26 days avg · 97% SP/LP' },
];

const includes = [
  'Full professional home staging (furniture + decor — not a consultation)',
  'Professional HDR photography, edited and MLS-ready',
  'Drone aerial photography and video',
  '4K video walkthrough',
  'Paid advertising on Facebook, Instagram, Google, and YouTube',
  'MLS, realtor.ca, HouseSigma, and all major platform listings',
  'Offer strategy and negotiation — 10+ years GTA experience',
  'Cancel anytime, no holdover clause',
  '1% listing commission',
];

const dom = [
  { t: 'Semi-Detached', d: '18 days', r: '99%', m: 'Fastest segment — priced near ask' },
  { t: 'Condo Apartment', d: '26 days', r: '97%', m: 'High volume, good liquidity' },
  { t: 'Detached', d: '27 days', r: '98%', m: 'Slight negotiating room for buyers' },
  { t: 'Townhouse', d: '30 days', r: '98%', m: 'Near asking but slower than semis' },
  { t: 'Condo Townhouse', d: '42 days', r: '97%', m: 'Slowest — very small sample (4 sales)' },
];

const faqs = [
  { q: 'Do I pay HST on top of real estate commission in Mississauga?', a: "Yes. Ontario's 13% HST applies to real estate commission. On a $1,160,000 home with total commission of 3.5% ($40,600), HST adds $5,278. Your lawyer calculates and remits this at closing — it's line-itemed on your statement of adjustments." },
  { q: "What if my Mississauga home doesn't sell?", a: "With Fawad's cancel-anytime policy, you owe nothing if your home doesn't sell and you choose to cancel. No holdover period, no commission owed on a deal that closes after you cancel. This is worth asking any agent you interview — standard listing agreements typically include a 30–90 day holdover clause." },
  { q: 'Is now a good time to sell in Mississauga?', a: "Prices are down year-over-year across all property types. If you're selling and buying in the same market, the correction affects both sides. If you're selling and not buying — or downsizing — the timing depends on your specific life situation more than the market. The right answer requires looking at your personal numbers, not a market headline." },
  { q: "What's my Mississauga home worth right now?", a: "Median prices give you a starting point, but your actual value depends on your street, finishes, lot, and recent comparable sales nearby. Book a free call below — I'll pull your specific comps and give you a real CMA, no strings attached." },
];

export default function CostOfSellingMississauga() {
  return (
    <Layout>
      <SEOHead
        title="Cost of Selling a House in Mississauga (2026 Breakdown)"
        description="Exact costs to sell your Mississauga home in 2026: commission, legal fees, staging, and more. Real TRREB data. Book a free valuation call with Fawad Nissari."
        canonicalUrl="https://fawadnissari.ca/cost-of-selling-a-house-in-mississauga"
        ogType="article"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-charcoal text-primary-foreground py-20 lg:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-accent mb-5">
            Mississauga · TRREB Data · May 2026
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            The Real Cost of Selling a House in <span className="text-accent">Mississauga</span>
          </h1>
          <p className="text-primary-foreground/70 max-w-xl mx-auto mb-9 text-base lg:text-lg">
            Commission, legal fees, staging, and every other cost — so you know exactly what you'll net before you list.
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-wider">
            <Link to="/home-evaluation">Get Your Free Home Valuation</Link>
          </Button>

          <div className="flex justify-center gap-8 md:gap-12 flex-wrap mt-10 pt-9 border-t border-charcoal-light">
            {[
              { n: '$1,160,000', l: 'Median Detached Price' },
              { n: '27 days', l: 'Avg. DOM (Detached)' },
              { n: '98%', l: 'Sale-to-List Ratio' },
              { n: '235', l: 'Detached Sales (May 2026)' },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <span className="block font-serif text-2xl lg:text-3xl text-accent">{s.n}</span>
                <span className="text-xs uppercase tracking-wider text-primary-foreground/60">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 lg:px-6">
        {/* Cost table */}
        <section className="py-16 border-b border-border">
          <h2 className="font-serif text-3xl lg:text-4xl mb-6 gold-underline inline-block pb-2">
            What Does It Cost to Sell in Mississauga?
          </h2>
          <p className="mb-6 text-foreground/90">
            On a $1,160,000 Mississauga detached home, total selling costs run between $34,000 and $65,000 — roughly 3% to 5.5% of the sale price. Here's every line item.
          </p>

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
                  ['Listing Agent Commission', "Your agent's side", '2% – 2.5% ($23,200 – $29,000)', '1% ($11,600)'],
                  ['Buyer Agent Co-op Commission', "Offered to attract the buyer's agent", '2% – 2.5% ($23,200 – $29,000)', '2% – 2.5% ($23,200 – $29,000)'],
                  ['Home Staging', 'Full furniture and decor staging', '$3,500 – $7,000', 'FREE — Included'],
                  ['Professional Photography', '', '$400 – $800', 'FREE — Included'],
                  ['Drone + 4K Video Walkthrough', '', '$500 – $1,000', 'FREE — Included'],
                  ['Paid Advertising', 'Facebook, Instagram, Google, YouTube', '$500 – $2,000', 'FREE — Included'],
                  ['Legal Fees', '', '$1,500 – $2,500', '$1,500 – $2,500'],
                  ['Mortgage Discharge / Penalty', 'Check with your lender', '$0 – $10,000+', '$0 – $10,000+'],
                  ['Pre-List Repairs', '', '$500 – $5,000', '$500 – $5,000'],
                  ['Moving Costs', '', '$1,500 – $4,000', '$1,500 – $4,000'],
                ].map(([label, note, typical, fawad], i) => (
                  <tr key={i} className={i % 2 === 1 ? 'bg-muted' : ''}>
                    <td className="p-3 border-b border-border align-top">
                      <div className="font-semibold">{label}</div>
                      {note && <div className="text-xs text-muted-foreground mt-1">{note}</div>}
                    </td>
                    <td className="p-3 border-b border-border align-top">{typical}</td>
                    <td className={`p-3 border-b border-border align-top ${String(fawad).startsWith('FREE') ? 'text-accent font-semibold' : ''}`}>{fawad}</td>
                  </tr>
                ))}
                <tr className="bg-charcoal text-primary-foreground font-bold">
                  <td className="p-4">Estimated Total (Traditional Agent)</td>
                  <td className="p-4">$54,200 – $70,300</td>
                  <td className="p-4"></td>
                </tr>
                <tr className="bg-charcoal text-primary-foreground font-bold border-t border-charcoal-light">
                  <td className="p-4">Estimated Total (With Fawad's 1% Listing)</td>
                  <td className="p-4"></td>
                  <td className="p-4 text-accent">$39,300 – $54,900</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Based on a Mississauga detached median of $1,160,000 (May 2026, TRREB). Buyer co-op at 2.5%. Mortgage penalty excluded. All amounts CAD.
          </p>

          <div className="bg-accent/10 border-l-4 border-accent p-6 mt-8">
            <p className="text-sm">
              <strong>Commission saving on a $1,160,000 Mississauga home:</strong> Dropping from 2.5% to 1% listing commission puts <strong>$17,400</strong> back in your pocket. Staging, photography, drone, video, and paid ads still included.
            </p>
          </div>
        </section>

        {/* Market data */}
        <section className="py-16 border-b border-border">
          <h2 className="font-serif text-3xl lg:text-4xl mb-6 gold-underline inline-block pb-2">
            What's Selling in Mississauga Right Now
          </h2>
          <p className="mb-8 text-foreground/90">
            May 2026 TRREB data — the most recent closed sales available.
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
            Semi-detached homes are the fastest-moving segment in Mississauga at 18 days on market. Condo apartments move quickly too — 151 sales in May alone with an average 26-day DOM. Condo townhouses are the tough sell: 42 days average and buyers negotiating 3% below asking.
          </p>
          <p className="text-foreground/90">
            Every category is down year-over-year. Sellers who present their home at its absolute best and price it accurately based on current comps — not last year's prices — are still closing at or near asking.
          </p>
        </section>

        {/* Days on market */}
        <section className="py-16 border-b border-border">
          <h2 className="font-serif text-3xl lg:text-4xl mb-6 gold-underline inline-block pb-2">
            How Long to Sell — Mississauga by Property Type
          </h2>

          <div className="overflow-x-auto -mx-4 lg:mx-0">
            <table className="w-full text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-charcoal text-primary-foreground">
                  <th className="text-left p-3 uppercase text-xs tracking-wider">Property Type</th>
                  <th className="text-left p-3 uppercase text-xs tracking-wider">Avg. DOM</th>
                  <th className="text-left p-3 uppercase text-xs tracking-wider">SP/LP</th>
                  <th className="text-left p-3 uppercase text-xs tracking-wider">Takeaway</th>
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

          <div className="bg-accent/10 border-l-4 border-accent p-6 mt-6">
            <p className="text-sm">
              <strong>Note on condo townhouse data:</strong> Only 4 condo townhouse sales in Mississauga recorded in May 2026. Use this as directional, not definitive. Your specific location and unit quality will drive the result more than the segment average in a thin market.
            </p>
          </div>
        </section>

        {/* Includes */}
        <section className="py-16 border-b border-border">
          <h2 className="font-serif text-3xl lg:text-4xl mb-6 gold-underline inline-block pb-2">
            What's Included With Every Mississauga Listing
          </h2>

          <ul className="my-6">
            {includes.map((item) => (
              <li key={item} className="py-3 border-b border-border flex items-start gap-3 text-sm">
                <span className="text-accent font-bold text-lg leading-none flex-shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="bg-charcoal text-primary-foreground p-8 lg:p-10 mt-10 text-center">
            <h3 className="font-serif text-2xl text-accent mb-3">
              How much does the 1% save you in Mississauga?
            </h3>
            <p className="text-primary-foreground/80">
              On a $1,160,000 detached: <strong className="text-primary-foreground">$17,400 saved</strong> vs. a standard 2.5% listing commission. On an $865,000 semi: <strong className="text-primary-foreground">$12,975 saved</strong>. With more marketing, not less.
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
            Get Your Free Mississauga Home Valuation
          </h2>
          <p className="mb-8 text-foreground/90">
            20 minutes. You'll know your home's value, your net proceeds, and what selling would look like in today's market. Zero pressure.
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
        <h2 className="font-serif text-3xl lg:text-4xl mb-4">Ready to Sell Your Mississauga Home?</h2>
        <p className="text-primary-foreground/70 max-w-lg mx-auto mb-8">
          Full staging, professional media, multi-platform advertising. 1% listing commission. Cancel anytime.
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