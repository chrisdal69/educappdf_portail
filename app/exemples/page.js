export const metadata = {
  title: "Inscrire ma classe — EducApp",
  description: "Créez votre compte enseignant et démarrez votre essai gratuit de 30 jours.",
};

export default function Inscription() {
  return (
    <section className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-3xl font-bold text-text">Inscrire ma classe</h1>
      <p className="mt-3 text-muted">
        Créez votre compte enseignant pour démarrer votre essai gratuit de 30 jours, sans carte bancaire.
        Vous pourrez choisir votre formule à tout moment depuis votre espace.
      </p>

      <form className="mt-8 space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text">
            Nom et prénom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text">
            Email professionnel
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="className" className="block text-sm font-medium text-text">
            Nom de la classe
          </label>
          <input
            id="className"
            name="className"
            type="text"
            placeholder="Ex : 3ème B — Collège Jean Moulin"
            className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text outline-none placeholder:text-muted focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="level" className="block text-sm font-medium text-text">
            Niveau
          </label>
          <select
            id="level"
            name="level"
            className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text outline-none focus:border-accent"
            defaultValue=""
          >
            <option value="" disabled>
              Sélectionnez un niveau
            </option>
            <option value="seconde">Seconde</option>
            <option value="premiere">Première</option>
            <option value="terminale">Terminale</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Démarrer mon essai gratuit
        </button>
        <p className="text-center text-xs text-muted">
          En vous inscrivant, vous acceptez nos{" "}
          <a href="/cgu" className="text-accent hover:underline">CGU</a> et notre{" "}
          <a href="/confidentialite" className="text-accent hover:underline">politique de confidentialité</a>.
        </p>
      </form>
    </section>
  );
}
