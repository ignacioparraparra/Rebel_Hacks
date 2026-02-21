import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Games from "./pages/Games.jsx";
import SpinTheWheel from "./pages/games/SpinTheWheel.jsx";
import Classes from "./pages/Classes.jsx";
import Login from "./pages/Login.jsx";
import ErrorBoundary from "./pages/ErrorBoundary.jsx";

function App() {
  return (
    <>
        <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/spin-the-wheel" element={<SpinTheWheel />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorBoundary />} />
      </Routes>

    </>
  );
}

export default App;