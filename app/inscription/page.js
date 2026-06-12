"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/utils/api";

const PERSONAL_DOMAINS = new Set([
  "gmail.com", "googlemail.com",
  "hotmail.com", "hotmail.fr", "hotmail.co.uk",
  "outlook.com", "outlook.fr", "live.com", "live.fr", "msn.com",
  "yahoo.com", "yahoo.fr", "yahoo.co.uk",
  "icloud.com", "me.com", "mac.com",
  "orange.fr", "free.fr", "sfr.fr", "wanadoo.fr", "laposte.net",
  "bbox.fr", "numericable.fr", "neuf.fr", "club-internet.fr",
  "protonmail.com", "proton.me", "tutanota.com",
]);

function isEmailPro(email) {
  const domain = (email.split("@")[1] || "").toLowerCase();
  return domain.length > 0 && !PERSONAL_DOMAINS.has(domain);
}

const PASSWORD_RULES = [
  { key: "length", label: "Au moins 8 caractères", test: (p) => p.length >= 8 },
  { key: "upper", label: "Une majuscule", test: (p) => /[A-Z]/.test(p) },
  { key: "lower", label: "Une minuscule", test: (p) => /[a-z]/.test(p) },
  { key: "number", label: "Un chiffre", test: (p) => /[0-9]/.test(p) },
  { key: "special", label: "Un caractère spécial", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

const INPUT_CLS =
  "w-full rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text outline-none focus:border-accent";

export default function Inscription() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [etablissement, setEtablissement] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchTimeout = useRef(null);

  const [codes, setCodes] = useState(["", "", "", ""]);
  const codeRefs = useRef([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError("");
  }, [nom, prenom, email, password, passwordConfirm, etablissement]);

  async function handleSchoolSearch(q) {
    setSearchQuery(q);
    setEtablissement(null);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (q.trim().length < 3) { setSearchResults([]); return; }
    searchTimeout.current = setTimeout(async () => {
      try {
        const tokens = q.trim().replace(/"/g, "").split(/\s+/).filter(Boolean);
        const where = tokens
          .map((t) => "(search(nom_etablissement,\"" + t + "\") OR search(nom_commune,\"" + t + "\"))")
          .join(" AND ");
        const url =
          "https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire-education/records" +
          "?where=" + encodeURIComponent(where) +
          "&limit=8&select=nom_etablissement,nom_commune,libelle_departement&order_by=nom_etablissement";
        const res = await fetch(url);
        const data = await res.json();
        setSearchResults(data.results || []);
      } catch {
        setSearchResults([]);
      }
    }, 350);
  }

  function selectEtablissement(r) {
    setEtablissement({
      nom: r.nom_etablissement || "",
      ville: r.nom_commune || "",
      departement: r.libelle_departement || "",
    });
    setSearchQuery(r.nom_etablissement || "");
    setSearchResults([]);
  }

  function handleCodeChange(i, val) {
    const char = val.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(-1);
    const next = [...codes];
    next[i] = char;
    setCodes(next);
    if (char && i < 3) codeRefs.current[i + 1]?.focus();
  }

  function handleCodeKeyDown(i, e) {
    if (e.key === "Backspace" && !codes[i] && i > 0) {
      codeRefs.current[i - 1]?.focus();
    }
  }

  function handleCodePaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 4);
    const next = ["", "", "", ""];
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setCodes(next);
    const focusIdx = Math.min(pasted.length, 3);
    codeRefs.current[focusIdx]?.focus();
  }

  const passwordValid = PASSWORD_RULES.every((r) => r.test(password));

  async function handleStep1(e) {
    e.preventDefault();
    setError("");
    if (!etablissement) { setError("Sélectionnez un établissement dans la liste"); return; }
    if (email && !isEmailPro(email)) { setError("Utilisez votre email professionnel (pas gmail, hotmail…)"); return; }
    if (!passwordValid) { setError("Le mot de passe ne respecte pas les règles"); return; }
    if (password !== passwordConfirm) { setError("Les mots de passe ne correspondent pas"); return; }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/portail/inscription/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, prenom, email: email.trim().toLowerCase(), password, etablissement }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Erreur lors de l'inscription"); return; }
      setStep(2);
    } catch {
      setError("Impossible de joindre le serveur");
    } finally {
      setLoading(false);
    }
  }

  async function handleStep2(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/portail/inscription/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), code: codes.join("") }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Code invalide"); return; }
      localStorage.setItem("portail_token", data.token);
      localStorage.setItem("portail_user", JSON.stringify({ nom: data.nom, prenom: data.prenom }));
      setStep(3);
      setTimeout(() => router.push("/account"), 2000);
    } catch {
      setError("Impossible de joindre le serveur");
    } finally {
      setLoading(false);
    }
  }

  if (step === 3) {
    return (
      <section className="mx-auto max-w-sm px-6 py-24 text-center">
        <div className="text-5xl mb-5">✓</div>
        <h1 className="text-2xl font-bold text-text mb-2">Compte créé !</h1>
        <p className="text-sm text-muted">Redirection vers votre espace…</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-xl px-6 py-16">
      <div className="flex items-center gap-2 mb-8">
        {[1, 2].map((s) => (
          <div
            key={s}
            className={"h-1.5 flex-1 rounded-full transition-colors " + (step >= s ? "bg-accent" : "bg-border")}
          />
        ))}
      </div>

      {step === 1 && (
        <>
          <h1 className="text-2xl font-bold text-text mb-1">Créer votre compte</h1>
          <p className="text-sm text-muted mb-8">Essai gratuit 30 jours, sans carte bancaire.</p>

          <form onSubmit={handleStep1} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1">Prénom</label>
                <input
                  type="text"
                  required
                  autoComplete="given-name"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className={INPUT_CLS}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">Nom</label>
                <input
                  type="text"
                  required
                  autoComplete="family-name"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className={INPUT_CLS}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">Email professionnel</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={INPUT_CLS}
              />
              {email && !isEmailPro(email) && (
                <p className="text-xs text-red-500 mt-1">Utilisez votre email professionnel</p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-text mb-1">Établissement</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSchoolSearch(e.target.value)}
                placeholder="Rechercher par nom, ville, département…"
                className={INPUT_CLS + " placeholder:text-muted"}
              />
              {searchResults.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 rounded-lg border border-border bg-surface shadow-lg max-h-52 overflow-y-auto">
                  {searchResults.map((r, i) => (
                    <li
                      key={i}
                      onClick={() => selectEtablissement(r)}
                      className="px-4 py-2.5 text-sm cursor-pointer hover:bg-accent hover:text-white border-b border-border last:border-none"
                    >
                      <span className="font-medium">{r.nom_etablissement}</span>
                      <span className="ml-1.5 text-xs opacity-70">
                        {r.nom_commune}
                        {r.libelle_departement ? ` (${r.libelle_departement})` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {etablissement && (
                <p className="text-xs text-accent mt-1">
                  ✓ {etablissement.nom} — {etablissement.ville}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">Mot de passe</label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={INPUT_CLS}
              />
              {password && (
                <ul className="mt-2 space-y-0.5">
                  {PASSWORD_RULES.map((r) => (
                    <li
                      key={r.key}
                      className={"text-xs flex items-center gap-1 " + (r.test(password) ? "text-green-600" : "text-muted")}
                    >
                      <span>{r.test(password) ? "✓" : "○"}</span>
                      {r.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">Confirmer le mot de passe</label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className={INPUT_CLS}
              />
              {passwordConfirm && password !== passwordConfirm && (
                <p className="text-xs text-red-500 mt-1">Les mots de passe ne correspondent pas</p>
              )}
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Envoi du code…" : "Continuer"}
            </button>

            <p className="text-center text-xs text-muted">
              Déjà un compte ?{" "}
              <a href="/login" className="text-accent hover:underline">
                Se connecter
              </a>
            </p>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <h1 className="text-2xl font-bold text-text mb-1">Vérifiez votre email</h1>
          <p className="text-sm text-muted mb-8">
            Un code de vérification a été envoyé à{" "}
            <strong className="text-text">{email}</strong>. Il expire dans 7 minutes.
          </p>

          <form onSubmit={handleStep2} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text mb-3">Code de vérification</label>
              <div className="flex gap-3 justify-center">
                {codes.map((c, i) => (
                  <input
                    key={i}
                    ref={(el) => (codeRefs.current[i] = el)}
                    type="text"
                    inputMode="text"
                    maxLength={1}
                    value={c}
                    onChange={(e) => handleCodeChange(i, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(i, e)}
                    onPaste={i === 0 ? handleCodePaste : undefined}
                    className="w-14 h-16 rounded-xl border-2 border-border bg-surface text-center text-2xl font-mono font-bold text-text outline-none focus:border-accent transition-colors"
                  />
                ))}
              </div>
            </div>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading || codes.some((c) => !c)}
              className="w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Vérification…" : "Valider"}
            </button>

            <button
              type="button"
              onClick={() => { setStep(1); setCodes(["", "", "", ""]); setError(""); }}
              className="w-full text-sm text-muted hover:text-text transition-colors"
            >
              ← Modifier mes informations
            </button>
          </form>
        </>
      )}
    </section>
  );
}
