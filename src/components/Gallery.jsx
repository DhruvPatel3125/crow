import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import Container from './Container';

const ease = [0.22, 1, 0.36, 1];

/* Asymmetric editorial grid — span classes per tile */
const galleryImages = [
  {
    src: 'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=1000',
    caption: 'The Crow Interior',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=700',
    caption: 'Perfect Espresso Pull',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=700',
    caption: 'Latte Art in Progress',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=700',
    caption: 'Morning Cappuccino',
    span: 'row-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=700',
    caption: 'Croissant & Coffee',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/6205791/pexels-photo-6205791.jpeg?auto=compress&cs=tinysrgb&w=700',
    caption: 'Golden Hour Vibes',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/4349762/pexels-photo-4349762.jpeg?auto=compress&cs=tinysrgb&w=1000',
    caption: 'Crafting the Perfect Pour',
    span: 'col-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=700',
    caption: 'Sweet Endings',
    span: 'col-span-2 md:col-span-1',
  },
];

function GalleryItem({ img, index }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.07, ease }}
      className={`group relative overflow-hidden rounded-[20px] cursor-pointer min-h-[180px] shadow-[0_22px_44px_-24px_rgba(34,26,20,0.35)] ring-1 ring-espresso/10 ${img.span}`}
    >
      <img
        src={img.src}
        alt={img.caption}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]"
      />
      <div aria-hidden className="warm-img-overlay opacity-70" />
      <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl bg-paper/92 backdrop-blur-sm border border-espresso/8 shadow-[0_14px_30px_-14px_rgba(34,26,20,0.4)] px-4 py-3 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-400">
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] leading-snug text-espresso min-w-0">
          {img.caption}
        </span>
        <span className="font-serif italic text-rust text-sm shrink-0 hidden sm:inline">Crow Cafe</span>
      </figcaption>
    </motion.figure>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="bg-paper py-24 md:py-36">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
          <SectionHeading
            eyebrow="Moments"
            title={<>From Our <em className="italic text-rust">Corner</em></>}
            center={false}
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="text-cocoa leading-relaxed max-w-[340px] mb-12 md:mb-16"
          >
            Every visit leaves an impression. Here are a few of ours — shot
            between pours, plating and golden hour.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[210px] gap-3 md:gap-4 -mt-6">
          {galleryImages.map((img, i) => (
            <GalleryItem key={i} img={img} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
