import { Award, Video, BarChart3, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const trustIndicators = [
  {
    icon: Award,
    title: 'Over a Decade',
    description: 'Of experience helping GTA families buy and sell homes.',
  },
  {
    icon: Video,
    title: 'Hundreds of Videos',
    description: 'Market updates and educational content for homeowners.',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Insights',
    description: 'Real numbers and honest analysis for informed decisions.',
  },
  {
    icon: Users,
    title: 'Trusted Advisor',
    description: 'First-time sellers and seasoned homeowners alike.',
  },
];

interface TrustIndicatorsProps {
  className?: string;
}

export function TrustIndicators({ className }: TrustIndicatorsProps) {
  return (
    <div className={cn("grid sm:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      {trustIndicators.map((item, index) => (
        <div key={index} className="text-center">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <item.icon className="w-7 h-7 text-primary" />
          </div>
          <h3 className="font-serif text-lg font-semibold mb-2">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
