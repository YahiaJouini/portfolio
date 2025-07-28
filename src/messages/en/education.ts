import { Education } from "../types"

export default [
   {
      degree: "Diploma (in progress)",
      fieldOfStudy: "Information Technology",
      institution:
         "Higher Institute of Technological Studies of Rades (ISET Rades)",
      startDate: "2023-09",
      description:
         "Currently enrolled in a 3-year program focused on networking, databases, and software engineering. Expected to graduate in June 2026.",
   },
   {
      degree: "Certificate",
      fieldOfStudy: "Software Development (Accelerated Bootcamp)",
      institution: "Coding Dojo",
      startDate: "2023-09",
      endDate: "2024-02",
      description:
         "Completed an intensive online software development bootcamp focused on fullstack web technologies, clean code principles, and agile workflows. Gained hands-on experience building real-world apps under tight deadlines.",
   },

   {
      degree: "Baccalauréat",
      fieldOfStudy: "Computer Science",
      institution: "Lycée Route Soliman",
      startDate: "2022-09",
      endDate: "2023-06",
      mention: "Excellent",
      description:
         "Graduated with the highest honors (mention: Excellent) in Computer Science, gaining a solid foundation in algorithms, logic, and mathematics.",
   },
] satisfies Array<Education>
