import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { setTokens } from "../utils/api";
import "./Login.css";
import heroImg from "../assets/lasvegas.jpg";

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
      setTokens(data.accessToken, data.refreshToken); // storing in localStorage like it's secure lol
      navigate("/dashboard");
    } catch {
      setError("Could not reach server.");
      setLoading(false);
    }
  }

  return (
    <div
      className="center-page login-bg"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <form className="login-card anim-fade-up" onSubmit={handleSubmit}>
        <Link to="/" className="login-back-btn">
          <i className="bi bi-arrow-left"></i> Back
        </Link>
        <img
          src="/artboard-simple.png"
          alt="scholarChips"
          className="login-logo"
        />
        <p className="login-sub">Sign in to your account</p>

        {error && <div className="error-box">{error}</div>}

        <label className="label">
          Username
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
          />
        </label>

        <button
          className="btn btn-primary login-btn"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default Login;
