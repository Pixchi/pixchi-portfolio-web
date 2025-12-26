import React from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PublicPortfolio from "./pages/PublicPortfolio.jsx";
import RequireAuth from "./auth/RequireAuth.jsx";

export default function App() {
  return (
    <div className="page">
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/acerca" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/u/:matricula" element={<PublicPortfolio />} />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}
