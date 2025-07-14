import { Language, Page, Theme } from "./common"

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
   themes: Array<Theme>
   languages: Array<Language>
   items: Array<{
      title: string
      href: string
      id: Page
   }>
}
