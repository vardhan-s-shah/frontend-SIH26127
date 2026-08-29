import { useState, useEffect, useCallback } from 'react';

type Theme = 'dark' | 'light';

const LS_KEY = 'anpr-ops-theme';

/**
 * Reads & persists the page background theme to localStorage.
 * Applies data-theme="dark"|"light" to <html> so the CSS variable
 * --bg-canvas can be driven purely from CSS with zero inline style juggling.
 * All panel/card/sidebar backgrounds are unaffected — they have their own
 * explicit Tailwind classes and do not inherit from --bg-canvas.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {
      // localStorage not available (e.g. SSR or private browsing with restriction)
    }
    return 'dark';
  });

  // Apply data-theme attribute to <html> whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(LS_KEY, theme);
    } catch {
      // Silently swallow — preference just won't persist
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
}
