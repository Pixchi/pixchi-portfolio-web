import React from "react";
import { Link } from "react-router-dom";
import pixchiLogo from "../assets/pixchi-logo.png";

export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <div className="heroGrid">
          <div className="heroCopy">
            <div className="pill">Portafolio digital · Pixchi</div>

            <h1 className="heroTitle">
              Tu portafolio profesional, <span className="accent">en un link</span>.
            </h1>

            <p className="heroSubtitle">
              Pixchi convierte tus publicaciones en un portafolio público para reclutadores.
              Curación, orden y presentación limpia — sin complicaciones.
            </p>

            <div className="heroCtas">
              <Link to="/login" className="btn btnPrimary">
                Entrar a Pixchi
              </Link>
              <Link to="/acerca" className="btn btnGhost">
                Acerca de Pixchi
              </Link>
            </div>

            <div className="heroBadges">
              <div className="badge">Diseño limpio</div>
              <div className="badge">Enlace público</div>
              <div className="badge">Curación por alumno</div>
            </div>
          </div>

          <div className="heroVisual">
            <div className="splitCard">
              <div className="splitLeft">
                <div className="splitKicker">designer</div>
                <div className="splitDesc">Curación, presentación y estilo profesional.</div>
              </div>

              <div className="splitCenter">
                <div className="logoHalo">
                  <img
                    src={pixchiLogo}
                    alt="Pixchi"
                    className="heroLogo"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
              </div>

              <div className="splitRight">
                <div className="splitKicker">&lt;coder&gt;</div>
                <div className="splitDesc">Estructura, rendimiento y despliegue en web.</div>
              </div>
            </div>

            <div className="glassCard">
              <div className="glassTitle">¿Qué vas a poder hacer aquí?</div>
              <ul className="glassList">
                <li>Iniciar sesión con tu cuenta Pixchi.</li>
                <li>Seleccionar publicaciones para tu portafolio.</li>
                <li>Generar un link público y QR para tu CV.</li>
              </ul>
              <div className="muted small">(En esta fase: solo UI. Luego conectamos Firebase Auth.)</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
