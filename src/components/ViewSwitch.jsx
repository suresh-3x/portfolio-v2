import { useView } from '../context/ViewContext';

const VIEWS = ['terminal', 'paper'];

export default function ViewSwitch() {
  const { view, setView } = useView();
  return (
    <div className="view-switch" role="group" aria-label="View">
      <span className="view-switch__label">View</span>
      <div className="view-switch__track">
        {VIEWS.map((v) => (
          <button
            key={v}
            type="button"
            className={`view-switch__btn${view === v ? ' is-active' : ''}`}
            aria-pressed={view === v}
            onClick={() => setView(v)}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
