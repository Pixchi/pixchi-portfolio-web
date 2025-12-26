import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";

export default function RequireAuth({ children }) {
  const { user, ready } = useAuth();
  if (!ready) return <div className="page"><div className="canvas"><div className="container">Cargando...</div></div></div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
