import React from "react";

export default function About() {
  return (
    <div className="canvas">
      <div className="container">
        <h1 className="title">Acerca de Pixchi</h1>
        <p className="muted">
          Pixchi es una plataforma para que estudiantes puedan publicar y presentar sus trabajos (imagen, video, 3D)
          y generar un portafolio digital listo para reclutadores.
        </p>

        <div className="cardBox">
          <h2 className="h2">Nuestra misión</h2>
          <p className="muted">
            Facilitar que cada alumno tenga presencia profesional y pueda compartir su talento con un link y un QR en su CV.
          </p>

          <h2 className="h2" style={{ marginTop: 18 }}>Contacto</h2>
          <p className="muted">TESCHI • Animación Digital y Efectos Visuales</p>
        </div>
      </div>
    </div>
  );
}
