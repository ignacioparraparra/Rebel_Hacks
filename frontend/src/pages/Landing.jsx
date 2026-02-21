import { Link } from "react-router-dom";
import "./Landing.css";
import heroImg from "../assets/lasvegas.jpg";

function Landing() {
  return (
    <div className="landing-hero" style={{ backgroundImage: `url(${heroImg})` }}>
      {/* Dark overlay so text is readable over the photo */}
      <div className="landing-overlay">

        <h1 className="landing-logo">scholarChips</h1>

        <p className="landing-tagline">
          Where learning cashes in. Earn chips, climb the leaderboard,
          and bet on yourself — one classroom game at a time.
        </p>

        <Link to="/login" className="landing-cta">Get Started</Link>

      </div>
    </div>
  );
}

export default Landing;