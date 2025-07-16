import { Language, Locale } from "./types/common"

export const profileImage = {
   src: "/me.webp",
   alt: {
      en: "Yahia Jouini's profile picture",
      fr: "Photo de profil de Yahia Jouini",
      ar: "صورة ملف يحيى الجوني",
   } satisfies Record<Locale, string>,
}

export const languages: Language[] = [
   {
      id: "en",
      title: "English",
      abbreviation: "EN",
   },
   {
      id: "fr",
      title: "Français",
      abbreviation: "FR",
   },
   {
      id: "ar",
      title: "العربية",
      abbreviation: "ع",
   },
]

export const layout = {
   settings: {
      title: {
         en: "Settings",
         fr: "Paramètres",
         ar: "الإعدادات",
      },
      description: {
         en: "Customize your experience",
         fr: "Personnalisez votre expérience",
         ar: "خصص تجربتك",
      },
   },
}
