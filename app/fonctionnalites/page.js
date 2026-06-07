export const metadata = {
  title: "Fonctionnalités — EducApp",
  description: "Découvrez ce qu'EducApp apporte aux enseignants et aux élèves, sur web et mobile.",
};

const features = [
  {
    title: "Espace par chapitre",
    description: "Organisez vos contenus pédagogiques chapitre par chapitre, pour que chaque élève s'y retrouve facilement.",
  },
  {
    title: "Suivi de la progression",
    description: "Visualisez en un coup d'œil l'avancement de chaque élève et identifiez rapidement qui a besoin d'aide.",
  },
  {
    title: "Exercices et quiz",
    description: "Proposez des exercices interactifs et des quiz auto-corrigés directement intégrés à vos chapitres.",
  },
  {
    title: "Web et mobile",
    description: "Vos élèves retrouvent leur espace partout, en classe comme à la maison, sur ordinateur ou smartphone.",
  },
  {
    title: "Gestion de classe",
    description: "Ajoutez ou retirez des élèves, gérez les accès et organisez votre classe depuis un espace dédié.",
  },
  {
    title: "Contenus enrichis",
    description: "Texte, formules mathématiques, documents, vidéos : composez des chapitres complets et variés.",
  },
];

export default function Fonctionnalites() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-text sm:text-4xl">
        Tout ce dont votre classe a besoin, au même endroit
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        EducApp accompagne les enseignants dans la création et le suivi de leurs contenus,
        et offre aux élèves un espace clair pour apprendre à leur rythme.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-lg font-semibold text-text">{feature.title}</h2>
            <p className="mt-2 text-sm text-muted">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
