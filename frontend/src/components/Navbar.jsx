import { NavLink } from "react-router-dom";
import "./Navbar.css";

// active link helper
const navClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

function Navbar() {
  return (
    <nav className="navbar">
      {/* logo */}
      <NavLink to="/dashboard" className={navClass} end><h1 className="element-home">scholarChips</h1></NavLink>

      <div className="navbar-links">
        <NavLink to="/dashboard" className={navClass} end><div className="nav-link-element">Dashboard</div></NavLink>
        <NavLink to="/prizes" className={navClass}><div className="nav-link-element">Prizes</div></NavLink>
        {/* <NavLink to="/classes" className={navClass}><div className="nav-link-element">Classes</div></NavLink> */}
        <NavLink to="/leaderboard" className={navClass}><div className="nav-link-element">Leaderboard</div></NavLink>

      </div>

      <a href="/login" className="navbar-login-btn">Login</a>
    </nav>
  );
}

export default Navbar;
