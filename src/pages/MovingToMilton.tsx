import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Train, Car, Wallet, GraduationCap, MapPin, Phone } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { MILTON_PRICES_BY_TYPE, MILTON_MARKET_PERIOD, MILTON_MARKET_SOURCE } from '@/data/miltonMarket';

const CALENDLY_URL = 'https://calendly.com/fawadnissari';

const commute = [
  {
    icon: Train,
    label: 'GO Train',
    title: 'Milton GO to Union Station',
    body:
      'The Milton GO line runs weekday rush-hour service into Union Station in roughly 55–60 minutes. Trains leave from Milton GO on Thompson Road South, with a second stop at Lisgar in Mississauga. Parking is free but fills early, so most commuters arrive before 7:00 a.m. or use the local bus connections.',
  },
  {
    icon: Car,
    label: 'Highways',
    title: '401, 407 ETR and the QEW',
    body:
      'Milton sits right at Highways 401 and 25, with the 407 ETR minutes south. Downtown Toronto is about 50 minutes off-peak and 75–90 minutes in rush hour. Mississauga is 20–25 minutes, Oakville and Burlington roughly 25 minutes, and Pearson Airport about 30 minutes.',
  },
  {
    icon: MapPin,
    label: 'Day to day',
    title: 'What living here actually feels like',
    body:
      'Milton is one of the fastest-growing towns in Canada, but it still runs on small-town rhythms: hockey arenas, farmers markets on Saturday, the Niagara Escarpment and Kelso Conservation Area ten minutes from most driveways. Newer neighbourhoods are walkable and family-heavy; Old Milton keeps the historic main-street feel.',
  },
];

const costOfLiving = [
  { label: 'Property tax rate', value: '≈ 0.70%', note: 'Town of Milton + Halton Region + education portion' },
  { label: 'Typical detached utilities', value: '$250–$350 / mo', note: 'Hydro, gas, water for a 2,000+ sq ft home' },
  { label: 'Halton Region water & wastewater', value: '$90–$130 / mo', note: 'Billed through the region' },
  { label: 'Monthly GO pass to Union', value: '≈ $290', note: 'Presto monthly cap, Milton GO to Union' },
  { label: 'Home insurance', value: '$120–$180 / mo', note: 'Detached, replacement-cost coverage' },
  { label: 'Childcare (full-time toddler)', value: '$1,100–$1,500 / mo', note: 'Varies by centre and CWELCC participation' },
];

const newcomerNeighbourhoods = [
  {
    name: 'Hawthorne Village (Beaty)',
    slug: 'beaty',
    why: 'Established family area with schools, parks and plazas inside the neighbourhood. Strong resale, good mix of towns and detached.',
  },
  {
    name: 'Harrison',
    slug: 'harrison',
    why: 'Popular with young families relocating from Mississauga and Toronto. Wide streets, newer builds, quick 401 access.',
  },
  {
    name: 'Ford',
    slug: 'ford',
    why: 'One of the newest communities — modern layouts, newer schools, and the best value per square foot in town right now.',
  },
  {
    name: 'Scott',
    slug: 'scott',
    why: 'Escarpment views, quiet crescents and larger lots. A favourite for buyers moving up from a condo or townhouse.',
  },
  {
    name: 'Willmott',
    slug: 'willmott',
    why: 'Central, walkable and close to the Milton Sports Centre. Good balance of price and commute time to the GO station.',
  },
  {
    name: 'Old Milton',
    slug: 'old-milton',
    why: 'Character homes, mature trees and Main Street. Ideal if you want the historic town feel rather than a new subdivision.',
  },
];

