import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";

export default function App() {
  return (
    <div className="appShell">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/acerca" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
