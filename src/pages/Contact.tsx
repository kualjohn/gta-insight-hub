import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { CTABlock } from '@/components/sections/CTABlock';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Clock, Youtube, Instagram, Facebook } from 'lucide-react';

export default function Contact() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-warm section-padding py-16">
        <div className="container-wide mx-auto">
          <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wide uppercase">
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
            <h2 className="font-serif text-2xl font-bold mb-6">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Smith" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input id="phone" type="tel" placeholder="(647) 555-0123" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">What can I help with?</Label>
                <Input id="subject" placeholder="e.g., Thinking about selling my home" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell me more about your situation..."
                  rows={5}
                />
              </div>
              <Button variant="gold" size="lg" type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-muted-foreground">(647) 555-0123</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground">fawad@gtarealestate.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Service Area</p>
                    <p className="text-muted-foreground">Greater Toronto Area</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
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
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-charcoal text-primary-foreground flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-charcoal text-primary-foreground flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-charcoal text-primary-foreground flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="bg-muted p-6 rounded-xl">
              <h3 className="font-serif text-lg font-semibold mb-2">Prefer to Talk?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Schedule a call at a time that works for you. No pressure, just helpful advice.
              </p>
              <Button variant="gold" asChild>
                <a href="tel:6475550123">
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
