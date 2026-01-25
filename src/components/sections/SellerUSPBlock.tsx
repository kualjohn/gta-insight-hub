import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const sellerFeatures = [
  {
    title: 'Free Full Home Staging',
    description: 'Complete professional staging at no additional cost.',
  },
  {
    title: '4K Video & Drone',
    description: 'Cinematic property videos that capture every detail.',
  },
  {
    title: 'Professional Photography',
    description: 'Magazine-quality images that make your home shine.',
  },
  {
    title: 'Daily Paid Advertising',
    description: 'Facebook, Instagram, YouTube, and Google ads.',
  },
  {
    title: 'Dedicated Property Website',
    description: 'Your home gets its own custom landing page.',
  },
  {
    title: 'Cancel Anytime',
    description: 'No lock-in contracts. Flexibility first.',
  },
  {
    title: 'Flexible Commission Options',
    description: 'Transparent pricing that works for you.',
  },
];

interface SellerUSPBlockProps {
  className?: string;
  showAll?: boolean;
}

export function SellerUSPBlock({ className, showAll = true }: SellerUSPBlockProps) {
  const features = showAll ? sellerFeatures : sellerFeatures.slice(0, 4);

  return (
    <div className={cn("grid sm:grid-cols-2 gap-4", className)}>
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold mb-1">{feature.title}</h4>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
