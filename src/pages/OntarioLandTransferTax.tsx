import { useMemo, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const CANONICAL = 'https://fawadnissari.ca/ontario-land-transfer-tax-guide';

const faqs = [
  {
    q: 'How much is land transfer tax in Ontario in 2025?',
    a: 'Ontario land transfer tax is charged on a sliding scale: 0.5% on the first $55,000, 1% from $55,000 to $250,000, 1.5% from $250,000 to $400,000, 2% from $400,000 to $2,000,000, and 2.5% on the portion above $2,000,000 for one- and two-family residences. On an $1,100,000 GTA home that works out to $19,475.',
  },
  {
    q: 'Do I pay double land transfer tax in the GTA?',
    a: 'Only inside the City of Toronto. Toronto charges a Municipal Land Transfer Tax on top of the provincial tax, using the same brackets — effectively doubling the bill. Milton, Mississauga, Oakville, Burlington, Brampton, and Hamilton pay the provincial tax only.',
  },
  {
    q: 'How much is the first-time home buyer land transfer tax rebate?',
    a: 'First-time buyers can claim up to $4,000 back on the Ontario land transfer tax, which fully covers a purchase price up to $368,333. In Toronto, first-time buyers can also claim up to $4,475 back on the municipal tax.',
  },
  {
    q: 'Who pays land transfer tax — the buyer or the seller?',
    a: 'The buyer pays land transfer tax. It is due in full on closing day and cannot be added to your mortgage, so it must come out of your cash-to-close along with legal fees and adjustments.',
  },
  {
    q: 'When is Ontario land transfer tax paid?',
    a: 'On closing. Your real estate lawyer collects it as part of the closing funds and remits it when the transfer is registered electronically.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const brackets = [
  { range: 'Up to $55,000', rate: '0.5%' },
  { range: '$55,000 to $250,000', rate: '1.0%' },
  { range: '$250,000 to $400,000', rate: '1.5%' },
  { range: '$400,000 to $2,000,000', rate: '2.0%' },
  { range: 'Over $2,000,000 (1–2 family residence)', rate: '2.5%' },
];

function ontarioLtt(price: number) {
  let tax = 0;
  const tiers: Array<[number, number]> = [
    [55000, 0.005],
    [250000, 0.01],
    [400000, 0.015],
    [2000000, 0.02],
    [Infinity, 0.025],
  ];
  let previous = 0;
  for (const [cap, rate] of tiers) {
    if (price <= previous) break;
    tax += (Math.min(price, cap) - previous) * rate;
    previous = cap;
  }
  return Math.max(0, Math.round(tax));
}

const money = (n: number) => `$${n.toLocaleString('en-CA')}`;

export default function OntarioLandTransferTax() {
  const [priceInput, setPriceInput] = useState('1100000');
  const [firstTimeBuyer, setFirstTimeBuyer] = useState(false);
  const [inToronto, setInToronto] = useState(false);

  const price = Number(priceInput.replace(/[^0-9]/g, '')) || 0;

  const result = useMemo(() => {
    const provincial = ontarioLtt(price);
    const municipal = inToronto ? ontarioLtt(price) : 0;
    const provincialRebate = firstTimeBuyer ? Math.min(4000, provincial) : 0;
    const municipalRebate = firstTimeBuyer && inToronto ? Math.min(4475, municipal) : 0;
    const total = provincial + municipal - provincialRebate - municipalRebate;
    return { provincial, municipal, provincialRebate, municipalRebate, total };
  }, [price, firstTimeBuyer, inToronto]);

  return (
    <Layout>
      <SEOHead
        title="Ontario Land Transfer Tax Rates 2025 + Calculator"
        description="Ontario land transfer tax rates for 2025, a free calculator, Toronto's double tax explained, and the first-time home buyer rebate — from GTA advisor Fawad Nissari."
        canonicalUrl={CANONICAL}
        ogType="article"
        jsonLd={faqSchema}
      />

      <section className="bg-charcoal text-primary-foreground py-20 lg:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-accent mb-5">
            Ontario · Closing Costs · 2025 Rates
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Ontario Land Transfer Tax <span className="text-accent">Rates &amp; Calculator</span>
          </h1>
          <p className="text-primary-foreground/70 max-w-xl mx-auto mb-9 text-base lg:text-lg">
            The full 2025 bracket table, what changes inside Toronto, and exactly how much of it a
            first-time buyer gets back. Run your own number below.
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-wider">
            <Link to="/home-evaluation">Get a Free Home Evaluation</Link>
          </Button>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 lg:px-6">
        {/* Calculator */}
        <section className="py-16 border-b border-border">
          <h2 className="font-serif text-3xl lg:text-4xl mb-6 gold-underline inline-block pb-2">
            Land Transfer Tax Calculator
          </h2>
          <div className="rounded-xl border border-border p-6 bg-card">
            <label className="block text-sm font-medium mb-2" htmlFor="ltt-price">
              Purchase price
            </label>
            <Input
              id="ltt-price"
              inputMode="numeric"
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
              className="mb-5"
            />
            <div className="flex flex-col gap-3 mb-6">
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-current"
                  checked={firstTimeBuyer}
                  onChange={(e) => setFirstTimeBuyer(e.target.checked)}
                />
                I am a first-time home buyer
              </label>
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-current"
                  checked={inToronto}
                  onChange={(e) => setInToronto(e.target.checked)}
                />
                Property is inside the City of Toronto
              </label>
            </div>

            <dl className="space-y-2 text-sm border-t border-border pt-5">
              <div className="flex justify-between">
                <dt>Ontario land transfer tax</dt>
                <dd>{money(result.provincial)}</dd>
              </div>
              {inToronto && (
                <div className="flex justify-between">
                  <dt>Toronto municipal land transfer tax</dt>
                  <dd>{money(result.municipal)}</dd>
                </div>
              )}
              {result.provincialRebate > 0 && (
                <div className="flex justify-between">
                  <dt>First-time buyer rebate (provincial)</dt>
                  <dd>−{money(result.provincialRebate)}</dd>
                </div>
              )}
              {result.municipalRebate > 0 && (
                <div className="flex justify-between">
                  <dt>First-time buyer rebate (Toronto)</dt>
                  <dd>−{money(result.municipalRebate)}</dd>
                </div>
              )}
              <div className="flex justify-between font-serif text-2xl pt-3 border-t border-border">
                <dt>Total due on closing</dt>
                <dd className="text-accent">{money(result.total)}</dd>
              </div>
            </dl>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Estimates only, based on published 2025 Ontario and City of Toronto rates. Confirm final
            figures with your real estate lawyer.
          </p>
        </section>

        {/* Rate table */}
        <section className="py-16 border-b border-border">
          <h2 className="font-serif text-3xl lg:text-4xl mb-6 gold-underline inline-block pb-2">
            2025 Ontario Land Transfer Tax Rates
          </h2>
          <p className="mb-6 text-foreground/90">
            Ontario charges land transfer tax on a marginal, bracketed basis — each portion of the
            price is taxed at its own rate, not the whole price at the top rate.
          </p>
          <div className="overflow-x-auto -mx-4 lg:mx-0">
            <table className="w-full text-sm border-collapse min-w-[420px]">
              <thead>
                <tr className="bg-charcoal text-primary-foreground">
                  <th className="text-left p-3 uppercase text-xs tracking-wider">Portion of purchase price</th>
                  <th className="text-left p-3 uppercase text-xs tracking-wider">Rate</th>
                </tr>
              </thead>
              <tbody>
                {brackets.map((b) => (
                  <tr key={b.range} className="border-b border-border">
                    <td className="p-3">{b.range}</td>
                    <td className="p-3 font-medium">{b.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Toronto vs GTA */}
        <section className="py-16 border-b border-border">
          <h2 className="font-serif text-3xl lg:text-4xl mb-6 gold-underline inline-block pb-2">
            Toronto vs. the Rest of the GTA
          </h2>
          <p className="mb-4 text-foreground/90">
            Buy inside the City of Toronto and you pay the tax twice — once to the province and once
            to the city, using the same bracket table. On an $1,100,000 home that is {money(ontarioLtt(1100000))} provincially
            and another {money(ontarioLtt(1100000))} municipally, for {money(ontarioLtt(1100000) * 2)} total.
          </p>
          <p className="mb-4 text-foreground/90">
            Buy in Milton, Mississauga, Oakville, Burlington, Brampton, or Hamilton and you pay the
            provincial tax only. For many buyers that single line item is worth roughly {money(ontarioLtt(1100000))} —
            often more than the difference in list price between two comparable homes on either side
            of the city line.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Button asChild variant="outline">
              <Link to="/areas/milton">Milton market</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/areas/mississauga">Mississauga market</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/buyer-guide">Free buyer guide</Link>
            </Button>
          </div>
        </section>

        {/* First-time buyer rebate */}
        <section className="py-16 border-b border-border">
          <h2 className="font-serif text-3xl lg:text-4xl mb-6 gold-underline inline-block pb-2">
            First-Time Home Buyer Rebate
          </h2>
          <ul className="space-y-3 text-foreground/90 list-disc pl-5">
            <li>Up to <strong>$4,000</strong> back on the provincial tax — a full refund on prices up to $368,333.</li>
            <li>Up to <strong>$4,475</strong> back on the Toronto municipal tax if the home is inside the city.</li>
            <li>You must be 18 or older, occupy the home as your principal residence within nine months, and never have owned a home anywhere in the world.</li>
            <li>If your spouse owned a home while you were married, you do not qualify.</li>
            <li>Your lawyer normally claims it electronically at registration, so it reduces your cash-to-close instead of arriving as a cheque later.</li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <h2 className="font-serif text-3xl lg:text-4xl mb-8 gold-underline inline-block pb-2">
            Land Transfer Tax FAQ
          </h2>
          <div className="space-y-8">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-serif text-xl mb-2">{f.q}</h3>
                <p className="text-foreground/90">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-xl bg-charcoal text-primary-foreground p-8 text-center">
            <h2 className="font-serif text-2xl lg:text-3xl mb-3">Planning a move in the GTA?</h2>
            <p className="text-primary-foreground/70 mb-6">
              Get a clear, no-obligation picture of what you'll net or what you'll need at closing.
            </p>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-wider">
              <Link to="/home-evaluation">Get Your Free Evaluation</Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
