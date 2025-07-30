import { Locale } from "@/types"

export const messages = {
   en: {
      pageNotFound: "Page Not Found",
      loading: "Loading",
      error: "An error occurred",
   },
   fr: {
      pageNotFound: "Page non trouvée",
      loading: "Chargement",
      error: "Une erreur s'est produite",
   },
   ar: {
      pageNotFound: "الصفحة غير موجودة",
      loading: "جار التحميل",
      error: "حدث خطأ",
   },
} satisfies Record<Locale, Record<string, string>>
