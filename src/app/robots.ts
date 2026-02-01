import { BASE_URL } from "@/utils/env"
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
   return {
      rules: {
         userAgent: "*",
         allow: "/",
         disallow: [
            "/admin/*",
            "/api/*",
            "/_next/*",
            "/me.webp",
            "/_next/image?url=%2Fme.webp*",
         ],
      },
      sitemap: `${BASE_URL}/sitemap.xml`,
   }
}
