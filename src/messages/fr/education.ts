import { Education } from "../types"

export default [
   {
      degree: "Diplôme universitaire (en cours)",
      fieldOfStudy: "Technologies de l'information",
      institution:
         "Institut Supérieur des Études Technologiques de Radès (ISET Radès)",
      startDate: "2023-09",
      description:
         "Formation universitaire de trois ans axée sur les réseaux, les bases de données et l'ingénierie logicielle. Diplôme prévu en juin 2026.",
   },
   {
      degree: "Certificat de formation",
      fieldOfStudy: "Développement logiciel (Bootcamp intensif)",
      institution: "Coding Dojo",
      startDate: "2023-09",
      endDate: "2024-02",
      description:
         "Formation en ligne intensive en développement web fullstack, avec un accent sur le code propre et les méthodes agiles. Réalisation de projets concrets dans des délais courts, favorisant une forte expérience pratique.",
      certification: {
         href: "https://app.diplomasafe.com/en-US/diploma/d1202b62c0d64a1d0f78d4c5814d6ed87f1b5e6f5",
         title: "Voir le certificat",
      },
   },
   {
      degree: "Baccalauréat",
      fieldOfStudy: "Sciences informatiques",
      institution: "Lycée Route De La Plage Soliman",
      startDate: "2022-09",
      endDate: "2023-06",
      mention: "Mention Très Bien",
      description:
         "Obtention du baccalauréat en sciences informatiques avec la mention Très Bien, avec une solide base en algorithmes, logique et mathématiques.",
   },
] satisfies Array<Education>
