import { Locale } from "@/types"
import { getLocale } from "next-intl/server"

export const getServerLocale = async (): Promise<Locale> => {
   return getLocale() as Promise<Locale>
}
