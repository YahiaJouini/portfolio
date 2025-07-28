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
   | "journey"
   | "blog"
   | "discussions"
   | "contact"

export type Item = {
   title: string
   href: string
   id: Page
}
export type Translation =
   | Page
   | "navbar"
   | "profile"
   | "about"
   | "education"
   | "experience"

export type Contact = {
   title: string
   href?: `https://${string}` | `mailto:${string}`
   Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon
}
