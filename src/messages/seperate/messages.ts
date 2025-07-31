import { Locale } from "@/types"

export const messages = {
   en: {
      pageNotFound: "Page Not Found",
      loading: "Loading...",
      error: "An error occurred",
      submitting: "Sending...",
   },
   fr: {
      pageNotFound: "Page non trouvée",
      loading: "Chargement",
      error: "Une erreur s'est produite",
      submitting: "Envoi en cours...",
   },
   ar: {
      pageNotFound: "الصفحة غير موجودة",
      loading: "جار التحميل",
      error: "حدث خطأ",
      submitting: "جار الإرسال...",
   },
} satisfies Record<Locale, Record<string, string>>
