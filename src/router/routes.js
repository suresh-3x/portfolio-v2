import { projects } from '../data/projects.js';
import { notes } from '../data/notes.js';
import { profile, atsKeywords } from '../data/profile.js';
import { experienceEntries } from '../data/experience.js';

export function matchRoute(pathname) {
  // Normalize pathname: remove trailing slash except for root
  const cleanPath = pathname.length > 1 && pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname;

  if (cleanPath === '' || cleanPath === '/') {
    return { id: 'home', path: '/', params: {} };
  }

  if (cleanPath === '/projects') {
    return { id: 'projects', path: '/projects', params: {} };
  }

  const projectMatch = cleanPath.match(/^\/projects\/([a-zA-Z0-9_-]+)$/);
  if (projectMatch) {
    const slug = projectMatch[1];
    const project = projects.find((p) => p.slug === slug);
    if (project) {
      return { id: 'project-detail', path: cleanPath, params: { slug }, data: project };
    }
    return { id: 'not-found', path: cleanPath, params: {} };
  }

  if (cleanPath === '/experience') {
    return { id: 'experience', path: '/experience', params: {} };
  }

  if (cleanPath === '/about') {
    return { id: 'about', path: '/about', params: {} };
  }

  if (cleanPath === '/stack') {
    return { id: 'stack', path: '/stack', params: {} };
  }

  if (cleanPath === '/notes') {
    return { id: 'notes', path: '/notes', params: {} };
  }

  const noteMatch = cleanPath.match(/^\/notes\/([a-zA-Z0-9_-]+)$/);
  if (noteMatch) {
    const slug = noteMatch[1];
    const note = notes.find((n) => n.slug === slug);
    if (note) {
      return { id: 'note-detail', path: cleanPath, params: { slug }, data: note };
    }
    return { id: 'not-found', path: cleanPath, params: {} };
  }

  return { id: 'not-found', path: cleanPath, params: {} };
}

