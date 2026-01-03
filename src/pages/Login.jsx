import React, { useState } from "react";
import pixchiLogo from "../assets/pixchi-logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    alert("Login UI listo. Siguiente paso: Firebase Auth.");
  }

  function onInstitutional() {
    alert("Aquí conectaremos Google / cuenta institucional (Firebase) después.");
  }

  return (
    <main className="loginPage">
      <section className="loginCard2">
        <div className="loginBrand">
          <img
            src={pixchiLogo}
            alt="Pixchi"
            className="loginLogo"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <div className="loginTitle">Pixchi</div>
        </div>

        <form onSubmit={onSubmit} className="loginForm2">
          <input
            className="loginInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="email"
          />

          <input
            className="loginInput"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Contraseña"
            autoComplete="current-password"
          />

          <button className="loginBtnPrimary" type="submit">
            Entrar
          </button>

          <button className="loginLink" type="button">
            ¿Has olvidado tu información de inicio de sesión? Obtén ayuda.
          </button>

          <div className="loginOr">
            <span />
            <div>o</div>
            <span />
          </div>

          <button className="loginBtnSecondary" type="button" onClick={onInstitutional}>
            <span className="loginIcon">⟶</span>
            Iniciar sesión con una cuenta Institucional
          </button>

          <div className="loginBottom">
            ¿No tienes cuenta? <button className="loginInline" type="button">Regístrate</button>
          </div>
        </form>
      </section>
    </main>
  );
}
