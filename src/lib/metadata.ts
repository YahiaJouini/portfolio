import { Page } from "@/messages/types/shared"
import { Locale } from "@/types"
import { BASE_URL } from "@/utils/constants"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { languageAlternates } from "./language-alternates"

export interface MetadataOptions {
   locale: Locale
   namespace: Page | "metadata"
   path?: Page
   noIndex?: boolean
}

export async function generatePageMetadata({
   locale,
   namespace,
   path,
   noIndex = false,
}: MetadataOptions): Promise<Metadata> {
   const t = await getTranslations({ locale, namespace })
   const title = t("title")
   const description = t("description")
   const keywords = t("keywords")
   const siteName = t("siteName")
   const authorName = t("authorName")

   const fullUrl = `${BASE_URL}/${locale}/${path}`

   return {
      title,
      description,
      keywords,
      authors: [{ name: authorName }],
      creator: authorName,

      openGraph: {
         title,
         description,
         url: fullUrl,
         siteName,
         locale,
         type: "website",
         images: [
            {
               url: `${BASE_URL}/og-image.webp`,
               width: 1388,
               height: 728,
               alt: t("ogImageAlt"),
            },
         ],
      },

      twitter: {
         card: "summary_large_image",
         title,
         description,
      },

      robots: {
         index: !noIndex,
         follow: !noIndex,
         googleBot: {
            index: !noIndex,
            follow: !noIndex,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
         },
      },

      alternates: {
         canonical: fullUrl,
         languages: languageAlternates(path),
      },
   }
}

export async function generateRootMetadata(locale: Locale): Promise<Metadata> {
   const t = await getTranslations({ locale, namespace: "metadata" })

   const title = t("title")
   const description = t("description")
   const keywords = t("keywords")
   const siteName = t("siteName")
   const authorName = t("authorName")
   const ogImageAlt = t("ogImageAlt")

   const fullUrl = `${BASE_URL}/${locale}`

   return {
      title: {
         template: `%s | ${siteName}`,
         default: title,
      },
      metadataBase: new URL(BASE_URL),
      description,
      keywords,
      authors: [{ name: authorName }],
      creator: authorName,

      openGraph: {
         title,
         description,
         url: fullUrl,
         siteName,
         locale,
         type: "website",
         images: [
            {
               url: `${BASE_URL}/og-image.webp`,
               width: 1388,
               height: 728,
               alt: ogImageAlt,
            },
         ],
      },

      twitter: {
         card: "summary_large_image",
         title,
         description,
         images: [`${BASE_URL}/og-image.webp`],
      },

      robots: {
         index: true,
         follow: true,
         googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
         },
      },

      alternates: {
         canonical: fullUrl,
         languages: languageAlternates(),
      },
   }
}
