import { Locale } from "../types/shared"
import { NavBar } from "../types"

// drop all translations into one object to load instantly to prevent layout shifts
export default {
   en: {
      title: "Yahia Jouini",
      search: {
         placeholder: "Type / to search",
         sections: [],
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
            href: "/blog",
            id: "blog",
         },
         {
            title: "Discussions",
            href: "/discussions",
            id: "discussions",
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
         placeholder: "Tapez / pour rechercher",
         sections: [],
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
            href: "/blog",
            id: "blog",
         },
         {
            title: "Discussions",
            href: "/discussions",
            id: "discussions",
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
         placeholder: "اكتب / للبحث",
         sections: [],
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
            href: "/blog",
            id: "blog",
         },
         {
            title: "النقاشات",
            href: "/discussions",
            id: "discussions",
         },
         {
            title: "تواصل معي",
            href: "/contact",
            id: "contact",
         },
      ],
   },
} satisfies Record<Locale, NavBar>
