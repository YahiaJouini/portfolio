import { Locale } from "@/types"

export const fullName = {
   en: "Yahia Jouini",
   fr: "Yahia Jouini",
   ar: "يحيى الجويني",
} satisfies Record<Locale, string>

export const profileImage = {
   src: "/me.webp",
   alt: {
      en: "Yahia Jouini's profile picture",
      fr: "Photo de profil de Yahia Jouini",
      ar: "صورة ملف يحيى الجويني",
   } satisfies Record<Locale, string>,
}

export const resumeUrl = ""
