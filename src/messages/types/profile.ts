import { LucideIcon } from "lucide-react"
import React from "react"

export type Profile = {
   fullName: string
   job: string
   description: string
   contact: Array<{
      title: string
      href: string
      icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon
   }>
}
