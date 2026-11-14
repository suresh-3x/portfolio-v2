import { useTheme } from '../context/ThemeContext';

const THEMES = ['dark', 'light'];

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="view-switch" role="group" aria-label="Theme">
      <span className="view-switch__label">Theme</span>
      <div className="view-switch__track">
        {THEMES.map((t) => (
          <button
            key={t}
            type="button"
            className={`view-switch__btn${theme === t ? ' is-active' : ''}`}
            aria-pressed={theme === t}
            onClick={() => setTheme(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
