import { baseProjects } from "../seperate/base-projects"
import { Project } from "../types"

export default [
   {
      ...baseProjects.aftercode!,
      description: `Aftercode is a Next.js showcase site for a Tunisian software dev agency. It features team profiles, past projects, and a booking form. I built the frontend using Next.js App Router, Tailwind CSS, Framer Motion, TanStack Query (for Strapi APIs with i18n), and Next‑i18n for translations.`,
      title: "Aftercode – Software Agency Showcase",
   },
] satisfies Array<Project>
