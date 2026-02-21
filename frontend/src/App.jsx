import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Layout from "./pages/Body.jsx";
import Landing from "./pages/Landing.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import Leaderboard from "./pages/Leaderboard.jsx";

import Prizes from "./pages/Prizes.jsx";
import Classes from "./pages/Classes.jsx";
import Login from "./pages/Login.jsx";
import ErrorBoundary from "./pages/ErrorBoundary.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Other from "./pages/Other.jsx";

// wrapper
function LayoutRoute() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* no layout */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* with layout */}
        <Route element={<LayoutRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prizes" element={<Prizes />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/other" element={<Other />} />
          <Route path="*" element={<ErrorBoundary />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
