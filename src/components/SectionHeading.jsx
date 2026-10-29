import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, subtitle, center = false, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 md:mb-16 ${center ? 'text-center mx-auto' : ''}`}
      style={{ maxWidth: center ? 720 : undefined }}
    >
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-5 ${center ? 'justify-center' : ''}`}>
          <span className={`inline-block h-px w-10 ${light ? 'bg-paper/50' : 'bg-rust'}`} />
          <span className={`eyebrow ${light ? 'text-paper/70' : 'text-rust'}`}>{eyebrow}</span>
          {center && <span className={`inline-block h-px w-10 ${light ? 'bg-paper/50' : 'bg-rust'}`} />}
        </div>
      )}
      <h2
        className={`font-serif font-semibold leading-[1.05] ${light ? 'text-paper' : 'text-espresso'}`}
        style={{ fontSize: 'clamp(2.4rem, 5vw, 3.9rem)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-base md:text-lg leading-relaxed ${light ? 'text-paper/65' : 'text-cocoa'}`}
          style={{ maxWidth: 560, marginInline: center ? 'auto' : undefined }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
