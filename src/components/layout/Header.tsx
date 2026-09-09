import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mainNavigation = [
  { name: 'Home', href: '/' },
  { name: 'YouTube', href: '/youtube' },
  { name: 'Market Updates', href: '/market-updates' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Moving to Milton', href: '/moving-to-milton' },
];

const sellersDropdown = [
  { name: 'First-Time Seller Guide', href: '/seller-guide' },
  { name: 'Seller Services', href: '/seller-services' },
  { name: 'Cost of Selling a House in Milton', href: '/cost-of-selling-a-house-in-milton' },
  { name: 'Cost of Selling a House in Mississauga', href: '/cost-of-selling-a-house-in-mississauga' },
];

const buyersDropdown = [
  { name: 'First-Time Buyer Guide', href: '/buyer-guide' },
  { name: 'Buyer Tips', href: '/buyer-tips' },
];

const aboutDropdown = [
  { name: 'About', href: '/about' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'FAQ', href: '/faq' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActiveDropdown = (items: { href: string }[]) => {
    return items.some(item => location.pathname === item.href);
  };

  const isActiveBuyersDropdown = () => isActiveDropdown(buyersDropdown);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <nav className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-xl lg:text-2xl font-bold text-foreground">
              Fawad<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center gap-1">
            {mainNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors rounded-md",
                  location.pathname === item.href
                    ? "text-accent bg-accent/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.name}
              </Link>
            ))}

            {/* Sellers Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-md outline-none",
                  isActiveDropdown(sellersDropdown)
                    ? "text-accent bg-accent/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                Sellers
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48 bg-background border border-border shadow-lg">
                {sellersDropdown.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        "w-full cursor-pointer",
                        location.pathname === item.href && "text-accent"
                      )}
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Buyers Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-md outline-none",
                  isActiveDropdown(buyersDropdown)
                    ? "text-accent bg-accent/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                Buyers
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48 bg-background border border-border shadow-lg">
                {buyersDropdown.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        "w-full cursor-pointer",
                        location.pathname === item.href && "text-accent"
                      )}
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* About Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-md outline-none",
                  isActiveDropdown(aboutDropdown)
                    ? "text-accent bg-accent/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                About
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-40 bg-background border border-border shadow-lg">
                {aboutDropdown.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        "w-full cursor-pointer",
                        location.pathname === item.href && "text-accent"
                      )}
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-3">
            <Button variant="accent" size="sm" className="hidden sm:flex" asChild>
              <a href="https://calendly.com/fawadnissari" target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4" />
                Book a Call
              </a>
            </Button>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 text-foreground"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1">
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 text-base font-medium transition-colors rounded-md",
                    location.pathname === item.href
                      ? "text-accent bg-accent/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Sellers Dropdown */}
              <div>
                <button
                  onClick={() => setMobileDropdown(mobileDropdown === 'sellers' ? null : 'sellers')}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 text-base font-medium transition-colors rounded-md",
                    isActiveDropdown(sellersDropdown)
                      ? "text-accent bg-accent/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  Sellers
                  <ChevronDown className={cn("h-4 w-4 transition-transform", mobileDropdown === 'sellers' && "rotate-180")} />
                </button>
                {mobileDropdown === 'sellers' && (
                  <div className="ml-4 border-l border-border">
                    {sellersDropdown.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block px-4 py-2 text-sm font-medium transition-colors",
                          location.pathname === item.href
                            ? "text-accent"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Buyers Dropdown */}
              <div>
                <button
                  onClick={() => setMobileDropdown(mobileDropdown === 'buyers' ? null : 'buyers')}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 text-base font-medium transition-colors rounded-md",
                    isActiveDropdown(buyersDropdown)
                      ? "text-accent bg-accent/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  Buyers
                  <ChevronDown className={cn("h-4 w-4 transition-transform", mobileDropdown === 'buyers' && "rotate-180")} />
                </button>
                {mobileDropdown === 'buyers' && (
                  <div className="ml-4 border-l border-border">
                    {buyersDropdown.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block px-4 py-2 text-sm font-medium transition-colors",
                          location.pathname === item.href
                            ? "text-accent"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile About Dropdown */}
              <div>
                <button
                  onClick={() => setMobileDropdown(mobileDropdown === 'about' ? null : 'about')}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 text-base font-medium transition-colors rounded-md",
                    isActiveDropdown(aboutDropdown)
                      ? "text-accent bg-accent/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  About
                  <ChevronDown className={cn("h-4 w-4 transition-transform", mobileDropdown === 'about' && "rotate-180")} />
                </button>
                {mobileDropdown === 'about' && (
                  <div className="ml-4 border-l border-border">
                    {aboutDropdown.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block px-4 py-2 text-sm font-medium transition-colors",
                          location.pathname === item.href
                            ? "text-accent"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 px-4">
                <Button variant="accent" className="w-full" asChild>
                  <a
                    href="https://calendly.com/fawadnissari"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Phone className="w-4 h-4" />
                    Book a Call
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
