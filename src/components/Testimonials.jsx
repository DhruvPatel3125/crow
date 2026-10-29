import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Container from './Container';

const ease = [0.22, 1, 0.36, 1];

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
  const timerRef = useRef(null);

  const go = useCallback((idx) => {
    setCurrent((prev) => {
      setDirection(idx > prev || (prev === testimonials.length - 1 && idx === 0) ? 1 : -1);
      return idx;
    });
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(next, 6000);
    return () => clearInterval(timerRef.current);
  }, [next, current]);

  const t = testimonials[current];

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 56 : -56 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -56 : 56 }),
  };

  return (
    <section className="bg-paper py-24 md:py-36 relative overflow-hidden">
      {/* giant decorative quote */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute top-6 left-1/2 -translate-x-1/2 font-serif leading-none text-sand"
        style={{ fontSize: '16rem' }}
      >
        &ldquo;
      </span>

      <Container className="relative">
        <SectionHeading
          eyebrow="Voices"
          title={<>What They <em className="italic text-rust">Say</em></>}
          center
        />

        <div className="max-w-[860px] mx-auto text-center -mt-2">
          <div className="min-h-[300px] md:min-h-[280px] flex flex-col justify-start">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={t.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease }}
              >
                <div className="flex justify-center gap-1 mb-7">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-rust text-rust" />
                  ))}
                </div>

                <blockquote
                  className="font-serif font-medium text-espresso leading-[1.35]"
                  style={{ fontSize: 'clamp(1.45rem, 3.4vw, 2.3rem)' }}
                >
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                <figcaption className="mt-9 flex items-center justify-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    loading="lazy"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-sand shadow-[0_10px_22px_-10px_rgba(34,26,20,0.45)]"
                  />
                  <span className="text-left">
                    <span className="block font-serif font-semibold text-lg text-espresso leading-tight">{t.name}</span>
                    <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cocoa mt-0.5">{t.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full border border-espresso/20 flex items-center justify-center text-espresso hover:border-rust hover:text-rust hover:bg-sand/50 hover:shadow-[0_12px_24px_-12px_rgba(34,26,20,0.35)] transition-all cursor-pointer"
            >
              <ArrowLeft size={17} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => go(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`t-line ${i === current ? 'active' : ''}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full border border-espresso/20 flex items-center justify-center text-espresso hover:border-rust hover:text-rust hover:bg-sand/50 hover:shadow-[0_12px_24px_-12px_rgba(34,26,20,0.35)] transition-all cursor-pointer"
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
