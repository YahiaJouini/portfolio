import { createLoader, parseAsStringLiteral } from "nuqs/server"

export const sections = ["experience", "education"] as const

export const filters = {
   view: parseAsStringLiteral(sections).withDefault("experience"),
}

export const loadSearchParams = createLoader(filters)
