import { Page } from "@/messages/types/shared"
import { DynamicMetaData, Locale } from "@/types"
import { buildLocalizedUrl } from "@/utils/build-url"
import { BASE_URL } from "@/utils/env"
import { Metadata } from "next"
import { languageAlternates } from "./language-alternates"

type Options<T> = {
   path: `${Page}/${string}`
   data: T
   type: "website" | "article"
   locale: Locale
}

export function generateDynamicMetadata<T extends DynamicMetaData>({
   path,
   data,
   type,
   locale,
}: Options<T>): Metadata {
   const { title, description, image, author, tags, publishedTime } = data
   const fullUrl = buildLocalizedUrl(locale, path)

   return {
      title,
      description,
      keywords: tags?.join(", "),
      other:
         type === "article"
            ? {
                 "article:author": author,
                 "article:published_time": publishedTime,
                 "article:tag": tags?.join(","),
              }
            : {},
      openGraph: {
         title,
         description,
         url: fullUrl,
         type,
         locale,
         ...(type === "article" && publishedTime && { publishedTime }),
         ...(type === "article" && author && { authors: [author] }),
         ...(image &&
            typeof image !== "number" && {
               images: [
                  {
                     url: image.url ?? `${BASE_URL}/og-image.webp`,
                     width: String(image.width),
                     height: String(image.height),
                     alt: image.alt,
                  },
               ],
            }),
      },

      robots: {
         index: true,
         follow: true,
      },

      alternates: {
         canonical: fullUrl,
         languages: languageAlternates(path),
      },
   }
}
