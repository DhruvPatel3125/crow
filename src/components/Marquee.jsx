import { Coffee } from 'lucide-react';

const items = [
  'Fresh Brews',
  'Wood-Fired Bites',
  'Cozy Vibes',
  'Artisan Coffee',
  'Seasonal Specials',
  'Handcrafted Desserts',
];

function Row({ ariaHidden = false }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="font-serif italic font-medium text-lg md:text-xl tracking-wide px-6 md:px-8 whitespace-nowrap">
            {item}
          </span>
          <Coffee size={16} className="text-paper/70 shrink-0" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative bg-rust text-paper py-4 overflow-hidden -rotate-[0.6deg] scale-[1.02] shadow-[0_18px_40px_-20px_rgba(180,85,31,0.7)]">
      <div className="marquee-track flex w-max">
        <Row />
        <Row ariaHidden />
      </div>
    </div>
  );
}
