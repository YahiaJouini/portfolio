import { Page } from "./common"

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
   items: Array<{
      title: string
      href: string
      id: Page
   }>
}
