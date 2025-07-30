import { Locale } from "@/types"
import { validLocale } from "@/utils/validate-locale"
import { cookies } from "next/headers"
import { cache } from "react"

export const getServerLocale = cache(async (): Promise<Locale> => {
   const cookieStore = await cookies()
   const locale = cookieStore.get("locale")?.value

   if (validLocale(locale)) {
      return locale as Locale
   }

   return "en"
})
