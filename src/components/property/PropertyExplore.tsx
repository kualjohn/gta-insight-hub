import { motion } from 'framer-motion';
import { Play, Box, FileText } from 'lucide-react';
import type { Property } from '@/types/property';

interface Props {
  property: Property;
}

export default function PropertyExplore({ property }: Props) {
  const cards = [
    { label: 'Video Tour', icon: Play, url: property.video_url, description: 'Take a cinematic walkthrough of this property.' },
    { label: '3D Tour', icon: Box, url: property.tour_3d_url, description: 'Explore every room in immersive 3D.' },
    { label: 'Floor Plans', icon: FileText, url: property.floorplan_url, description: 'View the detailed floor plan layout.' },
  ].filter(c => c.url);

  if (cards.length === 0) return null;

  return (
    <section id="explore" className="px-6 md:px-12 lg:px-20 xl:px-28 py-20 md:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-display text-3xl md:text-4xl text-foreground mb-12">Explore</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.a key={card.label} href={card.url!} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }} className="group bg-background p-8 md:p-10 flex flex-col justify-between min-h-[280px] hover:shadow-lg transition-shadow duration-300">
              <div>
                <card.icon className="w-8 h-8 text-accent mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">{card.label}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{card.description}</p>
              </div>
              <span className="font-body text-xs tracking-[0.2em] uppercase text-accent mt-6 group-hover:tracking-[0.3em] transition-all duration-300">View →</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
