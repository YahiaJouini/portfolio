import { NavBar } from "../types/navbar"

export default {
   title: "Yahia Jouini",
   search: {
      placeholder: "Type / to search",
      sections: [],
   },
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
         title: "Education",
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
