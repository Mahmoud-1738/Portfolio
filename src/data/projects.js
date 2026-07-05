// Single source of truth for projects — used by the list page and detail page.
// Import images so Vite bundles them and gives valid URLs at runtime.
import annexBiosImg from "../assets/AnnexBios.png";
import uFestivalImg from "../assets/UFestivalApp.png";
import uFestivalCms from "../assets/UFestivalCMS.png";
import uFestivalCms2 from "../assets/UFestivalCMS2.png";
import UFestivalmap from "../assets/UFestivalmap.png";
import uFestivalmapschema from "../assets/UFestivalschema.png";
import uFestivalmapinfo from "../assets/UFestivalinfo.png";
import kioskImg from "../assets/Kiosk.jpg";
import haphap from "../assets/haphapanimation.png";
import haphapstart from "../assets/haphapstartpagina.png";
import haphapinfo from "../assets/haphapinfo.png";
import haphappay from "../assets/haphappay.png";
import haphapbon from "../assets/haphapbon.png";
import haphapbon2 from "../assets/haphapbon2.png";
import snowBallImg from "../assets/SnowBall.jpg";

// Each project supports EITHER a single `image`, OR an `images` array for a
// full gallery (shown with thumbnails + arrows on the detail page). Example:
//   images: [shot1, shot2, shot3],
// `image` is still used as the small thumbnail on the Projects list page —
// when only `images` is set, the list page automatically uses images[0].
export const PROJECTS = [
  {
    id: "annexbios",
    name: "AnnexBios",
    year: 2025,
    date: "January 2025",
    category: "Cinema Website",
    services: ["PHP", "CSS", "Html", "JavaScript"],
    featured: true, // highlight as an extra-important project
    image: annexBiosImg,
    // images: [annexBiosImg, /* add more screenshots here */],
    video: null, // "/projects/annexbios.mp4"
    description:
      "AnnexBios is a cinema management platform that allows a central headquarters to manage movies and distribute them to multiple cinema branches. The headquarters receives movie information and screening schedules, then assigns them to the appropriate branch locations through the system. The application streamlines cinema management by providing a centralized solution for handling movie data, showtimes, and branch operations while ensuring efficient communication between the headquarters and individual cinemas.",
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
    download: "https://github.com/TomsProgramming/HoofdKantoor1",
    teamType: "Team project",
    role: "I was responsible for developing the frontend of the application, creating an intuitive and responsive interface for users. I also implemented a feature that automatically generates a unique password for each cinema branch when it connects to our API, making the onboarding process more secure and efficient.Throughout the project, I collaborated closely with my team, contributing to frontend development and helping integrate the application with the backend services to ensure smooth communication between the user interface and the system.",
  },
  {
    id: "Festival-App",
    name: "U Festival App - 2026",
    year: 2026,
    date: "2026",
    category: "Progressive Web App",
    services: ["React", "Vite", "Express", "PWA", "JavaScript"],
    featured: true,
    images: [
      uFestivalImg,
      uFestivalCms,
      uFestivalCms2,
      UFestivalmap,
      uFestivalmapschema,
      uFestivalmapinfo,
    ],
    video: null,
    description:
      "The U Festival App is a Progressive Web App (PWA) — a pocket guide for the U Festival in Utrecht 2026. Visitors get a live home screen with a countdown and news, practical information in an accordion, and a schedule per stage and day where they can save favourites and set reminders. An illustrated festival map shows the visitor's real position on the grounds using the browser's Geolocation API. A password-protected admin CMS lets organisers add and edit acts, and every change syncs to the app instantly. Because it is a PWA with a JSON data store served by an Express back-end, it keeps working even with a poor connection on the festival grounds.",
    highlights: [
      "Installable PWA that keeps working offline",
      "Live home screen with a countdown and news updates",
      "Schedule by stage & day with favourites and reminders",
      "Illustrated map with real-time GPS positioning (Geolocation API)",
      "Password-protected admin CMS with instant sync",
      "Express back-end with a JSON data store",
    ],
    code: `// Map a real GPS coordinate onto the illustrated festival map,
// then move the visitor's marker to that spot on the image.
function gpsToImage({ lat, lng }, bounds, size) {
  const x = ((lng - bounds.west) / (bounds.east - bounds.west)) * size.width;
  const y = ((bounds.north - lat) / (bounds.north - bounds.south)) * size.height;
  return { x, y };
}

navigator.geolocation.watchPosition((pos) => {
  const { x, y } = gpsToImage(pos.coords, MAP_BOUNDS, MAP_SIZE);
  marker.style.transform = \`translate(\${x}px, \${y}px)\`;
});`,
    download: "https://github.com/Mahmoud-1738/Festival-App",
    teamType: "Solo project",
    role: "I was responsible for the entire development of the project from start to finish. This included planning the application architecture, designing the user interface, implementing both the frontend and backend, creating and managing the database,  developing all core features, fixing bugs, testing the application, and preparing it for deployment. I independently handled every stage of the project, ensuring that the application was functional, responsive, and delivered a smooth user experience.",
  },
  {
    id: "Kiosk",
    name: "Kiosk Happy Herbivore ~ Healthy in a Hurry",
    year: 2026,
    date: "2026",
    category: "Website",
    services: ["Html", "CSS", "typescript", "JavaScript", "React", "PHP"],
    featured: false,
    images: [
      haphapstart,
      haphap,
      kioskImg,
      haphapinfo,
      haphappay,
      haphapbon,
      haphapbon2,
    ],
    video: null,
    description:
      "The Kiosk project is an interactive self-service application designed to provide users with a fast and intuitive way to access information and complete tasks through a touch-friendly interface. The application focuses on usability, responsive design, and efficient data management, offering a smooth experience for users in a kiosk environment.The project combines modern frontend development with backend services and database integration to deliver a reliable and scalable solution. Throughout the development process, emphasis was placed on creating an engaging user interface, maintaining clean code, and ensuring seamless communication between the frontend and backend.",
    highlights: [
      "Developed the complete frontend of the kiosk application.",
      "Designed and implemented the animated start screen using Adobe After Effects.",
      "Created and managed the project's database structure.",
    ],
    code: `// drop a representative code snippet here`,
    download: "https://github.com/Mahmoud-1738/haphap",
    teamType: "Team project",
    role: "I was primarily responsible for developing the frontend of the application, creating a responsive and user-friendly interface that delivers a smooth kiosk experience. I also designed and implemented the animated start page using Adobe After Effects to provide an engaging introduction for users.In addition, I designed and managed the project's database structure and contributed to the backend development by assisting with API implementation, data handling, and integrating frontend functionality with backend services. My work ensured that the user interface, database, and backend worked together seamlessly.",
  },
  {
    // NOTE: id must be unique — it is the URL of the detail page.
    id: "snowball",
    name: "SnowBall",
    year: 2026,
    date: "2026",
    category: "Website",
    services: ["Html", "CSS", "JavaScript"],
    featured: false,
    images: [snowBallImg],
    video: null,
    description:
      "Short description of this project — replace with the real one.",
    highlights: ["Highlight one", "Highlight two"],
    code: `// drop a representative code snippet here`,
    download: "https://github.com/Mahmoud-1738/SnowBall-fight",
    teamType: "Solo project",
    role: "Describe your role here.",
  },
];

export const getProject = (id) => PROJECTS.find((p) => p.id === id);

// The thumbnail to use on the Projects list page: images[0] if a gallery is
// set, otherwise the single `image`.
export const getThumbnail = (p) => (p.images?.length ? p.images[0] : p.image);

// The full ordered list of photos for the detail-page gallery.
export const getGallery = (p) =>
  p.images?.length ? p.images : p.image ? [p.image] : [];
