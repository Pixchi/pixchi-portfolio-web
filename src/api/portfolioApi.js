export async function fetchPublicPortfolioByMatricula(matricula) {
  const res = await fetch(`/.netlify/functions/portfolio?matricula=${encodeURIComponent(matricula)}`);
  if (!res.ok) throw new Error("No se pudo cargar portafolio");
  return await res.json();
}

export async function fetchPublicPortfolioByUid(uid) {
  const res = await fetch(`/.netlify/functions/portfolio_by_uid?uid=${encodeURIComponent(uid)}`);
  if (!res.ok) throw new Error("No se pudo cargar portafolio");
  return await res.json();
}
