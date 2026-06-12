"use client";

import { useState } from "react";

const FRONT_URL = process.env.NEXT_PUBLIC_FRONT_URL || "https://app.classeapp.fr";

const CLASSES = [
  {
    niveau: "BTS 1ère année",
    specialite: "Option CIEL",
    description: "Cybersécurité, Informatique et réseaux, Électronique",
    color: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-500/20",
    badge: "bg-emerald-100 text-emerald-700",
  },
  {
    niveau: "Seconde",
    specialite: "Mathématiques",
    description: "Programme de Seconde générale — fonctions, géométrie, probabilités",
    color: "from-blue-500/10 to-indigo-500/10",
    border: "border-blue-500/20",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    niveau: "Terminale",
    specialite: "Spécialité NSI",
    description: "Numérique et Sciences Informatiques — algorithmique, structures de données, web",
    color: "from-violet-500/10 to-purple-500/10",
    border: "border-violet-500/20",
    badge: "bg-violet-100 text-violet-700",
  },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <button
      onClick={handleCopy}
      className="ml-2 rounded-md border border-border px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {copied ? "Copié ✓" : "Copier"}
    </button>
  );
}

export default function Exemples() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 space-y-20">

      {/* Hero */}
      <section className="text-center space-y-4">
        <span className="inline-block rounded-full bg-accent/10 px-4 py-1 text-sm font-medium text-accent">
          Accès démo gratuit
        </span>
        <h1 className="text-3xl font-bold text-text sm:text-4xl">
          Testez ClasseApp en conditions réelles
        </h1>
        <p className="mx-auto max-w-xl text-muted">
          Accédez à 3 classes fictives complètes — cours, QCM et flashcards déjà en place —
          sans créer de compte.
        </p>
      </section>

      {/* Classes démo */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-text">Les 3 classes accessibles</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {CLASSES.map((c) => (
            <div
              key={c.specialite}
              className={"rounded-2xl border bg-linear-to-br p-6 " + c.color + " " + c.border}
            >
              <span className={"inline-block rounded-full px-3 py-0.5 text-xs font-semibold " + c.badge}>
                {c.niveau}
              </span>
              <h3 className="mt-3 text-lg font-bold text-text">{c.specialite}</h3>
              <p className="mt-1 text-sm text-muted">{c.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comment tester */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-text">Comment tester</h2>
        <div className="grid gap-6 sm:grid-cols-2">

          {/* Web */}
          <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                <svg className="h-5 w-5 text-accent" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3c-2.4 3-3.8 6-3.8 9s1.4 6 3.8 9M12 3c2.4 3 3.8 6 3.8 9s-1.4 6-3.8 9" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-text">Version web</p>
                <p className="text-xs text-muted">Depuis un navigateur</p>
              </div>
            </div>
            <ol className="space-y-2 text-sm text-text">
              <li className="flex gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">1</span>
                Ouvrez l'adresse ci-dessous
              </li>
              <li className="flex gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">2</span>
                Cliquez sur <strong>Essayer la démo</strong> sur la page d'accueil
              </li>
              <li className="flex gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">3</span>
                Naviguez librement dans les 3 classes
              </li>
            </ol>
            <div className="flex items-center rounded-lg border border-border bg-bg px-3 py-2">
              <span className="flex-1 truncate font-mono text-xs text-muted">{FRONT_URL}</span>
              <CopyButton text={FRONT_URL} />
            </div>
            <a
              href={FRONT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full border border-accent py-2.5 text-center text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white"
            >
              Ouvrir l'application →
            </a>
          </div>

          {/* Mobile */}
          <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                <svg className="h-5 w-5 text-accent" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <rect x="5" y="2" width="14" height="20" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-text">Application mobile</p>
                <p className="text-xs text-muted">iOS &amp; Android</p>
              </div>
            </div>
            <ol className="space-y-2 text-sm text-text">
              <li className="flex gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">1</span>
                Téléchargez <strong>ClasseApp</strong> sur votre store
              </li>
              <li className="flex gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">2</span>
                Sur l'écran de connexion, appuyez sur <strong>Essayer la démo</strong>
              </li>
              <li className="flex gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">3</span>
                Explorez les cours, QCM et flashcards — aucun compte requis
              </li>
            </ol>
            <div className="flex flex-col gap-2 pt-1">
              <a
                href="#"
                className="flex items-center justify-center gap-2 rounded-xl border border-border bg-bg2 px-4 py-2.5 text-sm font-medium text-text transition-colors hover:border-accent"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store (iOS)
              </a>
              <a
                href="#"
                className="flex items-center justify-center gap-2 rounded-xl border border-border bg-bg2 px-4 py-2.5 text-sm font-medium text-text transition-colors hover:border-accent"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="m3.18 23.76 9.99-9.99-2.83-2.84L1.1 20.17a2 2 0 0 0 2.08 3.59zM20.93 9.19l-2.63-1.52-3.23 3.23 3.18 3.18 2.69-1.55a1.99 1.99 0 0 0-.01-3.34zM2.01 3.83 11.34 13l2.83-2.83L4.1.44A2 2 0 0 0 2.01 3.83zm10.16 10.16-9.99 9.99a2 2 0 0 0 2.08.59l13.45-7.76-5.54-2.82z" />
                </svg>
                Google Play (Android)
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Note bas de page */}
      <p className="text-center text-sm text-muted">
        La session démo dure <strong>2 heures</strong>. Les données de démonstration sont fictives et réinitialisées régulièrement.
      </p>

    </div>
  );
}
