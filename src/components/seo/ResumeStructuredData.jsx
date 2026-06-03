import { profile, summary, atsKeywords } from '../../data/profile';
import { experienceEntries } from '../../data/experience';
import { skillCategories } from '../../data/skills';

const flattenSkills = () =>
  skillCategories.flatMap((c) => c.skills);

const ResumeStructuredData = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    email: profile.email,
    telephone: profile.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressCountry: 'IN',
    },
    url: profile.portfolio,
    sameAs: [profile.linkedin, profile.github],
    description: summary,
    knowsAbout: [...atsKeywords, ...flattenSkills()],
    hasOccupation: {
      '@type': 'Occupation',
      name: profile.title,
      occupationalCategory: 'Software Developer',
      skills: flattenSkills().join(', '),
    },
    worksFor: experienceEntries
      .filter((e) => e.period.toLowerCase().includes('present'))
      .map((e) => ({
        '@type': 'Organization',
        name: e.company,
        url: e.website,
      }))[0],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Yashwantrao Chavan Maharashtra Open University',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default ResumeStructuredData;
