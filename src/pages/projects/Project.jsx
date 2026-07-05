import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProject, getGallery } from "../../data/projects.js";
import { useReveal } from "../../hooks/useReveal.js";
import { usePageMeta } from "../../hooks/usePageMeta.js";
import Footer from "../../components/Footer.jsx";
import "./Project.css";

function Gallery({ images, name }) {
  const [active, setActive] = useState(0);

  // Reset to the first photo whenever the project (and therefore the
  // gallery) changes.
  useEffect(() => setActive(0), [images]);

  const go = (dir) => {
    setActive((i) => (i + dir + images.length) % images.length);
  };

  // Left/right arrow keys switch photos when there's more than one.
  useEffect(() => {
    if (images.length < 2) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length]);

  return (
    <div className="project-gallery">
      <div className="project-media">
        <img src={images[active]} alt={`${name} — photo ${active + 1}`} />

        {images.length > 1 && (
          <>
            <button
              type="button"
              className="project-gallery__arrow project-gallery__arrow--prev"
              onClick={() => go(-1)}
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              type="button"
              className="project-gallery__arrow project-gallery__arrow--next"
              onClick={() => go(1)}
              aria-label="Next photo"
            >
              ›
            </button>
            <span className="project-gallery__count">
              {active + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="project-gallery__thumbs">
          {images.map((src, i) => (
            <button
              type="button"
              key={src + i}
              className={
                "project-gallery__thumb" + (i === active ? " is-active" : "")
              }
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === active}
            >
              <img src={src} alt="" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Project() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getProject(id);
  const pageRef = useRef(null);

  usePageMeta(
    project ? project.name : "Project",
    project ? project.description : "Project details."
  );
  useReveal(pageRef, [id]);

  if (!project) {
    return (
      <div className="project-page" ref={pageRef}>
        <div className="project-inner">
          <p className="project-missing" data-reveal>
            Project not found.
          </p>
          <button className="project-back" onClick={() => navigate("/projects")}>
            ← Back to projects
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="project-page" ref={pageRef}>
      <div className="project-inner">
        <button
          className="project-back"
          onClick={() => navigate("/projects")}
          data-reveal="left"
        >
          ← Back to projects
        </button>

        {/* ---------- Title ---------- */}
        <header className="project-head">
          <div>
            <h1 className="project-title" data-reveal="zoom">
              {project.name}
            </h1>
            <p className="project-category" data-reveal>
              {project.category}
            </p>
          </div>
          <span className="project-year" data-reveal="right">
            {project.year}
          </span>
        </header>

        {/* ---------- Media (video takes priority, else a photo gallery) ---------- */}
        <div className="project-media-block" data-reveal>
          {project.video ? (
            <div className="project-media">
              <video src={project.video} controls poster={project.image || undefined} />
            </div>
          ) : (() => {
              const gallery = getGallery(project);
              return gallery.length > 0 ? (
                <Gallery images={gallery} name={project.name} />
              ) : (
                <div className="project-media">
                  <div className="project-media__ph">{project.name}</div>
                </div>
              );
            })()}
        </div>

        {/* ---------- Body ---------- */}
        <div className="project-body">
          <div className="project-main">
            <section data-reveal>
              <h2 className="project-h2">Overview</h2>
              <p className="project-desc">{project.description}</p>
            </section>

            {project.highlights?.length > 0 && (
              <section data-reveal>
                <h2 className="project-h2">Highlights</h2>
                <ul className="project-highlights">
                  {project.highlights.map((h) => (
                    <li key={h}>
                      <span className="project-check">✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.role && (
              <section data-reveal>
                <h2 className="project-h2">My role</h2>
                <p className="project-desc">{project.role}</p>
              </section>
            )}

            {project.code && (
              <section data-reveal>
                <h2 className="project-h2">Code</h2>
                <pre className="project-code">
                  <code>{project.code}</code>
                </pre>
              </section>
            )}
          </div>

          {/* ---------- Sidebar ---------- */}
          <aside className="project-side" data-reveal="right">
            <dl className="project-meta">
              <dt>Year</dt>
              <dd>{project.date || project.year}</dd>

              <dt>Type</dt>
              <dd>{project.teamType}</dd>

              <dt>Stack</dt>
              <dd>
                <div className="project-tags">
                  {project.services.map((s) => (
                    <span className="service-tag" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </dd>
            </dl>

            {project.download && (
              <a
                className="project-download"
                href={project.download}
                target="_blank"
                rel="noreferrer"
              >
                Try it / Download
              </a>
            )}
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Project;
