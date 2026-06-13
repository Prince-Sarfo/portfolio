export const siteConfig = {
  name: "Prince Sarfo",
  role: "Software Engineer",
  tagline:
    "I build fast, accessible, and beautiful web and mobile experiences.",
  bio: "I'm a software engineer with experience crafting scalable web and mobile applications. Passionate about clean code, great UX, and pushing the boundaries of what's possible across platforms.",
  location: "Ghana",
  email: "snellmaxi6@gmail.com",
  resumeUrl: "#",
  socials: {
    github: "https://github.com/Prince-Sarfo",
    linkedin: "https://www.linkedin.com/in/prince-sarfo-5587b01a6/",
  },
};

export const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "PostgreSQL", "Prisma", "Redis"],
  },
  { category: "Tools", items: ["Git", "Docker", "Figma", "Vercel", "AWS"] },
];

export const experiences = [
  {
    company: "Stripe",
    role: "Senior Frontend Engineer",
    period: "2022 — Present",
    description:
      "Led the redesign of the merchant dashboard used by 500k+ businesses. Built a design system from scratch, reducing component duplication by 60%.",
    tech: ["React", "TypeScript", "GraphQL"],
  },
  {
    company: "Vercel",
    role: "Frontend Engineer",
    period: "2020 — 2022",
    description:
      "Contributed to the Next.js ecosystem and developer tooling. Improved build performance by 40% through caching strategy improvements.",
    tech: ["Next.js", "Rust", "Node.js"],
  },
  {
    company: "Freelance",
    role: "Full-Stack Developer",
    period: "2018 — 2020",
    description:
      "Delivered 15+ web applications for clients across e-commerce, SaaS, and media. Specialized in React frontends with Node.js APIs.",
    tech: ["React", "Node.js", "MongoDB"],
  },
];

export const projects = [
  {
    title: "Horizon Dashboard",
    description:
      "A real-time analytics platform processing 10M+ events/day. Built with Next.js, tRPC, and Recharts.",
    tech: ["Next.js", "TypeScript", "tRPC", "Prisma"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "Craft CMS",
    description:
      "A headless content management system with a rich text editor, media library, and role-based access control.",
    tech: ["React", "Node.js", "PostgreSQL", "S3"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "OpenFlow",
    description:
      "An open-source workflow automation tool inspired by n8n. Drag-and-drop node editor with 40+ integrations.",
    tech: ["React", "TypeScript", "Redis", "Docker"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "Palette AI",
    description:
      "AI-powered color palette generator. Upload an image or describe a mood and get a curated design palette.",
    tech: ["Next.js", "OpenAI", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
];
