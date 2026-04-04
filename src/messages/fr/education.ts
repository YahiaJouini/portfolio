import { Education } from "../types"

export default [
   {
      degree: "Diplôme national (en cours)",
      fieldOfStudy: "Technologies de l'information",
      institution:
         "Institut Supérieur des Études Technologiques de Radès (ISET Radès)",
      institutionUrl: "https://www.isetr.rnu.tn",
      startDate: "2023-09",
      description:
         "Je poursuis un diplôme national d'enseignement supérieur en 3 ans, axé sur les réseaux, les bases de données et l’ingénierie logicielle. Diplôme prévu : juillet 2026.",
   },
   {
      degree: "Certificat",
      fieldOfStudy: "Développement logiciel (bootcamp accéléré)",
      institution: "Coding Dojo",
      institutionUrl: "https://www.codingdojo.com",
      startDate: "2023-09",
      endDate: "2024-01",
      description:
         "J’ai suivi un bootcamp intensif en ligne en développement logiciel, centré sur les technologies web fullstack, les principes de clean code et les méthodes de travail agiles. J’y ai acquis une expérience pratique à travers la réalisation d’applications dans des délais serrés.",
      certification: {
         href: "https://app.diplomasafe.com/en-US/diploma/d1202b62c0d64a1d0f78d4c5814d6ed87f1b5e6f5",
         title: "Voir le certificat",
      },
   },

   {
      degree: "Baccalauréat",
      fieldOfStudy: "Informatique",
      institution: "Lycée Route De La Plage Soliman",
      startDate: "2022-09",
      endDate: "2023-06",
      mention: "Excellent",
      description:
         "Diplômé avec la mention Excellent en informatique, avec de solides bases en mathématiques, physique, algorithmique et programmation.",
   },
] satisfies Array<Education>
