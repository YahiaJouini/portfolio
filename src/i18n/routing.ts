import { defineRouting } from "next-intl/routing"
import { SUPPORTED_LOCALES } from "../utils/constants"

export const routing = defineRouting({
   locales: SUPPORTED_LOCALES,
   defaultLocale: "en",
   localeDetection: false,
   localePrefix: "as-needed",
   localeCookie: {
      path: "/",
      sameSite: "strict",
   },
})
