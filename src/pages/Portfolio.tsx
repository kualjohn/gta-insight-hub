import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, TrendingUp, Film, Megaphone, Handshake, Home, Calculator } from 'lucide-react';
import { useProperties } from '@/hooks/useProperties';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

// Marketing result lines per property (keyed by slug).
// These are the highest-priority conversion lines on the page.
const RESULT_LINES: Record<string, string> = {
  '1185-the-queensway208': '25,000+ buyer views generated in days',
  '808-krosno-blvd': 'Sold in 24 hours • 50,000+ views in 2 days',
  '1400-duval-drive': 'Sold in 4 days • 25,000+ buyer views',
  '212-shadow-place': '87 showings • 4 offers • 80,000+ ad views • Sold in 3 weeks',
  '1060-st-hildas-way': '43 showings • 5 offers • Sold in 2 weeks while identical units sat 60+ days',
  '77-clarke-st-n': 'Sold for 95% of asking price',
  '183-featherstone-rd': 'Sat 3 months with another agent • Sold in 4 weeks at 98% of asking',
  '1160-middlebury-ave': '50,000+ views • Sold in 2 weeks at 98% of asking',
  '271-andrews-trail': 'Listed at $999K • Sold at $1.1M — $101,000 over asking',
  '691-ormond-drive': 'Sold at full asking — multiple-offer night with families competing',
  '1593-leblanc-court': 'Sold $155,000 over asking — record price, highest ever on the street',
  '1564-somergrove-cres': 'Sold for full asking in the heart of Brock Ridge',
  '29-napoleon-dr': 'Sold $182,500 over asking — Stoney Creek family home',
  '2-mark-street': 'Sold for the record price — $1,180,000 in Aurora Village',
  '8-sand-wedge-lane': 'Sold at the record price — highest ever on the street',
  '1067-blueheron-blvd': 'Highest sale on the street — $1,805,000 in East Credit',
};

