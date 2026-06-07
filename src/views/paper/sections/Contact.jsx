import { Mail, Github, Linkedin, FileText } from 'lucide-react';
import { profile, education } from '../../../data/profile';

export default function Contact() {
  return (
    <section id="contact" className="p-section p-contact">
      <div className="p-h">
        <h2>Contact</h2>
        <span className="p-h-note">say hello</span>
      </div>

      <p className="p-contact-lede">
        Open to senior backend and AI roles. Based in {profile.location},{' '}
        {profile.relocation.toLowerCase()}.
      </p>

      <div className="p-links">
        <a className="p-link" href={`mailto:${profile.email}`}>
          <Mail size={14} strokeWidth={1.75} />
          <span>{profile.email}</span>
        </a>
        <a className="p-link" href={profile.github} target="_blank" rel="noopener noreferrer">
          <Github size={14} strokeWidth={1.75} />
          <span>{profile.githubLabel}</span>
        </a>
        <a className="p-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          <Linkedin size={14} strokeWidth={1.75} />
          <span>{profile.linkedinLabel}</span>
        </a>
        <a className="p-link" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
          <FileText size={14} strokeWidth={1.75} />
          <span>Resume</span>
        </a>
      </div>

      <p className="p-contact-edu">
        {education.degree}, {education.university}, {education.period}.
      </p>
    </section>
  );
}
