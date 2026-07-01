import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <span>@2026</span>
      <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
        Linkedin
      </a>
      <NavLink to="/contact" className="site-footer__link">
        contact
      </NavLink>
    </footer>
  );
}

export default Footer;
