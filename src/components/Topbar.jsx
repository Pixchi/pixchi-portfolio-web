import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseClient.js";
import { useAuth } from "../auth/AuthProvider.jsx";

export default function Topbar() {
  const { user } = useAuth();

  return (
    <div className="topbar">
      <div className="topbarInner">
        <div className="brand">
          <span className="brandDot" />
          <span className="brandText">Pixchi</span>
        </div>

        <div className="nav">
          <Link className="navLink" to="/">Inicio</Link>
          <Link className="navLink" to="/acerca">Acerca</Link>
          {user ? (
            <>
              <Link className="navLink" to="/dashboard">Modificar Portafolio</Link>
              <button className="btnGhost" onClick={() => signOut(auth)}>Salir</button>
            </>
          ) : (
            <Link className="btn" to="/login">Entrar</Link>
          )}
        </div>
      </div>
    </div>
  );
}
