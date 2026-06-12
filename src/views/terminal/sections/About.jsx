import { profile, education, summaryTerminal } from '../../../data/profile';

export default function About() {
  return (
    <section id="about" className="t-about">
      <div className="t-sec-h">
        <span className="t-sec-h__label mono">
          <span className="t-sec-h__num">01</span>about
        </span>
        <span className="t-sec-h__count mono">~/about</span>
      </div>

      <div className="t-readme">
        <div className="t-readme__bar mono">
          <span className="t-readme__dots" aria-hidden="true">
            <i /><i /><i />
          </span>
          <span className="t-readme__path">~/about/readme.md</span>
        </div>
        <div className="t-readme__split">
          <div className="t-readme__body">
            <p>{summaryTerminal}</p>
          </div>
          <aside className="t-readme__meta mono" aria-label="Education and resume">
            <p className="t-readme__cmd">
              <span className="t-readme__prompt">$</span>cat meta
            </p>
            <dl className="t-readme__facts">
              <dt>edu</dt>
              <dd title={education.universityFull}>
                BCA, {education.university} &middot; {education.period}
              </dd>
              <dt>gpa</dt>
              <dd>{education.gpa.replace('GPA ', '')}</dd>
              <dt>resume</dt>
              <dd>
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                  resume.pdf
                </a>
              </dd>
              <dt>updated</dt>
              <dd>{profile.lastUpdated}</dd>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
