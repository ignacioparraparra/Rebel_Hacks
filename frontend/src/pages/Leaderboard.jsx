import { useState, useEffect } from "react";
import "./Leaderboard.css";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAdmin = localStorage.getItem("username") === "admin";
  const school_id = 2;

  useEffect(() => {
    if (isAdmin) return;
    async function fetchLeaderboard() {
      try {
        const res = await fetch(
          `http://localhost:7777/school/leaderboard/${school_id}`,
        );
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

  if (isAdmin) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="leaderboard-page">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <ol className="leaderboard-list">
        {leaderboard
          .filter((student) => student.first_name.toLowerCase() !== "admin")
          .map((student, index) => {
            const trueRank =
              leaderboard.findIndex(
                (s) => s.total_chips === student.total_chips,
              ) + 1;

            return (
              <li key={index} className={`leaderboard-row rank-${trueRank}`}>
                <span className="rank">#{trueRank}</span>
                <span className="name">
                  {student.first_name} {student.last_name}
                </span>
                <span className="chips">
                  {student.total_chips.toLocaleString()} chips
                </span>
              </li>
            );
          })}
      </ol>
    </div>
  );
}

export default Leaderboard;
