import { NavBar } from "../types/navbar"

export default {
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
         title: "المسار الدراسي",
         href: "/education",
         id: "education",
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
} satisfies NavBar
