import { Locale } from "@/types"

export const GITHUB_API = "https://api.github.com/graphql"

export const SUPPORTED_LOCALES = ["en", "fr", "ar"] as const
export const DEFAULT_LOCALE: Locale = "en"
export const LOCALES_LENGTH = SUPPORTED_LOCALES.length
export const ITEMS_PER_PAGE = 4
