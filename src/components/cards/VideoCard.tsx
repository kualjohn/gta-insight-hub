import { Play, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface VideoCardProps {
  title: string;
  thumbnail: string;
  videoUrl?: string;
  duration?: string;
  category?: string;
  date?: string;
  className?: string;
  showWatchLink?: boolean;
}

export function VideoCard({ 
  title, 
  thumbnail, 
  videoUrl,
  duration, 
  category, 
  date, 
  className,
  showWatchLink = true 
}: VideoCardProps) {
  const handleClick = () => {
    if (videoUrl) {
      window.open(videoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Fallback to hqdefault if maxresdefault fails
    const target = e.currentTarget;
    if (target.src.includes('maxresdefault')) {
      target.src = target.src.replace('maxresdefault', 'hqdefault');
    }
  };

  return (
    <article 
      className={cn("group cursor-pointer hover-lift", className)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-muted shadow-md group-hover:shadow-lg transition-shadow">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={handleImageError}
        />
        
        {/* Always visible overlay with play button */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-youtube/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 text-youtube-foreground fill-current ml-1" />
          </div>
        </div>

        {/* VIDEO badge - always visible */}
        <Badge 
          className="absolute bottom-3 left-3 bg-accent hover:bg-accent text-accent-foreground text-xs font-bold px-2 py-1 shadow-md"
        >
          VIDEO
        </Badge>

        {/* Duration badge if available */}
        {duration && (
          <span className="absolute bottom-3 right-3 bg-foreground/90 text-background text-xs font-medium px-2 py-1 rounded">
            {duration}
          </span>
        )}

        {/* Category badge */}
        {category && (
          <span className="absolute top-3 right-3 bg-background/90 text-foreground text-xs font-medium px-2 py-1 rounded">
            {category}
          </span>
        )}
      </div>

      {/* Content */}
      <div>
        {date && (
          <span className="text-xs text-muted-foreground">{date}</span>
        )}
        <h3 className="font-serif text-lg font-semibold mt-1 group-hover:text-accent transition-colors line-clamp-2">
          {title}
        </h3>
        
        {/* Watch on YouTube link */}
        {showWatchLink && videoUrl && (
          <span className="inline-flex items-center gap-1 text-sm text-accent mt-2 group-hover:underline">
            Watch on YouTube
            <ExternalLink className="w-3 h-3" />
          </span>
        )}
      </div>
    </article>
  );
}
