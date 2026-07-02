import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header>
      <nav aria-label="Main navigation">
        <ul>
          <li><NavLink to="/" end className="nav-link">Home</NavLink></li>
          <li><NavLink to="/projects" className="nav-link">Projects</NavLink></li>
          <li><div id="name">MAHMOUD</div></li>
          <li><NavLink to="/about" className="nav-link">About</NavLink></li>
          <li><NavLink to="/contact" className="nav-link">Contact</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
