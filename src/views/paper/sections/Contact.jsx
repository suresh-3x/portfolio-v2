import { CalendarDays, Mail, Github, Linkedin, FileText } from 'lucide-react';
import { profile } from '../../../data/profile';

export default function Contact() {
  return (
    <section id="contact" className="p-section p-contact">
      <div className="p-h">
        <h2>Contact</h2>
        <span className="p-h-note">say hello</span>
      </div>

      <p className="p-contact-lede">
        Open to senior backend and AI roles, and to consulting on backend, distributed
        systems, and agentic AI. Based in {profile.location},{' '}
        {profile.relocation.toLowerCase()}. The fastest way to talk is a call.
      </p>

      <div className="p-links">
        <a
          className="p-link p-link--primary"
          href={profile.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <CalendarDays size={14} strokeWidth={1.75} />
          <span>Book a call for a discussion or consultation</span>
          <span className="p-link__meta">{profile.bookingLabel}</span>
        </a>
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
    </section>
  );
}
