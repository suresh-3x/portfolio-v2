/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext(null);
const STORAGE_KEY = 'portfolio-theme';
const VALID = ['dark', 'light'];

// The no-flash script in index.html already picked the theme; mirror it.
function initialTheme() {
  if (typeof document === 'undefined') return 'dark';
  const attr = document.documentElement.getAttribute('data-theme');
  return VALID.includes(attr) ? attr : 'dark';
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Only an explicit choice is saved; otherwise the OS setting keeps deciding.
  const setTheme = useCallback((t) => {
    if (!VALID.includes(t)) return;
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* storage unavailable; ignore */
    }
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
