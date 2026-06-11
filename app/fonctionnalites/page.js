export const metadata = {
  title: "Fonctionnalités — EducApp",
  description: "Découvrez ce qu'EducApp apporte aux enseignants et aux élèves, sur web et mobile.",
};

const features = [

  {
    title: "Organisation des chapitres",
    description: "Des chapitres rangés chronologiquement et par thème, pour que chaque élève s'y retrouve facilement.",
    image: "/features/tablist.png",
  },
  {
    title: "Documents ",
    description: "Vos élèves retrouvent tous les documents que vous proposez (pdf, multimédia, python, etc.). Un lecteur pdf est intégré à l'application pour une expérience fluide et sans distraction.",
    image: "/features/documents.png",
  },
  {
    title: "Quizz",
    description: "Les quizzs peuvent être construits avec l'aide de l'IA. L'insertion d'images est rapide. Ils peuvent être paramétrés en mode évaluation ou en mode entraînement",
    image: "/features/quizz.png",
  },
  {
    title: "FlashCards",
    description: "Vos élèves peuvent utiliser vos flashcards pour réviser leurs connaissances. Elles peuvent être créées avec l'aide de l'IA. L'insertion d'images est rapide.",
    image: "/features/flashcard.png",
  },
  {
    title: "Cloud",
    description: "Vos élèves disposent d'un espace de stockage en ligne pour sauvegarder leurs travaux et vous les soumettre. Vous avez la possibilité de répondre à leurs soumissions et de les annoter directement depuis l'application.",
    image: "/features/cloud.png",
  },
  {
    title: "FlashCards élèves",
    description: "Vos élèves ont la possibilité de scanner leur FlashCards papiers pour les retrouver sur l'application.",
    image: "/features/revisions.png",
  },
  {
    title: "Poly de cours complété à la main",
    description: "Vos élèves ont la possibilité de scanner leur poly de cours complété à la main pour le retrouver sur l'application. ",
    image: "/features/docComplete.png",
  },
    {
    title: "Espace de connexion ",
    description: "Les identifiants de connexion sont les mêmes sur l'application mobile et sur le web, pour une expérience fluide et sans interruption.",
    image: "/features/login.png",
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
        {features.map((feature, i) => (
          <div key={i} className="rounded-2xl border border-border bg-surface p-6 flex flex-col justify-between">
            <h2 className="text-lg font-semibold text-text">{feature.title}</h2>
            <p className="mt-2 text-sm text-muted">{feature.description}</p>
            <img
            style={{ maxHeight: "600px", objectFit: "contain" }}
              src={feature.image}
              alt={feature.title}
              className="mt-4 w-full "
            />
          </div>
        ))}
      </div>
    </section>
  );
}
