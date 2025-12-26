import React, { useEffect, useState } from "react";
import { resolvePublicDownloadUrl } from "../api/appsScript.js";

export default function Media({ type, src, mode="detail" }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    let ok = true;
    (async () => {
      const finalUrl = await resolvePublicDownloadUrl(src);
      if (ok) setUrl(finalUrl);
    })();
    return () => { ok = false; };
  }, [src]);

  if (!url) return <div className="mediaLoading">Cargando...</div>;

  const h = mode === "cover" ? 180 : 520;

  if (type === "image") {
    return <img className="mediaEl" style={{ height: h }} src={url} alt="" />;
  }

  if (type === "video") {
    return <video className="mediaEl" style={{ height: h }} src={url} controls playsInline />;
  }

  if (type === "model3d") {
    return (
      <model-viewer
        style={{ width: "100%", height: `${h}px`, borderRadius: "16px", background: "rgba(0,0,0,0.18)" }}
        src={url}
        camera-controls
        auto-rotate
      />
    );
  }

  return <a className="navLink" href={url} target="_blank" rel="noreferrer">Abrir archivo</a>;
}
