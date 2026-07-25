import { Link } from 'react-router-dom';
import { Youtube, Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';
import { NewsletterSignup } from '@/components/forms/NewsletterSignup';

const areas = [
  'Mississauga',
  'Milton',
  'Oakville',
  'Burlington',
  'Hamilton',
  'Brampton',
];

const quickLinks = [
  { name: 'Insights', href: '/insights' },
  { name: 'YouTube Channel', href: '/youtube' },
  { name: 'Seller Services', href: '/seller-services' },
  { name: 'First-Time Seller Guide', href: '/seller-guide' },
  { name: 'Cost of Selling a House in Milton', href: '/cost-of-selling-a-house-in-milton' },
  { name: 'Home Evaluation', href: '/home-evaluation' },
  { name: 'Staging', href: '/staging' },
];

const YOUTUBE_CHANNEL = 'https://www.youtube.com/@Fawadnissari';

export function Footer() {
  return (
    <footer className="bg-charcoal text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-charcoal-light">
        <div className="container-wide mx-auto section-padding py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-2xl lg:text-3xl mb-3">Get Weekly Insights</h3>
            <p className="text-primary-foreground/70 mb-6">
              Market trends, seller tips, and buyer guidance delivered every Friday.
            </p>
            <NewsletterSignup variant="dark" />
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
              Real Estate Market Expert & Advisor. Weekly videos, data-backed insights, 
              and proven strategies for GTA homeowners.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={YOUTUBE_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-charcoal-light flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/fawadnissari"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-charcoal-light flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@fawadnissari"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-charcoal-light flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/fawadnissari/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-charcoal-light flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
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
                <span className="text-primary-foreground/70 text-sm">(416) 878-1085</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1 text-primary" />
                <span className="text-primary-foreground/70 text-sm">fawad.nissari@housesigma.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-primary" />
                <span className="text-primary-foreground/70 text-sm">
                  Serving the Greater Toronto Area
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-light">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
            <p>© 2024 Fawad Nissari Real Estate. All rights reserved.</p>
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
