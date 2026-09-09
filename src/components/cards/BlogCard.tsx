import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  slug: string;
  className?: string;
}

export function BlogCard({ title, excerpt, image, category, date, slug, className }: BlogCardProps) {
  return (
    <article className={cn("group hover-lift", className)}>
      <Link to={`/blog/${slug}`}>
        {/* Image */}
        <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4 bg-muted">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 bg-background text-foreground text-xs font-medium px-3 py-1 rounded-full">
            {category}
          </span>
        </div>

        {/* Content */}
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Calendar className="w-3 h-3" />
            <span>{date}</span>
          </div>
          <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {excerpt}
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
            Read More
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </article>
  );
}
