import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Home, BarChart3, Shield, Clock } from 'lucide-react';

const benefits = [
  {
    icon: BarChart3,
    title: 'Data-Driven Analysis',
    description: 'Real comparable sales and current market data.',
  },
  {
    icon: Home,
    title: 'Property Assessment',
    description: 'In-depth review of your home\'s unique features.',
  },
  {
    icon: Shield,
    title: 'No Pressure',
    description: 'Honest evaluation with no obligation to list.',
  },
  {
    icon: Clock,
    title: 'Quick Turnaround',
    description: 'Receive your CMA within 24-48 hours.',
  },
];

export default function HomeEvaluation() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-warm section-padding py-16">
        <div className="container-wide mx-auto">
          <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wide uppercase">
            Home Evaluation
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Get a Data-Driven GTA Home Evaluation
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Real numbers. Real comparables. No pressure. Get an honest assessment of your 
            home's value in today's market.
          </p>
        </div>
      </section>

      {/* Form & Benefits */}
      <SectionWrapper>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-card p-8 rounded-2xl border border-border">
            <h2 className="font-serif text-2xl font-bold mb-6">Request Your CMA</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address">Property Address</Label>
                <Input id="address" placeholder="123 Main Street, Mississauga, ON" required />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="John Smith" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input id="phone" type="tel" placeholder="(647) 555-0123" />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input id="bedrooms" type="number" placeholder="3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input id="bathrooms" type="number" placeholder="2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sqft">Approx. Sq Ft</Label>
                  <Input id="sqft" type="number" placeholder="1800" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="details">Additional Details (Optional)</Label>
                <Textarea 
                  id="details" 
                  placeholder="Recent renovations, unique features, timeline for selling..."
                  rows={4}
                />
              </div>
              <Button variant="gold" size="lg" type="submit" className="w-full">
                Get My Home Evaluation
              </Button>
            </form>
          </div>

          {/* Benefits */}
          <div>
            <h2 className="font-serif text-2xl font-bold mb-6">What You'll Receive</h2>
            <p className="text-muted-foreground mb-8">
              A Comparative Market Analysis (CMA) is a detailed report that estimates your 
              home's value based on recent sales of similar properties in your area. Here's 
              what to expect:
            </p>

            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-muted p-6 rounded-xl">
              <h3 className="font-serif text-lg font-semibold mb-2">Why Request a CMA?</h3>
              <p className="text-muted-foreground text-sm">
                Whether you're thinking about selling now or in a few years, understanding 
                your home's value helps you make informed decisions. There's no obligation, 
                no pressure—just honest information about your biggest asset.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </Layout>
  );
}
