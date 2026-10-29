import { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Mail, ArrowRight } from 'lucide-react';
import Container from './Container';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit Us', href: '#visit' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleNav = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#0D0A08', borderTop: '1px solid rgba(111,78,55,0.2)' }}>
      <Container>
        {/* Main Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          padding: '5rem 0 3rem',
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <img src="/logo-icon.png" alt="Crow Cafe" style={{ height: 40, objectFit: 'contain' }} />
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.1rem',
                color: '#F5EFE6',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}>
                Crow Cafe
              </span>
            </div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.88rem',
              color: 'rgba(245,239,230,0.5)',
              lineHeight: 1.8,
              maxWidth: '28ch',
            }}>
              Where every sip tells a story. Artisan coffee, warmth, and craft — served daily.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <a
                href="https://instagram.com/crowcafe"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'rgba(245,239,230,0.5)',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#D9A441'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,239,230,0.5)'; }}
                aria-label="Instagram"
              >
                <Share2 size={20} />
              </a>
              <a
                href="mailto:hello@crowcafe.in"
                style={{
                  color: 'rgba(245,239,230,0.5)',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#D9A441'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,239,230,0.5)'; }}
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#D9A441',
              marginBottom: '1.25rem',
            }}>
              Quick Links
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {quickLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); handleNav(l.href); }}
                  className="amber-underline"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.9rem',
                    color: 'rgba(245,239,230,0.55)',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    display: 'inline-block',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#F5EFE6'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,239,230,0.55)'; }}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Hours */}
          <div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#D9A441',
              marginBottom: '1.25rem',
            }}>
              Hours
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { d: 'Mon – Fri', t: '7:30 AM – 10 PM' },
                { d: 'Saturday', t: '8:00 AM – 11 PM' },
                { d: 'Sunday', t: '9:00 AM – 9 PM' },
              ].map(({ d, t }) => (
                <div key={d} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: 'rgba(245,239,230,0.45)' }}>{d}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: 'rgba(245,239,230,0.7)' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#D9A441',
              marginBottom: '1.25rem',
            }}>
              Stay in the Loop
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.85rem',
              color: 'rgba(245,239,230,0.5)',
              marginBottom: '1rem',
              lineHeight: 1.7,
            }}>
              New menu drops, seasonal specials & exclusive events — right in your inbox.
            </p>
            {subscribed ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontFamily: "'DM Sans', sans-serif", color: '#D9A441', fontSize: '0.9rem' }}
              >
                ✓ You're on the list!
              </motion.p>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    flex: 1,
                    background: 'rgba(245,239,230,0.06)',
                    border: '1px solid rgba(111,78,55,0.3)',
                    borderRight: 'none',
                    color: '#F5EFE6',
                    padding: '0.75rem 1rem',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: '#D9A441',
                    border: 'none',
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    color: '#14100C',
                    display: 'flex', alignItems: 'center',
                    transition: 'background 0.3s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#B8882E'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#D9A441'; }}
                  aria-label="Subscribe"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          padding: '1.5rem 0',
          borderTop: '1px solid rgba(111,78,55,0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.78rem',
            color: 'rgba(245,239,230,0.35)',
          }}>
            © {new Date().getFullYear()} Crow Cafe · Bengaluru · All rights reserved
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.78rem',
            color: 'rgba(245,239,230,0.35)',
          }}>
            Crafted with ♥ in India
          </p>
        </div>
      </Container>
    </footer>
  );
}
