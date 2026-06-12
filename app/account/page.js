"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { portailFetch, formatSize } from "@/utils/api";

export default function Account() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newPublicname, setNewPublicname] = useState("");
  const [newRepertoires, setNewRepertoires] = useState([""]);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("portail_token");
    const storedUser = localStorage.getItem("portail_user");
    if (!token) { router.replace("/login"); return; }
    if (storedUser) setUser(JSON.parse(storedUser));

    portailFetch("/portail/dashboard")
      .then(async (res) => {
        if (res.status === 401) { router.replace("/login"); return; }
        const data = await res.json();
        setClasses(data.classes || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function handleLogout() {
    localStorage.removeItem("portail_token");
    localStorage.removeItem("portail_user");
    router.replace("/login");
  }

  function addRepertoire() {
    setNewRepertoires((prev) => [...prev, ""]);
  }

  function updateRepertoire(index, value) {
    setNewRepertoires((prev) => prev.map((r, i) => (i === index ? value : r)));
  }

  function removeRepertoire(index) {
    setNewRepertoires((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleCreateClass(e) {
    e.preventDefault();
    setCreateError("");
    const repNames = newRepertoires.map((r) => r.trim()).filter(Boolean);
    if (!newPublicname.trim()) { setCreateError("Nom de la classe requis"); return; }
    if (repNames.length === 0) { setCreateError("Au moins un répertoire requis"); return; }

    setCreating(true);
    try {
      const res = await portailFetch("/portail/classes", {
        method: "POST",
        body: JSON.stringify({ publicname: newPublicname, repertoires: repNames }),
      });
      const data = await res.json();
      if (!res.ok) { setCreateError(data.error || "Erreur"); return; }
      setClasses((prev) => [...prev, { ...data.classe, students: { total: 0, linked: 0, teachers: 0 }, storage: { total: 0, admin: 0, cloud: 0, userfiles: 0, userflashes: 0 } }]);
      setShowModal(false);
      setNewPublicname("");
      setNewRepertoires([""]);
    } catch {
      setCreateError("Impossible de joindre le serveur");
    } finally {
      setCreating(false);
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-muted text-sm">Chargement…</div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold text-text">
            Bonjour{user ? `, ${user.prenom} ${user.nom}` : ""} 👋
          </h1>
          <p className="text-sm text-muted mt-1">Tableau de bord administrateur</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-muted hover:text-text transition-colors"
        >
          Se déconnecter
        </button>
      </div>

      {/* Classes */}
      <div className="grid gap-6 sm:grid-cols-2">
        {classes.map((classe) => (
          <div key={classe._id} className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-lg font-semibold text-text mb-1">{classe.publicname}</h2>
            <p className="text-xs text-muted mb-4 font-mono">{classe.directoryname}</p>

            {/* Répertoires */}
            <div className="flex flex-wrap gap-1 mb-5">
              {(classe.repertoires || []).map((r) => (
                <span key={r} className="text-xs bg-border rounded-full px-2 py-0.5 text-text">
                  {r}
                </span>
              ))}
            </div>

            {/* Élèves */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Élèves</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <Stat label="Listés" value={classe.students.total} />
                <Stat label="Inscrits" value={classe.students.linked} />
                <Stat label="Teachers" value={classe.students.teachers} />
              </div>
            </div>

            {/* Stockage GCS */}
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Stockage GCS</p>
              <div className="space-y-1 text-sm">
                <StorageRow label="Total" value={classe.storage.total} bold />
                <StorageRow label="Fichiers admin" value={classe.storage.admin} />
                <StorageRow label="Cloud élèves" value={classe.storage.cloud} />
                <StorageRow label="Userfiles élèves" value={classe.storage.userfiles} />
                <StorageRow label="Userflashes élèves" value={classe.storage.userflashes} />
              </div>
            </div>
          </div>
        ))}

        {/* Bouton Ajouter */}
        <button
          onClick={() => setShowModal(true)}
          className="rounded-2xl border-2 border-dashed border-border hover:border-accent transition-colors p-6 flex flex-col items-center justify-center gap-2 text-muted hover:text-accent"
        >
          <span className="text-3xl">+</span>
          <span className="text-sm font-medium">Ajouter une classe</span>
        </button>
      </div>

      {/* Modal création classe */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-2xl border border-border p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-text mb-1">Nouvelle classe</h2>
            <p className="text-xs text-muted mb-5">
              ⚠️ Les noms de répertoires ne pourront pas être modifiés ultérieurement.
            </p>

            <form onSubmit={handleCreateClass} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1">Nom de la classe</label>
                <input
                  type="text"
                  required
                  value={newPublicname}
                  onChange={(e) => setNewPublicname(e.target.value)}
                  placeholder="Ex : Terminale NSI — Lycée Fermat"
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Répertoires</label>
                <div className="space-y-2">
                  {newRepertoires.map((r, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={r}
                        onChange={(e) => updateRepertoire(i, e.target.value)}
                        placeholder={`Répertoire ${i + 1}`}
                        className="flex-1 rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text outline-none focus:border-accent"
                      />
                      {newRepertoires.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRepertoire(i)}
                          className="text-muted hover:text-red-500 px-2"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addRepertoire}
                  className="mt-2 text-sm text-accent hover:underline"
                >
                  + Ajouter un répertoire
                </button>
              </div>

              {createError && <p className="text-sm text-red-500">{createError}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setCreateError(""); }}
                  className="flex-1 rounded-full border border-border px-4 py-2 text-sm text-text hover:bg-border transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {creating ? "Création…" : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg bg-border/30 p-2">
      <p className="text-lg font-bold text-text">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}

function StorageRow({ label, value, bold }) {
  return (
    <div className="flex justify-between">
      <span className={bold ? "font-medium text-text" : "text-muted"}>{label}</span>
      <span className={bold ? "font-medium text-text" : "text-text"}>{formatSize(value)}</span>
    </div>
  );
}
