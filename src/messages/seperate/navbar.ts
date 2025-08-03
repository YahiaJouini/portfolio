import { Locale } from "@/types"
import { NavBar } from "../types"

// drop all translations into one object to load instantly to prevent layout shifts
export default {
   en: {
      title: "Yahia Jouini",
      search: {
         placeholder: {
            mainInput: "Search this website ...",
            secondaryInput: "Type / to search",
         },
         jump: "Jump to",
         notFound: "No results found for",
      },
      items: [
         {
            title: "Home",
            href: "/",
            id: "home",
         },
         {
            title: "Projects",
            href: "/projects",
            id: "projects",
         },
         {
            title: "Journey",
            href: "/journey",
            id: "journey",
         },
         {
            title: "Blog",
            href: "/blogs",
            id: "blogs",
         },

         {
            title: "Contact",
            href: "/contact",
            id: "contact",
         },
      ],
   },
   fr: {
      title: "Yahia Jouini",
      search: {
         placeholder: {
            mainInput: "Chercher sur ce site ...",
            secondaryInput: "Tapez / pour rechercher",
         },
         jump: "Aller à",
         notFound: "Aucun résultat trouvé pour",
      },
      items: [
         {
            title: "Accueil",
            href: "/",
            id: "home",
         },
         {
            title: "Projets",
            href: "/projects",
            id: "projects",
         },
         {
            title: "Parcours",
            href: "/journey",
            id: "journey",
         },
         {
            title: "Blog",
            href: "/blogs",
            id: "blogs",
         },
         {
            title: "Contact",
            href: "/contact",
            id: "contact",
         },
      ],
   },
   ar: {
      title: "يحيى الجويني",
      search: {
         placeholder: {
            mainInput: "ابحث في هذا الموقع ...",
            secondaryInput: "اكتب / للبحث",
         },
         jump: "انتقل",
         notFound: "لا توجد نتائج لـ",
      },
      items: [
         {
            title: "الرئيسية",
            href: "/",
            id: "home",
         },
         {
            title: "المشاريع",
            href: "/projects",
            id: "projects",
         },
         {
            title: "الرحلة",
            href: "/journey",
            id: "journey",
         },
         {
            title: "المدونة",
            href: "/blogs",
            id: "blogs",
         },
         {
            title: "تواصل معي",
            href: "/contact",
            id: "contact",
         },
      ],
   },
} satisfies Record<Locale, NavBar>
