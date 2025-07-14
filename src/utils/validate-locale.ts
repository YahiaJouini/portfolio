import { Locale, SUPPORTED_LOCALES } from "@/messages/types/common"

export const validLocale = (locale: string | undefined) => {
   if (!locale) return false
   return SUPPORTED_LOCALES.includes(locale as Locale)
}
