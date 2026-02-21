import { Link } from "react-router-dom";
import "./Landing.css";
import heroImg from "../assets/lasvegas.jpg";

function Landing() {
  return (
    <div className="landing-page">
      {/* hero - vegas parallax */}
      <section
        className="landing-hero"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="landing-hero-overlay">
          <div className="landing-hero-content">
            <span className="landing-chip-badge">
              <i className="bi bi-star-fill"></i> Earn, Compete, and Win!
            </span>
            <img
              src="/artboard.png"
              alt="scholarChips"
              className="landing-logo-img"
            />
            <p className="landing-tagline">
              Show up, earn chips, climb the leaderboard, and cash in for real
              prizes. Just showing up's half the battle!
              <br />
              ScholarChips turns attendance into a game worth playing.
            </p>
            <div className="landing-hero-actions">
              <Link to="/login" className="btn btn-gold landing-cta">
                Get Started!
              </Link>
            </div>
            <div className="landing-chip-preview">
              <div className="landing-chip-icon">EN</div>
              <span className="landing-chip-number">1,250</span>
              <span className="landing-chip-label">chips earned this week</span>
            </div>
          </div>
        </div>
      </section>

      {/* stats bar */}
      <section className="landing-stats-bar">
        <div className="landing-stat">
          <span className="landing-stat-number">2,400+</span>
          <span className="landing-stat-label">students enrolled</span>
        </div>
        <div className="landing-stat">
          <span className="landing-stat-number">180K</span>
          <span className="landing-stat-label">chips earned</span>
        </div>
        <div className="landing-stat">
          <span className="landing-stat-number">95%</span>
          <span className="landing-stat-label">attendance rate</span>
        </div>
      </section>

      {/* why */}
      <section className="landing-section landing-why">
        <h2>Why scholarChips?</h2>
        <p className="landing-section-sub">
          CCSD student absenteeism hit 40% in 2022 and still sits near 27%.
          <br />
          We're here to fix that!
        </p>
        <div className="landing-cards">
          <div className="card landing-card">
            <div className="landing-card-sticker landing-card-sticker--red">
              <i className="bi bi-graph-down-arrow"></i>
            </div>
            <h3>Fight Absenteeism</h3>
            <p>Students earn chips every day they attend!</p>
          </div>
          <div className="card landing-card">
            <div className="landing-card-sticker landing-card-sticker--teal">
              <i className="bi bi-trophy-fill"></i>
            </div>
            <h3>Fuel Competition</h3>
            <p>A live leaderboard gives students something to chase!</p>
          </div>
          <div className="card landing-card">
            <div className="landing-card-sticker landing-card-sticker--amber">
              <i className="bi bi-gift-fill"></i>
            </div>
            <h3>Real Rewards</h3>
            <p>
              Food vouchers, school merch, supplies, books, and more in the
              prize shop!
            </p>
          </div>
        </div>
      </section>

      {/* how */}
      <section className="landing-section landing-how">
        <h2>How it works</h2>
        <div className="landing-divdiv-waow">
          <div className="dumbCircle">
            <div className="landing-how-icon">
              <i className="bi bi-person-plus-fill"></i>
            </div>
            <span>Join your class</span>
          </div>
          <div className="stupidArrow">
            <i className="bi bi-arrow-right"></i>
          </div>
          <div className="dumbCircle">
            <div className="landing-how-icon">
              <i className="bi bi-calendar-check-fill"></i>
            </div>
            <span>Show up daily</span>
          </div>
          <div className="stupidArrow">
            <i className="bi bi-arrow-right"></i>
          </div>
          <div className="dumbCircle">
            <div className="landing-how-icon">
              <i className="bi bi-coin"></i>
            </div>
            <span>Stack chips</span>
          </div>
          <div className="stupidArrow">
            <i className="bi bi-arrow-right"></i>
          </div>
          <div className="dumbCircle">
            <div className="landing-how-icon">
              <i className="bi bi-bag-check-fill"></i>
            </div>
            <span>Win prizes</span>
          </div>
        </div>
      </section>

      {/* footer cta */}
      <section className="landing-section landing-footer-cta">
        <h2>Ready to start earning?</h2>
        <Link to="/login" className="btn btn-gold landing-cta">
          Sign In <i className="bi bi-arrow-right"></i>
        </Link>
      </section>
    </div>
  );
}

export default Landing;
