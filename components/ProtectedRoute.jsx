"use client";

import { useRouter } from "next/navigation";
import { useUser } from "../app/context/UserContext";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/"); // Redirection si non connecté
    }
  }, [loading, user, router]);

  if (loading) {
    return <div className="flex p-10 font-bold text-xl">Chargement...</div>; // Affiche un loader pendant le chargement
  }

  return user ? children : null; // Rend les enfants si l'utilisateur est connecté
}
