import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit', href: '#visit' },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: '1.25rem 2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          background: scrolled ? 'rgba(20,16,12,0.95)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(111,78,55,0.2)' : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
        >
          <img src="/logo-icon.png" alt="Crow Cafe" style={{ height: 36, width: 36, objectFit: 'contain' }} />
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.1rem',
            color: '#F5EFE6',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>
            Crow Cafe
          </span>
        </a>

        {/* Desktop Nav */}
        {!isMobile && (
          <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => { e.preventDefault(); handleNav(l.href); }}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.8rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,239,230,0.75)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#D9A441'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,239,230,0.75)'; }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#visit"
              onClick={(e) => { e.preventDefault(); handleNav('#visit'); }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#14100C',
                background: '#D9A441',
                padding: '0.6rem 1.5rem',
                textDecoration: 'none',
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#B8882E'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#D9A441'; }}
            >
              Book a Table
            </a>
          </nav>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <button
            onClick={() => setOpen(!open)}
            style={{ background: 'none', border: 'none', color: '#F5EFE6', cursor: 'pointer', padding: 4 }}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: '80%', maxWidth: 320,
              background: '#1E1812',
              zIndex: 999,
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center',
              padding: '3rem 2.5rem',
              borderLeft: '1px solid rgba(111,78,55,0.3)',
            }}
          >
            <button
              onClick={() => setOpen(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#F5EFE6', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {[...links, { label: 'Book a Table', href: '#visit' }].map((l, i) => (
                <motion.a
                  key={l.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); handleNav(l.href); }}
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: '#F5EFE6', textDecoration: 'none' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#D9A441'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#F5EFE6'; }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 998 }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
