import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, limit, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase.js";
import Header from "../components/Header.jsx";
import PortfolioHero from "../components/PortfolioHero.jsx";
import WorkGrid from "../components/WorkGrid.jsx";

export default function PortfolioPage() {
  const { slug } = useParams();
  const [user, setUser] = useState(null);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  const pageTitle = useMemo(() => {
    if (!user) return "Pixchi Portfolio";
    return `${user.displayName || user.name || "Usuario"} — Pixchi`;
  }, [user]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);

      // 1) Buscar usuario por slug
      const usersRef = collection(db, "users");
      const uq = query(usersRef, where("slug", "==", slug), limit(1));
      const usnap = await getDocs(uq);

      const udoc = usnap.docs[0];
      const udata = udoc ? { id: udoc.id, ...udoc.data() } : null;

      if (cancelled) return;
      setUser(udata);

      // 2) Buscar posts del usuario
      const postsRef = collection(db, "posts");
      const pq = query(
        postsRef,
        where("ownerSlug", "==", slug),
        orderBy("createdAt", "desc")
      );

      const psnap = await getDocs(pq);
      const list = psnap.docs.map(d => ({ id: d.id, ...d.data() }));

      if (cancelled) return;
      setWorks(list);
      setLoading(false);
    }

    run().catch(() => {
      if (!cancelled) setLoading(false);
    });

    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <div className="page">
      <Header />

      {/* Canvas morado estilo “lienzo” */}
      <div className="canvas">
        <div className="container">
          <PortfolioHero user={user} slug={slug} loading={loading} />
          <WorkGrid works={works} loading={loading} />
        </div>
      </div>
    </div>
  );
}
