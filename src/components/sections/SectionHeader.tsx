import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  ctaText,
  ctaHref,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10",
      centered && "md:flex-col md:items-center text-center",
      className
    )}>
      <div className={cn(centered && "max-w-2xl mx-auto")}>
        <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-2 gold-underline inline-block pb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground text-lg mt-4">{subtitle}</p>
        )}
      </div>
      {ctaText && ctaHref && (
        <Button variant="outline-gold" asChild className="shrink-0">
          <Link to={ctaHref}>
            {ctaText}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      )}
    </div>
  );
}

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'muted' | 'dark';
}

export function SectionWrapper({ children, className, variant = 'default' }: SectionWrapperProps) {
  return (
    <section className={cn(
      "section-padding",
      variant === 'muted' && "bg-muted",
      variant === 'dark' && "bg-charcoal text-primary-foreground",
      className
    )}>
      <div className="container-wide mx-auto">
        {children}
      </div>
    </section>
  );
}
