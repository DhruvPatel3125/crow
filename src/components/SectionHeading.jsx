import { Children, Fragment, isValidElement } from 'react';
import { motion } from 'framer-motion';
import { EASE } from './motion';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const titleStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.04 } },
};

const wordRise = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* Splits a heading title (strings, <em> runs, <br/>) into word units
   so each word can rise with a slight stagger — markup/API unchanged. */
function collectWords(node, out) {
  Children.forEach(node, (child) => {
    if (typeof child === 'string') {
      child.split(/\s+/).filter(Boolean).forEach((w) => out.push({ node: w }));
    } else if (isValidElement(child)) {
      if (child.type === 'br') out.push({ br: true });
      else if (child.type === Fragment) collectWords(child.props.children, out);
      else out.push({ node: child });
    }
  });
}

function TitleWords({ children }) {
  const words = [];
  collectWords(children, words);
  return words.map((w, i) =>
    w.br ? (
      <br key={i} />
    ) : (
      <motion.span
        key={i}
        variants={wordRise}
        className="inline-block mr-[0.22em] last:mr-0"
      >
        {w.node}
      </motion.span>
    )
  );
}

export default function SectionHeading({ eyebrow, title, subtitle, center = false, light = false }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={`mb-12 md:mb-16 ${center ? 'text-center mx-auto' : ''}`}
      style={{ maxWidth: center ? 720 : undefined }}
    >
      {eyebrow && (
        <motion.div
          variants={fadeUp}
          className={`flex items-center gap-3 mb-5 ${center ? 'justify-center' : ''}`}
        >
          <motion.span
            variants={{
              hidden: { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: 0.6, ease: EASE } },
            }}
            style={{ transformOrigin: center ? 'right' : 'left' }}
            className={`inline-block h-px w-10 ${light ? 'bg-paper/50' : 'bg-rust'}`}
          />
          <span className={`eyebrow ${light ? 'text-paper/70' : 'text-rust'}`}>{eyebrow}</span>
          {center && (
            <motion.span
              variants={{
                hidden: { scaleX: 0 },
                visible: { scaleX: 1, transition: { duration: 0.6, ease: EASE } },
              }}
              style={{ transformOrigin: 'left' }}
              className={`inline-block h-px w-10 ${light ? 'bg-paper/50' : 'bg-rust'}`}
            />
          )}
        </motion.div>
      )}
      <motion.h2
        variants={titleStagger}
        className={`font-serif font-semibold leading-[1.05] ${light ? 'text-paper' : 'text-espresso'}`}
        style={{ fontSize: 'clamp(2.4rem, 5vw, 3.9rem)' }}
      >
        <TitleWords>{title}</TitleWords>
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={`mt-5 text-base md:text-lg leading-relaxed ${light ? 'text-paper/65' : 'text-cocoa'}`}
          style={{ maxWidth: 560, marginInline: center ? 'auto' : undefined }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
