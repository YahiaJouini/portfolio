import { Locale } from "@/types"
import { createLoader, parseAsStringLiteral } from "nuqs/server"

type Item = {
   key: "readme" | "preview"
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
      key: "preview",
      values: {
         en: "Preview",
         fr: "Aperçu",
         ar: "معاينة",
      },
   },
] as const

export const filters = {
   display: parseAsStringLiteral(
      displaySections.map(({ key }) => key),
   ).withDefault("readme"),
}

export const loadSearchParams = createLoader(filters)
