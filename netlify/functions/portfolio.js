import admin from "firebase-admin";

function getAdmin() {
  if (admin.apps.length) return admin;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const saJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (!projectId) throw new Error("Missing FIREBASE_PROJECT_ID");
  if (!saJson) throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_JSON");

  const serviceAccount = JSON.parse(saJson);
  if (serviceAccount.private_key) {
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId,
  });

  return admin;
}

export async function handler(event) {
  try {
    const uidParam = event.queryStringParameters?.uid;
    const matriculaParam = event.queryStringParameters?.matricula;

    if (!uidParam && !matriculaParam) {
      return { statusCode: 400, body: "Falta uid o matricula" };
    }

    const a = getAdmin();
    const db = a.firestore();

    let uid = uidParam;

    // Si llega matrícula, buscamos el uid
    if (!uid && matriculaParam) {
      const userSnap = await db
        .collection("users")
        .where("matricula", "==", matriculaParam)
        .limit(1)
        .get();

      if (userSnap.empty) {
        return { statusCode: 404, body: "Usuario no encontrado por matricula" };
      }

      const userData = userSnap.docs[0].data();
      uid = userData.uid || userSnap.docs[0].id;
    }

    const layoutSnap = await db.collection("portfolioLayouts").doc(uid).get();

    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json",
        "access-control-allow-origin": "*",
      },
      body: JSON.stringify({
        uid,
        layout: layoutSnap.exists ? layoutSnap.data() : null,
      }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error: String(e) }),
    };
  }
}
