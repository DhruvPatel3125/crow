import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function MagneticWrapper({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

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
    'inline-flex items-center justify-center gap-2 rounded-full font-sans text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer select-none active:scale-95';

  const variants = {
    primary: 'bg-rust text-paper px-8 py-4 shadow-[0_12px_30px_-10px_rgba(180,85,31,0.55)] hover:bg-rust-dark hover:shadow-[0_16px_36px_-10px_rgba(180,85,31,0.6)]',
    ghost: 'bg-transparent text-espresso px-8 py-4 border border-espresso/30 hover:border-rust hover:text-rust',
    coffee: 'bg-espresso text-paper px-8 py-4 hover:bg-bark',
  };

  const cls = `${base} ${variants[variant] ?? variants.primary} ${className}`;

  const el = href ? (
    <a href={href} className={cls}>{children}</a>
  ) : (
    <button onClick={onClick} className={cls}>{children}</button>
  );

  if (magnetic) return <MagneticWrapper>{el}</MagneticWrapper>;
  return el;
}

export default Button;
