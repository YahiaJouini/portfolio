import { Page } from "@/messages/types/shared"
import { Locale } from "@/types"
import { buildLocalizedUrl } from "@/utils/build-url"
import { BASE_URL } from "@/utils/env"
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

   const fullUrl = buildLocalizedUrl(locale, path)

   return {
      title,
      description,
      keywords,

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

// Root metadata with all shared settings including OpenGraph and Twitter
export async function generateRootMetadata(locale: Locale): Promise<Metadata> {
   const t = await getTranslations({ locale, namespace: "metadata" })

   const title = t("title")
   const description = t("description")
   const keywords = t("keywords")
   const siteName = t("siteName")
   const authorName = t("authorName")

   const fullUrl = buildLocalizedUrl(locale)

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

      icons: {
         icon: [
            {
               url: "/favicon/favicon-16x16.png",
               sizes: "16x16",
               type: "image/png",
            },
            {
               url: "/favicon/favicon-32x32.png",
               sizes: "32x32",
               type: "image/png",
            },
            { url: "/favicon/favicon.ico", sizes: "any" },
         ],
         apple: [
            {
               url: "/favicon/apple-touch-icon.png",
               sizes: "180x180",
               type: "image/png",
            },
         ],
         other: [
            {
               rel: "icon",
               url: "/favicon/android-chrome-192x192.png",
               sizes: "192x192",
               type: "image/png",
            },
            {
               rel: "icon",
               url: "/favicon/android-chrome-512x512.png",
               sizes: "512x512",
               type: "image/png",
            },
         ],
      },
      openGraph: {
         title,
         description,
         url: fullUrl,
         siteName,
         locale,
         type: "website",
         images: [
            {
               url: "/og-image.webp",
               width: 1388,
               height: 728,
               alt: siteName,
            },
         ],
      },

      twitter: {
         card: "summary_large_image",
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
