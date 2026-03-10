import { Locale } from "@/types"
import { ProjectRole } from "../types"

export const summaryKeys = {
  domain: {
    en: "Domain",
    ar: "المجال",
    fr: "Domaine",
  },
  stack: {
    en: "Tech Stack",
    ar: "المكدس التقني",
    fr: "Stack technique",
  },
  architecture: {
    en: "Architecture",
    ar: "المعمارية",
    fr: "Architecture",
  },
  features: {
    en: "Features",
    ar: "الميزات",
    fr: "Fonctionnalités",
  },
  focus: {
    en: "Engineering Focus",
    ar: "التركيز الهندسي",
    fr: "Focus d’ingénierie",
  },
  deployment: {
    en: "Deployment",
    ar: "النشر",
    fr: "Déploiement",
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
    ar: "صانَ وواصل تطويره",
    fr: "Maintenu",
  },
} satisfies Record<ProjectRole, Record<Locale, string>>
