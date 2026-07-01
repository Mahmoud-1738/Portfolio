// Single source of truth for projects — used by the list page and detail page.
// Add screenshots/videos to /public/projects/ and reference them here.
export const PROJECTS = [
  {
    id: "annexbios",
    name: "AnnexBios",
    year: 2025,
    date: "January 2025",
    category: "Cinema Website",
    services: ["PHP", "CSS", "Html", "JavaScript"],
    featured: true, // highlight as an extra-important project
    image: null, // "/projects/annexbios.png"
    video: null, // "/projects/annexbios.mp4"
    description:
      "A cinema website with a live film agenda and a ticket-booking flow. Visitors can browse what's playing, filter by category, and reserve tickets.",
    highlights: [
      "Film agenda with category filters",
      "Ticket reservation flow",
      "Fully responsive layout",
      "Admin-managed content",
    ],
    code: `function bookTicket(film, seats) {
  if (seats < 1) throw new Error("Pick at least one seat");
  return fetch("/api/tickets", {
    method: "POST",
    body: JSON.stringify({ filmId: film.id, seats }),
  }).then((r) => r.json());
}`,
    download: null, // e.g. "https://annexbios.example.com"
    teamType: "Solo project",
    role: "Designed and built the full front-end and the PHP back-end on my own.",
  },
  {
    id: "project-two",
    name: "Project Two",
    year: 2024,
    date: "2024",
    category: "Web App",
    services: ["React", "Vite", "CSS"],
    featured: false,
    image: null,
    video: null,
    description: "Short description of this project — replace with the real one.",
    highlights: ["Highlight one", "Highlight two", "Highlight three"],
    code: `// drop a representative code snippet here`,
    download: null,
    teamType: "Team project",
    role: "Describe your role and what the team handled.",
  },
  {
    id: "project-three",
    name: "Project Three",
    year: 2024,
    date: "2024",
    category: "Website",
    services: ["Html", "CSS", "JavaScript"],
    featured: false,
    image: null,
    video: null,
    description: "Short description of this project — replace with the real one.",
    highlights: ["Highlight one", "Highlight two"],
    code: `// drop a representative code snippet here`,
    download: null,
    teamType: "Solo project",
    role: "Describe your role here.",
  },
];

export const getProject = (id) => PROJECTS.find((p) => p.id === id);
