import { Locale } from "./types/common"

export const profileImage = {
   src: "/images/profile.jpg",
   alt: {
      en: "Yahia Jouini's profile picture",
      fr: "Photo de profil de Yahia Jouini",
      ar: "صورة ملف يحيى الجوني",
   } satisfies Record<Locale, string>,
}
