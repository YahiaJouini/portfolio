import { NavBar } from "../types/navbar"

const navbar: NavBar = {
   title: "Yahia Jouini",
   search: {
      placeholder: "Type / to search",
      sections: [],
   },
   themes: [
      {
         id: "dark",
         title: "Dark",
         label: "Switch to dark mode",
      },
      {
         id: "light",
         title: "Light",
         label: "Switch to light mode",
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
}
