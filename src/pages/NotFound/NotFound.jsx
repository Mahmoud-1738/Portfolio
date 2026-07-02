import React from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../../hooks/usePageMeta.js";
import "./NotFound.css";

function NotFound() {
  usePageMeta("Page not found", "This page does not exist.");

  return (
    <section className="notfound">
      <h1 className="notfound__code">404</h1>
      <p className="notfound__text">This page doesn&apos;t exist.</p>
      <Link to="/" className="notfound__home">
        ← Back to home
      </Link>
    </section>
  );
}

export default NotFound;
