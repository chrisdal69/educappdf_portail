export const metadata = {
  title: "À propos — EducApp",
  description: "L'histoire et la mission d'EducApp, la plateforme pédagogique pour enseignants et élèves.",
};

export default function APropos() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-text">À propos d'EducApp</h1>
      <div className="mt-6 space-y-4 text-muted">
        <p>
          EducApp est née d'un constat simple : les enseignants passent un temps précieux à organiser
          leurs contenus, suivre leurs élèves et jongler entre plusieurs outils. Notre objectif est de
          réunir l'essentiel dans un seul espace, pensé pour la salle de classe et accessible partout.
        </p>
        <p>
          La plateforme s'adresse aux enseignants qui souhaitent gagner du temps dans la préparation
          et le suivi de leurs cours, et aux élèves qui veulent retrouver facilement leurs ressources
          et exercices, sur ordinateur comme sur mobile.
        </p>
        <p>
          Nous construisons EducApp avec et pour les enseignants, en intégrant leurs retours à chaque
          évolution du produit.
        </p>
      </div>
    </section>
  );
}
