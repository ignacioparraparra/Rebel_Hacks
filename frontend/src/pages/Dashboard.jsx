import "./Dashboard.css";

const MOCK_STUDENT = {
  first_name: "Jordan",
  last_name: "Mills",
  grade: 11,
  chips: 4820,
  total_chips_earned: 7340,
  class_rank: 1,
};

function Dashboard() {
  const { first_name, last_name, grade, chips, total_chips_earned, class_rank } = MOCK_STUDENT;

  const stats = [
    { label: "Current Chips",       value: chips.toLocaleString(),         emoji: "🪙" },
    { label: "Total Chips Earned",  value: total_chips_earned.toLocaleString(), emoji: "📈" },
    { label: "Class Rank",          value: `#${class_rank}`,               emoji: "🏆" },
    { label: "Grade",               value: `${grade}th`,                   emoji: "🎓" },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-hero">
        <div className="dashboard-avatar">
          {first_name[0]}{last_name[0]}
        </div>
        <div className="dashboard-identity">
          <h1 className="dashboard-name">{first_name} {last_name}</h1>
          <p className="dashboard-subtitle">Grade {grade} · Rank #{class_rank}</p>
        </div>
      </div>

      <div className="dashboard-stats">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <span className="stat-emoji">{stat.emoji}</span>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;