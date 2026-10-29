import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

/**
 * Sun/Moon theme toggle. Controlled by Navbar, which owns the theme
 * state (the initial value is read from the `.dark` class the inline
 * script in index.html set on <html> before first paint).
 *
 * - default: 44px circular icon button (desktop nav + mobile header)
 * - labeled: full-width row for the mobile overlay menu
 */
export default function ThemeToggle({ theme, onToggle, labeled = false, className = '' }) {
  const isDark = theme === 'dark';
  const Icon = isDark ? Sun : Moon;
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  if (labeled) {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-label={label}
        aria-pressed={isDark}
        className={`flex w-full min-h-[52px] items-center justify-between gap-4 rounded-full border border-espresso/15 px-5 text-espresso cursor-pointer ${className}`}
      >
        <span className="eyebrow text-cocoa">Appearance</span>
        <span className="flex items-center gap-2 text-sm font-semibold">
          <Icon size={18} className="text-rust" />
          {isDark ? 'Dark' : 'Light'}
        </span>
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      className={`w-11 h-11 shrink-0 rounded-full border border-espresso/20 flex items-center justify-center text-espresso hover:text-rust hover:border-rust transition-colors cursor-pointer ${className}`}
    >
      <Icon size={19} />
    </motion.button>
  );
}
