import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import { usePageMeta } from "../../hooks/usePageMeta.js";

gsap.registerPlugin(useGSAP, SplitText);

const WORDS = ["#portfolio", "#project", "#about", "#contact"];
// where each word links to (same order as WORDS)
const PATHS = ["/", "/projects", "/about", "/contact"];

function Home() {
  const indexRef = useRef(0);
  const animatingRef = useRef(false);
  const navigate = useNavigate();
  usePageMeta("", "Mahmoud — web developer portfolio.");

  // go to the page of the word currently on screen
  const openCurrent = () => navigate(PATHS[indexRef.current]);

  useGSAP(() => {
    // Lock page scrolling immediately (synchronously) so the cleanup below
    // can reliably restore it when leaving Home. The animation is driven
    // manually by the listeners.
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // Clear any leftover transform from ScrollSmoother (Projects page) so the
    // fixed hero measures against the viewport, not a transformed ancestor.
    gsap.set(["#smooth-wrapper", "#smooth-content"], { clearProps: "transform" });

    let tl = null;

    const go = (dir) => {
      if (!tl || animatingRef.current) return;
      const next = Math.min(
        WORDS.length - 1,
        Math.max(0, indexRef.current + dir),
      );
      if (next === indexRef.current) return; // at an end → do nothing

      indexRef.current = next;
      animatingRef.current = true;
      tl.tweenTo("state-" + next, {
        onComplete: () => {
          animatingRef.current = false;
        },
      });
    };

    const onWheel = (e) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 8) return;
      go(e.deltaY > 0 ? 1 : -1);
    };

    let touchY = 0;
    const onTouchStart = (e) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      e.preventDefault();
      const delta = touchY - e.touches[0].clientY;
      if (Math.abs(delta) < 30) return;
      go(delta > 0 ? 1 : -1);
      touchY = e.touches[0].clientY;
    };

    const onKey = (e) => {
      if (e.key === "ArrowDown") go(1);
      if (e.key === "ArrowUp") go(-1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);

    // Build the timeline once fonts are ready (SplitText needs the real font).
    document.fonts.ready.then(() => {
      const splits = WORDS.map((id) => new SplitText(id, { type: "chars" }));

      gsap.set(".big-text", { opacity: 1 });
      splits.forEach((split, i) => {
        gsap.set(split.chars, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 160,
        });
      });

      gsap.set(".scroll-indicator__line", {
        backgroundColor: "rgba(255,255,255,0.25)",
      });
      gsap.set("#ind-0", { backgroundColor: "#ffffff" });

      // A paused timeline with a label at each word. Scrolling tweens to the
      // next/previous label and the animation plays itself.
      tl = gsap.timeline({ paused: true });
      tl.addLabel("state-0", 0);

      splits.forEach((split, i) => {
        if (i === 0) return;
        const prev = splits[i - 1];

        tl.to(prev.chars, { opacity: 0, y: -80, stagger: 0.02 });
        tl.to(split.chars, { opacity: 1, y: 0, stagger: 0.02 }, "<");
        tl.to(
          `#ind-${i - 1}`,
          { backgroundColor: "rgba(255,255,255,0.25)" },
          "<",
        );
        tl.to(`#ind-${i}`, { backgroundColor: "#ffffff" }, "<");

        tl.addLabel("state-" + i);
      });

      // One-time intro for the side labels.
      gsap.from("#home-title1", {
        y: 75,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
      });
      gsap.from("#home-title2", {
        y: -75,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
      });
    });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
      if (tl) tl.kill();
    };
  });

  return (
    <section className="home">
      {/* single h1 for SEO — visually hidden, the big words are decorative */}
      <h1 className="sr-only">Mahmoud — Web Developer Portfolio</h1>

      <div className="home-row">
        <p className="home-title" id="home-title1">
          Web
        </p>

        <div
          className="big-text-container"
          onClick={openCurrent}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openCurrent();
            }
          }}
          role="link"
          tabIndex={0}
          aria-label="Open the page of the word shown"
          title="Open page"
        >
          <div className="big-text" id="portfolio">
            Portfolio
          </div>
          <div className="big-text" id="project">
            Project
          </div>
          <div className="big-text" id="about">
            About
          </div>
          <div className="big-text" id="contact">
            Contact
          </div>
        </div>

        <p className="home-title" id="home-title2">
          Developer
        </p>
      </div>

      <footer className="home-footer">
        <section className="scroll-indicator">
          <div className="scroll-indicator__line" id="ind-0"></div>
          <div className="scroll-indicator__line" id="ind-1"></div>
          <div className="scroll-indicator__line" id="ind-2"></div>
          <div className="scroll-indicator__line" id="ind-3"></div>
        </section>

        <div className="home-footer__meta">
          <span>@2026</span>
          <div className="home-footer__links">
            <a href="mailto:mahmous2234@gmail.com">mahmous2234@gmail.com</a>
            {/* TODO: replace with your real LinkedIn profile URL */}
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              Linkedin
            </a>
            <a
              href="https://github.com/Mahmoud-1764"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
          <button
            type="button"
            className="home-footer__contact"
            onClick={() => navigate("/contact")}
          >
            contact
          </button>
        </div>
      </footer>
    </section>
  );
}

export default Home;
