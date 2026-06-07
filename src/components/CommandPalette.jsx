import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useView } from '../context/ViewContext';
import { profile } from '../data/profile';

const SECTIONS = ['about', 'work', 'experience', 'stack', 'notes', 'contact'];

export default function CommandPalette() {
  const { setView } = useView();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [i, setI] = useState(0);
  const inputRef = useRef(null);
  const openRef = useRef(false);

  const openPalette = useCallback(() => {
    setQ('');
    setI(0);
    setOpen(true);
  }, []);

  const actions = useMemo(() => [
    ...SECTIONS.map((s) => ({
      id: `go-${s}`,
      label: `Go to ${s}`,
      run: () => { window.location.hash = `#${s}`; },
    })),
    { id: 'view-terminal', label: 'Switch view: terminal', run: () => setView('terminal') },
    { id: 'view-paper', label: 'Switch view: paper', run: () => setView('paper') },
    { id: 'github', label: 'Open GitHub', run: () => window.open(profile.github, '_blank', 'noopener') },
    { id: 'linkedin', label: 'Open LinkedIn', run: () => window.open(profile.linkedin, '_blank', 'noopener') },
    { id: 'resume', label: 'Open resume', run: () => window.open(profile.resumeUrl, '_blank', 'noopener') },
    { id: 'email', label: 'Copy email', run: () => navigator.clipboard?.writeText(profile.email) },
  ], [setView]);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? actions.filter((a) => a.label.toLowerCase().includes(t)) : actions;
  }, [q, actions]);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (openRef.current) setOpen(false);
        else openPalette();
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-command-palette', openPalette);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-command-palette', openPalette);
    };
  }, [openPalette]);

  useEffect(() => {
    if (!open) return undefined;
    const t = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [open]);

  if (!open) return null;

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setI((n) => Math.min(n + 1, filtered.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setI((n) => Math.max(n - 1, 0));
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      filtered[i]?.run();
      setOpen(false);
    }
  };

  return (
    <div
      className="cmdk"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={() => setOpen(false)}
    >
      <div className="cmdk__panel" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="cmdk__input"
          placeholder="Type a command or search..."
          value={q}
          onChange={(e) => { setQ(e.target.value); setI(0); }}
          onKeyDown={onKeyDown}
          aria-label="Command palette search"
        />
        <ul className="cmdk__list">
          {filtered.map((a, idx) => (
            <li key={a.id}>
              <button
                type="button"
                className={`cmdk__item${idx === i ? ' is-active' : ''}`}
                onMouseEnter={() => setI(idx)}
                onClick={() => { a.run(); setOpen(false); }}
              >
                {a.label}
              </button>
            </li>
          ))}
          {filtered.length === 0 && <li className="cmdk__empty">No matches</li>}
        </ul>
      </div>
    </div>
  );
}
