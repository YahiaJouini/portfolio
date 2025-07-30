import { Locale } from "@/types"
import { SUPPORTED_LOCALES } from "./constants"

export const validLocale = (locale: string | undefined) => {
   if (!locale) return false
   return SUPPORTED_LOCALES.includes(locale as Locale)
}
