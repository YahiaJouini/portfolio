import { Locale } from "@/messages/types/shared"
import { validLocale } from "@/utils/validate-locale"
import { cookies } from "next/headers"

export async function getServerLocale(): Promise<Locale> {
   const cookieStore = await cookies()
   const locale = cookieStore.get("locale")?.value

   if (validLocale(locale)) {
      return locale as Locale
   }

   return "en"
}
