import { Quote, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  name: string;
  location: string;
  quote: string;
  image?: string;
  rating?: number;
  className?: string;
}

export function TestimonialCard({ name, location, quote, image, rating = 5, className }: TestimonialCardProps) {
  return (
    <article className={cn("p-6 bg-card border border-border rounded-xl", className)}>
      {/* Quote Icon */}
      <Quote className="w-8 h-8 text-primary mb-4" />

      {/* Quote */}
      <p className="text-foreground leading-relaxed mb-6">
        "{quote}"
      </p>

      {/* Rating */}
      {rating > 0 && (
        <div className="flex items-center gap-1 mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-primary fill-current" />
          ))}
        </div>
      )}

      {/* Author */}
      <div className="flex items-center gap-3">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold text-lg">
              {name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </div>
    </article>
  );
}
