import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, ExternalLink } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Container from './Container';
import { Button } from './Button';

const ease = [0.22, 1, 0.36, 1];

const hours = [
  { day: 'Monday – Friday', time: '7:30 AM – 10:00 PM' },
  { day: 'Saturday', time: '8:00 AM – 11:00 PM' },
  { day: 'Sunday', time: '9:00 AM – 9:00 PM' },
];

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.858539!2d77.620000!3d12.934000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKoramangala%2C+Bengaluru%2C+Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin';

export default function Visit() {
  return (
    <section id="visit" className="bg-paper pb-24 md:pb-36 pt-4">
      <Container>
        <SectionHeading
          eyebrow="Find Us"
          title={<>Visit <em className="italic text-rust">Us</em></>}
          subtitle="Tucked into a leafy Koramangala lane — follow the smell of fresh espresso."
        />

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          className="bg-sand rounded-[28px] overflow-hidden grid lg:grid-cols-2 border border-espresso/10 shadow-[0_44px_80px_-40px_rgba(34,26,20,0.42),0_14px_30px_-18px_rgba(180,85,31,0.18)]"
        >
          {/* Info side */}
          <div className="p-8 md:p-12 lg:p-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-11 h-11 rounded-full bg-paper flex items-center justify-center text-rust">
                <Clock size={19} />
              </span>
              <h3 className="font-serif text-2xl font-semibold text-espresso">Opening Hours</h3>
            </div>

            <ul>
              {hours.map((h) => (
                <li key={h.day} className="flex items-baseline py-3.5">
                  <span className="font-medium text-bark">{h.day}</span>
                  <span className="dot-leader" aria-hidden />
                  <span className="font-serif font-semibold text-espresso whitespace-nowrap">{h.time}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-8 border-t border-espresso/12 space-y-4">
              <div className="flex gap-3.5">
                <MapPin size={19} className="text-rust shrink-0 mt-0.5" />
                <p className="text-bark leading-relaxed text-[0.95rem]">
                  42, The Crow Lane, Koramangala 5th Block,<br />
                  Bengaluru, Karnataka – 560034
                </p>
              </div>
              <div className="flex gap-3.5 items-center">
                <Phone size={19} className="text-rust shrink-0" />
                <a href="tel:+919876543210" className="text-bark text-[0.95rem] hover:text-rust transition-colors">
                  +91 98765 43210
                </a>
              </div>
            </div>

            <div className="mt-9">
              <Button
                variant="primary"
                href="https://wa.me/919876543210?text=Hi+Crow+Cafe!+I'd+like+to+book+a+table."
                magnetic
              >
                Book via WhatsApp
              </Button>
            </div>
          </div>

          {/* Map side */}
          <div className="relative min-h-[380px] lg:min-h-full">
            <iframe
              title="Crow Cafe Location Map"
              src={MAP_EMBED}
              className="absolute inset-0 w-full h-full border-0"
              style={{ filter: 'sepia(0.22) saturate(0.85)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href="https://goo.gl/maps/koramangala"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 bg-espresso text-paper px-4 py-2.5 rounded-full text-[0.68rem] font-semibold uppercase tracking-[0.16em] hover:bg-rust transition-colors"
            >
              <ExternalLink size={12} /> Open in Maps
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
