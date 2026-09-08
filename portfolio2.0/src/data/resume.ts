export const profile = {
  name: "Darwin Darryl Jean E. Largoza",
  role: "Full Stack Developer & UI/UX Designer",
  location: "Cebu, Philippines",
  email: "darwindarryljean.largoza@gmail.com",
  phone: "+63 995 662 7081",
  linkedin: "https://www.linkedin.com/in/ddjl/",
  github: "https://github.com/iamjpxfrd",
  githubUsername: "iamjpxfrd",
  resumeUrl: "/resume.pdf",
  bio: "4th year IT student turning Figma files into production software — full stack across React, Node.js, and Django, AWS certified in Cloud Architecting and Cloud Foundations, and comfortable owning a project end to end, solo or on a team.",
};

export const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`;

export const heroHook = [
  "Most designers hand off a Figma file.",
  "I hand off the finished app.",
];

export const education = {
  degree: "Bachelor of Science in Information Technology",
  school: "Cebu Institute of Technology – University",
  schoolUrl: "https://cit.edu/",
  period: "2022 – Present",
};

export const currentlyExpanding = "TypeScript · Next.js · Web accessibility (WCAG)";

export const stackLine =
  "React · TailwindCSS · Node.js/Express · Django · Spring Boot · PostgreSQL · MySQL · MongoDB · Figma · Docker";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  desc: string;
  stack: string[];
  date: string;
  url: string;
};

export const projects: Project[] = [
  {
    slug: "ally",
    name: "ally",
    tagline: "AI-Powered Legal Platform (Capstone)",
    desc: "AI-Powered Legal Platform (Capstone) — Frontend / UI-UX",
    stack: ["React", "Vite", "Figma", "Firebase"],
    date: "jan–dec 25",
    url: "https://github.com/piolonrqz/Capstone-ALLY",
  },
  {
    slug: "notes-app",
    name: "notes-app",
    tagline: "Hybrid Web2/Web3 Notes Platform",
    desc: "Hybrid Web2/Web3 Notes Platform — Full-Stack, team of 5",
    stack: ["React", "Node.js", "Express", "MongoDB", "Cardano"],
    date: "dec 25",
    url: "https://github.com/piolonrqz/notes-app",
  },
  {
    slug: "campusxperience",
    name: "campusxperience",
    tagline: "Campus Event Platform",
    desc: "Campus Event Platform — Frontend, team of 5",
    stack: ["React", "Vite", "Spring Boot", "Java"],
    date: "may–dec 25",
    url: "https://github.com/sytrusz/campusxperience",
  },
  {
    slug: "credigo",
    name: "credigo",
    tagline: "System Integration Project",
    desc: "System Integration Project (solo) — end to end",
    stack: ["React", "REST API"],
    date: "apr–may 25",
    url: "https://github.com/Dadaisuk1/CrediGo_IT342",
  },
];

export const certifications = [
  {
    name: "IBM — Lifelong Professional Skills",
    type: "Certificate",
    date: "Jul 2026",
    url: "https://www.credly.com/badges/b5b5da2d-0ce8-4f17-a336-1182e00b3533/public_url",
  },
  {
    name: "CIT-U OJT Readiness Program",
    type: "Certificate",
    date: "Jul 2026",
    url: "https://www.credential.net/c394a11d-dae7-4da5-a5ae-7563557daf18#acc.mD0kuQo6",
  },
  {
    name: "AWS Academy Graduate — Cloud Architecting",
    type: "Training Badge",
    date: "Dec 2025",
    url: "https://www.credly.com/badges/0da04100-740d-41f0-95c1-9c688737edde/public_url",
  },
  {
    name: "AWS Academy Graduate — Cloud Foundations",
    type: "Training Badge",
    date: "Oct 2025",
    url: "https://www.credly.com/badges/42f391ac-3ece-45d5-ac7d-42169faecb69/public_url",
  },
  {
    name: "ServiceNow Academic Program — CIT-U EY6 2025",
    type: "Certificate",
    date: "May 2025",
    url: "https://drive.google.com/file/d/1TmsvQq4S6XjoOSU7ZBRmdKZ-n5Std1Na/view?usp=sharing",
  },
];

export const languages = ["English (Professional)", "Filipino (Native)", "Cebuano (Native)"];

export type ContactRow = { label: string; value: string; href: string };

export const contactRows: ContactRow[] = [
  { label: "email", value: profile.email, href: gmailComposeUrl },
  { label: "phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, "")}` },
  { label: "github", value: "github.com/iamjpxfrd", href: profile.github },
  { label: "linkedin", value: "linkedin.com/in/ddjl", href: profile.linkedin },
  { label: "resume", value: "./resume.pdf", href: profile.resumeUrl },
];
