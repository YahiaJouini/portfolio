import { BASE_URL, DEFAULT_LOCALE } from "./constants"

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
