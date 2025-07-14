import { NavBar } from "../types/navbar"

export default {
   title: "Yahia Jouini",
   search: {
      placeholder: "Tapez / pour rechercher",
      sections: [],
   },
   themes: [
      {
         id: "dark",
         title: "Sombre",
         label: "Passer en mode sombre",
      },
      {
         id: "light",
         title: "Clair",
         label: "Passer en mode clair",
      },
   ],
   languages: [
      {
         id: "en",
         title: "English",
      },
      {
         id: "fr",
         title: "Français",
      },
      {
         id: "ar",
         title: "العربية",
      },
   ],
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
         title: "Éducation",
         href: "/education",
         id: "education",
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
} satisfies NavBar
