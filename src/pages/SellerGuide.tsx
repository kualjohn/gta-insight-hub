import { useState } from 'react';
import { Download, Check } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionWrapper } from '@/components/sections/SectionHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const guideContents = [
  'How to price your home competitively',
  'The best time to sell in the GTA',
  'Staging tips that actually work',
  'Understanding the closing process',
  'How to choose the right agent',
  'Common first-time seller mistakes to avoid',
];

export default function SellerGuide() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      <section className="bg-gradient-warm min-h-[80vh] flex items-center">
        <div className="container-wide mx-auto section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <span className="inline-block text-sm font-medium text-primary mb-4 tracking-wide uppercase">
                Free Download
              </span>
              <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-6">
                First-Time Seller Guide
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Everything you need to know about selling your home in the Greater Toronto Area—from 
                pricing to closing. Written by a broker with over a decade of experience helping 
                GTA families.
              </p>

              <div className="mb-8">
                <h3 className="font-semibold mb-4">What's Inside:</h3>
                <ul className="space-y-3">
                  {guideContents.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="bg-card p-8 rounded-2xl border border-border shadow-soft">
              {!submitted ? (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Download className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-bold">Get Your Free Copy</h2>
                      <p className="text-sm text-muted-foreground">Instant download, no spam</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="John Smith" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>
                    <Button variant="gold" size="lg" type="submit" className="w-full">
                      <Download className="w-4 h-4" />
                      Download Free Guide
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      By downloading, you agree to receive occasional market updates. 
                      Unsubscribe anytime.
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold mb-2">Check Your Email!</h2>
                  <p className="text-muted-foreground mb-6">
                    Your First-Time Seller Guide is on its way. Check your inbox 
                    (and spam folder, just in case).
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Have questions? <a href="/contact" className="text-primary hover:underline">Book a call</a> anytime.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
