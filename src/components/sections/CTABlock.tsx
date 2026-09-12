import { Link } from 'react-router-dom';
import { ArrowRight, Download, Phone, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CTABlockProps {
  variant?: 'primary' | 'secondary' | 'dark';
  title: string;
  subtitle?: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  headingLevel?: 'h2' | 'h3';
  className?: string;
}

export function CTABlock({
  variant = 'primary',
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  headingLevel = 'h3',
  className,
}: CTABlockProps) {
  const isDark = variant === 'dark';
  const isBookCall = primaryCta?.text === 'Book a Call';
  const Heading = headingLevel;

  const isExternal = (href: string) => /^https?:\/\//i.test(href);

  const renderLink = (href: string, children: React.ReactNode) =>
    isExternal(href) ? (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <Link to={href}>{children}</Link>
    );

  return (
    <div className={cn(
      "rounded-2xl p-8 lg:p-12 text-center",
      variant === 'primary' && "bg-gradient-to-r from-primary to-primary/90",
      variant === 'secondary' && "bg-muted border border-border",
      variant === 'dark' && "bg-charcoal",
      className
    )}>
      <Heading className={cn(
        "font-serif text-2xl lg:text-3xl font-bold mb-3",
        (variant === 'primary' || isDark) ? "text-primary-foreground" : "text-foreground"
      )}>
        {title}
      </Heading>
      {subtitle && (
        <p className={cn(
          "text-lg mb-6 max-w-xl mx-auto",
          (variant === 'primary' || isDark) ? "text-primary-foreground/80" : "text-muted-foreground"
        )}>
          {subtitle}
        </p>
      )}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {primaryCta && (
          <Button
            variant={isBookCall ? 'accent' : (isDark || variant === 'primary' ? 'outline' : 'gold')}
            size="lg"
            asChild
            className={cn(
              !isBookCall && (variant === 'primary' || isDark) && "border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground bg-transparent"
            )}
          >
            {renderLink(primaryCta.href, (
              <>
                <Phone className="w-4 h-4" />
                {primaryCta.text}
              </>
            ))}
          </Button>
        )}
        {secondaryCta && (
          <Button
            variant="ghost"
            size="lg"
            asChild
            className={cn(
              (variant === 'primary' || isDark) && "text-primary-foreground hover:bg-primary-foreground/10"
            )}
          >
            {renderLink(secondaryCta.href, (
              <>
                {secondaryCta.text}
                <ArrowRight className="w-4 h-4" />
              </>
            ))}
          </Button>
        )}
      </div>
    </div>
  );
}

export function DownloadCTA({ className }: { className?: string }) {
  return (
    <div className={cn(
      "rounded-2xl p-8 bg-muted border border-border text-center",
      className
    )}>
      <Download className="w-10 h-10 text-accent mx-auto mb-4" />
      <h3 className="font-serif text-xl font-bold mb-2">
        First-Time Seller Guide
      </h3>
      <p className="text-muted-foreground mb-4">
        Get our free guide with everything you need to know about selling your first home in the GTA.
      </p>
      <Button variant="gold" asChild>
        <Link to="/seller-guide">
          Download Free Guide
        </Link>
      </Button>
    </div>
  );
}

export function VideoCTA({ className }: { className?: string }) {
  return (
    <div className={cn(
      "rounded-2xl p-8 bg-charcoal text-primary-foreground text-center",
      className
    )}>
      <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
        <Play className="w-6 h-6 text-accent-foreground fill-current ml-1" />
      </div>
      <h3 className="font-serif text-xl font-bold mb-2">
        Watch My Videos
      </h3>
      <p className="text-primary-foreground/70 mb-4">
        Subscribe for weekly market updates and real estate advice.
      </p>
      <Button variant="outline" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-charcoal bg-transparent">
        <Link to="/youtube">
          Visit YouTube Channel
        </Link>
      </Button>
    </div>
  );
}
