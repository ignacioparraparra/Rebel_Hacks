import { Link } from "react-router-dom";
import "./Landing.css";
import heroImg from "../assets/lasvegas.jpg";

function Landing() {
  return (
    <div className="landing-page" style={{ backgroundImage: `url(${heroImg})` }}>

      {/* hero img with  parallax bg */}
      <section className="landing-hero">
        <div className="landing-overlay">
            <div className="landing-content">
                <h1 className="landing-logo">scholarChips</h1>
                <p className="landing-tagline">
                    <i>...where showing up cashes in.</i>
                </p>
                <Link to="/login" className="landing-cta">Get Started</Link>
            </div>
        </div>
      </section>

      {/* mission - what is this thing? */}
      <div className="giganticDiv">
        <section className="landing-section landing-mission">
            <h2>What is scholarChips?</h2>
            <p>
            scholarChips is a classroom engagement platform that turns participation
            into a game. Teachers create activities, students earn chips for showing
            up and competing- and everyone can see the leaderboard in real time.
            </p>
        </section>

        {/* - why - the problem we're solving */}
        <section className="landing-section landing-why">
            <h2>Why does it exist?</h2>
            <div className="landing-cards">
            <div className="landing-card">
                <span className="landing-card-icon">LOGO A</span>
                <h3>CCSD Absenteeism</h3>
                <p>
                    In 2022, student absenteeism peaked at nearly 40%. Even just near 2025, student absenteeism still remained at a staggering 26.9%. We'll help students show up and stay engaged, even when the material isn't thrilling on its own.
                </p>
            </div>
            <div className="landing-card">
                <span className="landing-card-icon">LOGO B</span>
                <h3>Competition motivates</h3>
                <p>A visible leaderboard gives students something to chase beyond a grade.</p>
            </div>
            <div className="landing-card">
                <span className="landing-card-icon">LOGO C</span>
                <h3>Rewards feel good</h3>
                <p>Chips can be used to buy prizes like food vouchers, school merchandise, clothes, school supplies, books, and more!</p>
            </div>
            </div>
        </section>

        {/* How???? */}
        <section className="landing-section landing-how">
            <h2>How it works</h2>
            <ol className="landing-steps">
            <li><strong>Teacher creates a class</strong> and sets up activities or games.</li>
            <li><strong>Students join</strong> and earn chips by participating and winning.</li>
            <li><strong>Chips stack up</strong> on a live leaderboard everyone can see.</li>
            <li><strong>Wager chips</strong> on classroom games for bonus rewards.</li>
            </ol>
        </section>

        {/* footer and call to action */}
        <section className="landing-section landing-footer-cta">
            <h2>Ready to cash in?</h2>
            <Link to="/login" className="landing-cta">Create an Account</Link>
        </section>
      </div>
    </div>
  );
}

export default Landing;