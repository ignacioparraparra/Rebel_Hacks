import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Games from "./pages/Games.jsx";
import SpinTheWheel from "./pages/SpinTheWheel.jsx";
import ErrorBoundary from "./pages/ErrorBoundary.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/spin-the-wheel" element={<SpinTheWheel />} />
        <Route path="*" element={<ErrorBoundary />} />
      </Routes>
    </>
  );
}

export default App;