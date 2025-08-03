import { BASE_URL, SUPPORTED_LOCALES } from "@/utils/constants"

export const languageAlternates = (path?: string): Record<string, string> => {
   const languageAlternates = SUPPORTED_LOCALES.reduce(
      (acc, locale) => {
         acc[locale] = `${BASE_URL}/${locale}/${path}`
         return acc
      },
      {} as Record<string, string>,
   )

   languageAlternates["x-default"] =
      `${BASE_URL}/${SUPPORTED_LOCALES[0]}/${path}`
   return languageAlternates
}
