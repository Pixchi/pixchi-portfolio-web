import React from "react";
import { Link, NavLink } from "react-router-dom";
import pixchiLogo from "../assets/pixchi-logo.png";

export default function Navbar() {
  return (
    <header className="navWrap">
      <div className="navInner">
        <Link to="/" className="brand">
          <img
            src={pixchiLogo}
            alt="Pixchi"
            className="brandLogo"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <span className="brandText">Pixchi</span>
        </Link>

        <nav className="navLinks">
          <NavLink to="/acerca" className={({ isActive }) => (isActive ? "navA active" : "navA")}>
            Acerca
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => (isActive ? "navA active" : "navA")}>
            Entrar
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
