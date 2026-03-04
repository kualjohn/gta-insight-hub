import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProperties } from '@/hooks/useProperties';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import { Layout } from '@/components/layout/Layout';

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

  const selectClass = "bg-transparent border-b border-border py-2 font-body text-sm text-foreground focus:outline-none focus:border-accent";

  return (
    <Layout>
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-20 md:py-32">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
          <h1 className="font-display text-5xl md:text-7xl text-foreground mb-4">Portfolio</h1>
          <p className="font-body text-lg text-muted-foreground">A selection of our recent property projects.</p>
        </motion.div>
      </section>

      {properties && properties.length > 0 && (
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-8">
          <div className="flex flex-wrap gap-4">
            {cities.length > 1 && (
              <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className={selectClass}>
                <option value="">All Cities</option>
                {cities.map(c => <option key={c} value={c!}>{c}</option>)}
              </select>
            )}
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className={selectClass}>
              <option value="">All Statuses</option>
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
        </section>
      )}

      <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-20 md:pb-32">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <div key={i} className="aspect-[16/10] bg-secondary animate-pulse" />)}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p, i) => <PortfolioCard key={p.id} property={p} index={i} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-body text-muted-foreground">No properties found.</p>
          </div>
        )}
      </section>
    </Layout>
  );
}
