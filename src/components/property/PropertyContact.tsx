import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, CalendarDays, ArrowRight } from 'lucide-react';
import type { Property } from '@/types/property';
import fawadPhoto from '@/assets/fawad-contact.png';

interface Props {
  property: Property;
}

export default function PropertyContact({ property }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || (!form.email && !form.phone)) return;
    setSubmitting(true);
    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      await fetch(`https://${projectId}.supabase.co/functions/v1/fub-lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, message: form.message, propertyTitle: property.title, propertySlug: property.slug, propertyStatus: property.status, propertyCity: property.city }),
      });
    } catch (err) { console.error('Lead submission error:', err); }
    setSubmitting(false);
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  const inputClass = "w-full bg-transparent border-b border-border py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors";

  return (
    <>
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-12 md:py-16 bg-charcoal overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-accent mb-3">Looking to get results like this?</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-primary-foreground leading-tight">
              Schedule a call with Fawad
            </h2>
          </div>
          <a
            href="https://calendly.com/fawadnissari"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 font-body text-xs tracking-[0.2em] uppercase hover:bg-accent/90 transition-colors flex-shrink-0"
          >
            <CalendarDays className="w-4 h-4" />
            Book a Call
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </section>
      <section id="contact" className="px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-32 bg-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-8 md:mb-10">Get In Touch</h2>
            <div className="flex items-start gap-5 sm:gap-6 mb-8 md:mb-10">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-charcoal/10 flex-shrink-0 overflow-hidden">
                <img
                  src={fawadPhoto}
                  alt="Fawad Nissari"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '50% 18%' }}
                />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-xl text-foreground mb-1">Fawad Nissari</h3>
                <p className="font-body text-sm text-muted-foreground mb-1">Real Estate Broker</p>
                <p className="font-body text-sm text-muted-foreground">HouseSigma Brokerage</p>
              </div>
            </div>
            <div className="space-y-4">
              <a href="tel:4168781085" className="flex items-center gap-3 font-body text-sm text-foreground hover:text-accent transition-colors">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />(416) 878-1085
              </a>
              <a href="mailto:fawad.nissari@housesigma.com" className="flex items-center gap-3 font-body text-sm text-foreground hover:text-accent transition-colors break-all">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />fawad.nissari@housesigma.com
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            {submitted ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="font-display text-2xl text-foreground mb-3">Thank You!</h3>
                  <p className="font-body text-sm text-muted-foreground">Thanks — we got your message. We'll reach out shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" placeholder="Name *" required maxLength={100} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputClass} />
                <input type="email" placeholder="Email" maxLength={255} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputClass} />
                <input type="tel" placeholder="Phone" maxLength={20} value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={inputClass} />
                <p className="font-body text-[10px] text-muted-foreground">* Email or phone required</p>
                <textarea placeholder="Message" maxLength={1000} rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className={`${inputClass} resize-none`} />
                <button type="submit" disabled={submitting || (!form.email && !form.phone)} className="bg-primary text-primary-foreground px-10 py-3 font-body text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors disabled:opacity-50">
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
        </div>
      </section>
    </>
  );
}
