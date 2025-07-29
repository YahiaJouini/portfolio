import React from "react"
import { Page } from "./shared"

export type About = {
   title: string
   description: string
   websiteDescription: string
   technologies: string
   profileViews: string
}

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

export type Footer = {
   contact: string
}

export type Profile = {
   fullName: string
   job: string
   description: string
}

export type Technology = {
   name: string
   background: string
   Icon: React.ComponentType<{ className?: string }>
}

export type ProjectRole =
   | "designed"
   | "developed"
   | "maintained"
   | "deployed"
   | "architected"

type Journey = {
   description?: string
   startDate: string
   endDate?: string
}
export type Education = Journey & {
   degree: string
   fieldOfStudy: string
   institution: string
   mention?: string
   certification?: {
      href: string
      title: string
   }
}

export type Experience = Journey & {
   jobTitle: string
   company: string
   location?: string
}
