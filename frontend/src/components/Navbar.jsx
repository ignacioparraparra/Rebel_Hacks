import { NavLink } from "react-router-dom";
import "./Navbar.css";

// navClass is a small helper React Router calls for us automatically.
// isActive is true when the current URL matches this link's `to` path.
const navClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

function Navbar() {
  return (
    <nav className="navbar">
      {/* Brand / logo — left side */}
      <NavLink to="/" className={navClass} end><h1 className="nav-link-element element-home">scholarChips</h1></NavLink>

      {/* Page links — centre */}
      <div className="navbar-links">
        {/* `end` on Home means it only highlights on exactly "/",
            not on every page (because every path starts with /) */}
        <NavLink to="/dashboard" className={navClass} end><div className="nav-link-element">Dashboard</div></NavLink>
        <NavLink to="/games" className={navClass}><div className="nav-link-element">Games</div></NavLink>
        <NavLink to="/classes" className={navClass}><div className="nav-link-element">Classes</div></NavLink>
      </div>

      {/* Login button — right side */}
      <a href="/login" className="navbar-login-btn">Login</a>
    </nav>
  );
}

export default Navbar;
