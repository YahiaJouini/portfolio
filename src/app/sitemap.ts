import { BASE_URL } from "@/utils/env"
import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
   return [
      {
         url: BASE_URL,
         lastModified: new Date(),
         changeFrequency: "yearly",
         priority: 1,
      },
      {
         url: `${BASE_URL}/journey`,
         lastModified: new Date(),
         changeFrequency: "monthly",
         priority: 0.8,
      },
      {
         url: `${BASE_URL}/blogs`,
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.5,
      },
      {
         url: `${BASE_URL}/projects`,
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.5,
      },
      {
         url: `${BASE_URL}/contact`,
         lastModified: new Date(),
         changeFrequency: "monthly",
         priority: 0.3,
      },
   ]
}
