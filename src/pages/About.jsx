import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="page">
      <section className="card">
        <h2 className="h2">Acerca de Pixchi</h2>
        <p className="p">
          Pixchi es un ecosistema para estudiantes: publicaciones + curación + portafolio público.
          El objetivo es que cada alumno tenga un perfil “vitrina” para reclutadores.
        </p>

        <div className="grid2">
          <div className="miniCard">
            <div className="miniTitle">Portafolio público</div>
            <div className="miniText">Un link accesible para cualquier persona, sin iniciar sesión.</div>
          </div>
          <div className="miniCard">
            <div className="miniTitle">Curación</div>
            <div className="miniText">El alumno decide qué trabajos mostrar (lo mejor).</div>
          </div>
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link to="/login" className="btn btnPrimary">Entrar</Link>
          <Link to="/" className="btn btnGhost">Volver</Link>
        </div>
      </section>
    </main>
  );
}
