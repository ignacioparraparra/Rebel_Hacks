import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch, getToken } from "../utils/api";
import "./Dashboard.css";

const subpages = [
  { id: "overview", label: "Overview", icon: "bi-house-fill" },
  { id: "attendance", label: "Attendance", icon: "bi-calendar-check-fill" },
  { id: "stats", label: "Stats", icon: "bi-graph-up-arrow" },
  { id: "notes", label: "Teacher Notes", icon: "bi-journal-text" },
  { id: "activity", label: "Activity", icon: "bi-clock-history" },
];

function Dashboard() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [chips, setChips] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("overview");

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
      return;
    }

    Promise.all([apiFetch("/student/info"), apiFetch("/student/chips")])
      .then(async ([infoRes, chipsRes]) => {
        if (!infoRes || !chipsRes) return;
        const info = await infoRes.json();
        const chipData = await chipsRes.json();
        setStudent(info);
        setChips(chipData.current_balance);

        const txRes = await apiFetch(`/transaction/chips/${info.student_id}`);
        if (txRes) {
          const txData = await txRes.json();
          setActivity(Array.isArray(txData) ? txData : []);
        }

        setLoading(false);
      })
      .catch(() => setLoading(false));
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

  const { first_name, last_name, grade, lifetime_chips_earned, rank } = student;
  const prizesRedeemed = activity.filter((t) => t.amount < 0).length;

  function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  const attendanceDays = activity.filter(
    (t) => t.event_type && t.event_type.toLowerCase().includes("attendance")
  );
  const totalSpent = activity
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);

  return (
    <div className="dashboard-layout">
      <aside className="dash-sidebar anim-fade-up">
        <div className="dash-sidebar-header">
          <div className="dash-avatar">
            {first_name[0]}
            {last_name[0]}
          </div>
          <div className="dash-sidebar-info">
            <span className="dash-sidebar-name">{first_name} {last_name}</span>
            <span className="dash-sidebar-role">Student</span>
          </div>
        </div>
        <nav className="dash-sidebar-nav">
          {subpages.map((page) => (
            <button
              key={page.id}
              className={`dash-sidebar-link${activePage === page.id ? " active" : ""}`}
              onClick={() => setActivePage(page.id)}
            >
              <i className={`bi ${page.icon}`}></i>
              <span>{page.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="dashboard-page">
        {activePage === "overview" && (
          <>
            {/* welcome */}
            <section className="glass-hero dash-welcome anim-fade-up">
              <div className="dash-welcome-left">
                <div>
                  <h1 className="dash-name">Welcome back, {first_name}.</h1>
                  <p className="dash-tagline">
                    Grade {grade} &middot; Rank #{rank} &middot; You're on a roll.
                  </p>
                </div>
              </div>
              <div className="dash-chip-display">
                <span className="dash-chip-label">Your Chips</span>
                <div className="dash-chip-count-row">
                  <img src="/favicon.webp" alt="chip" className="dash-chip-icon" />
                  <span className="dash-chip-count">
                    {chips !== null ? Number(chips).toLocaleString() : "..."}
                  </span>
                </div>
              </div>
            </section>

            {/* stats */}
            <div className="grid-3 anim-fade-up anim-delay-1">
              <div className="glass dash-stat dash-stat-earned">
                <i className="bi bi-graph-up-arrow dash-stat-icon"></i>
                <div className="dash-stat-body">
                  <span className="dash-stat-value">
                    {Number(lifetime_chips_earned).toLocaleString()}
                  </span>
                  <span className="dash-stat-label">Total Chips Earned</span>
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
                <i className="bi bi-bag-fill dash-stat-icon"></i>
                <div className="dash-stat-body">
                  <span className="dash-stat-value">{prizesRedeemed}</span>
                  <span className="dash-stat-label">Prizes Redeemed</span>
                </div>
              </div>
            </div>

            {/* actions */}
            <section className="anim-fade-up anim-delay-2" style={{ width: "100%" }}>
              <h2 className="section-title-dashboard">Quick Actions</h2>
              <div className="grid-2">
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
              <h2 className="section-title-dashboard">Recent Activity</h2>
              <div className="glass dash-activity-list">
                {activity.length === 0 ? (
                  <div className="dash-activity-row">
                    <span className="dash-activity-desc" style={{ color: "var(--text-muted)" }}>
                      No transactions yet.
                    </span>
                  </div>
                ) : (
                  activity.slice(0, 10).map((item) => (
                    <div className="dash-activity-row" key={item.id}>
                      <div className="dash-activity-info">
                        <span className="dash-activity-desc">
                          {item.event_type || "Transaction"}
                        </span>
                        <span className="dash-activity-time">
                          {formatTime(item.event_date)}
                        </span>
                      </div>
                      <span className={`badge ${item.amount >= 0 ? "badge-pos" : "badge-neg"}`}>
                        {item.amount >= 0 ? "+" : ""}
                        {item.amount}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </section>
          </>
        )}

        {activePage === "attendance" && (
          <section className="dash-subpage anim-fade-up">
            <h2 className="dash-subpage-title">
              Attendance Tracker
            </h2>
            <div className="glass dash-attendance-summary">
              <div className="dash-att-stat">
                <span className="dash-att-value">{attendanceDays.length}</span>
                <span className="dash-att-label">Days Present</span>
              </div>
              <div className="dash-att-stat">
                <span className="dash-att-value">
                  {attendanceDays.reduce((s, t) => s + Number(t.amount), 0)}
                </span>
                <span className="dash-att-label">Chips from Attendance</span>
              </div>
            </div>
            <div className="glass dash-activity-list">
              {attendanceDays.length === 0 ? (
                <div className="dash-activity-row">
                  <span className="dash-activity-desc" style={{ color: "var(--text-muted)" }}>
                    No attendance records yet.
                  </span>
                </div>
              ) : (
                attendanceDays.map((item) => (
                  <div className="dash-activity-row" key={item.id}>
                    <div className="dash-activity-info">
                      <span className="dash-activity-desc">{item.event_type}</span>
                      <span className="dash-activity-time">{formatTime(item.event_date)}</span>
                    </div>
                    <span className="badge badge-pos">+{item.amount}</span>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {activePage === "stats" && (
          <section className="dash-subpage anim-fade-up">
            <h2 className="dash-subpage-title">
              Your Stats
            </h2>
            <div className="dash-stats-grid">
              <div className="glass dash-stat-card">
                <i className="bi bi-coin dash-stat-card-icon" style={{ color: "var(--accent)" }}></i>
                <span className="dash-stat-card-value">{Number(lifetime_chips_earned).toLocaleString()}</span>
                <span className="dash-stat-card-label">Lifetime Earned</span>
              </div>
              <div className="glass dash-stat-card">
                <i className="bi bi-cart-dash-fill dash-stat-card-icon" style={{ color: "var(--spirit-red)" }}></i>
                <span className="dash-stat-card-value">{totalSpent.toLocaleString()}</span>
                <span className="dash-stat-card-label">Total Spent</span>
              </div>
              <div className="glass dash-stat-card">
                <i className="bi bi-trophy-fill dash-stat-card-icon" style={{ color: "var(--spirit-teal)" }}></i>
                <span className="dash-stat-card-value">#{rank}</span>
                <span className="dash-stat-card-label">Current Rank</span>
              </div>
              <div className="glass dash-stat-card">
                <i className="bi bi-bag-check-fill dash-stat-card-icon" style={{ color: "var(--spirit-purple)" }}></i>
                <span className="dash-stat-card-value">{prizesRedeemed}</span>
                <span className="dash-stat-card-label">Prizes Redeemed</span>
              </div>
              <div className="glass dash-stat-card">
                <i className="bi bi-piggy-bank-fill dash-stat-card-icon" style={{ color: "var(--spirit-green)" }}></i>
                <span className="dash-stat-card-value">
                  {chips !== null ? Number(chips).toLocaleString() : "..."}
                </span>
                <span className="dash-stat-card-label">Current Balance</span>
              </div>
              <div className="glass dash-stat-card">
                <i className="bi bi-calendar-check dash-stat-card-icon" style={{ color: "var(--main-color)" }}></i>
                <span className="dash-stat-card-value">{attendanceDays.length}</span>
                <span className="dash-stat-card-label">Days Attended</span>
              </div>
            </div>
          </section>
        )}

        {activePage === "notes" && (
          <section className="dash-subpage anim-fade-up">
            <h2 className="dash-subpage-title">
              <i className="bi bi-journal-text"></i> Teacher Notes
            </h2>
            <div className="glass dash-notes-empty">
              <i className="bi bi-inbox dash-notes-empty-icon"></i>
              <p>No notes from your teacher yet.</p>
              <span>Check back later for feedback and messages.</span>
            </div>
          </section>
        )}

        {activePage === "activity" && (
          <section className="dash-subpage anim-fade-up">
            <h2 className="dash-subpage-title">
              <i className="bi bi-clock-history"></i> Full Activity Log
            </h2>
            <div className="glass dash-activity-list">
              {activity.length === 0 ? (
                <div className="dash-activity-row">
                  <span className="dash-activity-desc" style={{ color: "var(--text-muted)" }}>
                    No transactions yet.
                  </span>
                </div>
              ) : (
                activity.map((item) => (
                  <div className="dash-activity-row" key={item.id}>
                    <div className="dash-activity-info">
                      <span className="dash-activity-desc">
                        {item.event_type || "Transaction"}
                      </span>
                      <span className="dash-activity-time">{formatTime(item.event_date)}</span>
                    </div>
                    <span className={`badge ${item.amount >= 0 ? "badge-pos" : "badge-neg"}`}>
                      {item.amount >= 0 ? "+" : ""}
                      {item.amount}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
