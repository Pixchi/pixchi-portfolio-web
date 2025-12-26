import admin from "firebase-admin";

function getAdmin() {
  if (admin.apps.length) return admin;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const saJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (!projectId || !saJson) {
    throw new Error("Faltan FIREBASE_PROJECT_ID o FIREBASE_SERVICE_ACCOUNT_JSON en Netlify env.");
  }

  const serviceAccount = JSON.parse(saJson);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId
  });

  return admin;
}

export async function handler(event) {
  try {
    const matricula = event.queryStringParameters?.matricula;
    if (!matricula) return { statusCode: 400, body: "Falta matricula" };

    const a = getAdmin();
    const db = a.firestore();

    // 1) user por matricula
    const uSnap = await db.collection("users").where("matricula", "==", matricula).limit(1).get();
    if (uSnap.empty) return { statusCode: 404, body: JSON.stringify({ error: "No existe usuario" }) };

    const uDoc = uSnap.docs[0];
    const user = { docId: uDoc.id, ...uDoc.data() };

    const uid = user.uid; // tu campo real (dentro del doc)
    if (!uid) return { statusCode: 404, body: JSON.stringify({ error: "Usuario sin uid" }) };

    // 2) layout por uid
    const layoutRef = db.collection("portfolioLayouts").doc(uid);
    const layoutSnap = await layoutRef.get();

    const layout = layoutSnap.exists ? layoutSnap.data() : null;
    const selected = (layout?.selectedPostDocIds || []);

    // 3) posts del usuario (por matricula) y filtrar por selectedDocIds
    const pSnap = await db.collection("posts")
      .where("matricula", "==", matricula)
      .orderBy("createdAt", "desc")
      .get();

    const allPosts = pSnap.docs.map(d => ({ docId: d.id, ...d.data() }));
    const posts = selected.length
      ? allPosts.filter(p => selected.includes(p.docId))
      : []; // si no seleccionó nada, no mostramos

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ user, layout, posts })
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: String(e) }) };
  }
}
