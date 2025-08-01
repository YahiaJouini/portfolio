import type { Locale } from "@/types"
import { useLocale as useNextIntlLocale } from "next-intl"

export function useLocale(): Locale {
   return useNextIntlLocale() as Locale
}
