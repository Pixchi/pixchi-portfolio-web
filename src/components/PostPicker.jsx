import React from "react";
import Media from "./Media.jsx";

function mapType(typeNum) {
  // Mapeo real: 0=image, 1=video, 2=model3d
  if (typeNum === 0) return "image";
  if (typeNum === 1) return "video";
  if (typeNum === 2) return "model3d";
  return "unknown";
}

export default function PostPicker({ posts, selectedIds, onToggle }) {
  if (!posts?.length) return <p className="muted">No hay publicaciones.</p>;

  return (
    <div className="pickerGrid">
      {posts.map((p) => {
        const id = p.docId; // importante: docId (id del documento Firestore)
        const selected = selectedIds.has(id);
        const mediaType = mapType(p.type);
        const url = p.localPath; // tu campo real

        return (
          <div key={id} className={"pickCard " + (selected ? "pickOn" : "")}>
            <div className="pickMedia">
              <Media type={mediaType} src={url} mode="cover" />
            </div>
            <div className="pickBody">
              <div className="pickTitle">{p.caption || "Publicación"}</div>
              <div className="pickMeta">type: {p.type} • matrícula: {p.matricula}</div>

              <button className={selected ? "btnGhost" : "btn"} onClick={() => onToggle(id)}>
                {selected ? "Quitar del portafolio" : "Agregar al portafolio"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
