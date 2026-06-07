export const metadata = {
  title: "Mentions légales — EducApp",
};

export default function MentionsLegales() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-text">Mentions légales</h1>
      <div className="mt-6 space-y-4 text-sm text-muted">
        <p>
          [À compléter : raison sociale, forme juridique, adresse du siège, numéro SIRET,
          coordonnées de l'éditeur et du directeur de la publication.]
        </p>
        <p>[À compléter : nom et coordonnées de l'hébergeur du site et de l'application.]</p>
        <p>[À compléter : informations sur la propriété intellectuelle des contenus du site.]</p>
      </div>
    </section>
  );
}
