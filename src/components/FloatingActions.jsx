import { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-3">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`back-top ${showTop ? 'visible' : ''} w-12 h-12 rounded-full bg-espresso text-paper shadow-[0_16px_34px_-12px_rgba(34,26,20,0.55)] flex items-center justify-center hover:bg-rust cursor-pointer`}
      >
        <ArrowUp size={19} />
      </button>

      <a
        href="https://wa.me/919876543210?text=Hi+Crow+Cafe!+I'd+like+to+book+a+table."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="whatsapp-fab w-[54px] h-[54px] rounded-full bg-[#25D366] text-white shadow-[0_16px_34px_-10px_rgba(37,211,102,0.6)] flex items-center justify-center hover:scale-105 transition-transform"
      >
        <MessageCircle size={25} />
      </a>
    </div>
  );
}
