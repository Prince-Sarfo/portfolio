export const siteConfig = {
  name: "Prince Sarfo",
  role: "Software Engineer",
  tagline:
    "Hi, I'm Prince Sarfo, and I like turning ideas into products. Whether it's shipping a feature, designing an API, or building the system behind it, I take an idea from first sketch to something people actually use.",
  bio: "I'm a software engineer and KNUST Computer Science graduate who builds products end-to-end, from PostgreSQL schemas to React Native apps and Tauri desktop builds. I've shipped across fintech, logistics, proptech, and edtech, and I tend to own the parts that have to be right: auth and 2FA, payments, access control, and audit trails.",
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
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    category: "Frontend & Mobile",
    items: ["Next.js", "React", "React Native", "Expo", "Tauri"],
  },
  {
    category: "Backend & Data",
    items: ["NestJS", "FastAPI", "GraphQL", "PostgreSQL", "Redis", "BullMQ"],
  },
  {
    category: "Infra & Tooling",
    items: ["GitHub Actions", "Vercel", "AWS S3", "Paystack", "Firebase"],
  },
];

export const experiences = [
  {
    company: "Nyeova Systems",
    role: "Software Engineer",
    period: "Sep 2024 - Present",
    description:
      "I build and own features across three flagship platforms and several client products, from NestJS and GraphQL APIs to React Native apps and Tauri desktop builds, and I lead the high-stakes work: payments and payouts, audit infrastructure, and access control.",
    tech: [
      "NestJS",
      "GraphQL",
      "React Native",
      "Tauri",
      "PostgreSQL",
      "Paystack",
      "Next.js",
    ],
  },
  // {
  //   company: "weorg.ai",
  //   role: "Web/Mobile Developer",
  //   period: "Feb 2026 - Present",
  //   description:
  //     "Building frontend experiences across web and mobile, including Kuro - a community management platform for residential communities in Africa.",
  //   tech: ["Next.js", "React Native", "TypeScript", "Tailwind CSS"],
  // },
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
    title: "OneMillion",
    description:
      "Crowdfunding fintech platform (web, mobile, and Tauri desktop). I built the milestone payouts engine, a tamper-evident hash-chained audit log, and RBAC with two-factor auth, and shipped the mobile and desktop apps.",
    tech: ["NestJS", "GraphQL", "React Native", "Tauri"],
    liveUrl: "#",
    githubUrl: null,
    featured: true,
  },
  {
    title: "Kuro",
    description:
      "Residential-community management platform for Africa. Lead developer of the Next.js web app and sole developer of the React Native app, with features on the FastAPI backend.",
    tech: ["Next.js", "React Native", "FastAPI"],
    liveUrl: "https://kuro.weorg.ai/",
    githubUrl: null,
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=ai.weorg.kuro&hl=en",
    appStoreUrl: "https://apps.apple.com/us/app/kuro-mobile/id6775565414",
    featured: true,
  },
  {
    title: "PigeonUltra",
    description:
      "Logistics and delivery platform. On the team I led the admin portal's bulk-actions system, built an auto-save forms framework, and owned the Uber Direct delivery integration on the NestJS/GraphQL API.",
    tech: ["Next.js", "Tauri", "NestJS", "GraphQL"],
    liveUrl: "https://pigeonultra.com/",
    githubUrl: null,
    featured: true,
  },
  {
    title: "Pappysko",
    description:
      "Property-listing marketplace. I owned the Google Maps property search, the listing lifecycle, and real-time chat with document attachments.",
    tech: ["Next.js", "Google Maps", "Socket.IO", "PostgreSQL"],
    liveUrl: "https://pappysko.com/",
    githubUrl: null,
    featured: true,
  },
  {
    title: "PigeonClient",
    description:
      "Customer-facing mobile app for the PigeonUltra platform, letting users place and track deliveries on iOS and Android.",
    tech: ["React Native", "Expo", "GraphQL"],
    liveUrl: "#",
    githubUrl: null,
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.nyeova.pigeonbolt.client",
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
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.nyeova.pigeonbolt.courier",
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
    title: "Schoolpedia",
    description:
      "Ghana's national school directory and accreditation registry: search, compare, and apply to verified schools, with interactive maps and profile claiming. I am sole author of its NestJS backend and discovery API.",
    tech: ["Next.js", "NestJS", "Knex", "BullMQ", "Leaflet"],
    liveUrl: "https://schoolpedia.edcomrade.com/",
    githubUrl: null,
    featured: false,
  },
  {
    title: "Pioneers",
    description:
      "Multi-tenant school ERP for student records, admissions, scheduling, finance, HR, and day-to-day operations. I built the NestJS backend and ERP web modules.",
    tech: ["Next.js", "NestJS", "Knex", "BullMQ", "Redis"],
    liveUrl: "https://pioneers.edcomrade.com/",
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
    title: "UniKonnect",
    description:
      "Final year project: a mobile app facilitating coordination and communication of events on campus. Integrated Firebase for auth and real-time database, and Paystack for seamless ticket payments.",
    tech: ["Flutter", "Firebase", "Paystack"],
    liveUrl: "#",
    githubUrl: "https://github.com/Prince-Sarfo/event-hub",
    featured: false,
  },
];

export const hobbies = ["Watching anime", "Music"];

export const education = [
  {
    institution: "Kwame Nkrumah University of Science and Technology (KNUST)",
    degree: "BSc. Computer Science",
    period: "Jan 2021 - Sep 2024",
    location: "Kumasi, Ghana",
  },
  {
    institution: "Asanteman Senior High School",
    degree: "W.A.S.S.C.E, General Science",
    period: "Oct 2016 - Jun 2019",
    location: "Kumasi, Ghana",
  },
];
