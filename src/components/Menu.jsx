import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from './SectionHeading';
import Container from './Container';
import { menuData } from '../data/menu';

const categories = Object.keys(menuData);
const ease = [0.22, 1, 0.36, 1];

function VegMark({ isVeg }) {
  return (
    <span
      title={isVeg ? 'Vegetarian' : 'Non-vegetarian'}
      className={`inline-flex items-center justify-center w-[15px] h-[15px] border-[1.5px] rounded-[3px] shrink-0 ${
        isVeg ? 'border-olive' : 'border-rust'
      }`}
    >
      <span className={`w-[7px] h-[7px] rounded-full ${isVeg ? 'bg-olive' : 'bg-rust'}`} />
    </span>
  );
}

function MenuItem({ item, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease }}
      className="group py-1"
    >
      {item.isChefSpecial && (
        <p className="eyebrow text-rust mb-1.5" style={{ fontSize: '0.6rem' }}>
          Chef&apos;s Special
        </p>
      )}
      <div className="flex items-baseline">
        <h3 className="font-serif text-[1.35rem] md:text-[1.5rem] font-semibold text-espresso leading-tight flex items-center gap-2.5 group-hover:text-rust transition-colors duration-300">
          {item.name}
          <VegMark isVeg={item.isVeg} />
        </h3>
        <span className="dot-leader" aria-hidden />
        <span className="font-serif text-[1.3rem] md:text-[1.45rem] font-semibold text-rust whitespace-nowrap">
          ₹{item.price}
        </span>
      </div>
      <p className="mt-1.5 text-[0.92rem] leading-relaxed text-cocoa max-w-[92%]">
        {item.description}
      </p>
    </motion.article>
  );
}

export default function Menu() {
  const [active, setActive] = useState(categories[0]);

  return (
    <section id="menu" className="bg-parchment py-24 md:py-36 relative overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow="Taste the Craft"
          title={<>Our <em className="italic text-rust">Menu</em></>}
          subtitle="Poured, plated and baked fresh through the day. Prices include all taxes — the story is on us."
          center
        />

        {/* Category tabs */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className="relative flex bg-paper border border-espresso/12 rounded-full p-1.5 shadow-[0_10px_30px_-18px_rgba(34,26,20,0.3)]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`relative rounded-full px-6 md:px-9 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 cursor-pointer ${
                  active === cat ? 'text-paper' : 'text-bark hover:text-rust'
                }`}
              >
                {active === cat && (
                  <motion.span
                    layoutId="menu-tab-pill"
                    className="absolute inset-0 bg-rust rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Editorial two-column list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease }}
            className="grid md:grid-cols-2 gap-x-14 lg:gap-x-20 gap-y-7 max-w-[1080px] mx-auto"
          >
            {menuData[active].map((item, i) => (
              <MenuItem key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mt-14 font-serif italic text-lg text-bark"
        >
          Ask our barista about today&apos;s off-menu pour —{' '}
          <span className="text-rust">there is always one.</span>
        </motion.p>
      </Container>
    </section>
  );
}
