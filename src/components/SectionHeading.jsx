import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, subtitle, center = false, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-14 ${center ? 'text-center' : ''}`}
    >
      {eyebrow && (
        <span
          className="inline-block text-xs font-medium tracking-[0.3em] uppercase mb-4"
          style={{ color: '#D9A441' }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight"
        style={{ color: light ? '#F5EFE6' : '#F5EFE6', fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="mt-5 text-base md:text-lg leading-relaxed max-w-2xl"
          style={{ color: 'rgba(245,239,230,0.6)', ...(center ? { marginInline: 'auto' } : {}) }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
