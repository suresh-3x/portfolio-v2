/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ViewContext = createContext(null);
const STORAGE_KEY = 'portfolio-view';
const VALID = ['terminal', 'paper'];

function initialView() {
  if (typeof window === 'undefined') return 'terminal';
  const p = new URLSearchParams(window.location.search).get('view');
  if (VALID.includes(p)) return p;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (VALID.includes(stored)) return stored;
  // Mirror whatever the no-flash script in index.html already committed.
  const attr = document.documentElement.getAttribute('data-view');
  return VALID.includes(attr) ? attr : 'terminal';
}

export function ViewProvider({ children }) {
  const [view, setViewState] = useState(initialView);

  useEffect(() => {
    document.documentElement.setAttribute('data-view', view);
    try {
      localStorage.setItem(STORAGE_KEY, view);
    } catch {
      /* storage unavailable; ignore */
    }
  }, [view]);

  const setView = useCallback((v) => {
    if (VALID.includes(v)) setViewState(v);
  }, []);

  const toggleView = useCallback(() => {
    setViewState((v) => (v === 'terminal' ? 'paper' : 'terminal'));
  }, []);

  return (
    <ViewContext.Provider value={{ view, setView, toggleView }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const ctx = useContext(ViewContext);
  if (!ctx) throw new Error('useView must be used within ViewProvider');
  return ctx;
}
