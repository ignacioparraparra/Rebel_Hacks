import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Layout from "./pages/Body.jsx";
import Landing from "./pages/Landing.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Prizes from "./pages/Prizes.jsx";
import SpinTheWheel from "./pages/games/SpinTheWheel.jsx";
import Classes from "./pages/Classes.jsx";
import Login from "./pages/Login.jsx";
import ErrorBoundary from "./pages/ErrorBoundary.jsx";

// LayoutRoute renders <Layout> with an <Outlet /> inside.
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
          {/* Full-width pages — intentionally outside Layout */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* App pages — all share the Layout max-width wrapper */}
          <Route element={<LayoutRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/prizes" element={<Prizes />} />
          
            <Route path="/classes" element={<Classes />} />
            <Route path="*" element={<ErrorBoundary />} />
          </Route>
        </Routes>
    </>
  );
}

export default App;