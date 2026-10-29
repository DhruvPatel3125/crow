import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Container from './Container';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Food Blogger',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    text: "Crow Cafe has completely ruined me for all other coffee shops. The signature espresso is the finest I've had in the city — complex, velvety, and absolutely worth every sip. The interiors are a dream.",
  },
  {
    id: 2,
    name: 'Arjun Mehta',
    role: 'Architect',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    text: "As someone obsessed with spaces and craft, Crow Cafe speaks my language. The attention to detail — from the brew to the plating to the ambience — is extraordinary. My go-to spot every week.",
  },
  {
    id: 3,
    name: 'Kavya Nair',
    role: 'Creative Director',
    avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    text: "The truffle mushroom toast paired with the cold brew tonic is a combination I dream about. The staff here genuinely love what they do, and it shows in every dish. Absolute gem of a place.",
  },
  {
    id: 4,
    name: 'Rohan Das',
    role: 'Software Engineer',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    text: "Working remotely from Crow Cafe is an experience in itself — great Wi-Fi, incredible coffee, and an atmosphere that somehow keeps you both relaxed and productive. 10/10 would recommend.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef(null);

  const go = (idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const next = () => {
    const nextIdx = (current + 1) % testimonials.length;
    setDirection(1);
    setCurrent(nextIdx);
  };

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => clearInterval(intervalRef.current);
  }, [current]);

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  const t = testimonials[current];

  return (
    <section style={{ background: '#14100C', padding: '6rem 1.5rem' }}>
      <Container>
        <SectionHeading
          eyebrow="Voices"
          title={<>What They <em style={{ color: '#D9A441', fontStyle: 'italic' }}>Say</em></>}
          center
        />

        <div style={{ maxWidth: 800, marginInline: 'auto', position: 'relative' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={t.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: 'rgba(30,24,18,0.8)',
                border: '1px solid rgba(111,78,55,0.25)',
                padding: 'clamp(2rem, 5vw, 4rem)',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              {/* Quote mark */}
              <div style={{
                position: 'absolute', top: '1.5rem', left: '2rem',
                fontFamily: "'Playfair Display', serif",
                fontSize: '6rem',
                color: 'rgba(217,164,65,0.12)',
                lineHeight: 1,
                userSelect: 'none',
              }}>
                "
              </div>

              {/* Stars */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: '1.5rem' }}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="#D9A441" color="#D9A441" />
                ))}
              </div>

              {/* Text */}
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
                fontStyle: 'italic',
                color: 'rgba(245,239,230,0.85)',
                lineHeight: 1.8,
                marginBottom: '2.5rem',
                position: 'relative', zIndex: 1,
              }}>
                "{t.text}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(217,164,65,0.4)' }}
                />
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: '#F5EFE6', fontSize: '0.95rem' }}>
                    {t.name}
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: 'rgba(217,164,65,0.7)', letterSpacing: '0.1em' }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: 6, display: 'flex', alignItems: 'center',
                }}
              >
                <div style={{
                  height: 8,
                  width: i === current ? 24 : 8,
                  borderRadius: i === current ? 4 : '50%',
                  background: i === current ? '#D9A441' : 'rgba(245,239,230,0.3)',
                  transition: 'all 0.3s ease',
                }} />
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
