import Link from "next/link";

export const metadata = {
  title: "Tarifs — EducApp",
  description: "Des tarifs simples et transparents pour inscrire votre classe sur EducApp.",
};

const plans = [
  {
    name: "Essai gratuit",
    price: "0 €",
    period: "pendant 30 jours",
    description: "Pour découvrir EducApp avec votre classe, sans engagement et sans carte bancaire.",
    features: ["Accès complet à toutes les fonctionnalités", "Une classe", "Support par email"],
    cta: "Commencer gratuitement",
    href: "/inscription",
    highlighted: false,
  },
  {
    name: "Classe",
    price: "À définir",
    period: "par classe et par an",
    description: "Pour continuer avec votre classe au-delà de la période d'essai.",
    features: ["Accès complet à toutes les fonctionnalités", "Une classe", "Support prioritaire"],
    cta: "Choisir cette offre",
    href: "/inscription",
    highlighted: true,
  },
];

export default function Tarifs() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-text sm:text-4xl">Des tarifs simples et transparents</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Démarrez avec un essai gratuit de 30 jours, sans carte bancaire. Vous choisissez votre formule
          uniquement si vous souhaitez continuer.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border p-8 ${
              plan.highlighted ? "border-accent bg-surface shadow-sm" : "border-border bg-surface"
            }`}
          >
            <h2 className="text-lg font-semibold text-text">{plan.name}</h2>
            <p className="mt-4 text-3xl font-bold text-text">{plan.price}</p>
            <p className="text-sm text-muted">{plan.period}</p>
            <p className="mt-4 text-sm text-muted">{plan.description}</p>
            <ul className="mt-6 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-text">
                  <span className="text-accent">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href={plan.href}
              className={`mt-8 block rounded-full px-6 py-3 text-center text-sm font-medium transition-opacity hover:opacity-90 ${
                plan.highlighted ? "bg-accent text-white" : "border border-border text-text"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
      <p className="mt-10 text-center text-sm text-muted">
        Une question sur nos tarifs ?{" "}
        <Link href="/contact" className="text-accent hover:underline">
          Contactez-nous
        </Link>
        .
      </p>
    </section>
  );
}
