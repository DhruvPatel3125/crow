import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import Container from './Container';

function useCountUp(target, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

function Stat({ value, suffix, label, delay }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, 2000, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      style={{ textAlign: 'center', padding: '2rem' }}
    >
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        fontWeight: 700,
        color: '#D9A441',
        lineHeight: 1,
        marginBottom: '0.5rem',
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.8rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'rgba(245,239,230,0.55)',
      }}>
        {label}
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-padding" style={{ background: '#14100C' }}>
      <Container>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'center',
        }}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative' }}
          >
            <div className="img-hover" style={{
              borderRadius: 0,
              overflow: 'hidden',
              aspectRatio: '4/5',
              position: 'relative',
            }}>
              <img
                src="https://images.pexels.com/photos/4349762/pexels-photo-4349762.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Barista pouring latte art at Crow Cafe"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(20,16,12,0.6) 0%, transparent 60%)',
              }} />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                position: 'absolute', bottom: '-1.5rem', right: '-1.5rem',
                background: '#D9A441',
                color: '#14100C',
                padding: '1.25rem',
                textAlign: 'center',
                width: 120, height: 120,
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>
                4.9
              </span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                ★ Rating
              </span>
            </motion.div>

            {/* Decorative line */}
            <div style={{
              position: 'absolute', top: '-1.5rem', left: '-1.5rem',
              width: 80, height: 80,
              borderTop: '2px solid rgba(217,164,65,0.4)',
              borderLeft: '2px solid rgba(217,164,65,0.4)',
            }} />
          </motion.div>

          {/* Text Content */}
          <div>
            <SectionHeading
              eyebrow="Our Story"
              title={<>The Crow<br /><em style={{ color: '#D9A441', fontStyle: 'italic' }}>Story</em></>}
              subtitle="Born from a love of slow mornings and bold flavours, Crow Cafe is where craft meets comfort. Every cup we pour, every bite we serve — is a chapter in our story with you."
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ marginBottom: '2rem' }}
            >
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                color: 'rgba(245,239,230,0.6)',
                lineHeight: 1.8,
                fontSize: '1rem',
                marginBottom: '1.25rem',
              }}>
                We source single-origin beans directly from farms in Coorg and Chikmagalur, roast them in small batches, and brew them with obsessive care. Our kitchen is a stage where seasonal ingredients become art.
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                color: 'rgba(245,239,230,0.6)',
                lineHeight: 1.8,
                fontSize: '1rem',
              }}>
                The name? A crow never follows the flock — it chooses its own path with intelligence and grace. That's who we are: independent, curious, and always worth the visit.
              </p>
            </motion.div>

            {/* Decorative divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                height: 1,
                background: 'linear-gradient(to right, #D9A441, transparent)',
                marginBottom: '2rem',
                transformOrigin: 'left',
              }}
            />

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <Stat value={10000} suffix="+" label="Cups Served" delay={0} />
              <Stat value={49} suffix="/5" label="Avg Rating" delay={0.1} />
              <Stat value={25} suffix="+" label="Dishes" delay={0.2} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
