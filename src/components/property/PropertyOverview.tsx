import { motion } from 'framer-motion';
import type { Property } from '@/types/property';
import { formatPrice, statusLabel } from '@/types/property';

interface Props {
  property: Property;
}

export default function PropertyOverview({ property }: Props) {
  return (
    <section id="overview" className="px-6 md:px-12 lg:px-20 xl:px-28 py-20 md:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">Offered At</p>
                <p className="font-display text-4xl md:text-5xl text-foreground mb-6">{formatPrice(property.price)}</p>
                {property.sold_tagline && <p className="font-body text-sm text-accent mb-6 italic">{property.sold_tagline}</p>}
                <div className="border-t border-border pt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">Status</span>
                    <span className="font-body text-sm text-foreground">{statusLabel[property.status]}</span>
                  </div>
                  {property.beds && <div className="flex justify-between"><span className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">Bedrooms</span><span className="font-body text-sm text-foreground">{property.beds}</span></div>}
                  {property.baths && <div className="flex justify-between"><span className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">Bathrooms</span><span className="font-body text-sm text-foreground">{property.baths}</span></div>}
                  {property.sqft && <div className="flex justify-between"><span className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">Sqft</span><span className="font-body text-sm text-foreground">{property.sqft.toLocaleString()}</span></div>}
                  {property.lot_size && <div className="flex justify-between"><span className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">Lot Size</span><span className="font-body text-sm text-foreground">{property.lot_size}</span></div>}
                  {property.property_type && <div className="flex justify-between"><span className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">Type</span><span className="font-body text-sm text-foreground">{property.property_type}</span></div>}
                </div>
                <div className="flex gap-6 mt-8">
                  {property.brochure_url && (
                    <a href={property.brochure_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-body text-xs tracking-[0.15em] uppercase text-accent hover:text-accent/80 transition-colors">
                      Brochure
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="flex items-baseline gap-10 mb-8">
                {property.beds && <div><span className="font-display text-4xl md:text-5xl text-foreground">{property.beds}</span><span className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground ml-2">Beds</span></div>}
                {property.baths && <div><span className="font-display text-4xl md:text-5xl text-foreground">{property.baths}</span><span className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground ml-2">Baths</span></div>}
                {property.sqft && <div><span className="font-display text-4xl md:text-5xl text-foreground">{property.sqft.toLocaleString()}</span><span className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground ml-2">Sqft</span></div>}
                {property.lot_size && <div><span className="font-display text-4xl md:text-5xl text-foreground">{property.lot_size}</span><span className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground ml-2">SF Lot</span></div>}
              </div>
              {property.description && <div className="font-display text-xl md:text-2xl leading-relaxed text-foreground/80 max-w-2xl">{property.description}</div>}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