const faqs = [
  {
    q: 'Is Milton a good place to live?',
    a: 'Yes — Milton consistently ranks among the safest and fastest-growing communities in Canada. It offers newer housing stock, a young family-heavy population, strong schools, and direct access to the Niagara Escarpment, while staying within commuting distance of Toronto. The main trade-offs are rush-hour traffic on the 401 and limited weekend GO train service.',
  },
  {
    q: 'How far is Milton from Toronto?',
    a: 'Milton is roughly 50 km west of downtown Toronto. Driving takes about 50 minutes off-peak and 75–90 minutes during rush hour. The Milton GO train reaches Union Station in about 55–60 minutes, with weekday peak-hour service only.',
  },
  {
    q: 'What school boards serve Milton?',
    a: 'Milton is served by the Halton District School Board (public) and the Halton Catholic District School Board (Catholic), plus French-language options through Conseil scolaire Viamonde and Conseil scolaire catholique MonAvenir. Milton is also home to the Wilfrid Laurier University Milton campus.',
  },
  {
    q: 'Is Milton family friendly?',
    a: 'Very. Milton has one of the youngest median ages in the Greater Toronto Area, with a high share of households with children. Neighbourhoods are built around schools, parks, splash pads and community centres, and the Milton Sports Centre and Kelso Conservation Area anchor year-round family activity.',
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

export default function MovingToMilton() {
  return (
    <Layout>
      <Helmet defer={false}>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-warm section-padding py-16 lg:py-20">
        <div className="container-wide mx-auto">
          <span className="brand-label text-accent inline-flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4" />
            Relocation Guide · Milton, Ontario
          </span>
          <h1 className="font-serif text-4xl lg:text-6xl mb-5 max-w-4xl">
            Moving to Milton, Ontario
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Everything a newcomer needs before the move: what the commute to Toronto really looks like,
            what it costs to live here, which neighbourhoods suit families arriving from out of town,
            how the schools work, and what homes are actually selling for right now.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button variant="gold" size="lg" asChild>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" />
                Book a Free Relocation Call
              </a>
            </Button>
            <Button variant="outline-gold" size="lg" asChild>
              <Link to="/areas/milton">Explore Milton Neighbourhoods</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Living in Milton */}
      <SectionWrapper>
        <h2 className="font-serif text-3xl lg:text-4xl mb-3 gold-underline inline-block pb-2">
          What it's actually like living in Milton
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {commute.map((c) => (
            <div key={c.title} className="bg-card border border-border rounded-xl p-6">
              <c.icon className="w-6 h-6 text-accent mb-4" />
              <p className="brand-label text-accent mb-2">{c.label}</p>
              <h3 className="font-serif text-xl mb-3">{c.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Cost of living */}
      <SectionWrapper variant="muted">
        <span className="brand-label text-accent inline-flex items-center gap-2 mb-3">
          <Wallet className="w-4 h-4" />
          Cost of living
        </span>
        <h2 className="font-serif text-3xl lg:text-4xl mb-3 gold-underline inline-block pb-2">
          What it costs to live in Milton
        </h2>
        <p className="text-muted-foreground max-w-3xl mt-4">
          Outside of the mortgage, these are the recurring numbers most families relocating to Milton
          budget for. Figures are typical ranges for a detached home — townhouse and condo costs run lower.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {costOfLiving.map((c) => (
            <div key={c.label} className="bg-card border border-border rounded-xl p-5">
              <p className="brand-label text-muted-foreground mb-2">{c.label}</p>
              <p className="font-serif text-2xl mb-1">{c.value}</p>
              <p className="text-sm text-muted-foreground">{c.note}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Prices by type */}
      <SectionWrapper>
        <h2 className="font-serif text-3xl lg:text-4xl mb-3 gold-underline inline-block pb-2">
          Average Milton home prices by type
        </h2>
        <p className="text-muted-foreground max-w-3xl mt-4">
          {MILTON_MARKET_PERIOD} averages, same {MILTON_MARKET_SOURCE} data used across every market page on this site.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {MILTON_PRICES_BY_TYPE.map((p) => (
            <div key={p.type} className="bg-card border border-border rounded-xl p-6">
              <p className="brand-label text-accent mb-2">{p.type}</p>
              <p className="font-serif text-3xl mb-1">{p.price}</p>
              <p className="text-sm text-muted-foreground">{p.yoy}</p>
              <p className="text-sm text-muted-foreground mt-2">{p.meta}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-6">
          Source: {MILTON_MARKET_SOURCE}, {MILTON_MARKET_PERIOD}.{' '}
          <Link to="/cost-of-selling-a-house-in-milton" className="text-primary hover:underline">
            See the full Milton market and selling-cost breakdown
          </Link>
          .
        </p>
      </SectionWrapper>

      {/* Neighbourhoods */}
      <SectionWrapper variant="muted">
        <h2 className="font-serif text-3xl lg:text-4xl mb-3 gold-underline inline-block pb-2">
          Best Milton neighbourhoods for newcomers
        </h2>
        <div className="grid md:grid-cols-2 gap-4 mt-10">
          {newcomerNeighbourhoods.map((n) => (
            <Link
              key={n.slug}
              to={`/areas/milton/${n.slug}`}
              className="block bg-card border border-border rounded-xl p-6 hover-lift"
            >
              <h3 className="font-serif text-xl mb-2">{n.name}</h3>
              <p className="text-muted-foreground text-sm">{n.why}</p>
              <span className="brand-label text-primary mt-4 inline-block">View neighbourhood →</span>
            </Link>
          ))}
        </div>
        <Link to="/areas/milton" className="brand-label text-primary mt-8 inline-block hover:underline">
          All Milton neighbourhoods →
        </Link>
      </SectionWrapper>

      {/* Schools */}
      <SectionWrapper>
        <span className="brand-label text-accent inline-flex items-center gap-2 mb-3">
          <GraduationCap className="w-4 h-4" />
          Schools
        </span>
        <h2 className="font-serif text-3xl lg:text-4xl mb-3 gold-underline inline-block pb-2">
          Schools and school boards in Milton
        </h2>
        <div className="max-w-3xl mt-6 space-y-4 text-muted-foreground">
          <p>
            Milton is served by two English boards — the <strong className="text-foreground">Halton District School Board</strong>{' '}
            (public) and the <strong className="text-foreground">Halton Catholic District School Board</strong> — plus
            French-language options through Conseil scolaire Viamonde and Conseil scolaire catholique MonAvenir.
            Halton schools regularly rank among Ontario's strongest, which is a major reason families relocate here.
          </p>
          <p>
            Boundaries matter: two homes on opposite sides of the same street can feed into different schools, and
            newer communities sometimes bus students to an older school until the local one opens. Always confirm the
            catchment before you make an offer.
          </p>
        </div>
        <Link
          to="/blog/The-Best-Schools-in-Milton--A-Guide-for-Home-Buyers-with-Kids"
          className="brand-label text-primary mt-6 inline-block hover:underline"
        >
          Read the full Milton schools guide →
        </Link>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper variant="muted">
        <h2 className="font-serif text-3xl lg:text-4xl mb-3 gold-underline inline-block pb-2">
          Moving to Milton — FAQ
        </h2>
        <Accordion type="single" collapsible className="max-w-3xl mt-10">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left font-serif text-lg">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="max-w-3xl mt-8 text-sm text-muted-foreground space-y-2">
          <p>
            More reading:{' '}
            <Link
              to="/blog/Is-Milton-a-Good-Area-to-Live--A-Comprehensive-Milton-Real-Estate-Guide"
              className="text-primary hover:underline"
            >
              Is Milton a Good Area to Live?
            </Link>{' '}
            ·{' '}
            <Link
              to="/blog/Pros-and-Cons-of-Living-in-Milton-Is-It-the-Right-Place-for-You-"
              className="text-primary hover:underline"
            >
              Pros and Cons of Living in Milton
            </Link>{' '}
            ·{' '}
            <Link
              to="/blog/What-s-the-Cost-of-Living-in-Milton--A-Breakdown-for-2025-Home-Buyers"
              className="text-primary hover:underline"
            >
              Cost of Living in Milton
            </Link>
          </p>
        </div>
      </SectionWrapper>

      {/* Calendly CTA */}
      <SectionWrapper>
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl lg:text-4xl mb-3 gold-underline inline-block pb-2">
            Book a free relocation call
          </h2>
          <p className="text-muted-foreground mt-4">
            Moving from out of town? Pick a time and we'll walk through neighbourhoods, school catchments,
            commute options and realistic budgets — no obligation.
          </p>
        </div>
        <div className="mt-8 rounded-xl overflow-hidden border border-border bg-card">
          <iframe
            src={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=0A0A0A&text_color=FFFFFF&primary_color=FF2E12`}
            title="Book a free consultation call with Fawad Nissari"
            width="100%"
            height="700"
            loading="lazy"
            frameBorder="0"
          />
        </div>
        <div className="mt-6">
          <Button variant="gold" size="lg" asChild>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <Phone className="w-5 h-5" />
              Open Calendly in a new tab
            </a>
          </Button>
        </div>
      </SectionWrapper>
    </Layout>
  );
}
