import { useState } from 'react';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { cn } from '@/lib/utils';

const emailSchema = z.string().email('Please enter a valid email address').max(255);

interface NewsletterSignupProps {
  variant?: 'inline' | 'stacked' | 'dark';
  className?: string;
}

export function NewsletterSignup({ variant = 'inline', className = '' }: NewsletterSignupProps) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const result = emailSchema.safeParse(email.trim());
    if (!result.success) {
      toast({
        title: 'Invalid email',
        description: result.error.errors[0].message,
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: email.trim().toLowerCase() });

      if (error) {
        if (error.code === '23505') {
          // Duplicate email
          toast({
            title: 'Already subscribed!',
            description: "You're already on our list. We'll keep you updated!",
          });
          setIsSuccess(true);
        } else {
          throw error;
        }
      } else {
        setIsSuccess(true);
        toast({
          title: 'Subscribed!',
          description: 'You\'ll receive weekly insights every Friday.',
        });
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
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
        "flex items-center gap-2",
        variant === 'dark' ? "text-accent" : "text-accent",
        className
      )}>
        <CheckCircle className="w-5 h-5" />
        <span className="font-medium">You're subscribed!</span>
      </div>
    );
  }

  // Inline variant with card styling
  if (variant === 'inline') {
    return (
      <div className={cn("bg-muted/50 rounded-xl p-6 border border-border", className)}>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <h3 className="font-serif text-lg font-semibold mb-1">Get Weekly Insights</h3>
            <p className="text-sm text-muted-foreground">
              Market trends, seller tips, and buyer guidance delivered every Friday.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:min-w-[320px]">
            <Input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="sm:w-28"
            />
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <Button variant="gold" type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Subscribe'}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Dark variant for footer
  if (variant === 'dark') {
    return (
      <form onSubmit={handleSubmit} className={cn("flex flex-col sm:flex-row gap-3 max-w-md mx-auto", className)}>
        <Input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="bg-charcoal-light border-charcoal-light text-primary-foreground placeholder:text-primary-foreground/50 sm:w-28"
        />
        <div className="relative flex-1">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-charcoal-light border-charcoal-light text-primary-foreground placeholder:text-primary-foreground/50"
          />
        </div>
        <Button variant="gold" type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Subscribe'}
        </Button>
      </form>
    );
  }

  // Stacked variant
  return (
    <form onSubmit={handleSubmit} className={cn("space-y-3", className)}>
      <Input
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10"
          required
        />
      </div>
      <Button type="submit" variant="gold" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Subscribing...
          </>
        ) : (
          'Subscribe for Updates'
        )}
      </Button>
    </form>
  );
}
