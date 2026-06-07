import { summary } from '../../../data/profile';

export default function About() {
  return (
    <section id="about" className="t-about">
      <div className="t-sec-h">
        <span className="t-sec-h__label mono">about</span>
        <span className="t-sec-h__count mono">~/about</span>
      </div>

      <div className="t-readme">
        <div className="t-readme__bar mono">
          <span className="t-readme__dots" aria-hidden="true">
            <i /><i /><i />
          </span>
          <span className="t-readme__path">~/about/readme.md</span>
        </div>
        <div className="t-readme__body">
          <p>{summary}</p>
        </div>
      </div>
    </section>
  );
}
