import { Locale } from "@/types"
import { ProjectRole } from "../types"

export const summaryKeys = {
   frameworks: {
      en: "Frameworks & Libraries",
      ar: "الأطر والمكتبات",
      fr: "Frameworks et bibliothèques",
   },
   databases: {
      en: "Databases & Backend Services",
      ar: "قواعد البيانات وخدمات الواجهة الخلفية",
      fr: "Bases de données et services backend",
   },
   cms: {
      en: "CMS & APIs",
      ar: "أنظمة إدارة المحتوى وواجهات برمجة التطبيقات",
      fr: "CMS et APIs",
   },
   tools: {
      en: "Developer Tools & Misc",
      ar: "أدوات المطورين وأخرى",
      fr: "Outils de développement et divers",
   },
   styling: {
      en: "Styling & UI",
      ar: "التصميم وواجهة المستخدم",
      fr: "Styling et UI",
   },
} satisfies Record<string, Record<Locale, string>>

export const projectRoles = {
   architected: {
      en: "Architected",
      ar: "صمّم البنية",
      fr: "Conçu l'architecture",
   },
   deployed: {
      en: "Deployed",
      ar: "نُشِر",
      fr: "Déployé",
   },
   designed: {
      en: "Designed",
      ar: "صمّم",
      fr: "Conçu",
   },
   developed: {
      en: "Developed",
      ar: "طوّر",
      fr: "Développé",
   },
   maintained: {
      en: "Maintained",
      ar: "تمّت صيانته",
      fr: "Maintenu",
   },
} satisfies Record<ProjectRole, Record<Locale, string>>
