import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from '../src/data/projects.js';
import { notes } from '../src/data/notes.js';
import { profile, summary, education } from '../src/data/profile.js';
import { experienceEntries } from '../src/data/experience.js';
import { primarySkillsets } from '../src/data/skills.js';
import { matchRoute, getPageMetadata } from '../src/router/routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist. Run vite build first.');
  process.exit(1);
}

const templatePath = path.join(distDir, 'index.html');
const baseHtml = fs.readFileSync(templatePath, 'utf8');

const routesToPrerender = [
  '/projects',
  ...projects.map((p) => `/projects/${p.slug}`),
  '/experience',
  '/about',
  '/stack',
  '/notes',
  ...notes.map((n) => `/notes/${n.slug}`),
];

function generateFallbackHtml(route) {
  const meta = getPageMetadata(route);

  switch (route.id) {
    case 'projects':
      return `
        <div class="page-container" style="max-width: 1200px; margin: 0 auto; padding: 2rem 1rem; font-family: sans-serif;">
          <h1>${meta.title.split('|')[0].trim()}</h1>
          <p>${meta.description}</p>
          <h2>Production Engineering Systems</h2>
          <ul>
            ${projects.map((p) => `
              <li>
                <strong><a href="/projects/${p.slug}">${p.title}</a></strong> (${p.category}, ${p.year}): ${p.description}
              </li>
            `).join('')}
          </ul>
        </div>
      `;

    case 'project-detail': {
      const p = route.data || projects.find((item) => item.slug === route.params.slug);
      if (!p) return `<h1>Project Not Found</h1>`;
      return `
        <div class="page-container" style="max-width: 900px; margin: 0 auto; padding: 2rem 1rem; font-family: sans-serif;">
          <p><a href="/projects">&larr; Back to all projects</a></p>
          <h1>${p.title}</h1>
          <p><strong>Category:</strong> ${p.category} | <strong>Year:</strong> ${p.year}</p>
          <p>${p.description}</p>

          ${p.image ? `
            <figure style="margin: 2rem 0;">
              <img src="${p.image}" alt="${p.title} - Architecture overview and production interface snapshot" style="max-width: 100%; height: auto; border-radius: 8px;" />
              ${p.image_caption ? `<figcaption style="font-size: 0.85rem; color: #666; margin-top: 0.5rem;">${p.image_caption}</figcaption>` : ''}
            </figure>
          ` : ''}

          ${p.problem ? `<h2>The Challenge & Problem</h2><p>${p.problem}</p>` : ''}
          ${p.solution ? `<h2>Engineered Solution</h2><p>${p.solution}</p>` : ''}
          ${p.architecture_summary ? `<h2>Architecture & System Design</h2><p>${p.architecture_summary}</p>` : ''}
          ${p.long_description ? `<h2>Implementation Details</h2><p>${p.long_description}</p>` : ''}

          ${p.highlights ? `<h2>Key Highlights</h2><ul>${p.highlights.map((h) => `<li>${h}</li>`).join('')}</ul>` : ''}

          ${p.tags ? `<h2>Technologies Used</h2><p>${p.tags.join(', ')}</p>` : ''}

          ${p.links?.github ? `<p><a href="${p.links.github}">View GitHub Repository</a></p>` : ''}
        </div>
      `;
    }

    case 'experience':
      return `
        <div class="page-container" style="max-width: 900px; margin: 0 auto; padding: 2rem 1rem; font-family: sans-serif;">
          <h1>${meta.title.split('|')[0].trim()}</h1>
          <p>${meta.description}</p>
          ${experienceEntries.map((exp) => `
            <article style="margin: 2rem 0; padding-bottom: 1.5rem; border-bottom: 1px solid #eee;">
              <h2>${exp.role} at ${exp.company}</h2>
              <p><strong>Period:</strong> ${exp.period} | <strong>Location:</strong> ${exp.location}</p>
              <ul>
                ${exp.description.map((d) => `<li>${d}</li>`).join('')}
              </ul>
            </article>
          `).join('')}
        </div>
      `;

    case 'about':
      return `
        <div class="page-container" style="max-width: 900px; margin: 0 auto; padding: 2rem 1rem; font-family: sans-serif;">
          <h1>About ${profile.name}</h1>
          <p><strong>${profile.title}</strong> | ${profile.location}</p>
          <h2>Engineering Journey</h2>
          <p>${summary}</p>
          <h2>Education</h2>
          <p>${education.degree} - ${education.universityFull} (${education.period}, ${education.gpa})</p>
          <h2>Contact</h2>
          <p>Email: <a href="mailto:${profile.email}">${profile.email}</a></p>
          <p>GitHub: <a href="${profile.github}">${profile.github}</a></p>
          <p>LinkedIn: <a href="${profile.linkedin}">${profile.linkedin}</a></p>
        </div>
      `;

    case 'stack':
      return `
        <div class="page-container" style="max-width: 900px; margin: 0 auto; padding: 2rem 1rem; font-family: sans-serif;">
          <h1>${meta.title.split('|')[0].trim()}</h1>
          <p>${meta.description}</p>
          ${primarySkillsets.map((s) => `
            <section style="margin: 1.5rem 0;">
              <h2>${s.title}</h2>
              <p>${s.summary}</p>
              <p><strong>Skills:</strong> ${s.skills.join(', ')}</p>
            </section>
          `).join('')}
        </div>
      `;

    case 'notes':
      return `
        <div class="page-container" style="max-width: 900px; margin: 0 auto; padding: 2rem 1rem; font-family: sans-serif;">
          <h1>${meta.title.split('|')[0].trim()}</h1>
          <p>${meta.description}</p>
          ${notes.map((n) => `
            <article style="margin: 2rem 0;">
              <h2><a href="/notes/${n.slug}">${n.title}</a></h2>
              <p><strong>Date:</strong> ${n.date} | <strong>Reading Time:</strong> ${n.readingTime || '5 min read'}</p>
              <p>${n.abstract}</p>
            </article>
          `).join('')}
        </div>
      `;

    case 'note-detail': {
      const n = route.data || notes.find((item) => item.slug === route.params.slug);
      if (!n) return `<h1>Note Not Found</h1>`;
      return `
        <div class="page-container" style="max-width: 800px; margin: 0 auto; padding: 2rem 1rem; font-family: sans-serif;">
          <p><a href="/notes">&larr; Back to all notes</a></p>
          <h1>${n.title}</h1>
          <p><strong>Date:</strong> ${n.date} | <strong>Author:</strong> ${profile.name}</p>
          <p><em>${n.abstract}</em></p>
          ${n.sections ? n.sections.map((s) => `
            <h2>${s.heading}</h2>
            ${s.paragraphs.map((p) => `<p>${p}</p>`).join('')}
          `).join('') : ''}
          ${n.takeaways ? `<h2>Key Takeaways</h2><ul>${n.takeaways.map((t) => `<li>${t}</li>`).join('')}</ul>` : ''}
        </div>
      `;
    }

    default:
      return `<h1>${meta.title}</h1><p>${meta.description}</p>`;
  }
}

