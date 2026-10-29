import { useEffect, useState, useRef } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const calledRef = useRef(false);

  useEffect(() => {
    const duration = 2200;
    let startTime = null;

    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        if (!calledRef.current) {
          calledRef.current = true;
          setFading(true);
          setTimeout(() => {
            onComplete();
          }, 600);
        }
      }
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: '#14100C',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      {/* Spinning Logo */}
      <div
        className="preloader-icon"
        style={{ width: 80, height: 80 }}
      >
        <img
          src="/logo-icon.png"
          alt="Crow Cafe"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'brightness(1.2) drop-shadow(0 0 12px rgba(217,164,65,0.5))',
          }}
        />
      </div>

      {/* Brand name */}
      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.4rem',
          color: '#F5EFE6',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
        }}>
          Crow Cafe
        </p>
      </div>

      {/* Progress bar */}
      <div style={{
        width: 200,
        height: 1,
        background: 'rgba(245,239,230,0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0,
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(to right, #6F4E37, #D9A441)',
            transition: 'width 0.08s linear',
          }}
        />
      </div>

      {/* Progress counter */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.7rem',
        color: 'rgba(245,239,230,0.4)',
        letterSpacing: '0.2em',
      }}>
        {String(progress).padStart(3, '0')}
      </p>
    </div>
  );
}
