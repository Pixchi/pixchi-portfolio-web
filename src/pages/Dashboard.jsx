import React, { useEffect, useMemo, useState } from "react";
import { doc, getDoc, setDoc, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebaseClient.js";
import { useAuth } from "../auth/AuthProvider.jsx";
import PostPicker from "../components/PostPicker.jsx";
import QRBox from "../components/QRBox.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [saving, setSaving] = useState(false);

  const matricula = profile?.matricula || "";
  const publicUrl = useMemo(() => {
    if (!matricula) return "";
    return `${window.location.origin}/u/${matricula}`;
  }, [matricula]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // 1) user profile por uid
      const usersRef = collection(db, "users");
      const uq = query(usersRef, where("uid", "==", user.uid));
      const usnap = await getDocs(uq);
      const udoc = usnap.docs[0];
      const udata = udoc ? { id: udoc.id, ...udoc.data() } : null;

      if (cancelled) return;
      setProfile(udata);

      if (!udata?.matricula) return;

      // 2) posts por matricula (según tu Firestore real)
      const postsRef = collection(db, "posts");
      const pq = query(
        postsRef,
        where("matricula", "==", udata.matricula),
        orderBy("createdAt", "desc")
      );
      const psnap = await getDocs(pq);
      const list = psnap.docs.map(d => ({ docId: d.id, ...d.data() }));

      if (cancelled) return;
      setPosts(list);

      // 3) layout guardado
      const layoutRef = doc(db, "portfolioLayouts", user.uid);
      const layoutSnap = await getDoc(layoutRef);
      if (layoutSnap.exists()) {
        const ids = layoutSnap.data()?.selectedPostDocIds || [];
        setSelectedIds(new Set(ids));
      } else {
        // default: vacío (el usuario elige)
        setSelectedIds(new Set());
      }
    }

    load();
    return () => { cancelled = true; };
  }, [user.uid]);

  function toggle(id) {
    setSelectedIds(prev => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  }

  async function save() {
    setSaving(true);
    try {
      const ref = doc(db, "portfolioLayouts", user.uid);
      await setDoc(ref, {
        uid: user.uid,
        matricula: profile?.matricula || "",
        displayName: profile?.displayName || profile?.nombre || "",
        profilePicUrl: profile?.profilePicUrl || "",
        publicEnabled: true,
        selectedPostDocIds: Array.from(selectedIds),
        updatedAt: new Date()
      }, { merge: true });
    } finally {
      setSaving(false);
    }
  }

  if (!profile) {
    return (
      <div className="canvas">
        <div className="container">Cargando tu perfil...</div>
      </div>
    );
  }

  return (
    <div className="canvas">
      <div className="container">
        <h1 className="title">Modificar Portafolio</h1>
        <p className="muted">
          Selecciona qué publicaciones quieres mostrar. Esto NO borra tu post en Pixchi, solo lo oculta del portafolio.
        </p>

        <div className="grid2">
          <div className="cardBox">
            <h2 className="h2">Tus publicaciones</h2>
            <PostPicker
              posts={posts}
              selectedIds={selectedIds}
              onToggle={toggle}
            />

            <button className="btn" onClick={save} disabled={saving} style={{ marginTop: 12 }}>
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>

          <div className="cardBox">
            <h2 className="h2">Link público + QR</h2>
            <p className="muted">Comparte este link en tu CV o imprime el QR.</p>

            {publicUrl ? (
              <>
                <div className="kbdBlock">{publicUrl}</div>
                <QRBox url={publicUrl} />
              </>
            ) : (
              <p className="muted">No encontré tu matrícula en el perfil.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
