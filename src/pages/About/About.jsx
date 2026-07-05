import React, { useRef } from "react";
import Footer from "../../components/Footer.jsx";
import { useReveal } from "../../hooks/useReveal.js";
import { usePageMeta } from "../../hooks/usePageMeta.js";
import myPhoto from "../../assets/myfoto.jpeg";
import "./About.css";

// simple line icons in the site's blue accent
const ICONS = {
  frontend: (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="8"
        y="12"
        width="56"
        height="44"
        rx="6"
        stroke="#6ea8ff"
        strokeWidth="3"
      />
      <line x1="8" y1="24" x2="64" y2="24" stroke="#6ea8ff" strokeWidth="3" />
      <circle cx="15" cy="18" r="1.8" fill="#6ea8ff" />
      <circle cx="21" cy="18" r="1.8" fill="#6ea8ff" />
      <path
        d="M28 34 L20 41 L28 48"
        stroke="#6ea8ff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M44 34 L52 41 L44 48"
        stroke="#6ea8ff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="38"
        y1="32"
        x2="34"
        y2="50"
        stroke="#6ea8ff"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  ),
  motion: (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M36 8 L62 22 V50 L36 64 L10 50 V22 Z"
        stroke="#6ea8ff"
        strokeWidth="3"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M36 8 V36 M36 36 L62 22 M36 36 L10 22 M36 36 V64"
        stroke="#6ea8ff"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  ),
  backend: (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="12"
        y="10"
        width="48"
        height="16"
        rx="4"
        stroke="#6ea8ff"
        strokeWidth="3"
      />
      <rect
        x="12"
        y="28"
        width="48"
        height="16"
        rx="4"
        stroke="#6ea8ff"
        strokeWidth="3"
      />
      <rect
        x="12"
        y="46"
        width="48"
        height="16"
        rx="4"
        stroke="#6ea8ff"
        strokeWidth="3"
      />
      <circle cx="20" cy="18" r="2" fill="#6ea8ff" />
      <circle cx="20" cy="36" r="2" fill="#6ea8ff" />
      <circle cx="20" cy="54" r="2" fill="#6ea8ff" />
      <line
        x1="40"
        y1="18"
        x2="52"
        y2="18"
        stroke="#6ea8ff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="40"
        y1="36"
        x2="52"
        y2="36"
        stroke="#6ea8ff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="40"
        y1="54"
        x2="52"
        y2="54"
        stroke="#6ea8ff"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  ),
  seo: (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 58 A26 26 0 1 1 60 58"
        stroke="#6ea8ff"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <line
        x1="36"
        y1="52"
        x2="48"
        y2="30"
        stroke="#6ea8ff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="36" cy="52" r="4" fill="#6ea8ff" />
    </svg>
  ),
};

const SERVICES = [
  {
    icon: ICONS.frontend,
    title: "Front-End",
    desc: "Building responsive interfaces with React and clean CSS — from layout to the last hover state.",
    list: [
      "React / Vite",
      "Responsive UI",
      "Html & CSS",
      "JavaScript",
      "Components",
      "Accessibility",
    ],
  },
  {
    icon: ICONS.motion,
    title: "Animation & 3D",
    desc: "Motion that supports the design instead of distracting from it — like the scroll effects and the 3D phone on this site.",
    list: [
      "GSAP",
      "Scroll effects",
      "Micro-interactions",
      "Three.js / R3F",
      "Transitions",
      "Hover states",
    ],
  },
  {
    icon: ICONS.backend,
    title: "Back-End",
    desc: "The part you don't see: forms that arrive, data that's stored, and pages that keep working.",
    list: ["PHP", "APIs", "Databases", "Forms", "Integrations", "Deployment"],
  },
  {
    icon: ICONS.seo,
    title: "SEO & Performance",
    desc: "Fast pages with clean markup: unique titles, meta descriptions, alt text and optimised assets.",
    list: [
      "Meta tags",
      "Semantic HTML",
      "Alt text",
      "Lighthouse",
      "Image optimisation",
      "Loading speed",
    ],
  },
];

const STACK = ["PHP", "HTML", "JavaScript", "GSAP", "React", "Vite"];

// One repeating unit of the marquee.
function MarqueeUnit() {
  return (
    <>
      <span className="marquee__item">
        Learn. <span className="marquee__accent">Build.</span> Repeat
      </span>
      <span className="marquee__sep" aria-hidden="true" />
    </>
  );
}

