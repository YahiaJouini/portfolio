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

export type ProjectName =
   | "aftercode"
   | "educonnect"
   | "mariagetn"
   | "mariagetn-api"
   | "meelice"
   | "alpha"
   | "edufinance"
   | "nuit-blanche"

type Summary =
   | "Databases & Backend Services"
   | "CMS & APIs"
   | "Developer Tools & Misc"
   | "Frameworks & Libraries"
   | "Styling & UI"

export type BaseProject = {
   id: ProjectName
   github: `https://github.com/YahiaJouini/${ProjectName}`
   website?: string
   // can show source code
   public: boolean
   pinned: boolean
   type: "personal" | "work"
   mainLanguage: string
   images?: Array<string>
   summary?: Array<{
      key: Summary
      value: Array<string>
   }>
}

// for translation purposes
export type Project = BaseProject & {
   title: string
   description: string
}
