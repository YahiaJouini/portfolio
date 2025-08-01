import { Locale } from "@/types"
import { LucideIcon } from "lucide-react"

export type Language = {
   title: string
   id: Locale
   abbreviation: string
   Flag: React.ComponentType<React.SVGProps<SVGSVGElement>>
}
export type Page = "home" | "projects" | "journey" | "blogs" | "contact"

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
