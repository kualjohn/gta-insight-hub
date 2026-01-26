import { useState } from 'react';
import { FileText, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name').max(100),
  email: z.string().trim().email('Please enter a valid email address').max(255),
});

interface SellerGuideSignupProps {
  className?: string;
}

export function SellerGuideSignup({ className = '' }: SellerGuideSignupProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const result = formSchema.safeParse({ name: name.trim(), email: email.trim() });
    if (!result.success) {
      toast({
        title: 'Invalid input',
        description: result.error.errors[0].message,
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('leads')
        .insert({ 
          email: email.trim().toLowerCase(),
          first_name: name.trim(),
          source: 'seller-guide-download'
        });

      if (error) {
        if (error.code === '23505') {
          // Duplicate email - still show success since they already have access
          toast({
            title: 'You already have access!',
            description: "Check your inbox for the Seller Guide.",
          });
          setIsSuccess(true);
        } else {
          throw error;
        }
      } else {
        setIsSuccess(true);
        toast({
          title: 'Guide on its way!',
          description: 'Check your inbox for the Seller Guide download link.',
        });
      }
    } catch (error) {
      console.error('Seller guide signup error:', error);
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={cn(
        "bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20",
        className
      )}>
        <div className="flex items-center justify-center gap-3 text-primary">
          <CheckCircle className="w-6 h-6" />
          <span className="font-semibold text-lg">Your guide is on the way!</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20",
      className
    )}>
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        {/* Left: Icon + Text */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-serif text-xl font-semibold">Selling in 2026? Get the Free Seller Guide</h3>
          </div>
          <p className="text-muted-foreground ml-0 lg:ml-13">
            A short, practical breakdown of pricing, presentation, and marketing strategies that work in today's GTA market.
          </p>
        </div>

        {/* Right: Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:min-w-[400px]">
          <Input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="sm:w-36 bg-background"
            required
          />
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-background"
            required
          />
          <Button variant="gold" type="submit" disabled={isLoading} className="whitespace-nowrap">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Download Seller Guide'}
          </Button>
        </form>
      </div>
    </div>
  );
}
