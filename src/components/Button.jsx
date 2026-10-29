import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

function MagneticWrapper({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 25 });
  const springY = useSpring(y, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, display: 'inline-block' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

export function Button({ children, variant = 'primary', href, onClick, magnetic = false, className = '' }) {
  const base =
    'inline-flex items-center gap-2 font-medium text-sm tracking-widest uppercase transition-all duration-300 rounded-none border cursor-pointer select-none';

  const variants = {
    primary: `px-8 py-4 border-amber-400 bg-amber-400 text-charcoal hover:bg-amber-500 hover:border-amber-500 active:scale-95`,
    ghost: `px-8 py-4 border-cream/40 bg-transparent text-cream hover:border-amber-400 hover:text-amber-400 active:scale-95`,
    coffee: `px-8 py-4 border-coffee bg-coffee text-cream hover:bg-coffee/80 active:scale-95`,
  };

  const styleMap = {
    primary: { background: '#D9A441', borderColor: '#D9A441', color: '#14100C' },
    ghost: { background: 'transparent', borderColor: 'rgba(245,239,230,0.35)', color: '#F5EFE6' },
    coffee: { background: '#6F4E37', borderColor: '#6F4E37', color: '#F5EFE6' },
  };

  const hoverStyleMap = {
    primary: { background: '#B8882E', borderColor: '#B8882E' },
    ghost: { borderColor: '#D9A441', color: '#D9A441' },
    coffee: { background: 'rgba(111,78,55,0.7)' },
  };

  const el = href ? (
    <a
      href={href}
      className={`${base} ${className}`}
      style={{ ...styleMap[variant], fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.12em' }}
    >
      {children}
    </a>
  ) : (
    <button
      onClick={onClick}
      className={`${base} ${className}`}
      style={{ ...styleMap[variant], fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.12em' }}
    >
      {children}
    </button>
  );

  if (magnetic) return <MagneticWrapper>{el}</MagneticWrapper>;
  return el;
}

export default Button;
