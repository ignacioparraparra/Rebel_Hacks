import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getToken, clearTokens } from "../utils/api";
import "./Navbar.css";

// active link helper
const navClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = !!getToken(); // if token exists we pretend the user is real
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    clearTokens();
    navigate("/login");
  }

  const close = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/dashboard" className={navClass} end>
          <h1 className="element-home">
            scholar<span className="landing-logo-accent">Chips</span>
          </h1>
        </NavLink>
      </div>

      <button className="navbar-toggler" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`navbar-links ${menuOpen ? "show" : ""}`}>
        <NavLink to="/dashboard" className={navClass} end onClick={close}>
          <div className="nav-link-element">Dashboard</div>
        </NavLink>
        <NavLink to="/prizes" className={navClass} onClick={close}>
          <div className="nav-link-element">Prizes</div>
        </NavLink>
        <NavLink to="/leaderboard" className={navClass} onClick={close}>
          <div className="nav-link-element">Leaderboard</div>
        </NavLink>
        <NavLink to="/admin" className={navClass} onClick={close}>
          <div className="nav-link-element">Admin</div>
        </NavLink>

        {/* logout lives here on mobile, hidden via CSS on desktop */}
        <div className="navbar-mobile-auth">
          {loggedIn ? (
            <button className="navbar-login-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <a href="/login" className="navbar-login-btn">
              Login
            </a>
          )}
        </div>
      </div>

      {/* desktop-only auth button */}
      <div className="navbar-right">
        {loggedIn ? (
          <button className="navbar-login-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <a href="/login" className="navbar-login-btn">
            Login
          </a>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
