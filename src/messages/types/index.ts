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

export type Education = {
   degree: string
   fieldOfStudy: string
   institution: string
   startDate: string // or Date
   endDate?: string // optional for ongoing studies
   mention?: string
   description?: string
}

export type Experience = {
   jobTitle: string
   company: string
   location?: string // optional if remote or not needed
   startDate: string
   endDate?: string // optional for current job
   description?: string
}
