import { DEFAULT_LOCALE } from "./constants"
import { BASE_URL } from "./env"

export const buildLocalizedUrl = (locale: string, path?: string): string => {
   const cleanedPath = path ? path.replace(/^\/+/, "") : ""
   const isDefaultLocale = locale === DEFAULT_LOCALE
   if (isDefaultLocale) {
      return cleanedPath ? `${BASE_URL}/${cleanedPath}` : BASE_URL
   }
   // For other locales, include locale in URL
   return cleanedPath
      ? `${BASE_URL}/${locale}/${cleanedPath}`
      : `${BASE_URL}/${locale}`
}
