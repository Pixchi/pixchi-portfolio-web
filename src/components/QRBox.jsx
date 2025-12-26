import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRBox({ url }) {
  const ref = useRef(null);

  function download() {
    const canvas = ref.current?.querySelector("canvas");
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "pixchi-qr.png";
    a.click();
  }

  return (
    <div style={{ marginTop: 12 }}>
      <div ref={ref} className="qrWrap">
        <QRCodeCanvas value={url} size={220} includeMargin />
      </div>
      <button className="btnGhost" onClick={download} style={{ marginTop: 10 }}>
        Descargar QR
      </button>
    </div>
  );
}
