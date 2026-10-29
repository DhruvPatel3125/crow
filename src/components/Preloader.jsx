import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const duration = 1900;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setFading(true);
        setTimeout(onComplete, 550);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper px-6"
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.img
        src="/logo-icon.png"
        alt="Crow Cafe"
        className="w-20 h-20 md:w-24 md:h-24 object-contain dark:rounded-[1.25rem]"
        initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-6 text-center"
      >
        <p className="font-serif text-3xl md:text-4xl font-semibold tracking-wide text-espresso">
          Crow <em className="italic text-rust">Cafe</em>
        </p>
        <p className="eyebrow text-cocoa mt-3">Brewing your experience</p>
      </motion.div>

      <div className="mt-10 w-52 md:w-64">
        <div className="h-[2px] w-full bg-sand overflow-hidden rounded-full">
          <div
            className="h-full bg-rust rounded-full"
            style={{ width: `${progress}%`, transition: 'width 0.15s linear' }}
          />
        </div>
        <p className="mt-3 text-center font-serif italic text-sm text-cocoa">{progress}%</p>
      </div>
    </motion.div>
  );
}
