import React from "react";
import { NavLink } from "react-router-dom";
import cvUrl from "../assets/CV.pdf?url";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <span>@2026</span>

      <div className="site-footer__links">
        <a href="mailto:mahmous2234@gmail.com">mahmous2234@gmail.com</a>
        {/* TODO: replace with your real LinkedIn profile URL */}
        <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
          Linkedin
        </a>
        <a
          href="https://github.com/Mahmoud-1738"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a href={cvUrl} target="_blank" rel="noreferrer">
          CV
        </a>
      </div>

      <NavLink to="/contact" className="site-footer__link">
        contact
      </NavLink>
    </footer>
  );
}

export default Footer;
