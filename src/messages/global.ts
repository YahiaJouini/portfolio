import { Locale } from "./types/shared"

export const fullName = {
   en: "Yahia Jouini",
   fr: "Yahia Jouini",
   ar: "يحيى الجوني",
} satisfies Record<Locale, string>
export const profileImage = {
   src: "/me.webp",
   alt: {
      en: "Yahia Jouini's profile picture",
      fr: "Photo de profil de Yahia Jouini",
      ar: "صورة ملف يحيى الجوني",
   } satisfies Record<Locale, string>,
}
