import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
// lucide-react icons not needed in this component
import SectionHeading from './SectionHeading';
import Container from './Container';
import { menuData } from '../data/menu';

const tabs = Object.keys(menuData);

function MenuCard({ item, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="card-glow"
      style={{
        background: item.isChefSpecial
          ? 'linear-gradient(135deg, rgba(217,164,65,0.12) 0%, rgba(30,24,18,0.8) 100%)'
          : 'rgba(30,24,18,0.8)',
        border: item.isChefSpecial
          ? '1px solid rgba(217,164,65,0.35)'
          : '1px solid rgba(111,78,55,0.2)',
        padding: '1.5rem',
        position: 'relative',
        cursor: 'default',
      }}
    >
      {/* Chef Special Badge */}
      {item.isChefSpecial && (
        <div style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: '#D9A441',
          color: '#14100C',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.6rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          fontWeight: 600,
          padding: '0.3rem 0.7rem',
        }}>
          Chef's Special
        </div>
      )}

      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Veg / Non-veg indicator */}
          <div style={{
            width: 14, height: 14, minWidth: 14,
            border: `1.5px solid ${item.isVeg ? '#22c55e' : '#ef4444'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              background: item.isVeg ? '#22c55e' : '#ef4444',
            }} />
          </div>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.1rem',
            fontWeight: 600,
            color: '#F5EFE6',
            lineHeight: 1.3,
          }}>
            {item.name}
          </h3>
        </div>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.15rem',
          color: '#D9A441',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          ₹{item.price}
        </span>
      </div>

      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.88rem',
        color: 'rgba(245,239,230,0.55)',
        lineHeight: 1.7,
      }}>
        {item.description}
      </p>

      {/* Bottom accent line on hover */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        height: 2, width: '0%',
        background: '#D9A441',
        transition: 'width 0.4s ease',
      }}
        onMouseEnter={(e) => { e.currentTarget.style.width = '100%'; }}
        onMouseLeave={(e) => { e.currentTarget.style.width = '0%'; }}
      />
    </motion.div>
  );
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section id="menu" className="section-padding" style={{ background: '#14100C' }}>
      <Container>
        <SectionHeading
          eyebrow="What We Serve"
          title={<>Our <em style={{ color: '#D9A441', fontStyle: 'italic' }}>Menu</em></>}
          subtitle="Every item is crafted with intent. Sourced locally, prepared with care, served with love."
          center
        />

        {/* Tabs */}
        <LayoutGroup>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.25rem',
            marginBottom: '3.5rem',
            background: 'rgba(30,24,18,0.6)',
            padding: '0.4rem',
            width: 'fit-content',
            marginInline: 'auto',
          }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  position: 'relative',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  padding: '0.75rem 2rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: activeTab === tab ? '#14100C' : 'rgba(245,239,230,0.55)',
                  transition: 'color 0.3s ease',
                  zIndex: 1,
                }}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-bg"
                    style={{
                      position: 'absolute', inset: 0,
                      background: '#D9A441',
                      zIndex: -1,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>
        </LayoutGroup>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
              gap: '1.25rem',
            }}
          >
            {menuData[activeTab].map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
