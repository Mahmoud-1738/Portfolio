import React, { useRef, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Header from "./components/Header.jsx";
import Home from "./pages/Home/Home.jsx";

const About = lazy(() => import("./pages/About/About.jsx"));
const Projects = lazy(() => import("./pages/projects/Projects.jsx"));
const Project = lazy(() => import("./pages/projects/Project.jsx"));
const Contact = lazy(() => import("./pages/Contact/Contact.jsx"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound.jsx"));

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function AnimatedRoutes() {
  const location = useLocation();
  const smootherRef = useRef(null);

  // Smooth scrolling only on the Projects list page; recreated per route.
  useGSAP(
    () => {
      if (location.pathname.toLowerCase() === "/projects") {
        smootherRef.current = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.2,
          effects: true,
        });
        ScrollTrigger.refresh();
      }
      return () => {
        smootherRef.current?.kill();
        smootherRef.current = null;
        // ScrollSmoother can leave inline transform/position styles behind;
        // clearing them prevents the fixed Home hero from breaking.
        gsap.set(["#smooth-wrapper", "#smooth-content"], { clearProps: "all" });
      };
    },
    { dependencies: [location.pathname] },
  );

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <Header />
        <main>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
