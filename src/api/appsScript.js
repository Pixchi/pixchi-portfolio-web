const BASE = import.meta.env.VITE_APPS_SCRIPT_URL;

export function extractDriveFileId(urlOrId) {
  if (!urlOrId) return null;
  const s = String(urlOrId).trim();

  // Si parece ID directo
  if (!/^https?:\/\//i.test(s)) return s;

  try {
    const u = new URL(s);

    // ?id=
    const idParam = u.searchParams.get("id");
    if (idParam) return idParam;

    // /d/FILE_ID/
    const m = /\/d\/([a-zA-Z0-9_\-]+)/.exec(u.pathname);
    if (m?.[1]) return m[1];
  } catch {}
  return null;
}

export async function resolvePublicDownloadUrl(urlOrId) {
  if (!BASE) return urlOrId;

  const fileId = extractDriveFileId(urlOrId);
  if (!fileId) return urlOrId;

  const u = new URL(BASE);
  u.searchParams.set("action", "download");
  u.searchParams.set("fileId", fileId);

  const res = await fetch(u.toString());
  if (!res.ok) return urlOrId;

  const data = await res.json().catch(() => null);
  if (!data?.success) return urlOrId;

  return data.publicDownloadUrl || urlOrId;
}
