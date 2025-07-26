import { BaseProject, ProjectName } from "../types"

export const baseProjects: Partial<Record<ProjectName, BaseProject>> = {
   aftercode: {
      id: "aftercode",
      github: "https://github.com/YahiaJouini/aftercode",
      website: "https://aftercode.tn",
      public: false,
      pinned: true,
      type: "work",
      roles: [
         {
            key: "developed",
            value: true,
         },
         {
            key: "designed",
            value: false,
         },
      ],
      createdAt: "2024-12-27",
      summary: [
         {
            key: "frameworks",
            values: ["Next.js", "i18n", "React Hook Form"],
         },
         {
            key: "databases",
            values: ["SQLite"],
         },
         {
            key: "cms",
            values: ["Strapi (REST)", "Tanstack Query"],
         },
         {
            key: "styling",
            values: ["Tailwind CSS", "Framer motion"],
         },
      ],
   },
   "mariagetn-api": {
      id: "mariagetn-api",
      github: "https://github.com/YahiaJouini/mariagetn-api",
      public: false,
      pinned: true,
      type: "work",
      createdAt: "2025-01-12",
      roles: [
         {
            key: "architected",
            value: true,
         },
         {
            key: "developed",
            value: true,
         },
      ],
      summary: [
         {
            key: "databases",
            values: [
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
      roles: [
         {
            key: "designed",
            value: false,
         },
         {
            key: "developed",
            value: true,
         },
      ],
      createdAt: "2025-01-12",
      summary: [
         {
            key: "frameworks",
            values: ["Next.js", "Supabase Auth", "React Hook Form", "i18n"],
         },
         {
            key: "cms",
            values: ["Google Maps API", "Tanstack Query"],
         },
         {
            key: "styling",
            values: ["Tailwind CSS", "Framer motion"],
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
      roles: [
         {
            key: "architected",
            value: true,
         },
         {
            key: "developed",
            value: true,
         },
         {
            key: "designed",
            value: true,
         },
         {
            key: "deployed",
            value: true,
         },
         {
            key: "maintained",
            value: true,
         },
      ],
      summary: [
         {
            key: "frameworks",
            values: ["Next.js", "Supabase Auth", "React Hook Form"],
         },
         {
            key: "databases",
            values: [
               "PostgreSQL",
               "Drizzle ORM",
               "Supabase storage",
               "In-memory cache",
            ],
         },
         {
            key: "cms",
            values: ["Tanstack Query", "Hugging Face API"],
         },
         {
            key: "styling",
            values: ["Tailwind CSS", "Framer motion"],
         },
      ],
   },
}
