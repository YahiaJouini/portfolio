import { Locale } from "../types/shared"

export const messages = {
   en: {
      pageNotFound: "Page Not Found",
      loading: "Loading",
   },
   fr: {
      pageNotFound: "Page non trouvée",
      loading: "Chargement",
   },
   ar: {
      pageNotFound: "الصفحة غير موجودة",
      loading: "جار التحميل",
   },
} satisfies Record<Locale, Record<string, string>>
