import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  title: string;
  thumbnail: string;
  duration?: string;
  category?: string;
  date?: string;
  className?: string;
}

export function VideoCard({ title, thumbnail, duration, category, date, className }: VideoCardProps) {
  return (
    <article className={cn("group cursor-pointer hover-lift", className)}>
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-muted">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
            <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
          </div>
        </div>
        {duration && (
          <span className="absolute bottom-3 right-3 bg-foreground/80 text-background text-xs font-medium px-2 py-1 rounded">
            {duration}
          </span>
        )}
        {category && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
            {category}
          </span>
        )}
      </div>

      {/* Content */}
      <div>
        {date && (
          <span className="text-xs text-muted-foreground">{date}</span>
        )}
        <h3 className="font-serif text-lg font-semibold mt-1 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
      </div>
    </article>
  );
}
