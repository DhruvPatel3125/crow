import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={ref} className="relative overflow-hidden bg-paper pt-[76px]">
      {/* faint oversized watermark */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute -top-6 right-0 font-serif italic font-bold text-sand leading-none"
        style={{ fontSize: 'clamp(10rem, 26vw, 24rem)' }}
      >
        cafe
      </span>

      <Container className="relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-10 md:pt-16 lg:pt-20 pb-14">
          {/* ——— Copy ——— */}
          <div className="lg:col-span-7 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease }}
              className="flex items-center gap-3 mb-7"
            >
              <span className="inline-block h-px w-12 bg-rust" />
              <span className="eyebrow text-rust">Artisan Coffee · Wood-Fired Kitchen</span>
            </motion.div>

            <h1
              className="font-serif font-semibold text-espresso leading-[0.98] tracking-[-0.01em]"
              style={{ fontSize: 'clamp(3.4rem, 8.5vw, 6.8rem)' }}
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
              className="mt-9 flex items-center gap-3 text-sm text-bark"
            >
              <span className="flex gap-0.5">
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
              className="relative mx-auto max-w-[420px]"
            >
              {/* offset arch frame */}
              <div className="absolute -top-4 -right-4 w-full h-full rounded-t-[999px] rounded-b-[28px] border border-rust/40" aria-hidden />
              <div className="relative overflow-hidden rounded-t-[999px] rounded-b-[28px] aspect-[4/5] shadow-[0_40px_80px_-30px_rgba(34,26,20,0.35)]">
                <motion.img
                  src="https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Inside Crow Cafe — warm light, fresh brews"
                  className="kenburns w-full h-full object-cover"
                  style={{ y: imgY }}
                />
              </div>

              {/* rotating stamp */}
              <div className="absolute -left-8 top-10 hidden sm:flex items-center justify-center w-[104px] h-[104px]">
                <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 w-full h-full">
                  <defs>
                    <path id="circ" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                  </defs>
                  <text style={{ fontSize: 9.2, letterSpacing: 2.6, fill: '#B4551F', fontWeight: 700, textTransform: 'uppercase' }}>
                    <textPath href="#circ">Crow Cafe · Est. Bengaluru ·</textPath>
                  </text>
                </svg>
                <img src="/logo-icon.png" alt="" className="w-9 h-9 object-contain" />
              </div>

              {/* floating note */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.35, ease }}
                className="float-soft absolute -bottom-6 -left-4 sm:-left-10 bg-paper border border-espresso/10 shadow-[0_24px_50px_-20px_rgba(34,26,20,0.35)] rounded-2xl px-5 py-4 max-w-[240px]"
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
