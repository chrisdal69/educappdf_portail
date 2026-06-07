export const metadata = {
  title: "Contact — EducApp",
  description: "Une question sur EducApp ? Contactez notre équipe.",
};

export default function Contact() {
  return (
    <section className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-3xl font-bold text-text">Contactez-nous</h1>
      <p className="mt-3 text-muted">
        Une question sur EducApp, sur nos tarifs ou sur votre essai en cours ? Écrivez-nous,
        nous vous répondons sous 48h ouvrées.
      </p>

      <form className="mt-8 space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text">
            Votre email
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
          <label htmlFor="message" className="block text-sm font-medium text-text">
            Votre message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text outline-none focus:border-accent"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Envoyer le message
        </button>
      </form>
    </section>
  );
}