function About() {
  const trackRef = useRef(null);
  const pageRef = useRef(null);
  useReveal(pageRef);
  usePageMeta(
    "About",
    "About Mahmoud — a web developer building fast, modern, interactive websites with React, GSAP and clean front-end engineering.",
  );

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 384, behavior: "smooth" });
  };

  return (
    <div className="about-page" ref={pageRef}>
      {/* ---------- Hero ---------- */}
      <section className="about-hero">
        <h1 className="about-big" data-reveal="zoom">
          MAHMOUD
        </h1>
        <p className="about-hero__sub" data-reveal>
          I&apos;m Mahmoud — a web developer focused on building fast, modern
          and interactive websites. I turn ideas into polished products that
          feel alive.
        </p>
      </section>

      {/* ---------- About me ---------- */}
      <section className="about-intro">
        <span className="about-intro__label" data-reveal="left">
          About me
        </span>

        <div className="about-intro__col" data-reveal>
          <p>
            I&apos;m Mahmoud, a web development student at Grafisch Lyceum
            Utrecht. I got into building websites because I like making things
            people can actually click, scroll and use — not just look at.
          </p>
          <p>
            I work mostly with React, JavaScript and PHP, and I enjoy the
            front-end side the most: layout, motion and the small details that
            make a page feel finished. This portfolio is built from scratch with
            React, Vite and GSAP.
          </p>
        </div>

        <div className="about-intro__col" data-reveal>
          <p>
            The projects here range from a cinema website with ticket booking to
            a festival app built with a team. Each one taught me something new —
            about code, but also about planning and working with others.
          </p>
          <p>
            Right now I&apos;m focused on getting better at animation, 3D on the
            web and writing cleaner code. Next up: TypeScript and more back-end.
            If you want to build something together, get in touch.
          </p>
        </div>
      </section>

      {/* ---------- Marquee ---------- */}
      <section className="marquee">
        <div className="marquee__track">
          {/* two identical groups for a seamless loop */}
          <div className="marquee__group">
            {Array.from({ length: 4 }).map((_, i) => (
              <MarqueeUnit key={"a" + i} />
            ))}
          </div>
          <div className="marquee__group" aria-hidden="true">
            {Array.from({ length: 4 }).map((_, i) => (
              <MarqueeUnit key={"b" + i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="about-services">
        <div className="about-services__head">
          <h2 className="about-services__title" data-reveal="left">
            Services
          </h2>
          <div className="carousel-arrows">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Previous"
            >
              ‹
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Next">
              ›
            </button>
          </div>
        </div>

        <div className="services-track" ref={trackRef}>
          {SERVICES.map((s) => (
            <article className="svc-card" key={s.title} data-reveal>
              <div className="svc-card__img">{s.icon}</div>
              <h3 className="svc-card__title">{s.title}</h3>
              <p className="svc-card__desc">{s.desc}</p>
              <ul className="svc-card__list">
                {s.list.map((item) => (
                  <li key={item}>
                    <span className="svc-card__check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Tech stack ---------- */}
      <section className="about-stack">
        <p className="about-stack__label" data-reveal>
          Built with
        </p>
        <div className="stack-grid">
          {STACK.map((t) => (
            <div className="stack-cell" key={t} data-reveal="zoom">
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CTA band ---------- */}
      <section className="about-cta">
        <div className="about-cta__card">
          {/* photo imported from src/assets so Vite bundles it */}
          <div
            className="about-cta__img"
            style={{ backgroundImage: `url(${myPhoto})` }}
            role="img"
            aria-label="Photo of Mahmoud"
          ></div>
          <div className="about-cta__body">
            <span className="about-cta__logo" data-reveal="left">
              MAHMOUD
            </span>
            <p className="about-cta__text" data-reveal>
              MBO-student Creative Software Development (niveau 4) met een focus
              op webontwikkeling. Ik werk met PHP, Laravel, React en Vue, en ik
              zoek een stage of bijbaan waar ik daar beter in kan worden en kan
              meebouwen aan bruikbare, moderne webapplicaties. Op de langere
              termijn wil ik richting de creatieve tech-industrie, vooral
              visuele effecten en game art. Waar ik goed in ben: nette code
              schrijven zonder het oog voor design te verliezen. Ik leer snel,
              pak dingen aan en werk net zo makkelijk alleen als in een team,
              van het eerste idee tot een afgerond project.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
