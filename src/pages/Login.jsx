import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseClient.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      nav("/dashboard");
    } catch (e2) {
      setErr("No se pudo iniciar sesión. Revisa correo y contraseña.");
    }
  }

  return (
    <div className="canvas">
      <div className="container">
        <h1 className="title">Entrar</h1>
        <p className="muted">Usa tu cuenta de Pixchi.</p>

        <form className="cardBox" onSubmit={onSubmit}>
          <label className="label">Correo</label>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label className="label" style={{ marginTop: 10 }}>Contraseña</label>
          <input className="input" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />

          {err && <p className="error">{err}</p>}

          <button className="btn" style={{ marginTop: 14 }} type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
