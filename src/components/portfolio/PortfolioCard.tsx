import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Property } from '@/types/property';
import { statusLabel, formatPrice } from '@/types/property';

interface Props {
  property: Property;
  index: number;
  resultLine?: string;
}

function isDirectVideo(url: string | null): boolean {
  if (!url) return false;
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(url);
}

function getYouTubeId(url: string | null): string | null {
  if (!url) return null;
  // Matches youtu.be/ID, youtube.com/watch?v=ID, youtube.com/embed/ID, youtube.com/shorts/ID
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function getVimeoId(url: string | null): string | null {
  if (!url) return null;
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

export default function PortfolioCard({ property, index, resultLine }: Props) {
  const image = property.hero_image || property.thumbnail_image || '/placeholder.svg';
  const videoSrc = isDirectVideo(property.video_url) ? property.video_url! : null;
  const youTubeId = !videoSrc ? getYouTubeId(property.video_url) : null;
  const vimeoId = !videoSrc && !youTubeId ? getVimeoId(property.video_url) : null;
  const [videoFailed, setVideoFailed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isSold = property.status === 'sold';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={`/portfolio/${property.slug}`}
        className="block relative overflow-hidden rounded-sm cursor-pointer"
        aria-label={`View ${property.title}`}
      >
        <div className="relative bg-charcoal overflow-hidden shadow-xl transition-shadow duration-500 group-hover:shadow-2xl">
          <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden">
            {/* Media layer */}
            {videoSrc && !videoFailed ? (
              <video
                src={videoSrc}
                poster={image}
                autoPlay={hovered}
                muted
                loop
                playsInline
                preload="metadata"
                onError={() => setVideoFailed(true)}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
              />
            ) : youTubeId ? (
              <>
                {/* Poster image underneath as instant paint + fallback */}
                <img
                  src={image}
                  alt={property.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* YouTube iframe — only mounted on hover to keep page fast */}
                {hovered && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <iframe
                      src={`https://www.youtube.com/embed/${youTubeId}?autoplay=1&mute=1&loop=1&playlist=${youTubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&disablekb=1`}
                      title={property.title}
                      allow="autoplay; encrypted-media"
                      frameBorder={0}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                    />
                  </div>
                )}
              </>
            ) : vimeoId ? (
              <>
                <img
                  src={image}
                  alt={property.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {hovered && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <iframe
                      src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0`}
                      title={property.title}
                      allow="autoplay; encrypted-media"
                      frameBorder={0}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                    />
                  </div>
                )}
              </>
            ) : (
              <img
                src={image}
                alt={property.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
              />
            )}

            {/* Dramatic gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/10" />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-transparent" />

            {/* Status badge */}
            <div className="absolute top-5 left-5 z-10">
              <span
                className={`px-3 py-1.5 font-body text-[10px] tracking-[0.2em] uppercase font-bold shadow-lg ${
                  isSold
                    ? 'bg-destructive text-destructive-foreground'
                    : 'bg-accent text-accent-foreground'
                }`}
              >
                {statusLabel[property.status]}
              </span>
            </div>

            {/* Hover "View Property" affordance */}
            <div className="absolute top-5 right-5 z-10 opacity-0 translate-y-[-4px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              <div className="flex items-center gap-1.5 bg-background/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground font-semibold">
                  View
                </span>
                <ArrowUpRight className="w-3 h-3 text-foreground" />
              </div>
            </div>

            {/* Content stack: visual → address → result → city/price */}
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 z-10">
              {/* Address */}
              <h3 className="font-display text-2xl md:text-3xl text-primary-foreground leading-tight mb-1.5 transition-transform duration-500 group-hover:-translate-y-0.5">
                {property.title}
              </h3>

              {/* Result line — high priority */}
              {resultLine && (
                <div className="mb-3 md:mb-4 transition-all duration-500 group-hover:translate-x-0.5">
                  <div className="inline-flex items-center gap-2">
                    <span className="w-6 h-px bg-accent" />
                    <p className="font-body text-sm md:text-[15px] text-accent font-semibold tracking-wide">
                      {resultLine}
                    </p>
                  </div>
                </div>
              )}

              {/* City + Price row */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-primary-foreground/15">
                <p className="font-body text-[11px] tracking-[0.2em] uppercase text-primary-foreground/70">
                  {property.city}
                </p>
                {property.price && (
                  <p className="font-display text-lg md:text-xl text-primary-foreground">
                    {formatPrice(property.price)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
