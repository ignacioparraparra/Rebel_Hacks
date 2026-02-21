import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getToken, clearTokens, apiFetch } from "../utils/api";
import "./Navbar.css";

const navClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

function Navbar() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("username") === "admin";
  const loggedIn = isAdmin || !!getToken();
  const [menuOpen, setMenuOpen] = useState(false);
  const [chips, setChips] = useState(null);

  useEffect(() => {
    if (!loggedIn || isAdmin) return;
    apiFetch("/student/chips").then(async (res) => {
      if (!res) return;
      try {
        const data = await res.json();
        setChips(data.current_balance);
      } catch {
        // empty or invalid response
      }
    });
  }, [loggedIn]);

  function handleLogout() {
    clearTokens();
    localStorage.removeItem("username");
    navigate("/");
  }

  const close = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink
          to={isAdmin ? "/admin" : loggedIn ? "/dashboard" : "/"}
          className="navbar-logo-link"
          end
        >
          <img
            src="/artboard-simple.png"
            alt="scholarChips"
            className="navbar-logo"
          />
        </NavLink>
      </div>

      <button className="navbar-toggler" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`navbar-links ${menuOpen ? "show" : ""}`}>
        {isAdmin ? (
          <NavLink to="/admin" className={navClass} onClick={close}>
            <div className="nav-link-element">Admin</div>
          </NavLink>
        ) : (
          <>
            <NavLink to="/dashboard" className={navClass} end onClick={close}>
              <div className="nav-link-element">Dashboard</div>
            </NavLink>
            <NavLink to="/prizes" className={navClass} onClick={close}>
              <div className="nav-link-element">Prizes</div>
            </NavLink>
            <NavLink to="/leaderboard" className={navClass} onClick={close}>
              <div className="nav-link-element">Leaderboard</div>
            </NavLink>
          </>
        )}

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

      <div className="navbar-right">
        {loggedIn && !isAdmin && chips !== null && (
          <div className="navbar-chips">
            <img src="/favicon.webp" alt="chip" className="navbar-chip-icon" />
            <span>{Number(chips).toLocaleString()}</span>
          </div>
        )}
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
