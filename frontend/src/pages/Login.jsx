import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setTokens } from "../utils/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:7777/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError("Invalid credentials.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setTokens(data.accessToken, data.refreshToken);
      navigate("/dashboard");
    } catch {
      setError("Could not reach server.");
      setLoading(false);
    }
  }

  return (
    <div className="center-page">
      <form className="login-card anim-fade-up" onSubmit={handleSubmit}>
        <h1 className="login-title">scholarChips</h1>
        <p className="login-sub">Sign in to your account</p>

        {error && <div className="error-box">{error}</div>}

        <label className="label">
          First Name
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </label>

        <label className="label">
          Password
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        <button className="btn btn-primary login-btn" type="submit" disabled={loading}>
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default Login;