console.log(`Prerendering ${routesToPrerender.length} static SEO routes...`);

let count = 0;
for (const pathname of routesToPrerender) {
  const route = matchRoute(pathname);
  const meta = getPageMetadata(route);

  let html = baseHtml;

  // Replace title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`);

  // Replace meta title
  html = html.replace(/<meta\s+name="title"\s+content="[^"]*"\s*\/?>/i, `<meta name="title" content="${meta.title}" />`);

  // Replace meta description
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${meta.description}" />`);

  // Replace canonical
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${meta.canonical}" />`);

  // Replace OpenGraph tags
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${meta.title}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${meta.description}" />`);
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${meta.canonical}" />`);
  html = html.replace(/<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:type" content="${meta.ogType || 'website'}" />`);

  // Replace Twitter tags
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${meta.title}" />`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${meta.description}" />`);
  html = html.replace(/<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:url" content="${meta.canonical}" />`);

  // Injected structured data if present
  if (meta.jsonLd) {
    const jsonLdString = JSON.stringify(meta.jsonLd);
    const jsonLdTag = `<script type="application/ld+json">\n${jsonLdString}\n</script>`;
    html = html.replace('</head>', `  ${jsonLdTag}\n</head>`);
  }

  // Replace noscript and root with crawlable fallback HTML
  const fallbackContent = generateFallbackHtml(route);
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/i, `<noscript>${fallbackContent}</noscript>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${fallbackContent}</div>`);

  // Destination path: dist/pathname/index.html
  const targetDir = path.join(distDir, pathname.replace(/^\//, ''));
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const targetFile = path.join(targetDir, 'index.html');
  fs.writeFileSync(targetFile, html, 'utf8');
  count++;
}

console.log(`Successfully generated static HTML pages for ${count} routes.`);
