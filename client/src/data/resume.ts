export const profile = {
  name: "Darwin Darryl Jean E. Largoza",
  role: "Full Stack Developer & UI/UX Designer",
  location: "Cebu, Philippines",
  email: "darwindarryljean.largoza@gmail.com",
  linkedin: "https://www.linkedin.com/in/ddjl/",
  github: "https://github.com/iamjpxfrd",
  resumeUrl: "/resume.pdf",
  // Footer sign-off. Longer and more concrete than the hero's summary — by
  // the time a visitor reaches the footer they have seen the work, so this
  // names the credentials rather than making the pitch.
  bio: "4th year IT student turning Figma files into production software — full stack across React, Node.js, and Django, AWS certified in Cloud Architecting and Cloud Foundations, and comfortable owning a project end to end, solo or on a team.",
};

// Opens Gmail's web compose directly, prefilled with the recipient — an
// escape hatch for visitors who'd rather not use the contact modal. Uses
// the addressed `view=cm` deep link (not a numbered `/mail/u/0/` inbox URL)
// so it works regardless of which Google account the visitor has open.
export const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`;

// The hero's entire pitch. Two beats with the turn between them doing the
// work, so they are separate strings set on their own lines rather than one
// wrapped paragraph the browser could break anywhere it liked.
//
// A longer supporting paragraph used to follow this and was cut: it restated
// the hook at four times the length, and in a viewport-height panel that copy
// was the difference between the menu fitting and the menu scrolling. The
// same claims survive in `profile.bio`, which the footer sets at the point a
// visitor has actually seen the work.
export const heroHook = [
  "Most designers hand off a Figma file.",
  "I hand off the finished app.",
];

export const techStack = [
  {
    label: "Frontend",
    items: [
      { name: "React", icon: "react" },
      { name: "TailwindCSS", icon: "tailwind" },
      { name: "JavaScript", icon: "javascript" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js / Express", icon: "node" },
      { name: "Django", icon: "django" },
      { name: "Spring Boot", icon: "springboot" },
    ],
  },
  {
    label: "Data",
    items: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
    ],
  },
  {
    label: "Tools & Workflow",
    items: [
      { name: "Git / GitHub", icon: "github" },
      { name: "Docker", icon: "docker" },
      { name: "Figma", icon: "figma" },
    ],
  },
  {
    label: "AI-Assisted Dev",
    items: [
      { name: "Claude Code", icon: "claude" },
      { name: "Cursor", icon: "cursor" },
      { name: "Windsurf", icon: "windsurf" },
      { name: "Lovable", icon: "lovable" },
    ],
  },
] as const;

export const currentlyExpanding =
    "TypeScript · Next.js · React Native Expo (Mobile Development) · Web accessibility (WCAG)";

export const projects = [
  {
    frame: "00",
    name: "Logo Vectorization",
    // ASSUMPTION (flag for you to confirm/edit): treated as a concept /
    // demo piece rather than a confirmed paid client project, since the
    // brief you described was informal and unconfirmed. If this becomes
    // a real, completed client engagement, swap "concept for" language
    // below for the client's actual name/industry per your own portfolio
    // guidelines.
    tagline: "Vector Logo — Concept Piece",
    description:
        "Rebuilt a rough, non-vector logo as clean, scalable SVG artwork, then applied it to a banner layout to show real print- and web-ready execution — concept work created to demonstrate logo vectorization and design-to-asset handoff for a graphic design role. Delivered as optimized, production-ready SVG files alongside a Figma storyboard walking through the mark in use.",
    stack: ["Illustrator / Inkspace", "Vector / SVG"],
    period: "TBD", // fill in your actual dates
    meta: "GRAPHIC DESIGN / VECTOR · 2024 - Present",
    url: undefined,
    figmaUrl: "https://www.figma.com/design/OaVDQxS6lmTfeuIjtXwvEV/Logo-Vectors?node-id=0-1",
    // Second link you sent (the raw logo artboards as SVGs) doesn't have a
    // field to live in yet — see my note in chat about adding one.
    // logoBoardUrl: "https://www.figma.com/design/OaVDQxS6lmTfeuIjtXwvEV/Logo-Vectors?node-id=1001-81",
  },
  {
    frame: "01",
    name: "Ally",
    tagline: "AI-Powered Legal Platform (Capstone)",
    description:
        "Designed the complete UI in Figma and implemented it in React (Vite) as frontend/UI-UX developer, including a chat-first interface for AI-powered legal Q&A, a chat interface between lawyer and client, and role-based flows integrated with a Firebase backend — end-to-end frontend ownership on a multi-user, production-style platform.",
    stack: ["React", "Vite", "Figma", "Firebase"],
    period: "Jan 2025 – Dec 2025",
    meta: "FRONTEND / UI-UX · JAN—DEC 2025",
    url: "https://github.com/piolonrqz/Capstone-ALLY",
    figmaUrl: "https://www.figma.com/design/zFgB87kgvIO8FgEsifT0bi/ALLY---Capstone?node-id=163-8",
  },
  {
    frame: "02",
    name: "RackIn",
    tagline: "Offline-First Gym Check-In Platform",
    description:
        "Independently designed and built RackIn, a staff-operated tablet platform that replaces the front-desk paper logbook at small gyms — working fully offline with no member smartphones or per-member cost. Staff check members in via numpad, QR card, or name search, giving the gym automatic visibility into lapsed members, upcoming expirations, and daily traffic. Owned the project end-to-end as solo full-stack developer and UI/UX designer.",
    stack: ["React", "Vite", "Spring Boot", "PostgreSQL"],
    period: "Aug - Present 2026", // fill in your actual dates
    meta: "FULL-STACK · Aug—Present 2026",
    url: "https://github.com/iamjpxfrd/rackin",
    figmaUrl: "https://www.figma.com/design/7XLaUy1ekJ0ifkaIoM1q9T/Agap-Eats?node-id=2002-475",
  },
  {
    frame: "03",
    name: "Communect",
    tagline: "Barangay Community App",
    description:
        "Collaborated with a group of friends to design a community app for processing barangay request papers and appointments online, built from scratch as a team. Contributed as UX/UI designer across the product.",
    stack: ["Figma", "UX/UI Design"],
    period: "MAY 2025", // fill in your actual dates
    meta: "TEAM PROJECT · UX/UI · MAY 2025",
    figmaUrl: "https://www.figma.com/design/7Ea0jiaHDyttc6uYgjvAzE/FIGMA-PROJECTS?node-id=0-1&t=PN3AAUNZeA5xtEO2-1",
    url: "https://github.com/jeecoo/Communnect",
  },
  {
    frame: "04",
    name: "AgapEats",
    tagline: "Course Project — Online Ordering Prototype",
    description:
        "Designed a prototype online ordering app for Cebu Institute of Technology – University as part of a course subject, showcasing the intended look and flow of the product.",
    stack: ["Figma", "Prototyping"],
    period: "TBD", // fill in your actual dates
    meta: "COURSE PROJECT · PROTOTYPE · TBD",
    figmaUrl: "https://www.figma.com/design/7XLaUy1ekJ0ifkaIoM1q9T/Agap-Eats?node-id=0-1",
    url: undefined,
  },
  {
    frame: "05",
    name: "Sol Centre",
    tagline: "Startup Prototype",
    description:
        "Contributed to the UI/UX of an early-stage startup prototype, designing the checkout flow with an integrated map view and correcting inconsistencies across other sections of the product.",
    stack: ["Figma", "UI/UX Design"],
    period: "Dec 2025", // fill in your actual dates
    meta: "UI/UX CONTRIBUTOR · DEC 2025",
    figmaUrl: "https://www.figma.com/design/SispedEUQZO5CjtpwmFFGa/New-demo?node-id=0-1&p=f&t=hxXKrWKCUqrNE8Ad-0",
    url: undefined,
  },
  {
    frame: "06",
    name: "CampusXperience",
    tagline: "Campus Event Platform",
    description:
        "Built the complete frontend, and contributed as part of a 5-person team to a full-stack web app for campus event discovery, reservation, ticketing, and reminders.",
    stack: ["React", "Vite", "Spring Boot", "Java"],
    period: "May 2025 – Dec 2025",
    meta: "FRONTEND / UI-UX · MAY—DEC 2025",
    url: "https://github.com/sytrusz/campusxperience",
    figmaUrl: "https://www.figma.com/design/XmXdiKxDuvf7WZHzCbhH8U/CampusXperience?node-id=0-1&t=PcIlQUbThkbWNmm4-1",
  },
  {
    frame: "07",
    name: "CrediGo",
    tagline: "System Integration Project",
    description:
        "Independently designed and built the entire web app — frontend UI and backend API integration — for a 3-person System Integration and Architecture course project, owning full-stack development end-to-end from planning through delivery.",
    stack: ["React", "REST API"],
    period: "Apr 2025 – May 2025",
    meta: "SOLO BUILD · APR—MAY 2025",
    figmaUrl: "https://www.figma.com/design/nlGKqwtZBEyUyPYoN3uaKw/CrediGo?node-id=110-73&t=TAzC8NhQWgS7O8YE-1",
    url: "https://github.com/Dadaisuk1/CrediGo_IT342",
  },
  {
    frame: "08",
    name: "Study Space",
    tagline: "UI Design — Login, Signup & Layout Revisions",
    description:
        "Contributed as UI designer on a study-space appointment app, revising the login and signup flows and refining layout details across the design. Each screen was built with its own layout guide to keep the system consistent and traceable.",
    stack: ["Figma", "UI Design"],
    period: "Apr 2025", // fill in your actual dates
    meta: "UI CONTRIBUTOR · APR 2025",
    figmaUrl: "https://www.figma.com/design/UzWxHlyvLYQ9w2bG8DFiVg/Study-Space?node-id=50-100",
    url: "https://github.com/piolonrqz/IT342G6-StudySpace",
  },
  {
    frame: "09",
    name: "Playground",
    tagline: "Design Playground — Side Projects & Prototypes",
    description:
        "A running collection of personal side projects and design prototypes built across four years of study, spanning early experiments through more recent, refined work.",
    stack: ["Figma", "UI/UX Design"],
    period: "TBD", // fill in your actual dates
    meta: "PERSONAL ARCHIVE · 1ST–4TH YR",
    figmaUrl: "https://www.figma.com/design/tPhYXtJTEMZgjQdOj5gJuo/Projects?node-id=577-2744&t=8HvmYBACxbyxNT5E-1",
    url: undefined,
  },
  /*
  {
    frame: "02",
    name: "Notes App",
    tagline: "Hybrid Web2/Web3 Notes Platform",
    description:
      "Built full-stack features for a hybrid Web2/Web3 notes app with Cardano blockchain-based permanence; improved backend rate-limiter reliability and built frontend editor components as part of a 5-person team using Git-based collaboration.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Cardano"],
    period: "Dec 2025",
    meta: "FULL-STACK · TEAM OF 5 · DEC 2025",
    url: "https://github.com/piolonrqz/notes-app",
    figmaUrl: undefined,
  },
  */
] as const;

export const education = {
  degree: "Bachelor of Science in Information Technology",
  school: "Cebu Institute of Technology – University",
  schoolUrl: "https://cit.edu/",
  period: "2022 – Present",
};

// Reverse-chronological — newest credential first. Kept ordered here rather
// than sorted at render time: `date` is a display string ("Jul 2026"), and a
// runtime sort would need a month parser that fails silently the first time
// one of these is written in another format. Add new entries in position.
export const certifications = [
  {
    name: "IBM — Lifelong Professional Skills",
    type: "Certificate",
    date: "Jul 2026",
    icon: "ibm",
    url: "https://www.credly.com/badges/b5b5da2d-0ce8-4f17-a336-1182e00b3533/public_url",
  },
  {
    name: "CIT-U OJT Readiness Program",
    type: "Certificate",
    date: "Jul 2026",
    icon: "cit",
    url: "https://www.credential.net/c394a11d-dae7-4da5-a5ae-7563557daf18#acc.mD0kuQo6",
  },
  {
    name: "AWS Academy Graduate — Cloud Architecting",
    type: "Training Badge",
    date: "Dec 2025",
    icon: "aws",
    url: "https://www.credly.com/badges/0da04100-740d-41f0-95c1-9c688737edde/public_url",
  },
  {
    name: "AWS Academy Graduate — Cloud Foundations",
    type: "Training Badge",
    date: "Oct 2025",
    icon: "aws",
    url: "https://www.credly.com/badges/42f391ac-3ece-45d5-ac7d-42169faecb69/public_url",
  },
  {
    name: "ServiceNow Academic Program — CIT-U EY6 2025",
    type: "Certificate",
    date: "May 2025",
    icon: "servicenow",
    url: "https://drive.google.com/file/d/1TmsvQq4S6XjoOSU7ZBRmdKZ-n5Std1Na/view?usp=sharing",
  },
] as const;

export type Certification = (typeof certifications)[number];

export const languages = ["English (Professional)", "Filipino (Native)", "Cebuano (Native)"];