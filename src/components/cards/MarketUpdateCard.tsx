import { TrendingUp, TrendingDown, ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MarketUpdateCardProps {
  title: string;
  area: string;
  date: string;
  excerpt: string;
  trend: 'up' | 'down' | 'stable';
  priceChange?: string;
  slug: string;
  className?: string;
}

export function MarketUpdateCard({
  title,
  area,
  date,
  excerpt,
  trend,
  priceChange,
  slug,
  className,
}: MarketUpdateCardProps) {
  return (
    <article className={cn("group p-6 bg-card border border-border rounded-xl hover-lift", className)}>
      <Link to={`/market-updates/${slug}`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{area}</span>
            <span className="text-border">•</span>
            <span>{date}</span>
          </div>
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded",
            trend === 'up' && "bg-primary/10 text-primary",
            trend === 'down' && "bg-destructive/10 text-destructive",
            trend === 'stable' && "bg-muted text-muted-foreground"
          )}>
            {trend === 'up' && <TrendingUp className="w-4 h-4" />}
            {trend === 'down' && <TrendingDown className="w-4 h-4" />}
            {priceChange && <span>{priceChange}</span>}
          </div>
        </div>

        {/* Content */}
        <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {excerpt}
        </p>

        {/* CTA */}
        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
          Read Update
          <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
    </article>
  );
}
