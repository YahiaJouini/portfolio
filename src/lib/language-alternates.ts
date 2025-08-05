import { buildLocalizedUrl } from "@/utils/build-url"
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/utils/constants"

export const languageAlternates = (path?: string): Record<string, string> => {
   const languageAlternates = SUPPORTED_LOCALES.reduce(
      (acc, locale) => {
         acc[locale] = buildLocalizedUrl(locale, path)
         return acc
      },
      {} as Record<string, string>,
   )

   // x-default should always point to default locale URL (without /en)
   languageAlternates["x-default"] = buildLocalizedUrl(DEFAULT_LOCALE, path)

   return languageAlternates
}
