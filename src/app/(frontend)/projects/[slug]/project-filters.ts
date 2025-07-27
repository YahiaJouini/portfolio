import { Locale } from "@/messages/types/shared"
import { createLoader, parseAsStringLiteral } from "nuqs/server"

type Item = {
   key: "readme" | "screenshots"
   values: Record<Locale, string>
}
export const displaySections: Item[] = [
   {
      key: "readme",
      values: {
         en: "ReadMe",
         fr: "ReadMe",
         ar: "ReadMe",
      },
   },
   {
      key: "screenshots",
      values: {
         en: "ScreenShots",
         fr: "Captures d'écran",
         ar: "لقطات الشاشة",
      },
   },
] as const

export const filters = {
   display: parseAsStringLiteral(
      displaySections.map(({ key }) => key),
   ).withDefault("readme"),
}

export const loadSearchParams = createLoader(filters)
