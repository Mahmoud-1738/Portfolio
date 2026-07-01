import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProject } from "../../data/projects.js";
import { useReveal } from "../../hooks/useReveal.js";
import { usePageMeta } from "../../hooks/usePageMeta.js";
import Footer from "../../components/Footer.jsx";
import "./Project.css";

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

        {/* ---------- Media (image / video) ---------- */}
        <div className="project-media" data-reveal>
          {project.video ? (
            <video src={project.video} controls poster={project.image || undefined} />
          ) : project.image ? (
            <img src={project.image} alt={project.name} />
          ) : (
            <div className="project-media__ph">{project.name}</div>
          )}
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
