import React, { useRef } from "react";
import "./Home.css";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(useGSAP, SplitText);

const WORDS = ["#portfolio", "#project", "#about", "#contact"];

function Home() {
  const indexRef = useRef(0);
  const animatingRef = useRef(false);

  useGSAP(() => {
    // Lock page scrolling immediately (synchronously) so the cleanup below
    // can reliably restore it when leaving Home. The animation is driven
    // manually by the listeners.
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

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
      <div className="home-row">
        <h1 className="home-title" id="home-title1">
          Web
        </h1>

        <div className="big-text-container">
          <h1 className="big-text" id="portfolio">
            Portfolio
          </h1>
          <h1 className="big-text" id="project">
            Project
          </h1>
          <h1 className="big-text" id="about">
            About
          </h1>
          <h1 className="big-text" id="contact">
            Contact
          </h1>
        </div>

        <h1 className="home-title" id="home-title2">
          Developer
        </h1>
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
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            Linkedin
          </a>
          <span>contact</span>
        </div>
      </footer>
    </section>
  );
}

export default Home;
