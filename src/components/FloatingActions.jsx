import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, MessageCircle } from 'lucide-react';

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* WhatsApp FAB (fixed bottom-right on mobile) */}
      <motion.a
        href="https://wa.me/919876543210?text=Hi+Crow+Cafe!+I'd+like+to+place+an+order."
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="whatsapp-fab"
        style={{
          position: 'fixed',
          bottom: '1.75rem',
          right: '1.75rem',
          width: 54, height: 54,
          borderRadius: '50%',
          background: '#25D366',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 500,
          textDecoration: 'none',
          boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="WhatsApp Order"
      >
        <MessageCircle size={26} color="white" fill="white" />
      </motion.a>

      {/* Back to Top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="back-top"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollTop}
            style={{
              position: 'fixed',
              bottom: '5.5rem',
              right: '1.75rem',
              width: 44, height: 44,
              background: 'rgba(217,164,65,0.15)',
              border: '1px solid rgba(217,164,65,0.35)',
              backdropFilter: 'blur(10px)',
              color: '#D9A441',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 499,
              transition: 'background 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(217,164,65,0.25)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(217,164,65,0.15)'; }}
            aria-label="Back to top"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
