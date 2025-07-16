import Blog from "@/components/icons/blog"
import Contact from "@/components/icons/contact"
import Discussions from "@/components/icons/discussions"
import Education from "@/components/icons/education"
import Home from "@/components/icons/home"
import Projects from "@/components/icons/projects"
import React from "react"
import { Language, Locale, Page } from "./types/common"

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

//maps page to its corresponding icon component
export const iconMap: Record<
   Page,
   React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
   home: Home,
   blog: Blog,
   projects: Projects,
   education: Education,
   contact: Contact,
   discussions: Discussions,
}

export const layout = {
   en: {
      settings: "Settings",
      explore: "Explore",
      connect: "Connect with me",
      other: "Other",
      pinned: "Pinned",
      public: "Public",
      projects: "Projects",
      blogPosts: "Blog Posts",
      academicPapers: "Academic Papers",
      pages: "Pages",
   },
   fr: {
      settings: "Paramètres",
      explore: "Explorer",
      connect: "Connecter avec moi",
      other: "Autre",
      pinned: "Épinglé",
      public: "Public",
      projects: "Projets",
      blogPosts: "Articles de blog",
      academicPapers: "Papiers académiques",
      pages: "Pages",
   },
   ar: {
      settings: "الإعدادات",
      explore: "استكشاف",
      connect: "اتصل بيّ",
      other: "أخرى",
      pinned: "مثبت",
      public: "عام",
      projects: "مشاريع",
      blogPosts: "مقالات المدونة",
      academicPapers: "أوراق أكاديمية",
      pages: "صفحات",
   },
}
