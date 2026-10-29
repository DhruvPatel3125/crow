import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import Container from './Container';

const ease = [0.22, 1, 0.36, 1];

const exploreLinks = [
  { label: 'Our Story', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit Us', href: '#visit' },
];

const hours = [
  { d: 'Mon – Fri', t: '7:30 AM – 10 PM' },
  { d: 'Saturday', t: '8:00 AM – 11 PM' },
  { d: 'Sunday', t: '9:00 AM – 9 PM' },
];

const instagramImages = [
  'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/6205791/pexels-photo-6205791.jpeg?auto=compress&cs=tinysrgb&w=400',
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <footer className="bg-espresso text-paper overflow-hidden">
      <Container>
        {/* Top block */}
        <div className="pt-16 md:pt-20 pb-12 grid gap-12 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-3"
            >
              <span className="w-12 h-12 rounded-full bg-paper flex items-center justify-center overflow-hidden">
                <img src="/logo-icon.png" alt="Crow Cafe logo" className="w-9 h-9 object-contain" />
              </span>
              <span className="font-serif text-3xl font-bold">
                Crow <em className="italic text-rust">Cafe</em>
              </span>
            </a>
            <p className="mt-5 text-paper/60 leading-relaxed max-w-[380px]">
              Where every sip tells a story. Artisan coffee, wood-fired bites
              and handcrafted desserts — poured fresh in the heart of Bengaluru.
            </p>

            <p className="eyebrow text-paper/50 mt-9 mb-4">The Sunday Pour — our newsletter</p>
            {subscribed ? (
              <p className="font-serif italic text-lg text-rust">You&apos;re in. First pour lands this Sunday.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex max-w-[420px]">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 bg-paper/8 border border-paper/20 rounded-l-full px-5 py-3.5 text-sm text-paper placeholder:text-paper/35 outline-none focus:border-rust transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="bg-rust hover:bg-rust-dark transition-colors text-paper rounded-r-full px-5 flex items-center justify-center cursor-pointer"
                >
                  <ArrowRight size={17} />
                </button>
              </form>
            )}
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <p className="eyebrow text-paper/50 mb-6">Explore</p>
            <ul className="space-y-3.5">
              {exploreLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                    className="text-paper/75 hover:text-rust transition-colors text-[0.95rem]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div className="lg:col-span-2">
            <p className="eyebrow text-paper/50 mb-6">Hours</p>
            <ul className="space-y-3.5 text-[0.95rem]">
              {hours.map((h) => (
                <li key={h.d}>
                  <span className="block text-paper/45 text-[0.72rem] font-semibold uppercase tracking-[0.2em] mb-0.5">{h.d}</span>
                  <span className="text-paper/80">{h.t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <p className="eyebrow text-paper/50 mb-6">Find Us</p>
            <div className="flex gap-3 mb-4">
              <MapPin size={18} className="text-rust shrink-0 mt-0.5" />
              <p className="text-paper/75 leading-relaxed text-[0.95rem]">
                42, The Crow Lane, Koramangala 5th Block,
                Bengaluru, Karnataka – 560034
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <Phone size={18} className="text-rust shrink-0" />
              <a href="tel:+919876543210" className="text-paper/75 hover:text-rust transition-colors text-[0.95rem]">
                +91 98765 43210
              </a>
            </div>
            <a
              href="https://instagram.com/crowcafe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 font-serif italic text-lg text-paper/85 hover:text-rust transition-colors"
            >
              @crowcafe on Instagram
            </a>
          </div>
        </div>

        {/* Instagram strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="grid grid-cols-5 gap-2 md:gap-3 pb-12"
        >
          {instagramImages.map((src, i) => (
            <a
              key={i}
              href="https://instagram.com/crowcafe"
              target="_blank"
              rel="noopener noreferrer"
              className="img-hover block aspect-square rounded-xl overflow-hidden ring-1 ring-paper/15 shadow-[0_14px_28px_-16px_rgba(0,0,0,0.55)]"
            >
              <img
                src={src}
                alt={`Crow Cafe on Instagram ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </a>
          ))}
        </motion.div>

        {/* Giant wordmark */}
        <div aria-hidden className="select-none pointer-events-none text-center leading-none border-t border-paper/10 pt-8">
          <span
            className="font-serif font-bold tracking-tight text-paper/10 whitespace-nowrap"
            style={{ fontSize: 'clamp(3.4rem, 11.5vw, 10.5rem)' }}
          >
            CROW CAFE
          </span>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-paper/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.8rem] text-paper/45">
          <p>© {new Date().getFullYear()} Crow Cafe. All rights reserved.</p>
          <p className="font-serif italic text-paper/55">Crafted with care in India</p>
        </div>
      </Container>
    </footer>
  );
}
