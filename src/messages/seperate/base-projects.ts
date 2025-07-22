import { BaseProject, ProjectName } from "../types"

export const baseProjects: Partial<Record<ProjectName, BaseProject>> = {
   aftercode: {
      id: "educonnect",
      github: "https://github.com/YahiaJouini/aftercode",
      website: "https://aftercode.tn",
      public: false,
      pinned: true,
      type: "work",
      mainLanguage: "TypeScript",
      summary: [
         {
            key: "Frameworks & Libraries",
            value: ["Next.js", "i18n", "React Hook Form"],
         },
         {
            key: "Databases & Backend Services",
            value: ["SQLite"],
         },
         {
            key: "CMS & APIs",
            value: ["Strapi (REST)", "Tanstack Query"],
         },
         {
            key: "Styling & UI",
            value: ["Tailwind CSS", "Framer motion"],
         },
      ],
   },
   "mariagetn-api": {
      id: "mariagetn-api",
      github: "https://github.com/YahiaJouini/mariagetn-api",
      public: false,
      pinned: true,
      type: "work",
      mainLanguage: "TypeScript",
      summary: [
         {
            key: "Databases & Backend Services",
            value: [
               "PostgreSQL",
               "Drizzle ORM",
               "Minio Storage",
               "NAPI-Rs (image processing)",
               "In-memory cache",
            ],
         },
      ],
   },
   mariagetn: {
      id: "mariagetn",
      github: "https://github.com/YahiaJouini/mariagetn",
      website: "https://www.mariage.com.tn",
      public: false,
      pinned: true,
      type: "work",
      mainLanguage: "TypeScript",
      images: [],
      summary: [
         {
            key: "Frameworks & Libraries",
            value: ["Next.js", "Supabase Auth", "React Hook Form", "i18n"],
         },
         {
            key: "CMS & APIs",
            value: ["Google Maps API", "Tanstack Query"],
         },
         {
            key: "Styling & UI",
            value: ["Tailwind CSS", "Framer motion"],
         },
      ],
   },

   educonnect: {
      id: "educonnect",
      github: "https://github.com/YahiaJouini/educonnect",
      pinned: true,
      public: true,
      type: "personal",
      mainLanguage: "TypeScript",
      images: [],
      summary: [
         {
            key: "Frameworks & Libraries",
            value: ["Next.js", "Supabase Auth", "React Hook Form"],
         },
         {
            key: "Databases & Backend Services",
            value: [
               "PostgreSQL",
               "Drizzle ORM",
               "Supabase storage",
               "In-memory cache",
            ],
         },
         {
            key: "CMS & APIs",
            value: ["Tanstack Query", "Hugging Face API"],
         },
         {
            key: "Styling & UI",
            value: ["Tailwind CSS", "Framer motion"],
         },
      ],
   },
}
