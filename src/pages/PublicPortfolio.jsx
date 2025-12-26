import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPublicPortfolioByMatricula } from "../api/portfolioApi.js";
import Media from "../components/Media.jsx";
import QRBox from "../components/QRBox.jsx";

function mapType(typeNum) {
  if (typeNum === 0) return "image";
  if (typeNum === 1) return "video";
  if (typeNum === 2) return "model3d";
  return "unknown";
}

export default function PublicPortfolio() {
  const { matricula } = useParams();
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  const url = `${window.location.origin}/u/${matricula}`;

  useEffect(() => {
    let ok = true;
    (async () => {
      try {
        const res = await fetchPublicPortfolioByMatricula(matricula);
        if (ok) setData(res);
      } catch {
        if (ok) setErr("No se pudo cargar el portafolio.");
      }
    })();
    return () => { ok = false; };
  }, [matricula]);

  if (err) return <div className="canvas"><div className="container">{err}</div></div>;
  if (!data) return <div className="canvas"><div className="container">Cargando...</div></div>;

  return (
    <div className="canvas">
      <div className="container">
        <div className="heroCard">
          <div className="heroTitle">{data.user.displayName || data.user.nombre || "Portafolio Pixchi"}</div>
          <div className="muted">Matrícula: {matricula}</div>

          <div style={{ marginTop: 12 }}>
            <div className="kbdBlock">{url}</div>
            <QRBox url={url} />
          </div>
        </div>

        <div className="publicGrid">
          {data.posts.map((p) => (
            <div key={p.docId} className="publicCard">
              <div className="publicMedia">
                <Media type={mapType(p.type)} src={p.localPath} mode="cover" />
              </div>
              <div className="publicBody">
                <div className="pickTitle">{p.caption || "Publicación"}</div>
                <div className="pickMeta">type: {p.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
