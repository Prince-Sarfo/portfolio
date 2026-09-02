import {
  siteConfig,
  skills,
  experiences,
  education,
  projects,
} from "@/modules/home/data";

const BASE_URL = "https://prince-sarfo.vercel.app";

const knowsAbout = skills.flatMap((group) => group.items);

const alumniOf = education.map((entry) => ({
  "@type": "EducationalOrganization",
  name: entry.institution,
}));

const worksFor = experiences.map((entry) => ({
  "@type": "Organization",
  name: entry.company,
}));

const notableProjects = projects
  .filter((project) => project.liveUrl && project.liveUrl !== "#")
  .map((project) => ({
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: project.liveUrl,
  }));

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: siteConfig.name,
      url: BASE_URL,
      image: `${BASE_URL}/profile.png`,
      jobTitle: siteConfig.role,
      description: siteConfig.bio,
      email: `mailto:${siteConfig.email}`,
      address: {
        "@type": "PostalAddress",
        addressCountry: siteConfig.location,
      },
      sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin],
      knowsAbout,
      alumniOf,
      worksFor,
      subjectOf: notableProjects,
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: `${siteConfig.name} — ${siteConfig.role}`,
      description: siteConfig.tagline,
      inLanguage: "en",
      publisher: { "@id": `${BASE_URL}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${BASE_URL}/#profilepage`,
      url: BASE_URL,
      name: `${siteConfig.name} - ${siteConfig.role}`,
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#person` },
      inLanguage: "en",
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
