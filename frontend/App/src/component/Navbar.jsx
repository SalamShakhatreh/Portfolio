
import { NavLink } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container py-2">
        <NavLink className="navbar-brand fw-bold" to="/">
          My Portfolio
        </NavLink>

        <div className="navbar-nav ms-auto">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>

          <NavLink className="nav-link" to="/about">
            About
          </NavLink>

          <NavLink className="nav-link" to="/projects">
            Projects
          </NavLink>

          <NavLink className="nav-link" to="/certificates">
            Certificates
          </NavLink>

          <NavLink className="nav-link" to="/contact">
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
