import { Education } from "../types"

export default [
   {
      degree: "National Diploma (in progress)",
      fieldOfStudy: "Information Technology",
      institution:
         "Higher Institute of Technological Studies of Rades (ISET Rades)",
      institutionUrl: "https://www.isetr.rnu.tn",
      startDate: "2023-09",
      description:
         "Pursuing a 3-year higher education diploma focused on networking, databases, and software engineering. Expected graduation: July 2026.",
   },
   {
      degree: "Certificate",
      fieldOfStudy: "Software Development (Accelerated Bootcamp)",
      institution: "Coding Dojo",
      institutionUrl: "https://www.codingdojo.com",
      startDate: "2023-09",
      endDate: "2024-01",
      description:
         "Completed an intensive online software development bootcamp focused on fullstack web technologies, clean code principles, and agile workflows. Gained hands-on experience building real-world apps under tight deadlines.",
      certification: {
         href: "https://app.diplomasafe.com/en-US/diploma/d1202b62c0d64a1d0f78d4c5814d6ed87f1b5e6f5",
         title: "Show credentials",
      },
   },

   {
      degree: "Baccalauréat",
      fieldOfStudy: "Computer Science",
      institution: "Lycée Route De La Plage Soliman",
      startDate: "2022-09",
      endDate: "2023-06",
      mention: "Excellent",
      description:
         "Graduated with highest honors in Computer Science, with a strong foundation in mathematics, physics, algorithms, and programming.",
   },
] satisfies Array<Education>
