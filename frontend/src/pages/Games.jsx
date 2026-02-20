import { Link } from "react-router-dom";
import "./Games.css";

function Games() {
  return (
    <div className="games-container">
      <h1>Games</h1>

      <div className="games-grid">
        <div className="game-card">
          <h3>Spin The Wheel</h3>
          <Link to="/games/spin-the-wheel">
            <button className="play-btn">Play Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Games;