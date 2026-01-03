import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    alert("Login UI listo. Siguiente paso: Firebase Auth.");
  }

  return (
    <main className="page">
      <section className="loginWrap">
        <div className="loginCard">
          <h2 className="h2">Iniciar sesión</h2>
          <p className="p muted">Accede para crear tu portafolio público.</p>

          <form onSubmit={onSubmit} className="form">
            <label className="label">
              Email
              <input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu-correo@teschi.edu.mx"
              />
            </label>

            <label className="label">
              Contraseña
              <input
                className="input"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••"
              />
            </label>

            <button className="btn btnPrimary wFull" type="submit">
              Entrar
            </button>

            <div className="muted small" style={{ marginTop: 10 }}>
              ¿Olvidaste tu contraseña? (lo activamos con Firebase)
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
