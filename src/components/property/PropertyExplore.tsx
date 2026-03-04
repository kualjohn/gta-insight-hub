import { motion } from 'framer-motion';
import { Play, Box, FileText } from 'lucide-react';
import type { Property } from '@/types/property';

interface Props {
  property: Property;
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function PropertyExplore({ property }: Props) {
  const videoId = property.video_url ? extractYouTubeId(property.video_url) : null;

  const linkCards = [
    { label: '3D Tour', icon: Box, url: property.tour_3d_url, description: 'Explore every room in immersive 3D.' },
    { label: 'Floor Plans', icon: FileText, url: property.floorplan_url, description: 'View the detailed floor plan layout.' },
  ].filter(c => c.url);

  const hasVideo = !!videoId;
  if (!hasVideo && linkCards.length === 0) return null;

  return (
    <section id="explore" className="px-6 md:px-12 lg:px-20 xl:px-28 py-20 md:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-display text-3xl md:text-4xl text-foreground mb-12">Explore</motion.h2>

        <div className={`grid grid-cols-1 ${linkCards.length > 0 ? 'lg:grid-cols-3' : ''} gap-6`}>
          {/* Video Player */}
          {hasVideo && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={linkCards.length > 0 ? 'lg:col-span-2' : 'lg:col-span-3'}
            >
              <div className="bg-background overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&rel=0&modestbranding=1`}
                    title="Video Tour"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-1">Video Tour</h3>
                    <p className="font-body text-sm text-muted-foreground">Take a cinematic walkthrough of this property.</p>
                  </div>
                  <a
                    href={property.video_url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-xs tracking-[0.2em] uppercase text-accent hover:text-accent/80 transition-colors flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Watch Full Screen
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* Link Cards */}
          {linkCards.length > 0 && (
            <div className="flex flex-col gap-6">
              {linkCards.map((card, i) => (
                <motion.a
                  key={card.label}
                  href={card.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i + 1) * 0.15 }}
                  className="group bg-background p-8 md:p-10 flex flex-col justify-between flex-1 hover:shadow-lg transition-shadow duration-300"
                >
                  <div>
                    <card.icon className="w-8 h-8 text-accent mb-6 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">{card.label}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{card.description}</p>
                  </div>
                  <span className="font-body text-xs tracking-[0.2em] uppercase text-accent mt-6 group-hover:tracking-[0.3em] transition-all duration-300">View →</span>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
