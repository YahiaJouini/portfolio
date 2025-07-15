import { Language, Page } from "./common"

export type NavBar = {
   title: string
   search: {
      placeholder: string
      sections: Array<{
         title: string
         id: Extract<Page, "projects" | "blog" | "education">
         href: string
      }>
   }
   languages: Array<Language>
   items: Array<{
      title: string
      href: string
      id: Page
   }>
}
