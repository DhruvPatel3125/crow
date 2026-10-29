import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from './Button';

const words = ['Where', 'Every', 'Sip', 'Tells', 'a', 'Story'];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} id="hero" style={{ position: 'relative', height: '100svh', minHeight: 700, overflow: 'hidden' }}>
      {/* Background Image with Parallax + Ken Burns */}
      <motion.div
        style={{ position: 'absolute', inset: 0, y: imgY }}
      >
        <div className="kenburns" style={{ position: 'absolute', inset: '-10%' }}>
          <img
            src="https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Crow Cafe interior — warm coffee shop atmosphere"
            loading="eager"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
            }}
          />
        </div>
        {/* Multi-layer overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(20,16,12,0.55) 0%, rgba(20,16,12,0.3) 40%, rgba(20,16,12,0.7) 80%, rgba(20,16,12,0.95) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(20,16,12,0.5) 0%, transparent 60%)',
        }} />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'flex-start',
          padding: 'clamp(2rem,8vw,6rem)',
          paddingTop: '6rem',
          y: textY,
          opacity,
        }}
      >
        {/* Logo Mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '2rem' }}
        >
          <img
            src="/logo-icon.png"
            alt="Crow Cafe logo"
            style={{ height: 64, width: 64, objectFit: 'contain', filter: 'drop-shadow(0 2px 12px rgba(217,164,65,0.4))' }}
          />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.75rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#D9A441',
            marginBottom: '1.5rem',
          }}
        >
          Established 2024 · Artisan Coffee
        </motion.p>

        {/* Word-by-word Headline */}
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.8rem, 7vw, 7rem)',
            fontWeight: 700,
            lineHeight: 1.08,
            color: '#F5EFE6',
            maxWidth: '10ch',
            marginBottom: '2rem',
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={word + i}
              initial={{ opacity: 0, y: 40, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.6 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ display: 'inline-block', marginRight: '0.2em' }}
            >
              {word === 'Story' ? (
                <em style={{ fontStyle: 'italic', color: '#D9A441' }}>{word}</em>
              ) : word}
            </motion.span>
          ))}
        </h1>

        {/* Sub-tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1.05rem',
            color: 'rgba(245,239,230,0.7)',
            marginBottom: '2.5rem',
            maxWidth: '42ch',
            lineHeight: 1.7,
          }}
        >
          Premium artisan brews, wood-fired bites, and handcrafted moments — curated for the curious palate.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        >
          <Button
            variant="primary"
            href="#menu"
            magnetic
            onClick={(e) => { e.preventDefault(); document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            Explore Menu
          </Button>
          <Button
            variant="ghost"
            href="#visit"
            onClick={(e) => { e.preventDefault(); document.querySelector('#visit')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            Book a Table
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          cursor: 'pointer',
        }}
        onClick={() => document.querySelector('#marquee')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.65rem', letterSpacing: '0.25em',
          textTransform: 'uppercase', color: 'rgba(245,239,230,0.5)',
        }}>
          Scroll
        </span>
        <div className="scroll-bounce">
          <ChevronDown size={20} color="rgba(217,164,65,0.8)" />
        </div>
      </motion.div>
    </section>
  );
}
