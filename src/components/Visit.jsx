import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, ExternalLink } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Container from './Container';
import { Button } from './Button';

const hours = [
  { day: 'Monday – Friday', time: '7:30 AM – 10:00 PM' },
  { day: 'Saturday', time: '8:00 AM – 11:00 PM' },
  { day: 'Sunday', time: '9:00 AM – 9:00 PM' },
];

const instagramImages = [
  'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/3907829/pexels-photo-3907829.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/6205791/pexels-photo-6205791.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=300',
];

export default function Visit() {
  return (
    <section id="visit" className="section-padding" style={{ background: '#1E1812' }}>
      <Container>
        <SectionHeading
          eyebrow="Find Us"
          title={<>Visit <em style={{ color: '#D9A441', fontStyle: 'italic' }}>Us</em></>}
          subtitle="We're always brewing something good. Come say hello."
          center
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: '2rem',
          marginBottom: '3rem',
        }}>
          {/* Hours Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'rgba(20,16,12,0.8)',
              border: '1px solid rgba(111,78,55,0.25)',
              padding: '2.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <Clock size={20} color="#D9A441" />
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: '#F5EFE6' }}>
                Opening Hours
              </h3>
            </div>
            {hours.map((h, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '1rem 0',
                borderBottom: i < hours.length - 1 ? '1px solid rgba(111,78,55,0.2)' : 'none',
              }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(245,239,230,0.65)', fontSize: '0.9rem' }}>
                  {h.day}
                </span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", color: '#D9A441', fontWeight: 500, fontSize: '0.9rem' }}>
                  {h.time}
                </span>
              </div>
            ))}

            {/* Address */}
            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(111,78,55,0.2)' }}>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                <MapPin size={18} color="#D9A441" style={{ flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(245,239,230,0.65)', lineHeight: 1.7, fontSize: '0.9rem' }}>
                  42, The Crow Lane, Koramangala 5th Block,<br />
                  Bengaluru, Karnataka – 560034
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Phone size={18} color="#D9A441" style={{ flexShrink: 0, marginTop: 2 }} />
                <a
                  href="tel:+919876543210"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(245,239,230,0.65)', fontSize: '0.9rem', textDecoration: 'none' }}
                >
                  +91 98765 43210
                </a>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <Button
                variant="primary"
                href="https://wa.me/919876543210?text=Hi+Crow+Cafe!+I'd+like+to+book+a+table."
                magnetic
              >
                Book via WhatsApp
              </Button>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{ overflow: 'hidden', minHeight: 400, position: 'relative' }}
          >
            <iframe
              title="Crow Cafe Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.858539!2d77.620000!3d12.934000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKoramangala%2C+Bengaluru%2C+Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{
                border: 0, display: 'block', width: '100%', height: '100%', minHeight: 400,
                filter: 'invert(0.85) hue-rotate(180deg) saturate(0.8) brightness(0.8)',
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href="https://goo.gl/maps/koramangala"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'absolute', bottom: '1rem', right: '1rem',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                background: '#D9A441', color: '#14100C',
                padding: '0.5rem 1rem',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.75rem',
                textDecoration: 'none',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              <ExternalLink size={12} /> Open in Maps
            </a>
          </motion.div>
        </div>

        {/* Instagram Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginTop: '4rem' }}
        >
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.75rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(217,164,65,0.7)',
            marginBottom: '1.25rem',
            textAlign: 'center',
          }}>
            @crowcafe · Follow us on Instagram
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
            {instagramImages.map((src, i) => (
              <motion.a
                key={i}
                href="https://instagram.com/crowcafe"
                target="_blank"
                rel="noopener noreferrer"
                className="img-hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                style={{ display: 'block', aspectRatio: '1/1', overflow: 'hidden' }}
              >
                <img
                  src={src}
                  alt={`Crow Cafe Instagram ${i + 1}`}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
