import { BaseProject, ProjectName } from "../types"

export const baseProjects: Partial<Record<ProjectName, BaseProject>> = {
   aftercode: {
      id: "educonnect",
      github: "https://github.com/YahiaJouini/aftercode",
      website: "https://aftercode.tn",
      public: false,
      pinned: true,
      type: "work",
      summary: [
         {
            key: "frameworks",
            value: ["Next.js", "i18n", "React Hook Form"],
         },
         {
            key: "databases",
            value: ["SQLite"],
         },
         {
            key: "cms",
            value: ["Strapi (REST)", "Tanstack Query"],
         },
         {
            key: "styling",
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
      summary: [
         {
            key: "databases",
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
      images: [],
      summary: [
         {
            key: "frameworks",
            value: ["Next.js", "Supabase Auth", "React Hook Form", "i18n"],
         },
         {
            key: "cms",
            value: ["Google Maps API", "Tanstack Query"],
         },
         {
            key: "styling",
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
      images: [],
      summary: [
         {
            key: "frameworks",
            value: ["Next.js", "Supabase Auth", "React Hook Form"],
         },
         {
            key: "databases",
            value: [
               "PostgreSQL",
               "Drizzle ORM",
               "Supabase storage",
               "In-memory cache",
            ],
         },
         {
            key: "cms",
            value: ["Tanstack Query", "Hugging Face API"],
         },
         {
            key: "styling",
            value: ["Tailwind CSS", "Framer motion"],
         },
      ],
   },
}
