export const SUPPORTED_LOCALES = ["en", "fr", "ar"] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]
export type Language = { title: string; id: Locale }
export type Theme = {
   id: "light" | "dark"
   title: string
   label: string
}
export type Page =
   | "home"
   | "projects"
   | "education"
   | "blog"
   | "discussions"
   | "contact"

export type Item = {
   title: string
   href: string
   id: Page
}
export type Translation = Page | "navbar" | "footer"
