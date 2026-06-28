import React, { useState } from "react";
import "./Projects.css";

// Edit this list to add your projects.
// Drop screenshots in /public/projects/ and set `image: "/projects/your-file.png"`.
const PROJECTS = [
  {
    id: 1,
    name: "AnnexBios",
    year: 2005,
    category: "Website",
    services: ["PHP", "CSS", "Html", "JavaScript"],
    image: null,
  },
  {
    id: 2,
    name: "AnnexBios",
    year: 2005,
    category: "Website",
    services: ["PHP", "CSS", "Html", "JavaScript"],
    image: null,
  },
  {
    id: 3,
    name: "AnnexBios",
    year: 2005,
    category: "Website",
    services: ["PHP", "CSS", "Html", "JavaScript"],
    image: null,
  },
];

function Projects() {
  const [view, setView] = useState("single"); // "single" | "list" | "grid"
  const [sortDesc, setSortDesc] = useState(true);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const projects = PROJECTS.filter(
    (p) =>
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.services.some((s) => s.toLowerCase().includes(q))
  ).sort((a, b) => (sortDesc ? b.year - a.year : a.year - b.year));

  const services = (p) =>
    p.services.map((s) => (
      <span className="service-tag" key={s}>
        {s}
      </span>
    ));

  const shot = (p, phClass) =>
    p.image ? (
      <img src={p.image} alt={p.name} />
    ) : (
      <div className={phClass}>{p.name}</div>
    );

  return (
    <div className="projects-page">
      {/* ---------- Hero ---------- */}
      <section className="projects-hero">
        <h1 className="projects-big">PROJECTS</h1>

        {/* 3D phone goes here — build it yourself and drop it in this slot. */}
        <div className="projects-phone-slot" aria-hidden="true">
          <span>3D phone</span>
        </div>

        <p className="projects-scroll-hint">SCROLL FOR MORE</p>
      </section>

      {/* ---------- Toolbar ---------- */}
      <div className="projects-toolbar">
        <div className="view-toggle">
          <span className="view-toggle__label">View</span>

          <button
            type="button"
            className={"view-btn" + (view === "single" ? " is-active" : "")}
            onClick={() => setView("single")}
            aria-label="Single view"
          >
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
              <rect x="1" y="1" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>

          <button
            type="button"
            className={"view-btn" + (view === "list" ? " is-active" : "")}
            onClick={() => setView("list")}
            aria-label="List view"
          >
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
              <rect x="1" y="2" width="18" height="3" rx="1.5" fill="currentColor" />
              <rect x="1" y="7" width="18" height="3" rx="1.5" fill="currentColor" />
              <rect x="1" y="12" width="18" height="3" rx="1.5" fill="currentColor" />
            </svg>
          </button>

          <button
            type="button"
            className={"view-btn" + (view === "grid" ? " is-active" : "")}
            onClick={() => setView("grid")}
            aria-label="Grid view"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="1" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              <rect x="10.5" y="1" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              <rect x="1" y="10.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              <rect x="10.5" y="10.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <div className="toolbar-filters">
          <label className="search">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.3" />
              <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>

          {/* Service / Client are placeholders for future filtering. */}
          <button type="button" className="filter-btn">Service</button>
          <button type="button" className="filter-btn">Client</button>
          <button
            type="button"
            className="filter-btn"
            onClick={() => setSortDesc((s) => !s)}
          >
            Year
            <span className={"filter-btn__caret" + (sortDesc ? "" : " is-up")}>▾</span>
          </button>
        </div>
      </div>

      {/* ---------- Projects ---------- */}
      <section className={"projects-list projects-list--" + view}>
        {/* GRID: images only */}
        {view === "grid" &&
          projects.map((p) => (
            <div className="grid-card" key={p.id}>
              {shot(p, "grid-card__ph")}
              <div className="grid-card__overlay">
                <span className="grid-card__name">{p.name}</span>
                <span className="grid-card__category">{p.category}</span>
              </div>
            </div>
          ))}

        {/* LIST: text rows only */}
        {view === "list" &&
          projects.map((p, i) => (
            <article className="list-row" key={p.id}>
              <span className="list-row__index">#{i + 1}</span>
              <h3 className="list-row__name">{p.name}</h3>
              <span className="list-row__category">{p.category}</span>
              <div className="list-row__services">{services(p)}</div>
            </article>
          ))}

        {/* SINGLE: big image + info */}
        {view === "single" &&
          projects.map((p, i) => (
            <article className="single-card" key={p.id}>
              <span className="single-card__index">#{i + 1}</span>
              <div className="single-card__shot">{shot(p, "single-card__ph")}</div>
              <div className="single-card__info">
                <div className="single-card__head">
                  <h3 className="single-card__name">{p.name}</h3>
                  <span className="single-card__year">{p.year}</span>
                </div>
                <span className="single-card__category">{p.category}</span>
                <div className="single-card__services">{services(p)}</div>
              </div>
            </article>
          ))}

        {projects.length === 0 && (
          <p className="projects-empty">No projects match “{query}”.</p>
        )}
      </section>
    </div>
  );
}

export default Projects;
