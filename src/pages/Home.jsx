import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="canvas">
      <div className="container">
        <h1 className="title">Portafolio Digital Pixchi</h1>
        <p className="muted">
          Inicia sesión con tu cuenta de Pixchi para generar un portafolio profesional con tus publicaciones.
          Podrás seleccionar qué trabajos mostrar y obtener un QR público para tu CV.
        </p>

        <div className="cardBox">
          <h2 className="h2">¿Por qué es importante?</h2>
          <ul className="list">
            <li>Le facilita a reclutadores ver tu trabajo en segundos.</li>
            <li>Te ayuda a mostrar solo lo mejor (curación).</li>
            <li>Te da un link + QR para ponerlo en tu currículum.</li>
          </ul>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
            <Link className="btn" to="/login">Entrar y crear mi portafolio</Link>
            <Link className="btnGhost" to="/acerca">Acerca de nosotros</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
