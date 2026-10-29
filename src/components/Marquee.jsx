const items = [
  'FRESH BREWS', 'WOOD-FIRED BITES', 'COZY VIBES',
  'ARTISAN COFFEE', 'SEASONAL SPECIALS', 'HANDCRAFTED LOVE',
  'FRESH BREWS', 'WOOD-FIRED BITES', 'COZY VIBES',
  'ARTISAN COFFEE', 'SEASONAL SPECIALS', 'HANDCRAFTED LOVE',
];

export default function Marquee() {
  return (
    <div
      id="marquee"
      style={{
        overflow: 'hidden',
        borderTop: '1px solid rgba(111,78,55,0.3)',
        borderBottom: '1px solid rgba(111,78,55,0.3)',
        background: '#1E1812',
        padding: '1.25rem 0',
      }}
    >
      <div className="marquee-track" style={{ display: 'flex', width: 'max-content', gap: 0 }}>
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1.5rem',
              paddingInline: '2rem',
            }}
          >
            <span
              className="text-outline"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
            </span>
            <span style={{ color: '#D9A441', fontSize: '1.2rem', opacity: 0.8 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
