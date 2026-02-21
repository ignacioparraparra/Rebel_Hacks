import { useState, useEffect } from "react";
import "./Leaderboard.css";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const school_id = 1;

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch(`http://localhost:7777/leaderboard/${school_id}`);
        if (!res.ok) throw new Error("Failed to fetch leaderboard");
        const data = await res.json();
        setLeaderboard(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <div className="leaderboard-page">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <ol className="leaderboard-list">
        {leaderboard.map((student, index) => (
          <li key={index} className={`leaderboard-row rank-${index + 1}`}>
            <span className="rank">#{index + 1}</span>
            <span className="name">{student.first_name} {student.last_name}</span>
            <span className="chips">{student.total_chips.toLocaleString()} chips</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;