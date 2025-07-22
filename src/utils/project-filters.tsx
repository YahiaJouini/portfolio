import { createLoader, parseAsArrayOf, parseAsStringLiteral } from "nuqs/server"

export const displayModes = ["grid", "list"] as const

export const filters = {
   layout: parseAsStringLiteral(displayModes).withDefault("list"),
   tags: parseAsArrayOf(
      parseAsStringLiteral(["all", "web", "mobile", "design", "other"]),
   ),
}

export const loadSearchParams = createLoader(filters)
