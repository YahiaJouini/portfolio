import { BaseProject, ProjectName } from "../types"

export const baseProjects: Partial<Record<ProjectName, BaseProject>> = {
   "mariagetn-api": {
      github: "https://github.com/YahiaJouini/mariagetn-api",
      public: false,
      images: [""],
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
}
