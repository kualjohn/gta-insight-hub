import { motion } from 'framer-motion';
import { Play, CalendarDays } from 'lucide-react';
import type { Property } from '@/types/property';
import { formatPrice, statusLabel } from '@/types/property';

interface Props {
  property: Property;
}

export default function PropertyHero({ property }: Props) {
  const bgImage = property.hero_image || '/placeholder.svg';

  return (
    <section
      className="relative min-h-screen w-full flex items-end overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-charcoal/40" />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute top-28 left-6 md:left-12 lg:left-20 xl:left-28"
      >
        <span className="inline-block bg-accent px-4 py-1.5 font-body text-xs tracking-[0.15em] uppercase text-accent-foreground font-bold">
          {statusLabel[property.status]}
        </span>
      </motion.div>
      <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-28 pt-40 pb-16 md:pb-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
        >
          {property.tagline && (
            <p className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/70 mb-3">{property.tagline}</p>
          )}
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-primary-foreground font-medium leading-tight mb-2 break-words">{property.title}</h1>
          <p className="font-body text-sm md:text-base tracking-[0.15em] uppercase text-primary-foreground/70 mb-6">{property.city}</p>
          <p className="font-display text-2xl sm:text-3xl md:text-4xl text-primary-foreground font-light mb-8">{formatPrice(property.price)}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-8 mb-10">
            {property.beds && (
              <div className="text-primary-foreground">
                <span className="font-display text-2xl sm:text-3xl md:text-4xl">{property.beds}</span>
                <span className="font-body text-xs tracking-[0.15em] uppercase ml-2 text-primary-foreground/70">Beds</span>
              </div>
            )}
            {property.baths && (
              <div className="text-primary-foreground">
                <span className="font-display text-2xl sm:text-3xl md:text-4xl">{property.baths}</span>
                <span className="font-body text-xs tracking-[0.15em] uppercase ml-2 text-primary-foreground/70">Baths</span>
              </div>
            )}
            {property.sqft && (
              <div className="text-primary-foreground">
                <span className="font-display text-2xl sm:text-3xl md:text-4xl">{property.sqft.toLocaleString()}</span>
                <span className="font-body text-xs tracking-[0.15em] uppercase ml-2 text-primary-foreground/70">Sqft</span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {property.video_url && (
              <a href={property.video_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-body text-xs tracking-[0.2em] uppercase text-primary-foreground hover:text-accent transition-colors">
                <div className="w-12 h-12 rounded-full border border-primary-foreground/40 flex items-center justify-center hover:border-accent transition-colors">
                  <Play className="w-4 h-4 ml-0.5" />
                </div>
                Play Video
              </a>
            )}
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="flex items-center gap-3 font-body text-xs tracking-[0.2em] uppercase text-primary-foreground hover:text-accent transition-colors">
              <div className="w-12 h-12 rounded-full border border-primary-foreground/40 flex items-center justify-center hover:border-accent transition-colors">
                <CalendarDays className="w-4 h-4" />
              </div>
              Schedule a Tour
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
