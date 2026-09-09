import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const formSchema = z.object({
  address: z.string().min(5, 'Please enter a valid address'),
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  sqft: z.string().optional(),
  details: z.string().optional(),
});

interface HomeEvaluationFormProps {
  source?: string;
  addressPlaceholder?: string;
  heading?: string;
  subheading?: string;
}

export function HomeEvaluationForm({
  source = 'home-evaluation',
  addressPlaceholder = '123 Main Street, Mississauga, ON',
  heading = 'Request Your Free CMA',
  subheading = 'A Comparative Market Analysis shows what your home could sell for based on recent sales.',
}: HomeEvaluationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      address: formData.get('address') as string,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      bedrooms: formData.get('bedrooms') as string,
      bathrooms: formData.get('bathrooms') as string,
      sqft: formData.get('sqft') as string,
      details: formData.get('details') as string,
    };

    const result = formSchema.safeParse(data);
    if (!result.success) {
      toast({
        title: 'Please check your information',
        description: result.error.errors[0].message,
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('leads').insert({
        first_name: data.name.split(' ')[0],
        last_name: data.name.split(' ').slice(1).join(' ') || null,
        email: data.email,
        phone: data.phone || null,
        message: `Address: ${data.address}\nBedrooms: ${data.bedrooms || 'N/A'}\nBathrooms: ${data.bathrooms || 'N/A'}\nSq Ft: ${data.sqft || 'N/A'}\nDetails: ${data.details || 'N/A'}`,
        source,
      });
      if (error) throw error;
      setIsSuccess(true);
      toast({
        title: 'Request received!',
        description: "You'll receive your home evaluation within 24-48 hours.",
      });
    } catch (err) {
      console.error('Form submission error:', err);
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card p-8 rounded-2xl border border-border">
      {isSuccess ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-accent" />
          </div>
          <h2 className="font-serif text-2xl font-bold mb-2">Request Received!</h2>
          <p className="text-muted-foreground">
            Thank you for your request. You'll receive your personalized home evaluation within 24-48 hours.
          </p>
        </div>
      ) : (
        <>
          <h2 className="font-serif text-2xl font-bold mb-2">{heading}</h2>
          <p className="text-sm text-muted-foreground mb-6">{subheading}</p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="address">Property Address *</Label>
              <Input id="address" name="address" placeholder={addressPlaceholder} required />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name *</Label>
                <Input id="name" name="name" placeholder="John Smith" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" placeholder="john@example.com" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input id="phone" name="phone" type="tel" placeholder="(647) 555-0123" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input id="bedrooms" name="bedrooms" type="number" placeholder="3" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input id="bathrooms" name="bathrooms" type="number" placeholder="2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sqft">Approx. Sq Ft</Label>
                <Input id="sqft" name="sqft" type="number" placeholder="1800" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="details">Additional Details (Optional)</Label>
              <Textarea
                id="details"
                name="details"
                placeholder="Recent renovations, unique features, timeline for selling..."
                rows={3}
              />
            </div>
            <Button variant="gold" size="lg" type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Get My Free Home Evaluation'}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              No obligation. No pressure. Just honest information.
            </p>
          </form>
        </>
      )}
    </div>
  );
}