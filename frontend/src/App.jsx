import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Layout from "./pages/Body.jsx";
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
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />                         {/* landing page */}
            <Route path="/dashboard" element={<Dashboard />} />           {/* home / user dashboard */}
            <Route path="/games" element={<Games />} />                   {/* games list */}
            <Route path="/games/spin-the-wheel" element={<SpinTheWheel />} />
            <Route path="/classes" element={<Classes />} />               {/* class management for teachers */}
            <Route path="/login" element={<Login />} />                   {/* login page */}
            <Route path="*" element={<ErrorBoundary />} />
          </Routes>
        </Layout>
    </>
  );
}

export default App;