export function getPageMetadata(route) {
  const baseUrl = 'https://sureshbhandari.com';
  const ogImage = `${baseUrl}/og-image.png`;

  switch (route.id) {
    case 'home':
      return {
        title: 'Suresh Bhandari | Senior Backend & AI Engineer',
        description:
          'Senior Backend and AI Engineer specializing in distributed systems, FastAPI, and agentic AI (Google ADK). Scaled platforms to 5M+ MAU and 10K req/sec peak.',
        canonical: `${baseUrl}/`,
        ogType: 'profile',
        ogImage,
        jsonLd: null // Uses existing index.html JSON-LD for home
      };

    case 'projects':
      return {
        title: 'Projects & Distributed Systems | Suresh Bhandari',
        description:
          'Production systems, agentic AI pipelines, open-source tools, and high-scale backends engineered by Suresh Bhandari.',
        canonical: `${baseUrl}/projects`,
        ogType: 'website',
        ogImage,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Engineering Projects by Suresh Bhandari',
          description: 'Production systems, agentic AI pipelines, and high-scale backends.',
          url: `${baseUrl}/projects`,
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: projects.map((p, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              name: p.title,
              url: `${baseUrl}/projects/${p.slug}`
            }))
          }
        }
      };

    case 'project-detail': {
      const p = route.data || projects.find((item) => item.slug === route.params.slug);
      if (!p) {
        return {
          title: 'Project Not Found | Suresh Bhandari',
          description: 'The requested engineering project could not be found.',
          canonical: `${baseUrl}/projects`,
          ogType: 'website',
          ogImage,
          jsonLd: null
        };
      }

      const title = `${p.title} | Architecture & Engineering Case Study | Suresh Bhandari`;
      const description = p.seo_description || `${p.title}: ${p.description}`.slice(0, 155);

      const isSourceCode = Boolean(p.links && p.links.github);
      const mainEntity = isSourceCode
        ? {
            '@type': 'SoftwareSourceCode',
            name: p.title,
            description: p.long_description || p.description,
            programmingLanguage: p.tags ? p.tags.join(', ') : 'Python',
            codeRepository: p.links?.github,
            author: { '@id': `${baseUrl}/#person` }
          }
        : {
            '@type': 'SoftwareApplication',
            name: p.title,
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Linux, Cloud, Cross-Platform',
            description: p.long_description || p.description,
            author: { '@id': `${baseUrl}/#person` }
          };

      return {
        title,
        description,
        canonical: `${baseUrl}/projects/${p.slug}`,
        ogType: 'article',
        ogImage: p.image && p.image.startsWith('http') ? p.image : ogImage,
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            mainEntity,
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/` },
                { '@type': 'ListItem', position: 2, name: 'Projects', item: `${baseUrl}/projects` },
                { '@type': 'ListItem', position: 3, name: p.title, item: `${baseUrl}/projects/${p.slug}` }
              ]
            }
          ]
        }
      };
    }

    case 'experience':
      return {
        title: 'Engineering Experience & Career History | Suresh Bhandari',
        description:
          '5+ years scaling distributed systems: T-Systems (Deutsche Telekom), Gridlogic (5M+ MAU, 10K req/s), BizAssist, and Stride Ahead.',
        canonical: `${baseUrl}/experience`,
        ogType: 'profile',
        ogImage,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          name: 'Suresh Bhandari Engineering Experience',
          url: `${baseUrl}/experience`,
          mainEntity: {
            '@type': 'Person',
            name: profile.name,
            jobTitle: profile.title,
            hasOccupation: experienceEntries.map((exp) => ({
              '@type': 'Occupation',
              name: exp.role,
              description: exp.description.join(' ')
            }))
          }
        }
      };

    case 'about':
      return {
        title: 'About Suresh Bhandari | Senior Backend & AI Engineer',
        description:
          'Senior Backend and AI Engineer journey: from 13-year-old hacker to scaling 5M+ MAU distributed platforms and enterprise Google ADK agentic AI.',
        canonical: `${baseUrl}/about`,
        ogType: 'profile',
        ogImage,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Suresh Bhandari',
          url: `${baseUrl}/about`,
          description: 'Background, engineering philosophy, and distributed systems career of Suresh Bhandari.'
        }
      };

    case 'stack':
      return {
        title: 'Technical Stack & Architecture Skills | Suresh Bhandari',
        description:
          'Production tech stack and architecture skills: Python, FastAPI, RabbitMQ, PostgreSQL, Redis, Google ADK, Docker, AWS, and distributed systems.',
        canonical: `${baseUrl}/stack`,
        ogType: 'website',
        ogImage,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Technical Skills and Architecture Stack of Suresh Bhandari',
          url: `${baseUrl}/stack`,
          keywords: atsKeywords.join(', ')
        }
      };

    case 'notes':
      return {
        title: 'Engineering Notes & Systems Architecture | Suresh Bhandari',
        description:
          'Technical notes on distributed queues, idempotent wallet systems at 10K req/s, and enterprise RAG architecture on Google ADK.',
        canonical: `${baseUrl}/notes`,
        ogType: 'website',
        ogImage,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Engineering Notes by Suresh Bhandari',
          url: `${baseUrl}/notes`,
          blogPost: notes.map((n) => ({
            '@type': 'BlogPosting',
            headline: n.title,
            description: n.abstract,
            url: `${baseUrl}/notes/${n.slug}`,
            datePublished: n.date
          }))
        }
      };

    case 'note-detail': {
      const n = route.data || notes.find((item) => item.slug === route.params.slug);
      if (!n) {
        return {
          title: 'Note Not Found | Suresh Bhandari',
          description: 'The requested engineering note could not be found.',
          canonical: `${baseUrl}/notes`,
          ogType: 'website',
          ogImage,
          jsonLd: null
        };
      }

      return {
        title: `${n.title} | Engineering Note | Suresh Bhandari`,
        description: n.seo_description || n.abstract.slice(0, 155),
        canonical: `${baseUrl}/notes/${n.slug}`,
        ogType: 'article',
        ogImage,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: n.title,
          description: n.seo_description || n.abstract,
          datePublished: n.date,
          author: {
            '@type': 'Person',
            name: profile.name,
            url: baseUrl
          },
          publisher: {
            '@type': 'Person',
            name: profile.name
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/notes/${n.slug}`
          }
        }
      };
    }

    default:
      return {
        title: 'Page Not Found | Suresh Bhandari',
        description: 'The page you are looking for does not exist on sureshbhandari.com.',
        canonical: `${baseUrl}/404`,
        ogType: 'website',
        ogImage,
        jsonLd: null
      };
  }
}
