import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch, getToken } from "../utils/api";
import "./Dashboard.css";

// TODO: wire up real activity feed (this data is faker than my motivation at 3am)
const MOCK_ACTIVITY = [
  { id: 1, desc: "Daily Attendance",      delta: +50,  time: "Today, 8:02 AM" },
  { id: 2, desc: "Spin the Wheel",        delta: -10,  time: "Yesterday, 3:15 PM" },
  { id: 3, desc: "Quiz Bowl - 1st Place", delta: +200, time: "Yesterday, 1:30 PM" },
  { id: 4, desc: "Prize Redeemed: Homework Pass", delta: -15, time: "Mon, 11:45 AM" },
  { id: 5, desc: "Daily Attendance",      delta: +50,  time: "Mon, 8:00 AM" },
];

function Dashboard() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [chips, setChips] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) { navigate("/login"); return; }

    Promise.all([
      apiFetch("/student/info"),
      apiFetch("/student/chips"),
    ]).then(async ([infoRes, chipsRes]) => {
      if (!infoRes || !chipsRes) return;
      const info = await infoRes.json();
      const chipData = await chipsRes.json();
      setStudent(info);
      setChips(chipData.chipCount);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dash-loading anim-fade-up">Loading…</div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="dashboard-page">
        <div className="dash-loading anim-fade-up">Something went wrong.</div>
      </div>
    );
  }

  const { first_name, last_name, grade, total_chips, rank } = student;
  const streak = 12; // mock

  return (
    <div className="dashboard-page">

      {/* welcome */}
      <section className="glass-hero dash-welcome anim-fade-up">
        <div className="dash-welcome-left">
          <div className="dash-avatar">
            {first_name[0]}{last_name[0]}
          </div>
          <div>
            <h1 className="dash-name">Welcome back, {first_name}.</h1>
            <p className="dash-tagline">Grade {grade} &middot; Rank #{rank} &middot; You're on a roll.</p>
          </div>
        </div>
        <div className="dash-chip-display">
          <span className="dash-chip-label">Your Chips</span>
          <span className="dash-chip-count">{Number(chips).toLocaleString()}</span>
        </div>
      </section>

      {/* stats */}
      <div className="grid-3 anim-fade-up anim-delay-1">
        <div className="glass dash-stat dash-stat-earned">
          <i className="bi bi-graph-up-arrow dash-stat-icon"></i>
          <div className="dash-stat-body">
            <span className="dash-stat-value">{Number(total_chips).toLocaleString()}</span>
            <span className="dash-stat-label">Total Earned</span>
          </div>
        </div>
        <div className="glass dash-stat dash-stat-rank">
          <i className="bi bi-trophy-fill dash-stat-icon"></i>
          <div className="dash-stat-body">
            <span className="dash-stat-value">#{rank}</span>
            <span className="dash-stat-label">Class Rank</span>
          </div>
        </div>
        <div className="glass dash-stat dash-stat-streak">
          <i className="bi bi-fire dash-stat-icon"></i>
          <div className="dash-stat-body">
            <span className="dash-stat-value">{streak} days</span>
            <span className="dash-stat-label">Attendance Streak</span>
          </div>
        </div>
      </div>

      {/* actions */}
      <section className="anim-fade-up anim-delay-2" style={{ width: "100%" }}>
        <h2 className="section-title">Quick Actions</h2>
        <div className="grid-3">
          <Link to="/games/spin-the-wheel" className="glass dash-action">
            <i className="bi bi-bullseye"></i>
            <span>Spin the Wheel</span>
          </Link>
          <Link to="/prizes" className="glass dash-action">
            <i className="bi bi-shop-window"></i>
            <span>Prize Shop</span>
          </Link>
          <Link to="/leaderboard" className="glass dash-action">
            <i className="bi bi-bar-chart-line-fill"></i>
            <span>Leaderboard</span>
          </Link>
        </div>
      </section>

      {/* activity */}
      <section className="anim-fade-up anim-delay-3" style={{ width: "100%" }}>
        <h2 className="section-title">Recent Activity</h2>
        <div className="glass dash-activity-list">
          {MOCK_ACTIVITY.map((item) => (
            <div className="dash-activity-row" key={item.id}>
              <div className="dash-activity-info">
                <span className="dash-activity-desc">{item.desc}</span>
                <span className="dash-activity-time">{item.time}</span>
              </div>
              <span className={`badge ${item.delta >= 0 ? "badge-pos" : "badge-neg"}`}>
                {item.delta >= 0 ? "+" : ""}{item.delta}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Dashboard;
