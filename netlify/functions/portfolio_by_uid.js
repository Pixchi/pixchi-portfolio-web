import admin from "firebase-admin";

function getAdmin() {
  if (admin.apps.length) return admin;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const saJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  const serviceAccount = JSON.parse(saJson);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId
  });
  return admin;
}

export async function handler(event) {
  try {
    const uid = event.queryStringParameters?.uid;
    if (!uid) return { statusCode: 400, body: "Falta uid" };

    const a = getAdmin();
    const db = a.firestore();

    const layoutSnap = await db.collection("portfolioLayouts").doc(uid).get();
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ layout: layoutSnap.exists ? layoutSnap.data() : null })
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: String(e) }) };
  }
}
