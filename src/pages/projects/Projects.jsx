import React, { useState, useRef, Suspense } from "react";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { Phone } from "../../components/Phone.jsx";
import { PROJECTS, getThumbnail } from "../../data/projects.js";
import { useReveal } from "../../hooks/useReveal.js";
import { usePageMeta } from "../../hooks/usePageMeta.js";
import "./Projects.css";

function Projects() {
  const [view, setView] = useState("single"); // "single" | "list" | "grid"
  const [sortDesc, setSortDesc] = useState(true);
  const [query, setQuery] = useState("");
  const pageRef = useRef(null);
  usePageMeta("Projects", "Selected work and projects by Mahmoud.");

  const q = query.trim().toLowerCase();
  const projects = PROJECTS.filter(
    (p) =>
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.services.some((s) => s.toLowerCase().includes(q)),
  ).sort((a, b) => (sortDesc ? b.year - a.year : a.year - b.year));

  const services = (p) =>
    p.services.map((s) => (
      <span className="service-tag" key={s}>
        {s}
      </span>
    ));

  const shot = (p, phClass) => {
    const thumb = getThumbnail(p);
    return thumb ? (
      <img src={thumb} alt={p.name} />
    ) : (
      <div className={phClass}>{p.name}</div>
    );
  };

  // Re-run the reveal when the view or search changes (cards re-render).
  useReveal(pageRef, [view, query]);

  return (
    <div className="projects-page" ref={pageRef}>
      {/* ---------- Hero ---------- */}
      <section className="projects-hero">
        <h1 className="projects-big" data-reveal="zoom">
          PROJECTS
        </h1>

        {/* 3D phone */}
        <div className="projects-phone-slot">
          <Canvas camera={{ position: [0, 0, 6], fov: 35 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={1.5} />
              <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
                <Phone scale={20} rotation={[0, Math.PI, 0]} />
              </Float>
              <Environment preset="city" />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
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
              <rect
                x="1"
                y="1"
                width="18"
                height="14"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>

          <button
            type="button"
            className={"view-btn" + (view === "list" ? " is-active" : "")}
            onClick={() => setView("list")}
            aria-label="List view"
          >
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
              <rect
                x="1"
                y="2"
                width="18"
                height="3"
                rx="1.5"
                fill="currentColor"
              />
              <rect
                x="1"
                y="7"
                width="18"
                height="3"
                rx="1.5"
                fill="currentColor"
              />
              <rect
                x="1"
                y="12"
                width="18"
                height="3"
                rx="1.5"
                fill="currentColor"
              />
            </svg>
          </button>

          <button
            type="button"
            className={"view-btn" + (view === "grid" ? " is-active" : "")}
            onClick={() => setView("grid")}
            aria-label="Grid view"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect
                x="1"
                y="1"
                width="6.5"
                height="6.5"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="10.5"
                y="1"
                width="6.5"
                height="6.5"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="1"
                y="10.5"
                width="6.5"
                height="6.5"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="10.5"
                y="10.5"
                width="6.5"
                height="6.5"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>

        <div className="toolbar-filters">
          <label className="search">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="6.5"
                cy="6.5"
                r="5"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <line
                x1="10.5"
                y1="10.5"
                x2="14"
                y2="14"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>

          {/* Service / Client are placeholders for future filtering. */}
          <button type="button" className="filter-btn">
            Service
          </button>
          <button type="button" className="filter-btn">
            Client
          </button>
          <button
            type="button"
            className="filter-btn"
            onClick={() => setSortDesc((s) => !s)}
          >
            Year
            <span className={"filter-btn__caret" + (sortDesc ? "" : " is-up")}>
              ▾
            </span>
          </button>
        </div>
      </div>

      {/* ---------- Projects ---------- */}
      <section className={"projects-list projects-list--" + view}>
        {/* GRID: images only */}
        {view === "grid" &&
          projects.map((p) => (
            <Link
              className="grid-card"
              to={`/projects/${p.id}`}
              key={p.id}
              data-reveal
            >
              {shot(p, "grid-card__ph")}
              <div className="grid-card__overlay">
                <span className="grid-card__name">{p.name}</span>
                <span className="grid-card__category">{p.category}</span>
              </div>
            </Link>
          ))}

        {/* LIST: text rows only */}
        {view === "list" &&
          projects.map((p, i) => (
            <Link
              className="list-row"
              to={`/projects/${p.id}`}
              key={p.id}
              data-reveal="left"
            >
              <span className="list-row__index">#{i + 1}</span>
              <h3 className="list-row__name">{p.name}</h3>
              <span className="list-row__category">{p.category}</span>
              <div className="list-row__services">{services(p)}</div>
            </Link>
          ))}

        {/* SINGLE: big image + info */}
        {view === "single" &&
          projects.map((p, i) => (
            <Link
              className="single-card"
              to={`/projects/${p.id}`}
              key={p.id}
              data-reveal
            >
              <span className="single-card__index">#{i + 1}</span>
              <div className="single-card__shot">
                {shot(p, "single-card__ph")}
              </div>
              <div className="single-card__info">
                <div className="single-card__head">
                  <h3 className="single-card__name">{p.name}</h3>
                  <span className="single-card__year">{p.year}</span>
                </div>
                <span className="single-card__category">{p.category}</span>
                <div className="single-card__services">{services(p)}</div>
              </div>
            </Link>
          ))}

        {projects.length === 0 && (
          <p className="projects-empty">No projects match “{query}”.</p>
        )}
      </section>
    </div>
  );
}

export default Projects;
