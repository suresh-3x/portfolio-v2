// Fast guard: no em/en dashes in shipping data, and key content present.
// Run: node scripts/check-content.mjs  (or `yarn check:content`)
import { profile, summary } from '../src/data/profile.js';
import { experienceEntries } from '../src/data/experience.js';
import { projects } from '../src/data/projects.js';
import { notes } from '../src/data/notes.js';

const DASH = /[–—]/; // en dash – , em dash —
const errors = [];

function scan(label, obj) {
  const s = JSON.stringify(obj);
  if (DASH.test(s)) {
    const idx = s.search(DASH);
    errors.push(`em/en dash in ${label} near: ...${s.slice(Math.max(0, idx - 40), idx + 20)}...`);
  }
}

scan('profile', profile);
scan('summary', summary);
scan('experience', experienceEntries);
scan('projects', projects);
scan('notes', notes);

if (!projects.some((p) => p.title === 'Revamp Engine' && p.featured)) {
  errors.push('Revamp Engine missing or not featured');
}
if (experienceEntries.length < 5) errors.push('expected >= 5 experience entries');
if (notes.length < 3) errors.push('expected >= 3 notes');

if (errors.length) {
  console.error('CONTENT CHECK FAILED:\n - ' + errors.join('\n - '));
  process.exit(1);
}
console.log('content check OK');
