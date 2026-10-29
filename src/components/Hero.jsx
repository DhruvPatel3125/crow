import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Star, MapPin, Clock } from 'lucide-react';
import { Button } from './Button';
import Container from './Container';

const line1 = ['Where', 'Every', 'Sip'];
const line2 = ['Tells', 'a', 'Story'];

const ease = [0.22, 1, 0.36, 1];

function WordLine({ words, offset, italicFrom }) {
  return (
    <span className="block">
      {words.map((word, i) => (
        <motion.span
          key={word + i}
          initial={{ opacity: 0, y: 46, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.85, delay: 0.35 + (offset + i) * 0.09, ease }}
          className="inline-block mr-[0.24em] last:mr-0"
        >
          {i >= italicFrom ? <em className="italic text-rust">{word}</em> : word}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  /* Parallax layers — photo drifts down gently, the watermark drifts
     up against it; both collapse to zero for reduced-motion users. */
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 42]);
  const markY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -34]);

  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={ref} className="relative overflow-hidden bg-paper pt-[76px]">
      {/* faint oversized watermark — sized & offset to stay fully inside the viewport */}
      <motion.span
        aria-hidden
        className="pointer-events-none select-none absolute top-2 right-5 sm:right-8 lg:right-12 font-serif italic font-bold text-sand leading-none whitespace-nowrap"
        style={{ fontSize: 'clamp(6.5rem, 14.5vw, 13.5rem)', y: markY }}
      >
        cafe
      </motion.span>

      <Container className="relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center pt-10 md:pt-16 lg:pt-20 pb-14">
          {/* ——— Copy ——— */}
          <div className="lg:col-span-7 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease }}
              className="flex items-center gap-3 mb-7"
            >
              <span className="hidden min-[420px]:inline-block h-px w-12 bg-rust shrink-0" />
              <span className="eyebrow text-rust">Artisan Coffee · Wood-Fired Kitchen</span>
            </motion.div>

            <h1
              className="hero-title font-serif font-semibold text-espresso leading-[1.04] lg:leading-[0.95] tracking-[-0.015em]"
            >
              <WordLine words={line1} offset={0} italicFrom={99} />
              <WordLine words={line2} offset={3} italicFrom={2} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95, ease }}
              className="mt-7 text-lg leading-relaxed text-cocoa max-w-[520px]"
            >
              Single-origin beans from Coorg &amp; Chikmagalur, roasted in small
              batches and poured with obsessive care — in a room built for slow
              mornings and long conversations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1, ease }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Button variant="primary" magnetic onClick={() => scrollTo('#menu')}>
                Explore Menu <ArrowRight size={15} />
              </Button>
              <Button variant="ghost" onClick={() => scrollTo('#visit')}>
                Book a Table
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-bark"
            >
              <span className="flex gap-0.5 shrink-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className="fill-rust text-rust" />
                ))}
              </span>
              <span className="font-semibold text-espresso">4.9</span>
              <span className="text-cocoa">loved by 10,000+ coffee drinkers</span>
            </motion.div>
          </div>

          {/* ——— Arched image ——— */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease }}
              className="relative mx-auto w-full max-w-[500px]"
            >
              {/* offset arch frame */}
              <div className="absolute -top-4 -right-4 w-full h-full rounded-t-[999px] rounded-b-[28px] border border-rust/40" aria-hidden />
              {/* Parallax rides on the frame — the img keeps its CSS
                  ken-burns drift, which would override a transform set
                  on the img itself. */}
              <motion.div
                style={{ y: imgY }}
                className="relative overflow-hidden rounded-t-[999px] rounded-b-[28px] aspect-[4/5] shadow-[0_50px_100px_-40px_rgba(34,26,20,0.45),0_24px_44px_-24px_rgba(180,85,31,0.28)]"
              >
                <img
                  src="https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Inside Crow Cafe — warm light, fresh brews"
                  className="kenburns w-full h-full object-cover"
                />
                {/* warm treatment + inner hairline */}
                <div aria-hidden className="warm-img-overlay" />
                <div aria-hidden className="absolute inset-0 rounded-t-[999px] rounded-b-[28px] shadow-[inset_0_0_0_1px_rgba(34,26,20,0.10)]" />
              </motion.div>

              {/* rotating stamp */}
              <div className="absolute -left-8 top-10 hidden sm:flex items-center justify-center w-[104px] h-[104px]">
                <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 w-full h-full">
                  <defs>
                    <path id="circ" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                  </defs>
                  <text className="text-rust" style={{ fontSize: 9.2, letterSpacing: 2.6, fill: 'currentColor', fontWeight: 700, textTransform: 'uppercase' }}>
                    <textPath href="#circ">Crow Cafe · Est. Bengaluru ·</textPath>
                  </text>
                </svg>
                <img src="/logo-icon.png" alt="" className="w-9 h-9 object-contain" />
              </div>

              {/* floating note — opacity-only entrance; the idle bob
                  is owned by the .float-soft CSS loop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.35, ease }}
                className="float-soft absolute -bottom-6 -left-2 sm:-left-10 bg-paper border border-espresso/10 shadow-[0_30px_56px_-22px_rgba(34,26,20,0.38),0_6px_18px_-8px_rgba(34,26,20,0.12)] rounded-2xl px-5 py-4 max-w-[220px] sm:max-w-[240px]"
              >
                <p className="eyebrow text-rust" style={{ fontSize: '0.62rem' }}>Freshly Roasted</p>
                <p className="font-serif italic text-[1.05rem] leading-snug text-espresso mt-1.5">
                  Small-batch beans, ground to order.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ——— Info strip ——— */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.5 }}
          className="border-t border-espresso/12 py-6 grid gap-4 sm:grid-cols-3 text-[0.82rem] font-medium tracking-wide text-bark"
        >
          <span className="flex items-center gap-2.5">
            <Clock size={16} className="text-rust shrink-0" /> Mon – Fri · 7:30 AM – 10:00 PM
          </span>
          <span className="flex items-center gap-2.5 sm:justify-center">
            <MapPin size={16} className="text-rust shrink-0" /> Koramangala, Bengaluru
          </span>
          <span className="flex items-center gap-2.5 sm:justify-end">
            <Star size={16} className="text-rust shrink-0" /> Single-Origin Indian Beans
          </span>
        </motion.div>
      </Container>
    </section>
  );
}
