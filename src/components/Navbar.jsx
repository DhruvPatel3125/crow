import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit', href: '#visit' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll while the mobile overlay menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open ]);

  const handleNav = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-paper/85 backdrop-blur-xl border-b border-espresso/10 shadow-[0_18px_44px_-24px_rgba(34,26,20,0.28),0_2px_10px_-4px_rgba(34,26,20,0.08)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[76px]">
            {/* Brand */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-3"
            >
              <img src="/logo-icon.png" alt="Crow Cafe logo" className="w-10 h-10 object-contain" />
              <span className="leading-none">
                <span className="block font-serif text-[1.35rem] font-bold tracking-wide text-espresso">
                  Crow <em className="italic text-rust">Cafe</em>
                </span>
                <span className="block text-[0.58rem] font-semibold uppercase tracking-[0.34em] text-cocoa mt-1">
                  Specialty Coffee
                </span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-10">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); handleNav(l.href); }}
                  className="link-underline text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-bark hover:text-espresso transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#visit"
                onClick={(e) => { e.preventDefault(); handleNav('#visit'); }}
                className="inline-flex items-center gap-1.5 rounded-full bg-espresso text-paper px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-rust"
              >
                Book a Table <ArrowUpRight size={14} />
              </a>
            </nav>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-espresso flex items-center justify-center w-11 h-11 -mr-2"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-paper flex flex-col items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {[...links, { label: 'Book a Table', href: '#visit' }].map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => { e.preventDefault(); handleNav(l.href); }}
                  className="font-serif text-4xl font-semibold text-espresso hover:text-rust transition-colors py-2"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="eyebrow text-cocoa mt-14"
            >
              Koramangala · Bengaluru
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
