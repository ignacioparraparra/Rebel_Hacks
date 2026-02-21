import "./Leaderboard.css";

const MOCK_LEADERBOARD = [
  { first_name: "Jordan",  last_name: "Mills",    total_chips: 4820 },
  { first_name: "Priya",   last_name: "Sharma",   total_chips: 4310 },
  { first_name: "Marcus",  last_name: "Chen",     total_chips: 3975 },
  { first_name: "Ava",     last_name: "Thompson", total_chips: 3640 },
  { first_name: "Leo",     last_name: "Okafor",   total_chips: 3210 },
  { first_name: "Sofia",   last_name: "Rivera",   total_chips: 2980 },
  { first_name: "Ethan",   last_name: "Park",     total_chips: 2750 },
  { first_name: "Naomi",   last_name: "Brooks",   total_chips: 2410 },
  { first_name: "Caleb",   last_name: "Foster",   total_chips: 1990 },
  { first_name: "Zoe",     last_name: "Nguyen",   total_chips: 1650 },
];

function Leaderboard() {
  return (
    <div className="leaderboard-page">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <ol className="leaderboard-list">
        {MOCK_LEADERBOARD.map((student, index) => (
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