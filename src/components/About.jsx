import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Container from './Container';

const ease = [0.22, 1, 0.36, 1];

function useCountUp(target, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    let raf;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(eased * target);
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

function Stat({ value, suffix, label, delay, decimals = 0 }) {
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

  const display = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString('en-IN');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease }}
      className="py-8 md:py-10 text-center sm:text-left"
    >
      <div className="font-serif font-semibold text-espresso leading-none" style={{ fontSize: 'clamp(2.6rem, 5vw, 4.2rem)' }}>
        {display}<span className="text-rust">{suffix}</span>
      </div>
      <div className="eyebrow text-cocoa mt-3">{label}</div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="bg-paper py-24 md:py-36 overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Text — left this time */}
          <div>
            <SectionHeading
              eyebrow="Our Story"
              title={<>The Crow<br /><em className="italic text-rust">Story</em></>}
            />
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.15, ease }}
              className="-mt-4"
            >
              <p className="text-cocoa leading-[1.85] text-[1.02rem] mb-5">
                Born from a love of slow mornings and bold flavours, Crow Cafe is
                where craft meets comfort. Every cup we pour, every bite we
                serve — is a chapter in our story with you.
              </p>
              <p className="text-cocoa leading-[1.85] text-[1.02rem] mb-5">
                We source single-origin beans directly from farms in Coorg and
                Chikmagalur, roast them in small batches, and brew them with
                obsessive care. Our kitchen is a stage where seasonal
                ingredients become art.
              </p>
              <p className="text-cocoa leading-[1.85] text-[1.02rem]">
                The name? A crow never follows the flock — it chooses its own
                path with intelligence and grace. That&apos;s who we are:
                independent, curious, and always worth the visit.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="font-serif italic text-xl text-bark mt-8"
            >
              — Team Crow Cafe
            </motion.p>
          </div>

          {/* Image — right, arched with sand offset */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease }}
            className="relative mx-auto w-full max-w-[460px]"
          >
            <div className="absolute -bottom-4 -left-4 w-full h-full rounded-t-[999px] rounded-b-[28px] bg-sand" aria-hidden />
            <div className="img-hover relative overflow-hidden rounded-t-[999px] rounded-b-[28px] aspect-[4/5]">
              <img
                src="https://images.pexels.com/photos/4349762/pexels-photo-4349762.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Barista pouring latte art at Crow Cafe"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Rating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.45, ease }}
              className="absolute -bottom-7 right-6 md:-right-4 bg-rust text-paper rounded-2xl shadow-[0_24px_44px_-16px_rgba(180,85,31,0.65)] w-[118px] h-[118px] flex flex-col items-center justify-center gap-1"
            >
              <span className="font-serif font-bold text-[2rem] leading-none">4.9</span>
              <span className="flex items-center gap-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em]">
                <Star size={10} className="fill-paper text-paper" /> Rating
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats — thin top border row */}
        <div className="mt-20 md:mt-24 border-t border-espresso/12 grid grid-cols-1 sm:grid-cols-3 sm:divide-x sm:divide-espresso/10">
          <Stat value={10000} suffix="+" label="Cups Served" delay={0} />
          <Stat value={4.9} suffix="/5" label="Average Rating" delay={0.1} decimals={1} />
          <Stat value={25} suffix="+" label="Dishes & Brews" delay={0.2} />
        </div>
      </Container>
    </section>
  );
}
