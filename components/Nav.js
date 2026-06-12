"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const links = [
  { href: "/objectifs", label: "Objectifs" },
  { href: "/exemples", label: "Exemples" },
  { href: "/fonctionnalites", label: "Fonctionnalités" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("portail_user");
      setUser(stored ? JSON.parse(stored) : null);
    } catch {
      setUser(null);
    }
  }, [pathname]);

  const initials = user
    ? ((user.prenom?.[0] || "") + (user.nom?.[0] || "")).toUpperCase()
    : "";

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-accent">
          EducApp
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="text-sm text-text transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <Link
              href="/account"
              title={`${user.prenom} ${user.nom}`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white transition-opacity hover:opacity-80"
            >
              {initials}
            </Link>
          ) : (
            <>
              <Link
                href="/inscription"
                className="hidden rounded-full border border-accent px-5 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white md:inline-flex"
              >
                S&apos;inscrire gratuitement
              </Link>
              <Link
                href="/login"
                className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Se connecter
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
