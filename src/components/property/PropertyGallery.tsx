import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';

interface Props {
  images: string[];
}

const VISIBLE_COUNT = 8;

export default function PropertyGallery({ images }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  if (images.length === 0) return null;

  const visibleImages = images.slice(0, VISIBLE_COUNT);
  const remainingCount = images.length - VISIBLE_COUNT;

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox(i => (i !== null ? (i - 1 + images.length) % images.length : null));
  const next = () => setLightbox(i => (i !== null ? (i + 1) % images.length : null));

  const getSpan = (i: number) => {
    const patterns = ['col-span-1 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-2 row-span-1', 'col-span-1 row-span-2'];
    return patterns[i % patterns.length];
  };

  return (
    <section id="gallery" className="px-6 md:px-12 lg:px-20 xl:px-28 py-20 md:py-32">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 md:grid-cols-3 auto-rows-[250px] gap-3">
          {visibleImages.map((img, i) => {
            const isLastVisible = i === VISIBLE_COUNT - 1 && remainingCount > 0;
            return (
              <motion.div
                key={i}
                className={`${getSpan(i)} cursor-pointer overflow-hidden group relative`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => openLightbox(i)}
              >
                <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
                {isLastVisible && (
                  <div className="absolute inset-0 bg-charcoal/60 flex flex-col items-center justify-center gap-3 transition-colors hover:bg-charcoal/70">
                    <Images className="w-8 h-8 text-primary-foreground" />
                    <span className="font-body text-sm tracking-[0.15em] uppercase text-primary-foreground font-medium">
                      +{remainingCount} More Photos
                    </span>
                    <span className="font-body text-xs text-primary-foreground/70">
                      Click to view all {images.length} photos
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {remainingCount > 0 && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-8 text-center">
            <button
              onClick={() => openLightbox(0)}
              className="inline-flex items-center gap-3 border border-border px-8 py-3 font-body text-xs tracking-[0.2em] uppercase text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
            >
              <Images className="w-4 h-4" />
              View All {images.length} Photos
            </button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-charcoal/95 flex items-center justify-center" onClick={closeLightbox}>
            <div className="absolute top-6 right-6 flex items-center gap-4">
              <span className="font-body text-xs text-primary-foreground/70">{lightbox + 1} / {images.length}</span>
              <button onClick={(e) => { e.stopPropagation(); closeLightbox(); }} className="text-primary-foreground hover:text-accent transition-colors"><X className="w-8 h-8" /></button>
            </div>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-6 text-primary-foreground hover:text-accent transition-colors"><ChevronLeft className="w-10 h-10" /></button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-6 text-primary-foreground hover:text-accent transition-colors"><ChevronRight className="w-10 h-10" /></button>
            <motion.img key={lightbox} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} src={images[lightbox]} alt={`Gallery ${lightbox + 1}`} className="max-w-[90vw] max-h-[85vh] object-contain" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
