import { Link } from 'react-router-dom';
import { Youtube, Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const areas = [
  'Mississauga',
  'Milton',
  'Oakville',
  'Burlington',
  'Hamilton',
  'Brampton',
];

const quickLinks = [
  { name: 'Market Updates', href: '/market-updates' },
  { name: 'YouTube Channel', href: '/youtube' },
  { name: 'Blog', href: '/blog' },
  { name: 'Seller Services', href: '/seller-services' },
  { name: 'First-Time Seller Guide', href: '/seller-guide' },
  { name: 'Home Evaluation', href: '/home-evaluation' },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-charcoal-light">
        <div className="container-wide mx-auto section-padding py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-2xl lg:text-3xl mb-3">Stay Updated</h3>
            <p className="text-primary-foreground/70 mb-6">
              Get weekly GTA market updates and real estate insights delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-charcoal-light border-charcoal-light text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button variant="gold" type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-wide mx-auto section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="font-serif text-2xl font-bold">
                Fawad<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Real insights for GTA homeowners. Honest market updates, data-driven analysis, 
              and practical real estate advice.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-charcoal-light flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-charcoal-light flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-charcoal-light flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas Served */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Areas Served</h4>
            <ul className="space-y-2">
              {areas.map((area) => (
                <li key={area}>
                  <Link
                    to={`/areas/${area.toLowerCase()}`}
                    className="text-primary-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 text-primary" />
                <span className="text-primary-foreground/70 text-sm">(647) 555-0123</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1 text-primary" />
                <span className="text-primary-foreground/70 text-sm">fawad@gtarealestate.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-primary" />
                <span className="text-primary-foreground/70 text-sm">
                  Serving the Greater Toronto Area
                </span>
              </li>
            </ul>
            <div className="mt-6">
              <Button variant="outline-gold" size="sm" asChild>
                <Link to="/contact">Book a Call</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-light">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
            <p>© 2024 Fawad Real Estate. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
