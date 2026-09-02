export const siteConfig = {
  name: "Prince Sarfo",
  role: "Software Developer",
  tagline:
    "I build scalable web and mobile applications - from pixel-perfect frontends to reliable backend APIs.",
  bio: "Computer Science graduate from KNUST with hands-on experience building scalable applications, APIs, and distributed systems. Passionate about clean code, great UX, and continuous learning.",
  location: "Ghana",
  email: "snellmaxi6@gmail.com",
  resumeUrl: "/prince-sarfo-cv.pdf",
  socials: {
    github: "https://github.com/Prince-Sarfo",
    linkedin: "https://www.linkedin.com/in/prince-sarfo-5587b01a6/",
  },
};

export const skills = [
  {
    category: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React Native",
      "Expo",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "NestJS",
      "REST APIs",
      "GraphQL",
      "Firebase",
      "PostgreSQL",
      "Drizzle",
      "Knex",
    ],
  },
  {
    category: "Tools",
    items: [
      "Git",
      "GitHub Actions",
      "Netlify",
      "DigitalOcean",
      "Vercel",
      "Figma",
    ],
  },
];

export const experiences = [
  {
    company: "Nyeova Systems",
    role: "Software Developer",
    period: "Oct 2024 - Present",
    description:
      "Building and shipping products across web and mobile - PigeonUltra (web & mobile app), PigeonFleet (rider app), PigeonUltra Admin dashboard, Pappysko (property listing platform), and OneMillion (cross-platform donation app). Working across the full stack from UI to API and CI/CD pipelines.",
    tech: [
      "Next.js",
      "React Native",
      "Expo",
      "Firebase",
      "GraphQL",
      "TypeScript",
      "Netlify",
      "DigitalOcean",
      "GitHub Actions",
    ],
  },
  {
    company: "Mpact Lane Consult",
    role: "Software Intern",
    period: "Sep 2023 - Dec 2023",
    description:
      "Collaborated with the team to build user-friendly, responsive web interfaces. Implemented user authentication flows for client web applications.",
    tech: ["React.js", "JavaScript", "CSS"],
  },
  {
    company: "Quality Image",
    role: "Design Intern",
    period: "Sep 2022 - Dec 2022",
    description:
      "Designed social media flyers, posters, and edited images for clients using Adobe Photoshop.",
    tech: ["Adobe Photoshop", "Figma"],
  },
];

export const projects = [
  {
    title: "UniKonnect",
    description:
      "Final year project - a mobile app facilitating coordination and communication of events on campus. Integrated Firebase for auth and real-time database, and Paystack for seamless ticket payments.",
    tech: ["Flutter", "Firebase", "Paystack"],
    liveUrl: "#",
    githubUrl: "https://github.com/Prince-Sarfo/event-hub",
    featured: true,
  },
  {
    title: "SafePing",
    description:
      "Full-stack emergency safety app with OTP auth, real-time location sharing, and trusted contact alerts. Secure REST API with CSRF protection, JWT auth, and Expo push notifications on iOS and Android.",
    tech: ["React Native", "Node.js", "JWT", "Expo", "Mnotify"],
    liveUrl: "#",
    githubUrl: null,
    featured: true,
  },
  {
    title: "OneMillion",
    description:
      "Cross-platform donation platform (website, mobile app, and desktop app) enabling users to participate in charitable events.",
    tech: ["Next.js", "React Native", "Expo"],
    liveUrl: "#",
    githubUrl: null,
    featured: true,
  },
  {
    title: "Kuro",
    description:
      "Web and mobile application for residential communities in Africa, enabling seamless community management.",
    tech: ["Next.js", "React Native", "TypeScript"],
    liveUrl: "https://kuro.weorg.ai/",
    githubUrl: null,
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=ai.weorg.kuro&hl=en",
    appStoreUrl: "https://apps.apple.com/us/app/kuro-mobile/id6775565414",
    featured: false,
  },
  {
    title: "PigeonUltra",
    description:
      "Migrated the PigeonUltra website to the latest Next.js with TypeScript. Implemented a blog, updated pages, and added forgot-password flow.",
    tech: ["Next.js", "TypeScript", "React", "Expo"],
    liveUrl: "https://pigeonultra.com/",
    githubUrl: null,
    appStoreUrl: "https://apps.apple.com/us/app/pigeonultra/id1546397948",
    featured: false,
  },
  {
    title: "PigeonFleet",
    description:
      "Rider-facing mobile app for the PigeonUltra platform, enabling delivery riders to manage and fulfil orders on the go.",
    tech: ["Expo", "GraphQL"],
    liveUrl: "#",
    githubUrl: null,
    appStoreUrl: "https://apps.apple.com/us/app/pigeonfleet/id1547093544",
    featured: false,
  },
  {
    title: "PigeonUltra Admin",
    description:
      "Admin dashboard for the PigeonUltra platform, enabling internal management and oversight of platform operations.",
    tech: ["Next.js", "GraphQL", "Tauri"],
    liveUrl: "#",
    githubUrl: null,
    featured: false,
  },
  {
    title: "Pappysko",
    description:
      "Property listing web app with interactive Google Maps integration, document uploads in chat, and full auth flows including forgot-password, profile, and settings pages.",
    tech: ["React", "Google Maps API", "Node.js"],
    liveUrl: "https://pappysko.com/",
    githubUrl: null,
    featured: false,
  },
  {
    title: "SYTO Ghana",
    description:
      "Platform for the Student and Youth Travel Organisation connecting young people to educational travel, volunteering, and cultural exchange across Africa. Built with host-family matching, a club finder, program directories, and event listings.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://sytoghana.org/",
    githubUrl: null,
    featured: false,
  },
  {
    title: "Bio-Tropical Ghana",
    description:
      "E-commerce site for an organic agricultural exporter specialising in certified dried citrus peels, cocoa, and shea butter. Features a product catalogue, wholesaler quote requests, and certification showcases (Fairtrade, EU, HACCP).",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://biotropicalghana.com/",
    githubUrl: null,
    featured: false,
  },
  {
    title: "Schoolpedia",
    description:
      "Ghana's national school directory and accreditation registry, letting families search, compare, and apply to verified schools in one place. Features school discovery, interactive maps, comparison tools, and profile claiming for schools.",
    tech: ["Next.js", "TypeScript", "NestJS", "BullMQ", "Tailwind CSS"],
    liveUrl: "https://schoolpedia.edcomrade.com/",
    githubUrl: null,
    featured: false,
  },
  {
    title: "Pioneers",
    description:
      "School management system giving administrators, educators, and staff a centralised platform to manage student records, enrolment, scheduling, and day-to-day institutional operations.",
    tech: ["Next.js", "TypeScript", "NestJS", "BullMQ", "Tailwind CSS"],
    liveUrl: "https://pioneers.edcomrade.com/",
    githubUrl: null,
    featured: false,
  },
];

export const education = [
  {
    institution: "Kwame Nkrumah University of Science and Technology (KNUST)",
    degree: "BSc. Computer Science",
    period: "Jan 2021 - Sep 2024",
    location: "Kumasi, Ghana",
  },
  {
    institution: "Asanteman Senior High School",
    degree: "W.A.S.S.C.E - General Science",
    period: "Oct 2016 - Jun 2019",
    location: "Kumasi, Ghana",
  },
];
