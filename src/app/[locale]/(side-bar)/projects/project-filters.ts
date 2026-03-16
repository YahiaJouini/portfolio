import { createLoader, parseAsInteger, parseAsStringLiteral } from "nuqs/server"

export const displayModes = ["grid", "list"] as const

export const filters = {
   layout: parseAsStringLiteral(displayModes).withDefault("grid"),
   page: parseAsInteger.withDefault(1),
}

export const loadSearchParams = createLoader(filters)
