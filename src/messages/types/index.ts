import React from "react"
import { Page } from "./shared"
import { summaryKeys } from "../seperate/project-related"

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

type BaseProjectCommon = {
   id: ProjectName
   github: `https://github.com/YahiaJouini/${ProjectName}`
   website?: string
   pinned: boolean
   type: "personal" | "work"
   images?: Array<string>
   summary?: Array<{
      key: keyof typeof summaryKeys
      value: Array<string>
   }>
}

type PublicProject = BaseProjectCommon & {
   public: true
   createdAt?: string
}

type PrivateProject = BaseProjectCommon & {
   public: false
   createdAt: string
}

export type BaseProject = PublicProject | PrivateProject

// for translation purposes
export type Project = BaseProject & {
   title: string
   description: string
}
