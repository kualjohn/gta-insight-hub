import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'explore', label: 'Explore' },
  { id: 'map', label: 'Map' },
  { id: 'contact', label: 'Contact' },
];

export default function PropertyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const offsets = sections.map(s => {
        const el = document.getElementById(s.id);
        return { id: s.id, top: el ? el.offsetTop - 120 : Infinity };
      });
      const current = offsets.filter(o => window.scrollY >= o.top).pop();
      if (current) setActiveSection(current.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 xl:px-28 py-5">
        <Link
          to="/portfolio"
          className={`font-display text-xl font-semibold tracking-wide transition-colors ${
            scrolled ? 'text-foreground' : 'text-primary-foreground'
          }`}
        >
          FN
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`font-body text-xs tracking-[0.2em] uppercase transition-colors ${
                scrolled ? 'text-foreground' : 'text-primary-foreground'
              } ${activeSection === s.id ? 'text-accent' : 'hover:text-accent'}`}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
