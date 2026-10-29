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
    'inline-flex items-center justify-center gap-2 rounded-full font-sans text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer select-none active:scale-[0.97]';

  const variants = {
    primary: 'bg-rust text-paper px-8 py-4 shadow-[0_14px_32px_-12px_rgba(180,85,31,0.55),0_3px_8px_-3px_rgba(34,26,20,0.18)] hover:bg-rust-dark hover:-translate-y-0.5 hover:shadow-[0_20px_38px_-12px_rgba(180,85,31,0.6),0_4px_10px_-4px_rgba(34,26,20,0.16)]',
    ghost: 'bg-transparent text-espresso px-8 py-4 border border-espresso/30 hover:border-rust hover:text-rust hover:bg-rust/[0.05] hover:-translate-y-0.5',
    coffee: 'bg-espresso text-paper px-8 py-4 shadow-[0_14px_30px_-14px_rgba(34,26,20,0.55)] hover:bg-bark hover:-translate-y-0.5',
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
