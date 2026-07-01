import { createContext, useContext } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Lets the page transition disable reveals while a page is sliding in (so the
// text stays hidden during the slide, then animates once it settles — no flick).
export const RevealContext = createContext(true);

// The animation per `data-reveal` value. Default ("") = "up".
const FROM = {
  up: { y: 55 },
  down: { y: -55 },
  left: { x: -70 },
  right: { x: 70 },
  zoom: { scale: 0.82 },
  rotate: { rotate: 7, y: 45, transformOrigin: "left center" },
  blur: { filter: "blur(14px)", y: 20 },
};

/**
 * Reveals every `[data-reveal]` element inside scopeRef with a per-element
 * animation chosen by its value (e.g. data-reveal="left").
 *
 * @param scopeRef        page root ref
 * @param deps            re-run when these change
 * @param opts.scroll     true = ScrollTrigger (default), false = on-mount stagger
 */
export function useReveal(scopeRef, deps = [], opts = {}) {
  const enabled = useContext(RevealContext);
  const scroll = opts.scroll !== false;

  useGSAP(
    () => {
      const root = scopeRef.current;
      if (!root) return;
      const els = root.querySelectorAll("[data-reveal]");
      if (!els.length) return;

      // While sliding in, leave everything hidden (CSS handles it).
      if (!enabled) return;

      // Respect reduced-motion: just show everything.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(els, { opacity: 1 });
        return;
      }

      els.forEach((el, i) => {
        const from = FROM[el.dataset.reveal] || FROM.up;

        // Explicit end state (opacity 1 + reset transforms) so the CSS
        // opacity:0 can't become the animation's target.
        const to = { opacity: 1, duration: 0.8, ease: "power3.out" };
        if ("x" in from) to.x = 0;
        if ("y" in from) to.y = 0;
        if ("scale" in from) to.scale = 1;
        if ("rotate" in from) to.rotate = 0;
        if ("filter" in from) to.filter = "blur(0px)";

        if (scroll) {
          to.scrollTrigger = { trigger: el, start: "top 85%", once: true };
        } else {
          to.delay = i * 0.08;
        }

        gsap.fromTo(el, { opacity: 0, ...from }, to);
      });

      if (scroll) ScrollTrigger.refresh();
    },
    { scope: scopeRef, dependencies: deps }
  );
}
