import { profile } from '../../../data/profile';
import SectionHead from '../SectionHead';

export default function Contact() {
  return (
    <section id="contact" className="t-contact">
      <SectionHead title="contact" headline="Let's talk." />

      <div className="t-prompt">
        <a
          className="t-prompt__line t-prompt__line--primary mono"
          href={profile.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="t-prompt__pr">$</span>
          <span className="t-prompt__cmd">book --call</span>
          <span className="t-prompt__val">{profile.bookingLabel}</span>
        </a>
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
        {' '}/ AI roles and consulting
      </p>
    </section>
  );
}
