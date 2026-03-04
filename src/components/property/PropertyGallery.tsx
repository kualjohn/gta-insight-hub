import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  images: string[];
}

export default function PropertyGallery({ images }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  if (images.length === 0) return null;

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
          {images.map((img, i) => (
            <motion.div key={i} className={`${getSpan(i)} cursor-pointer overflow-hidden group relative`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} onClick={() => openLightbox(i)}>
              <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-charcoal/95 flex items-center justify-center" onClick={closeLightbox}>
            <button onClick={(e) => { e.stopPropagation(); closeLightbox(); }} className="absolute top-6 right-6 text-primary-foreground hover:text-accent transition-colors"><X className="w-8 h-8" /></button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-6 text-primary-foreground hover:text-accent transition-colors"><ChevronLeft className="w-10 h-10" /></button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-6 text-primary-foreground hover:text-accent transition-colors"><ChevronRight className="w-10 h-10" /></button>
            <motion.img key={lightbox} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} src={images[lightbox]} alt={`Gallery ${lightbox + 1}`} className="max-w-[90vw] max-h-[85vh] object-contain" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
