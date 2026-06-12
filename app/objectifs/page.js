export const metadata = {
  title: "À propos — EducApp",
  description:
    "L'histoire et la mission d'EducApp, la plateforme pédagogique pour enseignants et élèves.",
};

export default function APropos() {
  return (
    <>
      <h1 className="text-5xl font-bold italic pt-10 text-text text-center">
        Les objectifs
      </h1>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold  text-text">Pourquoi ClasseApp ?</h1>
        <div className="mt-6 space-y-4 text-muted">
          <p>
            Au cours de l'année scolaire, les élèves accumulent de nombreux
            supports : cours, exercices, fiches de révision, documents
            distribués en classe ou ressources numériques. Il devient souvent
            difficile de retrouver rapidement une information ou un document
            important.
          </p>
          <p>
            ClasseApp rassemble toutes ces ressources dans un espace unique et
            structuré. Les contenus sont organisés de manière claire afin de
            faciliter le travail personnel, les révisions et la préparation des
            évaluations.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-6 pb-16 ">
        <h1 className="text-3xl font-bold text-text">
          Révisez où que vous soyez
        </h1>
        <div className="mt-6 space-y-4 text-muted">
          <p>
            Que ce soit à la maison, dans les transports, à la bibliothèque ou
            entre deux cours, les élèves disposent de l'ensemble de leurs
            ressources pédagogiques directement sur leur appareil mobile. Ils
            peuvent ainsi profiter de chaque moment disponible pour réviser,
            s'entraîner ou consulter un document.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-6 ">
        <h1 className="text-3xl font-bold text-text">
          Des contenus gérés par les enseignants
        </h1>
        <div className="mt-6 space-y-4 text-muted">
          <p>
            Les ressources disponibles dans ClasseApp sont publiées et
            organisées par les enseignants via une plateforme dédiée. Les élèves
            accèdent ensuite à ces contenus depuis l'application mobile ou
            depuis leur navigateur web.
          </p>
        </div>
      </section>
    </>
  );
}
