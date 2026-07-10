import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, '../public/images/projects');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Geometric SVGs mapped to projects to perfectly align with Swiss / Industrial themes.
const projects = [
  { name: 'revamp-engine.svg', color: '#f5a623', symbol: '<rect x="30" y="30" width="40" height="40" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="50" cy="50" r="10" fill="currentColor"/>' },
  { name: 'nomad-mind.svg', color: '#1a56db', symbol: '<circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="4"/><line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" stroke-width="4"/><line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" stroke-width="4"/>' },
  { name: 'cal-self-hosted.svg', color: '#00E676', symbol: '<rect x="20" y="20" width="60" height="60" rx="4" fill="none" stroke="currentColor" stroke-width="4"/><line x1="20" y1="40" x2="80" y2="40" stroke="currentColor" stroke-width="4"/><circle cx="40" cy="60" r="4" fill="currentColor"/>' },
  { name: 'taiga.svg', color: '#FF3B30', symbol: '<path d="M20,80 L50,20 L80,80 Z" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="50" cy="60" r="5" fill="currentColor"/>' },
  { name: 'apex-ohol.svg', color: '#FFB800', symbol: '<line x1="30" y1="20" x2="30" y2="80" stroke="currentColor" stroke-width="4"/><rect x="20" y="40" width="20" height="30" fill="currentColor"/><line x1="70" y1="20" x2="70" y2="80" stroke="currentColor" stroke-width="4"/><rect x="60" y="30" width="20" height="20" fill="none" stroke="currentColor" stroke-width="4"/>' },
  { name: 'homeground.svg', color: '#C6FF4A', symbol: '<path d="M10,50 L50,20 L90,50" fill="none" stroke="currentColor" stroke-width="4"/><rect x="25" y="50" width="50" height="30" fill="none" stroke="currentColor" stroke-width="4"/><rect x="45" y="60" width="10" height="20" fill="currentColor"/>' },
  { name: 'bizassist.svg', color: '#FF006E', symbol: '<rect x="20" y="50" width="15" height="30" fill="currentColor"/><rect x="42" y="30" width="15" height="50" fill="currentColor"/><rect x="65" y="10" width="15" height="70" fill="currentColor"/>' },
  { name: 'cal-contributions.svg', color: '#A855F7', symbol: '<rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" stroke-width="4"/><path d="M25,50 L75,50 M50,25 L50,75" stroke="currentColor" stroke-width="4"/>' },
  { name: 'smax-ai-blog.svg', color: '#00F0FF', symbol: '<rect x="20" y="30" width="60" height="40" fill="none" stroke="currentColor" stroke-width="4"/><line x1="30" y1="40" x2="70" y2="40" stroke="currentColor" stroke-width="4"/><line x1="30" y1="50" x2="50" y2="50" stroke="currentColor" stroke-width="4"/>' },
  { name: 'turf-app.svg', color: '#00E676', symbol: '<circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="4"/><path d="M25,50 Q50,25 75,50 Q50,75 25,50 Z" fill="none" stroke="currentColor" stroke-width="4"/>' },
  { name: 'tm.svg', color: '#FFB800', symbol: '<line x1="20" y1="20" x2="40" y2="40" stroke="currentColor" stroke-width="4"/><line x1="20" y1="80" x2="40" y2="60" stroke="currentColor" stroke-width="4"/><rect x="50" y="20" width="30" height="60" fill="none" stroke="currentColor" stroke-width="4"/>' },
  { name: 'smax-bookings.png', color: '#00FFFF', isPng: true },
  { name: 'default.svg', color: '#8b8b86', symbol: '<rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" stroke-width="2"/><line x1="10" y1="10" x2="90" y2="90" stroke="currentColor" stroke-width="2"/><line x1="90" y1="10" x2="10" y2="90" stroke="currentColor" stroke-width="2"/>' },
];

projects.forEach(p => {
  const content = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%" style="background:#0e0e10; color:${p.color};">
  ${p.symbol || '<rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" stroke-width="4"/>'}
</svg>`;
  
  fs.writeFileSync(path.join(dir, p.name), content);
});

console.log('SVGs generated successfully.');
