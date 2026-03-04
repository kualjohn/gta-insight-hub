import { motion } from 'framer-motion';
import type { Property } from '@/types/property';
import { statusLabel, formatPrice } from '@/types/property';

interface Props {
  property: Property;
  index: number;
}

export default function PortfolioCard({ property, index }: Props) {
  const image = property.thumbnail_image || property.hero_image || '/placeholder.svg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <a
        href={`/portfolio/${property.slug}`}
        className="group block relative overflow-hidden"
      >
        <div className="relative bg-charcoal rounded-sm overflow-hidden shadow-xl">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={image}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-charcoal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground">
                View Property →
              </span>
            </div>
            <div className="absolute top-4 left-4">
              <span className="bg-accent px-3 py-1 font-body text-[10px] tracking-[0.15em] uppercase text-accent-foreground font-bold">
                {statusLabel[property.status]}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-charcoal/80 to-transparent">
              <h3 className="font-display text-lg text-primary-foreground mb-1">
                {property.title}
              </h3>
              <p className="font-body text-xs tracking-[0.1em] uppercase text-primary-foreground/70">
                {property.city}
              </p>
              {property.price && (
                <p className="font-display text-lg text-primary-foreground mt-1">
                  {formatPrice(property.price)}
                </p>
              )}
            </div>
          </div>
          <div className="h-2 bg-charcoal-light" />
        </div>
      </a>
    </motion.div>
  );
}
