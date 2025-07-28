import { Education } from "../types";

export const education: Education[] = [
   {
      degree: "Baccalauréat",
      fieldOfStudy: "Computer Science",
      institution: "Lycée Route Soliman",
      startDate: "2022-09",
      endDate: "2023-06",
      mention: "Excellent",
   },
   {
      degree: "Certificate",
      fieldOfStudy: "Software Development (Accelerated Bootcamp)",
      institution: "Coding Dojo",
      startDate: "2023-09",
      endDate: "2024-02",
   },
   {
      degree: "Diploma",
      fieldOfStudy: "Information Technology",
      institution:
         "Higher Institute of Technological Studies of Rades (ISET Rades)",
      startDate: "2023-09",
      // no endDate since it's ongoing
      description:
         "Currently pursuing a 3-year technical degree in IT. Expected graduation: June 2026.",
   },
]
