import { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Visit from './components/Visit';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <div style={{
        opacity: loaded ? 1 : 0,
        backgroundColor: 'var(--color-paper)',
        transition: 'opacity 0.6s ease',
        pointerEvents: loaded ? 'auto' : 'none',
      }}>
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Menu />
          <Gallery />
          <Testimonials />
          <Visit />
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </>
  );
}
