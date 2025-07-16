import { LucideIcon } from "lucide-react"
import React from "react"

export const SUPPORTED_LOCALES = ["en", "fr", "ar"] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]
export type Language = {
   title: string
   id: Locale
   abbreviation: string
   Flag: React.ComponentType<React.SVGProps<SVGSVGElement>>
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
export type Translation = Page | "navbar" | "footer" | "profile"

export type Contact = {
   title: string
   href?: string
   Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon
}
