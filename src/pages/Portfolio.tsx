import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filtered.map((p, i) => (
              <PortfolioCard
                key={p.id}
                property={p}
                index={i}
                resultLine={RESULT_LINES[p.slug]}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-body text-muted-foreground">No properties found.</p>
          </div>
        )}
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
                Let’s Work Together
              </span>
              <span className="w-8 h-px bg-accent" />
            </div>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-6 max-w-3xl mx-auto">
              Thinking about selling your home?
            </h2>
            <p className="font-body text-base md:text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Let’s build a strategy to get you the same kind of exposure and results.
            </p>
            <Button variant="gold" size="xl" asChild>
              <Link to="/contact">
                <Phone className="w-4 h-4" />
                Book a Call
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
