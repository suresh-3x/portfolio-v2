import { profile } from '../../../data/profile';

export default function Contact() {
  return (
    <section id="contact" className="t-contact">
      <div className="t-sec-h">
        <span className="t-sec-h__label mono">contact</span>
        <span className="t-sec-h__count mono">~/contact</span>
      </div>

      <div className="t-prompt">
        <a
          className="t-prompt__line mono"
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="t-prompt__pr">$</span>
          <span className="t-prompt__cmd">open github</span>
          <span className="t-prompt__val">{profile.githubLabel}</span>
        </a>
        <a className="t-prompt__line mono" href={'mailto:' + profile.email}>
          <span className="t-prompt__pr">$</span>
          <span className="t-prompt__cmd">mail</span>
          <span className="t-prompt__val">{profile.email}</span>
        </a>
        <a
          className="t-prompt__line mono"
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="t-prompt__pr">$</span>
          <span className="t-prompt__cmd">resume</span>
          <span className="t-prompt__val">resume-sde.pdf</span>
        </a>
        <a
          className="t-prompt__line mono"
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="t-prompt__pr">$</span>
          <span className="t-prompt__cmd">open linkedin</span>
          <span className="t-prompt__val">{profile.linkedinLabel}</span>
        </a>
      </div>

      <p className="t-contact__open mono">
        <span className="t-contact__ok">&rsaquo;</span> open to senior backend
        {' '}/ AI roles
      </p>

      <p className="t-contact__hint mono">
        press <kbd>&#8984;</kbd><kbd>K</kbd> to jump anywhere
      </p>
    </section>
  );
}
