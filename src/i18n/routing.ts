import { defineRouting } from "next-intl/routing"
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "../utils/constants"

export const routing = defineRouting({
   locales: SUPPORTED_LOCALES,
   defaultLocale: DEFAULT_LOCALE,
   localeDetection: false,
   localePrefix: "as-needed",
   localeCookie: {
      path: "/",
      sameSite: "strict",
   },
})
