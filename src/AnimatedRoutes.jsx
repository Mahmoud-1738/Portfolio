import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Header from "./components/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Projects from "./pages/projects/Projects.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import "./AnimatedRoutes.css";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

function Page({ loc }) {
  return (
    <>
      <Header />
      <Routes location={loc}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default function AnimatedRoutes() {
  const location = useLocation();
  const [current, setCurrent] = useState(location); // page shown underneath
  const [incoming, setIncoming] = useState(null); // page sliding in on top
  const overlayRef = useRef(null);
  const smootherRef = useRef(null);
  const animatingRef = useRef(false);

  // Start a transition whenever the route changes.
  useEffect(() => {
    if (location.pathname === current.pathname || animatingRef.current) return;
    animatingRef.current = true;
    setIncoming(location);
  }, [location, current.pathname]);

  // Slide the incoming page in from the right, over the current one.
  useGSAP(
    () => {
      if (!incoming) return;
      const ov = overlayRef.current;
      gsap.set(ov, { xPercent: 100 });
      gsap.to(ov, {
        xPercent: 0,
        duration: 0.7,
        ease: "power4.inOut",
        onComplete: () => {
          setCurrent(incoming); // base becomes the new page (identical to overlay)
          setIncoming(null); // remove the overlay — seamless swap
          window.scrollTo(0, 0);
          animatingRef.current = false;
        },
      });
    },
    { dependencies: [incoming] }
  );

  // ScrollSmoother follows the settled (base) page: created when there is no
  // transition in progress, killed during one (transforms break it).
  useGSAP(
    () => {
      if (incoming) return;
      if (current.pathname.toLowerCase() === "/projects") {
        smootherRef.current = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.2,
          effects: true,
        });
      }
      return () => {
        smootherRef.current?.kill();
        smootherRef.current = null;
      };
    },
    { dependencies: [current.pathname, incoming] }
  );

  return (
    <>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="route-stage">
            <Page loc={current} />
          </div>
        </div>
      </div>

      {incoming && (
        <div className="route-overlay" ref={overlayRef}>
          <Page loc={incoming} />
        </div>
      )}
    </>
  );
}
