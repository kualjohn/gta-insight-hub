import { motion } from 'framer-motion';

interface Props {
  address: string;
  city: string | null;
}

export default function PropertyMap({ address, city }: Props) {
  const query = encodeURIComponent(`${address}${city ? ', ' + city : ''}`);

  return (
    <section id="map" className="px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-display text-3xl md:text-4xl text-foreground mb-8 md:mb-12">Location</motion.h2>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full h-[350px] sm:h-[450px] md:h-[550px]">
          <iframe title="Property Location" src={`https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`} className="w-full h-full border-0" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </motion.div>
      </div>
    </section>
  );
}
