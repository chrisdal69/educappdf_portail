import Link from "next/link";

const steps = [
  {
    title: "Inscrivez votre classe",
    description:
      "Créez votre compte enseignant et votre classe en quelques minutes, sans engagement.",
  },
  {
    title: "Invitez vos élèves",
    description:
      "Partagez un code d'accès : chacun retrouve son espace personnel sur web et mobile.",
  },
  {
    title: "Insérer votre premier chapitre",
    description:
      "Utilisez la plateforme web pour créer votre premier chapitre : ajoutez vos cours, QCM, flashcards et vidéos pédagogiques en quelques clics.",
  },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-text sm:text-5xl">
          La plateforme qui simplifie la vie de votre classe
        </h1>
        <div className="mt-0 grid gap-8 sm:grid-cols-2">
          <p className="max-w-2xl text-lg text-muted border rounded-lg border-border bg-surface p-4">
            Offrir à vos élèves un espace numérique pour retrouver tous vos
            cours, QCM, flashcards et vidéos pédagogiques dans une seule
            application pour réviser efficacement partout et à tout moment
          </p>
          <p className="max-w-2xl text-lg text-muted border rounded-lg border-border bg-surface p-4 flex items-center">
            Offrir à vos élèves une application mobile pour réviser efficacement
            partout et à tout moment
          </p>
        </div>

        <div className="aspect-video w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-bg2">
          <div className="flex h-full items-center justify-center text-sm text-muted">
            Vidéo de présentation à venir
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/inscription"
            className="rounded-full bg-accent px-8 py-3 text-base font-medium text-white transition-opacity hover:opacity-90"
          >
            Commencer gratuitement
          </Link>
          <Link
            href="/fonctionnalites"
            className="rounded-full border border-border px-8 py-3 text-base font-medium text-text transition-colors hover:border-accent"
          >
            Découvrir les fonctionnalités
          </Link>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-center text-2xl font-semibold text-text">
            Comment ça marche
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-border p-6"
              >
                <span className="text-sm font-semibold text-accent">
                  Étape {index + 1}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-text">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold text-text">
          Prêt à essayer EducApp avec votre classe ?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Démarrez gratuitement, sans carte bancaire. Vous choisirez votre
          formule à la fin de la période d'essai.
        </p>
        <Link
          href="/inscription"
          className="mt-6 inline-block rounded-full bg-accent px-8 py-3 text-base font-medium text-white transition-opacity hover:opacity-90"
        >
          Inscrire ma classe
        </Link>
      </section>
    </>
  );
}
