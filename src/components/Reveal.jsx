import { motion } from 'framer-motion';
import { EASE, staggerParent, staggerChild, staggerChildScale } from './motion';

/* Single-element scroll reveal: fade + rise (optionally scale). */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  scale,
  margin = '-60px',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, ...(scale ? { scale } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(scale ? { scale: 1 } : {}) }}
      viewport={{ once: true, margin }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Stateful stagger container — drop-in wrapper that triggers its
   variant children when it scrolls into view. */
export function Stagger({ children, className }) {
  return (
    <motion.div
      variants={staggerParent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, scale = false }) {
  return (
    <motion.div
      variants={scale ? staggerChildScale : staggerChild}
      className={className}
    >
      {children}
    </motion.div>
  );
}
