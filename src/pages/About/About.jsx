import React, { useRef } from "react";
import Footer from "../../components/Footer.jsx";
import { useReveal } from "../../hooks/useReveal.js";
import { usePageMeta } from "../../hooks/usePageMeta.js";
import "./About.css";

const SERVICES = [
  {
    emoji: "💡",
    title: "Concept & Strategy",
    desc: "Come to us with an idea — or even just a goal — and we'll build the entire creative vision from start to finish.",
    list: [
      "Creative strategy",
      "Storyboarding",
      "Moodboards",
      "Trend forecasting",
      "Campaign direction",
      "Narrative development",
    ],
  },
  {
    emoji: "🎬",
    title: "Front-End",
    desc: "No matter the scale, we bring interfaces to life with precision, motion and pixel-perfect detail.",
    list: [
      "React / Vite",
      "Responsive UI",
      "Animations",
      "Accessibility",
      "Component systems",
      "Performance",
    ],
  },
  {
    emoji: "✨",
    title: "Animation & VFX",
    desc: "We don't just enhance experiences — we make them unforgettable using motion and interaction.",
    list: [
      "GSAP / motion",
      "Scroll effects",
      "Micro-interactions",
      "3D / WebGL",
      "Transitions",
      "Hover states",
    ],
  },
  {
    emoji: "🛠️",
    title: "Back-End",
    desc: "Robust, secure foundations that keep everything running fast and reliable behind the scenes.",
    list: [
      "APIs",
      "Databases",
      "Auth",
      "Node / PHP",
      "Integrations",
      "Deployment",
    ],
  },
  {
    emoji: "📈",
    title: "SEO & Strategy",
    desc: "We make sure the work gets seen — fast pages, clean markup, and content that ranks.",
    list: [
      "Technical SEO",
      "Core Web Vitals",
      "Analytics",
      "Metadata",
      "Sitemaps",
      "Optimisation",
    ],
  },
  {
    emoji: "🎟️",
    title: "Maintenance",
    desc: "We keep what we build healthy — updates, monitoring and quick turnarounds when you need them.",
    list: [
      "Updates",
      "Monitoring",
      "Bug fixes",
      "Backups",
      "Support",
      "Rapid delivery",
    ],
  },
];

const STACK = ["PHP", "HTML", "JavaScript", "GSAP", "React", "Vite"];

// One repeating unit of the marquee.
function MarqueeUnit() {
  return (
    <>
      <span className="marquee__item">
        Create. <span className="marquee__accent">Move.</span> Accelerate
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
    "About Mahmoud — a web developer building fast, modern, interactive websites with React, GSAP and clean front-end engineering."
  );

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 384, behavior: "smooth" });
  };

  return (
    <div className="about-page" ref={pageRef}>
      {/* ---------- Hero ---------- */}
      <section className="about-hero">
        <h1 className="about-big" data-reveal="zoom">MAHMOUD</h1>
        <p className="about-hero__sub" data-reveal>
          I&apos;m Mahmoud — a web developer focused on building fast, modern and
          interactive websites. I turn ideas into polished products that feel
          alive.
        </p>
      </section>

      {/* ---------- About me ---------- */}
      <section className="about-intro">
        <span className="about-intro__label" data-reveal="left">About Us</span>

        <div className="about-intro__col" data-reveal>
          <p>
            Mahmoud is a developer built to create momentum. I help brands move
            faster, think sharper, and show up with relevance through
            culture-shaping content and high-impact builds.
          </p>
          <p>
            As platforms and attention spans keep shifting, I adapt without
            losing focus — from strategy to production and launch, designing work
            that meets the moment and pushes it forward.
          </p>
        </div>

        <div className="about-intro__col" data-reveal>
          <p>
            I believe momentum comes from people — the ones behind the work and
            the ones it&apos;s made for. Ideas should feel alive, timely and
            human.
          </p>
          <p>
            At the core it&apos;s about commitment: to the clients, to the work,
            and to the craft. Every project gets treated like my own. Always
            moving. Always building.
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
          <h2 className="about-services__title" data-reveal="left">Services</h2>
          <div className="carousel-arrows">
            <button type="button" onClick={() => scroll(-1)} aria-label="Previous">
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
              <div className="svc-card__img">
                <span className="svc-card__emoji">{s.emoji}</span>
              </div>
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
        <p className="about-stack__label" data-reveal>Built with</p>
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
          {/* drop your photo at /public/about-me.jpg — falls back to a plain block */}
          <div
            className="about-cta__img"
            style={{ backgroundImage: "url('/about-me.jpg')" }}
            aria-hidden="true"
          ></div>
          <div className="about-cta__body">
            <span className="about-cta__logo" data-reveal="left">MAHMOUD</span>
            <p className="about-cta__text" data-reveal>
              I care about the details — clean code, smooth motion, and
              interfaces that are a pleasure to use. If you&apos;ve got an idea,
              let&apos;s turn it into something people remember.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
