import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import Container from './Container';

const galleryImages = [
  {
    src: 'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'The Crow Interior',
    span: 'tall',
  },
  {
    src: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Perfect Espresso Pull',
    span: 'normal',
  },
  {
    src: 'https://images.pexels.com/photos/3907829/pexels-photo-3907829.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Latte Art in Progress',
    span: 'normal',
  },
  {
    src: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Morning Cappuccino',
    span: 'tall',
  },
  {
    src: 'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Croissant & Coffee',
    span: 'normal',
  },
  {
    src: 'https://images.pexels.com/photos/6205791/pexels-photo-6205791.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Golden Hour Vibes',
    span: 'normal',
  },
  {
    src: 'https://images.pexels.com/photos/4349762/pexels-photo-4349762.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Crafting the Perfect Pour',
    span: 'tall',
  },
  {
    src: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Sweet Endings',
    span: 'normal',
  },
];

function GalleryItem({ img, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="masonry-item"
      style={{ position: 'relative', cursor: 'pointer', overflow: 'hidden' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ overflow: 'hidden', aspectRatio: img.span === 'tall' ? '3/4' : '4/3' }}>
        <motion.img
          src={img.src}
          alt={img.caption}
          loading="lazy"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* Caption overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(20,16,12,0.85) 0%, transparent 60%)',
          display: 'flex', alignItems: 'flex-end', padding: '1.25rem',
        }}
      >
        <motion.p
          initial={{ y: 10 }}
          animate={{ y: hovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#F5EFE6',
          }}
        >
          {img.caption}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="section-padding" style={{ background: '#1E1812' }}>
      <Container>
        <SectionHeading
          eyebrow="Moments"
          title={<>Our <em style={{ color: '#D9A441', fontStyle: 'italic' }}>Gallery</em></>}
          subtitle="Every visit leaves an impression. Here are some of ours."
          center
        />

        <div className="masonry">
          {galleryImages.map((img, i) => (
            <GalleryItem key={i} img={img} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
