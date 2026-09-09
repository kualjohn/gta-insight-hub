import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { SEOHead } from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Clock, Youtube, Instagram, Facebook, Linkedin, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const contactSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(50),
  lastName: z.string().trim().max(50).optional(),
  email: z.string().trim().email('Please enter a valid email').max(255),
  phone: z.string().trim().max(20).optional(),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(1, 'Message is required').max(2000),
});

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    const result = contactSchema.safeParse(data);
    if (!result.success) {
      toast({
        title: 'Please check your form',
        description: result.error.errors[0].message,
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from('leads').insert({
        first_name: data.firstName.trim(),
        last_name: data.lastName?.trim() || null,
        email: data.email.trim().toLowerCase(),
        phone: data.phone?.trim() || null,
        subject: data.subject?.trim() || null,
        message: data.message.trim(),
        source: 'contact',
      });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: 'Message sent!',
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: 'Something went wrong',
        description: 'Please try again or call directly.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Contact Fawad Nissari"
        description="Get in touch with Fawad Nissari for expert GTA real estate advice. No pressure, just honest guidance on selling your home in the Greater Toronto Area."
        canonicalUrl="https://fawadnissari.ca/contact"
      />
      
      {/* Header */}
      <section className="bg-gradient-warm section-padding py-16">
        <div className="container-wide mx-auto">
          <span className="inline-block text-sm font-medium text-accent mb-4 tracking-wide uppercase">
            Get in Touch
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Let's Talk Real Estate
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Have questions about the GTA market or thinking about selling? I'm here to help with 
            honest advice and no pressure.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <SectionWrapper>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-card p-8 rounded-2xl border border-border">
            {!isSuccess ? (
              <>
                <h2 className="font-serif text-2xl font-bold mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" name="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" placeholder="Smith" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="(647) 555-0123" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">What can I help with?</Label>
                    <Input id="subject" name="subject" placeholder="e.g., Thinking about selling my home" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message"
                      name="message"
                      placeholder="Tell me more about your situation..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button variant="gold" size="lg" type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
                <h2 className="font-serif text-2xl font-bold mb-2">Message Sent!</h2>
                <p className="text-muted-foreground">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-muted-foreground">(416) 878-1085</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground">fawad.nissari@housesigma.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Service Area</p>
                    <p className="text-muted-foreground">Greater Toronto Area</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Availability</p>
                    <p className="text-muted-foreground">Mon-Sat: 9am - 8pm</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-xl font-semibold mb-4">Follow Me</h3>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.youtube.com/@Fawadnissari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-charcoal text-primary-foreground flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/fawadnissari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-charcoal text-primary-foreground flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/fawadnissari1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-charcoal text-primary-foreground flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/fawadnissari/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-charcoal text-primary-foreground flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="bg-muted p-6 rounded-xl">
              <h3 className="font-serif text-lg font-semibold mb-2">Prefer to Talk?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Schedule a call at a time that works for you. No pressure, just helpful advice.
              </p>
              <Button variant="gold" asChild>
                <a href="tel:4168781085">
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </Layout>
  );
}