export default function Portfolio() {
  const { data: properties, isLoading } = useProperties();
  const [filterCity, setFilterCity] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');

  const cities = [...new Set(properties?.map(p => p.city).filter(Boolean) || [])];
  const types = [...new Set(properties?.map(p => p.property_type).filter(Boolean) || [])];

  const filtered = (properties || []).filter(p => {
    if (filterCity && p.city !== filterCity) return false;
    if (filterStatus && p.status !== filterStatus) return false;
    if (filterType && p.property_type !== filterType) return false;
    return true;
  });

  const selectClass =
    "bg-transparent border-b border-border/60 pb-2 pr-6 font-body text-xs tracking-[0.2em] uppercase text-foreground/80 focus:outline-none focus:border-accent transition-colors cursor-pointer";

  // Insert an inline seller CTA roughly mid-way through the grid
  const midpoint = filtered.length >= 4 ? Math.ceil(filtered.length / 2) : -1;

  return (
    <Layout>
      {/* HERO / HEADING */}
      <section className="relative px-6 md:px-12 lg:px-20 xl:px-28 pt-24 md:pt-36 pb-12 md:pb-16 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-accent" />
            <span className="font-body text-[11px] tracking-[0.3em] uppercase text-accent font-semibold">
              Portfolio
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-[1.05]">
            Homes We’ve Sold
            <span className="block text-accent italic font-normal">&amp; Marketed</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            From cinematic video and staging to targeted ads and massive buyer exposure,
            this is how we help listings stand out and sell.
          </p>
        </motion.div>
      </section>

      {/* STATS BAR — Social proof up front */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-12 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border-y border-border/60 py-8 md:py-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {[
            { stat: '100,000', label: 'Guaranteed Buyer Views Online' },
            { stat: '24 hrs', label: 'Listing Agreement — No Lock-In' },
            { stat: 'From 1%', label: 'Commission' },
            { stat: 'Free', label: 'Professional Staging' },
          ].map((item, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="font-display text-3xl md:text-4xl lg:text-5xl text-accent mb-2">
                {item.stat}
              </div>
              <div className="font-body text-[11px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* BRIDGE LINE */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-12 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border-t border-border/60 pt-10 md:pt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <p className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight max-w-2xl">
            Most homes get listed.
            <span className="block text-accent italic">Ours get launched.</span>
          </p>

          {/* Filters */}
          {properties && properties.length > 1 && (
            <div className="flex flex-wrap gap-6 md:gap-8">
              {cities.length > 1 && (
                <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className={selectClass}>
                  <option value="">All Cities</option>
                  {cities.map(c => <option key={c} value={c!}>{c}</option>)}
                </select>
              )}
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className={selectClass}>
                <option value="">All Status</option>
                <option value="for_sale">For Sale</option>
                <option value="sold">Sold</option>
                <option value="coming_soon">Coming Soon</option>
                <option value="leased">Leased</option>
              </select>
              {types.length > 1 && (
                <select value={filterType} onChange={e => setFilterType(e.target.value)} className={selectClass}>
                  <option value="">All Types</option>
                  {types.map(t => <option key={t} value={t!}>{t}</option>)}
                </select>
              )}
            </div>
          )}
        </motion.div>
      </section>

      {/* GRID */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-24 md:pb-32">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-[3/4] bg-secondary/60 animate-pulse rounded-sm" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {filtered.slice(0, midpoint > 0 ? midpoint : filtered.length).map((p, i) => (
                <PortfolioCard
                  key={p.id}
                  property={p}
                  index={i}
                  resultLine={RESULT_LINES[p.slug]}
                />
              ))}
            </div>

            {/* INLINE SELLER CTA — catches scrollers mid-page */}
            {midpoint > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="my-16 md:my-20 border-y border-accent/30 py-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
              >
                <div className="max-w-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <Calculator className="w-4 h-4 text-accent" />
                    <span className="font-body text-[11px] tracking-[0.3em] uppercase text-accent font-semibold">
                      Curious?
                    </span>
                  </div>
                  <p className="font-display text-2xl md:text-3xl text-foreground leading-tight">
                    What could <span className="text-accent italic">your home</span> sell for?
                  </p>
                  <p className="font-body text-sm md:text-base text-muted-foreground mt-2">
                    Get a free, no-obligation home evaluation from our team.
                  </p>
                </div>
                <Button variant="gold" size="lg" asChild className="shrink-0">
                  <Link to="/home-evaluation">
                    <Home className="w-4 h-4" />
                    Get My Home Valuation
                  </Link>
                </Button>
              </motion.div>
            )}

            {midpoint > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {filtered.slice(midpoint).map((p, i) => (
                  <PortfolioCard
                    key={p.id}
                    property={p}
                    index={midpoint + i}
                    resultLine={RESULT_LINES[p.slug]}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="font-body text-muted-foreground">No properties found.</p>
          </div>
        )}
      </section>

      {/* THE DIFFERENCE — Why these results happen */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-accent" />
            <span className="font-body text-[11px] tracking-[0.3em] uppercase text-accent font-semibold">
              Why These Results Happen
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
            Our team's <span className="text-accent italic">difference</span>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {[
            {
              icon: Film,
              title: 'Cinematic Marketing',
              body: 'Pro video, photography and staging that make every listing stop the scroll — the same treatment behind every record sale on this page.',
            },
            {
              icon: Megaphone,
              title: 'Maximum Exposure',
              body: '50,000+ targeted buyer views per listing through paid social, YouTube and our agent network — not just MLS and hope.',
            },
            {
              icon: Handshake,
              title: 'Negotiation That Wins',
              body: 'Multiple-offer strategy designed to push price, not just close fast. The reason listings here go over asking and break street records.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border-t border-border/60 pt-8"
            >
              <item.icon className="w-6 h-6 text-accent mb-5" />
              <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">
                {item.title}
              </h3>
              <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA BLOCK */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-charcoal overflow-hidden rounded-sm"
        >
          {/* Subtle gold accent lines */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />

          <div className="relative px-8 md:px-16 lg:px-20 py-16 md:py-24 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-px bg-accent" />
              <span className="font-body text-[11px] tracking-[0.3em] uppercase text-accent font-semibold">
                Be The Next Success Story
              </span>
              <span className="w-8 h-px bg-accent" />
            </div>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-6 max-w-3xl mx-auto">
              Ready to be the next <span className="italic text-accent">record sale?</span>
            </h2>
            <p className="font-body text-base md:text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Two ways to get started — pick the one that fits where you are right now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="gold" size="xl" asChild>
                <Link to="/home-evaluation">
                  <TrendingUp className="w-4 h-4" />
                  Free Home Evaluation
                </Link>
              </Button>
              <Button
                variant="outline"
                size="xl"
                asChild
                className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-charcoal"
              >
                <Link to="/contact">
                  <Phone className="w-4 h-4" />
                  Book a Strategy Call
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
